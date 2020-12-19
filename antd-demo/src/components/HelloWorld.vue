<template>
  <div class="hello">
    <h1>Supply Chain Finance Platform</h1>
    <div style="background-color: #ececec; padding: 20px;">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card title="Add Company" :bordered="false">
          <p>Only the bank can register an company</p>
          <a-form :form="form_add_org" @submit="handleSubmit_add_org">
              <a-form-item label="public key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['public_key', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                />
              </a-form-item>
              <a-form-item label="private key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-textarea placeholder="Basic usage" :rows="2" v-decorator="['private_key', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
              </a-form-item>
              <a-form-item label="address" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['address', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                />
              </a-form-item>
              <a-form-item label="credit level" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['creditLevel', { rules: [{ required: true, message: 'Please input your note!' }] }]"
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
        <a-col :span="8">
          <a-card title="Registe Assets" :bordered="false">
            <p>Only the bank can register assets for company</p>
            <a-form :form="form_reg_ass" @submit="handleSubmit_reg_ass">
              <a-form-item label="public key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['public_key', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                />
              </a-form-item>
              <a-form-item label="private key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-textarea placeholder="Basic usage" :rows="2" v-decorator="['private_key', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
              </a-form-item>
              <a-form-item label="address" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['address', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                />
              </a-form-item>
              <a-form-item label="amount" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['amount', { rules: [{ required: true, message: 'Please input your note!' }] }]"
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
        <a-col :span="8">
          <a-card title="Enquiry Assets" :bordered="false">
            <p>All companies can check their assets</p>
            <a-form :form="form_enq_ass" @submit="handleSubmit_enq_ass">
              <a-form-item label="public key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['public_key', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                />
              </a-form-item>
              <a-form-item label="private key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-textarea placeholder="Basic usage" :rows="2" v-decorator="['private_key', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
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
    </div>
    <div style="background-color: #ececec; padding: 20px;">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card title="Signature" :bordered="false">
            <p>Upstream enterprises issue bills to downstream enterprises</p>
            <a-form :form="form_sig" @submit="handleSubmit_sig">
              <a-form-item label="public key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['public_key', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                />
              </a-form-item>
              <a-form-item label="private key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-textarea placeholder="Basic usage" :rows="2" v-decorator="['private_key', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
              </a-form-item>
              <a-form-item label="Debtee" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['debtee', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                />
              </a-form-item>
              <a-form-item label="Amount" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['amount', { rules: [{ required: true, message: 'Please input your note!' }] }]"
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
        <a-col :span="8">
          <a-card title="Debt Transference" :bordered="false">
            <p>Transfers debt from A to B</p>
            <a-form :form="form_tra" @submit="handleSubmit_tra">
              <a-form-item label="public key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['public_key', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                />
              </a-form-item>
              <a-form-item label="private key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-textarea placeholder="Basic usage" :rows="2" v-decorator="['private_key', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
              </a-form-item>
              <a-form-item label="DebteeA" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['debteeA', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                />
              </a-form-item>
              <a-form-item label="DebteeB" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['debteeB', { rules: [{ required: true, message: 'Please input your note!' }] }]"
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
        <a-col :span="8">
          <a-card title="Financing from Bank" :bordered="false">
            <p>Enterprises finance banks under bonds</p>
            <a-form :form="form_fin" @submit="handleSubmit_fin">
              <a-form-item label="public key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['public_key', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                />
              </a-form-item>
              <a-form-item label="private key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-textarea placeholder="Basic usage" :rows="2" v-decorator="['private_key', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
              </a-form-item>
              </a-form-item>
              <a-form-item label="amount" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['amount', { rules: [{ required: true, message: 'Please input your note!' }] }]"
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
    </div>
    <div style="background-color: #ececec; padding: 20px;">
      <a-card title="Payback" style="width: 410px">
        <p>Downsteam enterprises require upstream enterprises to repay</p>
        <a-form :form="form_pay" @submit="handleSubmit_pay">
              <a-form-item label="public key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['public_key', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                />
              </a-form-item>
              <a-form-item label="private key" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-textarea placeholder="Basic usage" :rows="2" v-decorator="['private_key', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
              </a-form-item>
              <a-form-item label="Debtor" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-input
                  v-decorator="['debtor', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 15, offset: 8 }">
                <a-button type="primary" html-type="submit">
                  Submit
                </a-button>
              </a-form-item>
            </a-form>
      </a-card>
    </div>
  </div>
</template>

<script>
import {postData} from './postFunc'
export default {
  data() {
    return {
      form_reg_ass: this.$form.createForm(this, { name: 'form_reg_ass' }),
      form_add_org: this.$form.createForm(this, { name: 'form_add_org' }),
      form_enq_ass: this.$form.createForm(this, { name: 'form_enq_ass' }),
      form_sig: this.$form.createForm(this, { name: 'form_sig' }),
      form_tra: this.$form.createForm(this, { name: 'form_tra' }),
      form_fin: this.$form.createForm(this, { name: 'form_fin' }),
      form_pay: this.$form.createForm(this, { name: 'form_pay' }),
    };
  },
  methods: {
    handleSubmit_add_org(e) {
      e.preventDefault();
      this.form_add_org.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          postData('http://localhost:8081/addOrganization', values)
            .then(async res => {
              let body = await res.json();
              let success = body.success;
              if (success) {
                alert('register success!')
              } else {
                alert('register fail! Only the bank can register an company!')
              }
              
            }) // JSON from `response.json()` call
            .catch(error => console.error(error))
        }
      });
    },
    handleSubmit_reg_ass(e) {
      e.preventDefault();
      this.form_reg_ass.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          postData('http://localhost:8081/addAmount', values)
            .then(async res => {
              let body = await res.json();
              let success = body.success;
              if (success) {
                alert('register assets success!')
              } else {
                alert('register fail! Only the bank can register assets for an company!')
              }
            }) // JSON from `response.json()` call
            .catch(error => console.error(error))
        }
      });
    },
    handleSubmit_enq_ass(e) {
      e.preventDefault();
      this.form_enq_ass.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          postData('http://localhost:8081/getAmount', values)
            .then(async res => {
              let body = await res.json()
              alert('amount: ' + body.amount)
              }) // JSON from `response.json()` call
            .catch(error => console.error(error))
        }
      });
    },
    handleSubmit_sig(e) {
      e.preventDefault();
      console.log(postData)
      this.form_sig.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          postData('http://localhost:8081/signature', values)
            .then(async res => {
              let body = await res.json();
              let success = body.success;
              if (success) {
                alert('issue bills success!')
              } else {
                alert('issue bills fail!')
              }
            }) // JSON from `response.json()` call
            .catch(error => console.error(error))
        }
      });
    },
    handleSubmit_tra(e) {
      e.preventDefault();
      console.log(postData)
      this.form_tra.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          postData('http://localhost:8081/transfer', values)
            .then(async res => {
              let body = await res.json();
              let success = body.success;
              if (success) {
                alert('transfer debt success!')
              } else {
                alert('transfer debt fail!')
              }
            }) // JSON from `response.json()` call
            .catch(error => console.error(error))
        }
      });
    },
    handleSubmit_fin(e) {
      e.preventDefault();
      console.log(postData)
      this.form_fin.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          postData('http://localhost:8081/finance', values)
            .then(async res => {
              let body = await res.json();
              let success = body.success;
              if (success) {
                alert('finance success!')
              } else {
                alert('finance fail!')
              }
            }) // JSON from `response.json()` call
            .catch(error => console.error(error))
        }
      });
    },
    handleSubmit_pay(e) {
      e.preventDefault();
      console.log(postData)
      this.form_pay.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          postData('http://localhost:8081/payback', values)
            .then(async res => {
              let body = await res.json();
              let success = body.success;
              if (success) {
                alert('finance success!')
              } else {
                alert('finance fail!')
              }
            }) // JSON from `response.json()` call
            .catch(error => console.error(error))
        }
      });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
