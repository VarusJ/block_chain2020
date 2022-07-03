# block_chain2020

## Block Chain Project, chain-end:

This setting process strictly follows the offical doc of FISCO [Link](https://fisco-bcos-documentation.readthedocs.io/zh_CN/latest/docs/installation.html)     
If you are using existing nodes instead of creating them, please follow the above document strictly. Otherwise you may need to modify some part of the code like port number, file path, according to your own environment.

### To open the chain-end:
```
cd chain/fisco/nodes/127.0.0.1
bash start_all.sh
```


## Block Chain Project, back-end:

Before started, make sure all nodes are turned on, and port 8000 is available. If not, you can modify the monitor port number in the end of src/index.js.

If you modified the path in the chain-end, please also modify the src/packages/cli/conf/config.json accordingly:
```
"authentication": {
    "key": "/root/chain/fisco/nodes/127.0.0.1/sdk/node.key",
    "cert": "/root/chain/fisco/nodes/127.0.0.1/sdk/node.crt",
    "ca": "/root/chain/fisco/nodes/127.0.0.1/sdk/ca.crt"
},
```

### To open the back-end:
```shell
yarn install（或 yarn）
cd server/src
node index.js
```


## Block Chain Project, front-end:

Make sure the back-end is on and port 8080 is available.
    
### To open the front-end:
```
cd vue-antd
cd server
yarn install
yarn start
cd ..
yarn install
yarn serve
```

### Admin account:
- Name: admin
- Password: admin123
