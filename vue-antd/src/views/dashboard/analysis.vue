<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="statistic-wrapper">
    <a-row :gutter="16">

      <a-col :xl="6" :sm="12" style="margin-bottom: 16px;">
        <chart-card title="当前余额" :total="current" :loading="loading">
          <template v-slot:action>
            <a-tooltip placement="top" title="此账户的余额">
              <a-icon type="info-circle" />
            </a-tooltip>
          </template>
          <div>
            <Trend label="周同比" value="12" type="up" suffix="%" style="margin-right: 16px;"></Trend>
            <Trend label="日同比" value="11" type="down" suffix="%"></Trend>
          </div>
          <template v-slot:footer>
            <span>日销售额</span>
            <span class="footer-number">￥12,423</span>
          </template>
        </chart-card>
      </a-col>
      
      <a-col :xl="6" :sm="12" style="margin-bottom: 16px;">
        <chart-card title="应收款额" :total="credit" :loading="loading">
          <template v-slot:action>
            <a-tooltip placement="top" title="指标说明">
              <a-icon type="info-circle" />
            </a-tooltip>
          </template>
          <div>
            <mini-area color="#975FE4" />
          </div>
          <template v-slot:footer>
            <span>日访问量</span>
            <span class="footer-number">1,234</span>
          </template>
        </chart-card>
      </a-col>
      
      <a-col :xl="6" :sm="12" style="margin-bottom: 16px;">
        <chart-card title="负债额" :total="debt" :loading="loading">
          <template v-slot:action>
            <a-tooltip placement="top" title="指标说明">
              <a-icon type="info-circle" />
            </a-tooltip>
          </template>
          <mini-bar />
          <template v-slot:footer>
            <span>转化率</span>
            <span class="footer-number">60%</span>
          </template>
        </chart-card>
      </a-col>
      
      <a-col :xl="6" :sm="12" style="margin-bottom: 16px;">
        <chart-card title="信用额度" :total="creditLevel" :loading="loading">
          <template v-slot:action>
            <a-tooltip placement="top" title="指标说明">
              <a-icon type="info-circle" />
            </a-tooltip>
          </template>
          <mini-progress :percent="70" :height="8"></mini-progress>
          <template v-slot:footer>
            <Trend label="周同比" value="12" type="up" suffix="%" style="margin-right: 16px;"></Trend>
            <Trend label="日同比" value="11" type="down" suffix="%"></Trend>
          </template>
        </chart-card>
      </a-col>
    </a-row>

    <a-row type="flex" :gutter="16" style="margin-top: 16px;">
      <a-col :xl="12" :sm="18" style="margin-bottom: 16px;">
        <a-card title="查询指定公司当前信息" :bordered="false">
          <p>只有 Bank 有权限查看</p>
          <a-form :form="form_enq_ass" @submit="handleSubmit_enq_ass">
            <a-form-item label="目标企业" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input
                v-decorator="['organization', { rules: [{ required: true, message: '该空不能为空！' }] }]"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 15, offset: 8 }">
              <a-button type="primary" html-type="submit">
                  执行
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>

    <a-row type="flex" :gutter="16" style="margin-top: 16px;">
      <a-col :xl="12" :sm="12" style="margin-bottom: 16px;">
        <a-card title="签发应收账单" :bordered="false">
          <p>只有 Bank 有权限批准签发</p>
          <a-form :form="form_signature" @submit="handleSubmit_signature">
            <a-form-item label="欠款人" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input
                v-decorator="['debtor', { rules: [{ required: true, message: '该空不能为空！' }] }]"
              />
            </a-form-item>
            <a-form-item label="应收款人" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input
                v-decorator="['debtee', { rules: [{ required: true, message: '该空不能为空！' }] }]"
              />
            </a-form-item>
            <a-form-item label="金额" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input
                v-decorator="['money', { rules: [{ required: true, message: '该空不能为空！' }] }]"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 15, offset: 8 }">
              <a-button type="primary" html-type="submit">
                  Submit
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>

      <a-col :xl="12" :sm="18" style="margin-bottom: 16px;">
        <a-card title="应收账单转让(债务转移)" :bordered="false">
          <p>只有 Bank 有权限批准转让</p>
          <a-form :form="form_transfer" @submit="handleSubmit_transfer">
            <a-form-item label="欠款公司(A)" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input
                v-decorator="['organizationA', { rules: [{ required: true, message: '该空不能为空！' }] }]"
              />
            </a-form-item>
            <a-form-item label="目标公司(C)" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input
                v-decorator="['organizationC', { rules: [{ required: true, message: '该空不能为空！' }] }]"
              />
            </a-form-item>
            <a-form-item label="发起公司(B)" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input
                v-decorator="['organizationB', { rules: [{ required: true, message: '该空不能为空！' }] }]"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 15, offset: 8 }">
              <a-button type="primary" html-type="submit">
                  Submit
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>

    <a-row type="flex" :gutter="16" style="margin-top: 16px;">
      <a-col :xl="12" :sm="12" style="margin-bottom: 16px;">
        <a-card title="支付欠款" :bordered="false">
          <p>只有 Bank 有权限批准支付欠款</p>
          <a-form :form="form_payback" @submit="handleSubmit_payback">
            <a-form-item label="付款方" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input
                v-decorator="['to', { rules: [{ required: true, message: '该空不能为空！' }] }]"
              />
            </a-form-item>
            <a-form-item label="应收款方" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input
                v-decorator="['from', { rules: [{ required: true, message: '该空不能为空！' }] }]"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 15, offset: 8 }">
              <a-button type="primary" html-type="submit">
                  Submit
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>

      <a-col :xl="12" :sm="12" style="margin-bottom: 16px;">
        <a-card title="执行融资" :bordered="false">
          <p>只有 Bank 有权限批准申请</p>
          <a-form :form="form_finance" @submit="handleSubmit_finance">
            <a-form-item label="申请企业" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input
                v-decorator="['organization', { rules: [{ required: true, message: '该空不能为空！' }] }]"
              />
            </a-form-item>
            <a-form-item label="申请金额" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input
                v-decorator="['money', { rules: [{ required: true, message: '该空不能为空！' }] }]"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 15, offset: 8 }">
              <a-button type="primary" html-type="submit">
                  执行
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
    
    <offline-data
      :loading="loading"
      :offlineData="offlineData"
      :offlineChartData="offlineChartData"
    />
  </div>
</template>

<script>
import ChartCard from '@/components/Chart/ChartCard'
import Trend from '@/components/Trend'
import MiniBar from '@/components/Chart/MiniBar'
import MiniArea from '@/components/Chart/MiniArea'
import MiniProgress from '@/components/Chart/MiniProgress'
// import Bar from '@/components/Chart/Bar'
// import RankList from '@/components/Chart/RankList'
// import HotSearchCard from '@/components/Chart/HotSearchCard'
// import SalePercentCard from '@/components/Chart/SalePercentCard'
// import OfflineData from './components/OfflineData'
import { getCurrent, globalName } from '@/utils/time'
// import { getAmount } from '@/api/auth'
import axios from 'axios'

const dateList = 
  {
    'CarComp' : '0x6a00e6ae186b6cc82d8ff0495540f6ced576ae37',
    'TireComp' : '0x7ba8247a0e737728e69aad3f5f8e9184e0461c25',
    'WheelhubComp' : '0xe41d6d9ae5a73e35599bb7d1123ed3aad526cdee'
  }

const rankListData = []
for (let i = 0; i < 7; i++) {
  rankListData.push({
    label: `工专路 ${i} 号店`,
    value: Math.ceil(Math.random() * 10000)
  })
}

const offlineData = []
for (let i = 0; i < 10; i++) {
  offlineData.push({
    name: `Stores ${i}`,
    cvr: Math.random().toFixed(2)
  })
}

const offlineChartData = [
  { x: 1562221275384, y1: 95, y2: 83 },
  { x: 1562223075384, y1: 82, y2: 43 },
  { x: 1562224875384, y1: 43, y2: 18 },
  { x: 1562226675384, y1: 58, y2: 71 },
  { x: 1562228475384, y1: 103, y2: 40 },
  { x: 1562230275384, y1: 34, y2: 51 },
  { x: 1562232075384, y1: 93, y2: 50 },
  { x: 1562233875384, y1: 50, y2: 37 },
  { x: 1562235675384, y1: 99, y2: 53 },
  { x: 1562237475384, y1: 46, y2: 53 },
  { x: 1562239275384, y1: 72, y2: 58 },
  { x: 1562241075384, y1: 65, y2: 77 },
  { x: 1562242875384, y1: 108, y2: 42 },
  { x: 1562244675384, y1: 29, y2: 54 },
  { x: 1562246475384, y1: 27, y2: 63 },
  { x: 1562248275384, y1: 105, y2: 69 },
  { x: 1562250075384, y1: 30, y2: 50 },
  { x: 1562251875384, y1: 80, y2: 74 },
  { x: 1562253675384, y1: 63, y2: 69 },
  { x: 1562255475384, y1: 72, y2: 84 }
]

export default {
  components: {
    ChartCard,
    Trend,
    MiniBar,
    MiniArea,
    MiniProgress
    // Bar,
    // RankList,
    // HotSearchCard,
    // SalePercentCard,
    // OfflineData
  },
  data () {
    return {
      current: null,
      credit: null,
      debt: null,
      creditLevel: null,
      loading: false,
      rangeDate: [],
      dateList,
      activeTab: 'sale',
      rankListData,
      offlineData,
      offlineChartData,
      form_enq_ass: this.$form.createForm(this, { name: 'form_enq_ass' }),
      form_finance: this.$form.createForm(this, { name: 'form_finance' }),
      form_transfer: this.$form.createForm(this, { name: 'form_transfer' }),
      form_signature: this.$form.createForm(this, { name: 'form_signature' }),   
      form_payback: this.$form.createForm(this, { name: 'form_payback' }),
    }
  },
  mounted () {
    axios
      .post('http://localhost:8000/transaction/', { contractName: 'myChain',
        contractAddress: '0xee43bef42b96457f44a44ba531380e679a3bac41',
        function: 'getAmount',
        parameters: [],
        sender: 'Bank'
      })
      .then(response => {
        this.current = response.data.data.output.result[0]
      })
      .catch(error => {
        console.log(error)
      })
    axios
      .post('http://localhost:8000/transaction/', { contractName: 'myChain',
        contractAddress: '0xee43bef42b96457f44a44ba531380e679a3bac41',
        function: 'getCredit',
        parameters: [],
        sender: 'Bank'
      })
      .then(response => {
        this.credit = response.data.data.output.result[0]
      })
      .catch(error => {
        console.log(error)
      })
    axios
      .post('http://localhost:8000/transaction/', { contractName: 'myChain',
        contractAddress: '0xee43bef42b96457f44a44ba531380e679a3bac41',
        function: 'getDebt',
        parameters: [],
        sender: 'Bank'
      })
      .then(response => {
        this.debt = response.data.data.output.result[0]
      })
      .catch(error => {
        console.log(error)
      })
    axios
      .post('http://localhost:8000/transaction/', { contractName: 'myChain',
        contractAddress: '0xee43bef42b96457f44a44ba531380e679a3bac41',
        function: 'getCreditLevel',
        parameters: [],
        sender: 'Bank'
      })
      .then(response => {
        this.creditLevel = response.data.data.output.result[0]
      })
      .catch(error => {
        console.log(error)
      })
  },  
  methods: {
    selectDate (item) {
      console.log(item)
      this.rangeDate = item.value
    },
    created () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    handleSubmit_enq_ass (e) {
      e.preventDefault()
      this.form_enq_ass.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          axios
            .post('http://localhost:8000/transaction/', { contractName: 'myChain',
              contractAddress: '0xee43bef42b96457f44a44ba531380e679a3bac41',
              function: 'getAmount',
              parameters: [],
              sender: values.organization
            })
            .then(response => {
              this.current = response.data.data.output.result[0]
            })
            .catch(error => {
              console.log(error)
            })
            axios
              .post('http://localhost:8000/transaction/', { contractName: 'myChain',
                contractAddress: '0xee43bef42b96457f44a44ba531380e679a3bac41',
                function: 'getCredit',
                parameters: [],
                sender: values.organization
              })
              .then(response => {
                this.credit = response.data.data.output.result[0]
              })
              .catch(error => {
                console.log(error)
              })
            axios
              .post('http://localhost:8000/transaction/', { contractName: 'myChain',
                contractAddress: '0xee43bef42b96457f44a44ba531380e679a3bac41',
                function: 'getDebt',
                parameters: [],
                sender: values.organization
              })
              .then(response => {
                this.debt = response.data.data.output.result[0]
              })
              .catch(error => {
                console.log(error)
              })
            axios
              .post('http://localhost:8000/transaction/', { contractName: 'myChain',
                contractAddress: '0xee43bef42b96457f44a44ba531380e679a3bac41',
                function: 'getCreditLevel',
                parameters: [],
                sender: values.organization
              })
              .then(response => {
                this.creditLevel = response.data.data.output.result[0]
              })
              .catch(error => {
                console.log(error)
              })
        }
      })
    },
    handleSubmit_signature (e) {
      e.preventDefault()
      this.form_signature.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', dateList[values.debtee])
          axios
            .post('http://localhost:8000/transaction/', { contractName: 'myChain',
              contractAddress: '0xee43bef42b96457f44a44ba531380e679a3bac41',
              function: 'signature',
              parameters: [dateList[values.debtee], values.money],
              sender: values.debtor
            })
            .then(response => {
              console.log('success!')
              alert('success!')
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    handleSubmit_transfer (e) {
      e.preventDefault()
      this.form_transfer.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          axios
            .post('http://localhost:8000/transaction/', { contractName: 'myChain',
              contractAddress: '0xee43bef42b96457f44a44ba531380e679a3bac41',
              function: 'transfer',
              parameters: [dateList[values.organizationA], dateList[values.organizationC]],
              sender: values.organizationB
            })
            .then(response => {
              console.log('success!')
              alert('success!')            
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    handleSubmit_payback (e) {
      e.preventDefault()
      this.form_payback.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          axios
            .post('http://localhost:8000/transaction/', { contractName: 'myChain',
              contractAddress: '0xee43bef42b96457f44a44ba531380e679a3bac41',
              function: 'payback',
              parameters: [dateList[values.to]],
              sender: values.from
            })
            .then(response => {
              console.log('success!')
              alert('success!')            
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    handleSubmit_finance (e) {
      e.preventDefault()
      this.form_finance.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          axios
            .post('http://localhost:8000/transaction/', { contractName: 'myChain',
              contractAddress: '0xee43bef42b96457f44a44ba531380e679a3bac41',
              function: 'financing',
              parameters: [values.money],
              sender: values.organization
            })
            .then(response => {
              console.log(response)
              if(response.data.data.output.result[0] == false)
                alert('fail!') 
              else
                alert('success!') 
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .statistic-wrapper {
    
    .footer-number {
      margin-left: 8px;
      color: rgba(0, 0, 0, 0.85);
    }
    
    .tab-extra-wrapper {
      line-height: 55px;
      padding-right: 24px;
      
      .tab-extra-actions {
        display: inline-block;
        margin-right: 24px;
        
        a {
          color: rgba(0, 0, 0, .65);
        }
        
        a + a {
          margin-left: 24px;
        }
      }
      
      @media screen and (max-width: 992px) {
        .tab-extra-actions {
          display: none;
        }
      }
    }
    
    .bar-wrapper {
      padding: 0 0 32px 32px;
    }
    
    @media screen and (max-width: 768px) {
      .bar-wrapper {
        padding: 16px;
      }
    }
    
    .rank-list-wrapper {
      padding: 0 32px 32px 72px;
    }
    
    .sale-percent-card ::v-deep .ant-card-head {
      position: relative;
      .radio-condition {
        position: absolute;
        right: 54px;
        bottom: 12px;
      }
    }
  }
</style>
