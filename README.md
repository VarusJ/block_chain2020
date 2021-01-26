# block_chain2020

## block chain 期末项目——链端

本项目链端完全按照 fisco 官方文档第一步配置[地址](https://fisco-bcos-documentation.readthedocs.io/zh_CN/latest/docs/installation.html)     

如果打算使用已有运行节点，请完全按照该文档配置，否则需要自行修改相关改动数据（端口、文件路径等）

### 打开链端方法：
```
cd chain/fisco/nodes/127.0.0.1
bash start_all.sh
```


## block chain 期末项目——后端

首先确保节点开启  

确保 8000 端口没有占用，如有请自行修改 src/index.js 的末尾监听端口    
 
如果链端路径有改动，请自行修改 src/packages/cli/conf/config.json 文件：
```
"authentication": {
    "key": "/root/chain/fisco/nodes/127.0.0.1/sdk/node.key",
    "cert": "/root/chain/fisco/nodes/127.0.0.1/sdk/node.crt",
    "ca": "/root/chain/fisco/nodes/127.0.0.1/sdk/ca.crt"
},
```
将原路径换成对应的新路径

### 开启后端方法：
```shell
yarn install（或 yarn）
cd server/src
node index.js
```


## block chain 期末项目——前端

首先确保后端开启
    
确保 8080 端口没有占用

### 打开前端方法：
```
cd vue-antd
cd server
yarn install
yarn start
cd ..
yarn install
yarn serve
```

### 登录账号
- 用户名： admin
- 密码： admin123（均可，未做检测）
