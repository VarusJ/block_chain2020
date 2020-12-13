pragma solidity ^0.4.21;

contract myChain {
    //设置事件，记录日志
    //添加机构
    event AddOrganizationEvent(int256 ret, address addr, uint256 creditLevel);
	//添加资产
    event AddAmountEvent(int256 ret, address addr, uint256 amount);
	//获取余额
    event GetAmountEvent(
        address addr,
        uint256 amount,
        uint256 bond,
        uint256 debt
    );
	//设置签名
    event SignatureEvent(address debtor, address debtee, uint256 amount);
    //债务转移
	event TransferEvent(
        int256 ret,
        address sponsor,
        address src,
        address dest,
        uint256 amount
    );
	//向银行融资
    event FinancingEvent(int256 ret, address sponsor, uint256 amount);
	//支付应收账款
    event PaybackEvent(
        int256 ret,
        address debtor,
        address debtee,
        uint256 amount
    );

    // 信用等级列表
    uint256[] public creditTable = [
        1,
        50000,
        500000,
        2000000,
        10000000,
        50000000,
        200000000
    ];

    struct Organization {
        bool isValid;
        address addr;
        uint256 creditLevel;
        uint256 amount;						  // 净资产
        uint256 credit_amount; 				  // 债权资产
        uint256 debt_amount; 				  // 负债额度
        mapping(address => Receipt) receipts; // 应收账款列表
    }

    struct Receipt {
        bool isValid;
        address debtor; // 欠债人
        address debtee; // 债主
        uint256 amount; // 债务额
    }

    uint256 public numOfOrganizations; // 机构总数
    mapping(address => Organization) public organizations; 
    Organization bank; // 特殊机构 => 银行

    // 添加机构
    function addOrganization(address addr, uint256 creditLevel)
        public
        returns (bool)
    {
        if (msg.sender != bank.addr) {
            emit AddOrganizationEvent(-1, addr, creditLevel);
            return false;
        }
        Organization memory org = Organization(
            true,
            addr,
            creditLevel,
            0,
            0,
            0
        );
        organizations[addr] = org;
        numOfOrganizations += 1;
        emit AddOrganizationEvent(0, addr, creditLevel);
        return true;
    }

    // 机构添加资产
    function addAmount(address addr, uint256 amount) public returns (bool) {
        if (msg.sender != bank.addr) {
            emit AddAmountEvent(-1, addr, amount);
            return false;
        }
        organizations[addr].amount += amount;
        emit AddAmountEvent(0, addr, amount);
        return true;
    }

    // 获取机构资产
    function getAmount() public returns (uint256) {
        emit GetAmountEvent(
            msg.sender,
            organizations[msg.sender].amount,
            organizations[msg.sender].credit_amount,
            organizations[msg.sender].debt_amount
        );
        return organizations[msg.sender].amount;
    }

    // 构造函数
    constructor(address bankAddr) public {
        // 初始化银行资产
        bank.isValid = true;
        bank.amount = 100000000000000;
        bank.creditLevel = 10000;
        bank.addr = bankAddr;
        organizations[bankAddr] = bank; // 添加银行至所有机构
        numOfOrganizations = 1;
    }

    /*
     * 功能: 签发应收账单（钱不够打欠条）
     * 发起者：欠债人
     * 参数: address debtee 债主地址, uint amount 金额
     **/
    function signature(address debtee, uint256 amount) public {
        address debtor = msg.sender; 
        if (organizations[debtee].receipts[debtor].isValid == false) {
            organizations[debtee].receipts[debtor] = Receipt(
                true,
                debtor,
                debtee,
                amount
            );
        } else {
            organizations[debtee].receipts[debtor].amount += amount;
        }
        organizations[debtee].credit_amount += amount;
        organizations[debtor].debt_amount += amount;
        emit SignatureEvent(msg.sender, debtee, amount);
    }

    /*
     * 功能: 应收账单转让（债务转移）B 将 A -> C
     * 发起者：B
     * 参数: address A 欠债人已有债券地址, address C 转移至的机构
     * 逻辑: A 欠 B 钱，B 欠 C 钱，B 将A对B的债务转移成A欠C
     **/
    function transfer(address A, address C) public returns (bool) {
        address B = msg.sender; 
        int256 ret = 0;
		//要有三个人中传递性欠钱的拓扑结构
        if (organizations[B].receipts[A].isValid == false ||
            organizations[C].receipts[B].isValid == false) {
            ret = -1;
            emit TransferEvent(ret, B, A, C, 0);
            return false;
        }

        // 获取欠款金额
        uint256 ab = organizations[B].receipts[A].amount;
        uint256 bc = organizations[C].receipts[B].amount;
        uint256 ac = 0;
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
        organizations[B].credit_amount -= ac;
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

    /*
     * 功能: 利用应收账单向银行融资
     * 发起者：贷款机构
     * 参数: uint amount 贷款金额
     * 逻辑: 根据贷款机构总资产、贷款金额、信用额度判断是否给予贷款。
     *		贷款后, 机构净资产增加
     **/
    function financing(uint256 amount) public returns (bool) {
        int256 ret = 0;
        address debtor = msg.sender; 
        uint256 credit = organizations[debtor].creditLevel; // 贷款机构信用额度
        uint256 org_amount = organizations[debtor].amount; // 贷款机构现有净资产
        uint256 credit_amount = organizations[debtor].credit_amount; // 贷款机构已有债券金额
        uint256 debt_amount = organizations[debtor].debt_amount; // 贷款机构负债金额

        Receipt memory receipt = Receipt(true, debtor, bank.addr, amount);
        if (bank.receipts[debtor].isValid == false) {
            if (
                amount < credit + org_amount + credit_amount - debt_amount
            ) {
                bank.receipts[debtor] = receipt;
                organizations[debtor].amount += amount;
                emit FinancingEvent(ret, debtor, amount);
                return true;
            }
        } else {
            if (
                amount + bank.receipts[debtor].amount < credit + org_amount + credit_amount - debt_amount
            ) {
                bank.receipts[debtor].amount += amount;
                organizations[debtor].amount += amount;
                emit FinancingEvent(ret, debtor, amount);
                return true;
            }
        }

        ret = -1;
        emit FinancingEvent(ret, debtor, 0);
        return false;
    }

    /*
     * 功能: 下游企业要求核心企业支付欠款（到期还钱）
     * 发起者：下游企业
     * 参数: address debtor 核心企业
     * 逻辑: 欠债还钱
     **/
    function payback(address debtor) public returns (bool) {
        int256 ret = 0; // 0 还款成功  1 没有欠钱  2 资产不够
        address debtee = msg.sender; // 下游企业地址
        Organization storage from = organizations[debtor]; // 核心企业
        Organization storage to = organizations[debtee]; // 下游企业

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
            to.credit_amount -= to.receipts[debtor].amount;
        }

        // 删除该条债务记录
        to.receipts[debtor].isValid = false;
        emit PaybackEvent(ret, debtor, debtee, to.receipts[debtor].amount);
        return true;
    }
}
