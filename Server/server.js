const {sendTransaction} = require('./fisco-bcos-serve')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.json())
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:8080");
  res.setHeader("Access-Control-Allow-Headers","content-type,user-agent")
  next()
})
 
app.get('/', function (req, res) {
   res.send('Hello World');
})

app.post('/addOrganization', urlencodedParser, function (req, res) {
  rev_data = req.body;
  let publicKey = rev_data.public_key;
  let privateKey = rev_data.private_key;
  let address = rev_data.address;
  let creditLevel = rev_data.creditLevel;
  let func = 'addOrganization'
  let params = [address, Number(creditLevel)]
  sendTransaction(publicKey, privateKey, func, params).then(result => {
    let response = {'success': result.output['0']}
    console.log(response)
    res.json(response);
  }).catch(err => {})
})

app.post('/addAmount', urlencodedParser, function (req, res) {
  rev_data = req.body;
  let publicKey = rev_data.public_key;
  let privateKey = rev_data.private_key;
  let address = rev_data.address;
  let amount = rev_data.amount;
  let func = 'addAmount'
  let params = [address, Number(amount)]
  sendTransaction(publicKey, privateKey, func, params).then(result => {
    console.log(result.output)
    let response = {'success': result.output['0']}
    console.log(response)
    res.json(response);
  }).catch(err => {})
})

app.post('/getAmount', urlencodedParser, function (req, res) {
  rev_data = req.body;
  let publicKey = rev_data.public_key;
  let privateKey = rev_data.private_key;
  let func = 'getAmount'
  let params = []

  sendTransaction(publicKey, privateKey, func, params).then(result => {
    let response = {'amount': result.output['0']}
    // console.log(response)
    res.json(response);
  }).catch(err => {})
})

app.post('/signature', urlencodedParser, function (req, res) {
  rev_data = req.body;
  let publicKey = rev_data.public_key;
  let privateKey = rev_data.private_key;
  let debtee = rev_data.debtee;
  let amount = rev_data.amount;
  let func = 'signature'
  let params = [debtee, Number(amount)]

  sendTransaction(publicKey, privateKey, func, params).then(result => {
    console.log('signature success')
    let response = {'success': true}
    res.json(response);
  }).catch(err => {
    let response = {'success': false}
    res.json(response);
  })
})

app.post('/transfer', urlencodedParser, function (req, res) {
  rev_data = req.body;
  let publicKey = rev_data.public_key;
  let privateKey = rev_data.private_key;
  let debteeA = rev_data.debteeA;
  let debteeB = rev_data.debteeB;
  let func = 'transfer'
  let params = [debteeA, debteeB]

  sendTransaction(publicKey, privateKey, func, params).then(result => {
    console.log(result)
    let response = {'success': result.output['0']}
    res.json(response);
  }).catch(err => {
    let response = {'success': false}
    res.json(response);
  })
})

app.post('/finance', urlencodedParser, function (req, res) {
  rev_data = req.body;
  let publicKey = rev_data.public_key;
  let privateKey = rev_data.private_key;
  let amount = rev_data.amount;
  let func = 'finance'
  let params = [amount]

  sendTransaction(publicKey, privateKey, func, params).then(result => {
    console.log(result)
    let response = {'success': result.output['0']}
    res.json(response);
  }).catch(err => {
    let response = {'success': false}
    res.json(response);
  })
})

app.post('/payback', urlencodedParser, function (req, res) {
  rev_data = req.body;
  let publicKey = rev_data.public_key;
  let privateKey = rev_data.private_key;
  let debtor = rev_data.debtor;
  let func = 'payback'
  let params = [debtor]

  sendTransaction(publicKey, privateKey, func, params).then(result => {
    console.log(result)
    let response = {'success': result.output['0']}
    res.json(response);
  }).catch(err => {
    let response = {'success': false}
    res.json(response);
  })
})

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})