pragma solidity ^0.4.21;

contract SupplyChain {
	event AddOrganizationEvent(int256 ret, address addr, uint creditLevel);		// 添加机构事件
	event AddAmountEvent(int256 ret, address addr, uint amount);
	event GetAmountEvent(address addr, uint amount, uint bond, uint debt);
	event SignatureEvent(address debtor, address debtee, uint amount);
	event TransferEvent(int256 ret, address sponsor, address src, address dest, uint amout);
	event FinanceEvent(int256 ret, address sponsor, uint amount);
	event PaybackEvent(int256 ret, address debtor, address debtee, uint amount);

	// 信用等级列表
	uint[] public creditTable = [1, 50000, 500000, 2000000, 10000000, 50000000, 200000000];

	// 机构  包括 银行 & 公司
	struct Organization {
		bool isValid;
		address addr;
		uint creditLevel;		// 信用等级
		uint amount;			// 净资产
		uint bond_amount; 		// 债券资产
		uint debt_amount;		// 负债额
		mapping (address => Receipt) receipts;		// 债券列表
	}

	
	struct Receipt {
		bool isValid;
		address debtor;		// 欠债人
		address debtee;		// 债主
		uint amount;		// 债务额
	}

	uint public numOfOrganizations;		// 机构总数
	mapping (address => Organization) public organizations;	// 机构mapping (address => Organization)
	Organization bank;					// 特殊机构 => 银行

	// 添加机构
	function addOrganization(address addr, uint creditLevel) public returns(bool) {
		if (msg.sender != bank.addr) {
			emit AddOrganizationEvent(-1, addr, creditLevel);
			return false;
		}
		Organization memory org = Organization(true, addr, creditLevel, 0, 0, 0);
		organizations[addr] = org;
		numOfOrganizations += 1;
		emit AddOrganizationEvent(0, addr, creditLevel);
		return true;
	}

    // 机构添加资产
	function addAmount(address addr, uint amount) public returns(bool) {
		if (msg.sender != bank.addr) {
			emit AddAmountEvent(-1, addr, amount);
			return false;
		}
		organizations[addr].amount += amount;
		emit AddAmountEvent(0, addr, amount);
		return true;
	}

	// 获取机构资产
	function getAmount() public returns(uint) {
		emit GetAmountEvent(msg.sender, organizations[msg.sender].amount, organizations[msg.sender].bond_amount, organizations[msg.sender].debt_amount);
		return organizations[msg.sender].amount;
	}


	// 构造函数
	constructor (address bankAddr) {
		// 初始化银行资产
		bank.isValid = true;
		bank.amount = 100000000000000;
		bank.creditLevel = 10000;
		bank.addr = bankAddr;
		organizations[bankAddr] = bank;		// 添加银行至所有机构
		numOfOrganizations = 1;
	}


	// 四个功能实现
	/***********************************************
	* 功能: 签发应收账单（写欠条）
	* 发起者：欠债人
	* 参数: address debtee 债主地址, uint amount 金额
	************************************************/
	function signature(address debtee, uint amount) public {
		address debtor = msg.sender;	// 欠债人
		if (organizations[debtee].receipts[debtor].isValid == false) {
			organizations[debtee].receipts[debtor] = Receipt(true, debtor, debtee, amount);
		} else {
			organizations[debtee].receipts[debtor].amount += amount;
		}
		organizations[debtee].bond_amount += amount;
		organizations[debtor].debt_amount += amount;
		emit SignatureEvent(msg.sender, debtee, amount);
	}

	/***********************************************
	* 功能: 应收账单转让（债务转移）B 将 A -> C
	* 发起者：B
	* 参数: address A 欠债人已有债券地址, address C 转移至的机构
	* 逻辑: A 欠 B 钱，B 欠 C 钱，B 将A对B的债务转移成A欠C
	************************************************/
	function transfer(address A, address C) public returns(bool) {
		address B = msg.sender;		// 想转移债务的机构
		int256 ret = 0;	// 0 成功转让  -1 未成功转让
		
		// A 必须欠 B 的钱    B 必须欠 C 的钱
		if (organizations[B].receipts[A].isValid == false || organizations[C].receipts[B].isValid == false) {
			ret = -1;
			emit TransferEvent(ret, B, A, C, 0);
			return false;
		}

		// 获取欠款金额
		uint ab = organizations[B].receipts[A].amount;
		uint bc = organizations[C].receipts[B].amount;
		uint ac = 0;
		Receipt memory newReceiptA2C;
		if (ab > bc) {
			// 将A对B的债务 转移到A对C
			ac = bc;
			newReceiptA2C = Receipt(true, A, C, ac);
			// 相应减少B对C的债务, A对B的债务
			organizations[B].receipts[A].amount -= newReceiptA2C.amount;
			organizations[C].receipts[B].isValid = false;
		} else {
			// 将A对B的债务 转移到A对C 
			ac = ab;
			newReceiptA2C = Receipt(true, A, C, ac);
			// 相应减少B对C的债务 A对B的债务
			organizations[C].receipts[B].amount -= newReceiptA2C.amount;
			organizations[B].receipts[A].isValid = false;
			if (organizations[C].receipts[B].amount == 0) {
				organizations[C].receipts[B].isValid = false;
			}
		}
		organizations[B].bond_amount -= ac;
		organizations[B].debt_amount -= ac;
		if (organizations[C].receipts[A].isValid == false) {
			organizations[C].receipts[A] = newReceiptA2C;
		} else {
			organizations[C].receipts[A].amount += newReceiptA2C.amount;
		}
		ret = 0;
		emit TransferEvent(ret, B, A, C, ac);
		return true;
	}

	/***********************************************
	* 功能: 利用应收账单向银行融资
	* 发起者：贷款机构
	* 参数: uint amount 贷款金额
	* 逻辑: 根据贷款机构总资产、贷款金额、信用额度判断是否给予贷款。
	*		贷款后, 机构净资产增加
	************************************************/
	function finance(uint amount) public returns(bool) {
		int256 ret = 0;
		address debtor = msg.sender;	// 贷款人=机构
		uint credit = organizations[debtor].creditLevel;		// 贷款机构信用额度
		uint org_amount = organizations[debtor].amount;			// 贷款机构现有净资产
		uint bond_amount = organizations[debtor].bond_amount;	// 贷款机构已有债券金额
		uint debt_amount = organizations[debtor].debt_amount;	// 贷款机构负债金额

		Receipt memory receipt = Receipt(true, debtor, bank.addr, amount);
		if (bank.receipts[debtor].isValid == false) {
			if (amount < creditTable[credit] + org_amount + bond_amount - debt_amount) {
				bank.receipts[debtor] = receipt;
				organizations[debtor].amount += amount;
				emit FinanceEvent(ret, debtor, amount);
				return true;
			}
		} else {
			if (amount + bank.receipts[debtor].amount < creditTable[credit] + org_amount + bond_amount - debt_amount) {
				bank.receipts[debtor].amount += amount;
				organizations[debtor].amount += amount;
				emit FinanceEvent(ret, debtor, amount);
				return true;
			}
		}
		
		ret = -1;
		emit FinanceEvent(ret, debtor, 0);
		return false;
	}

	/***********************************************
	* 功能: 下游企业要求核心企业支付欠款（到期还钱）
	* 发起者：下游企业
	* 参数: address debtor 核心企业
	* 逻辑:
	************************************************/
	function payback(address debtor) public returns(bool){
		int256 ret = 0;	// 0 还款成功  1 没有欠钱  2 资产不够
		address debtee = msg.sender;	// 下游企业地址
		Organization storage from = organizations[debtor];	// 核心企业
		Organization storage to = organizations[debtee];	// 下游企业

		// 若核心企业没有欠钱
		if (to.receipts[debtor].isValid == false) {
			ret = 1;
			emit PaybackEvent(ret, debtor, debtee, 0);
			return false;
		}
		// 若核心企业现有资产不够
		if (from.amount < to.receipts[debtor].amount) {
			ret = 2;
			emit PaybackEvent(ret, debtor, debtee, 0);
			return false;
		}
		// 核心企业还钱
		from.amount -= to.receipts[debtor].amount;
		to.amount += to.receipts[debtor].amount;
		if (debtor != bank.addr) {
			from.debt_amount -= to.receipts[debtor].amount;
			to.bond_amount -= to.receipts[debtor].amount;
		}

		// 删除该条债务记录
		to.receipts[debtor].isValid = false;
		emit PaybackEvent(ret, debtor, debtee,  to.receipts[debtor].amount);
		return true;
	}
}