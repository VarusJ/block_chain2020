# block chain 期末项目——后端

首先确保节点开启 [详见链端](https://gitee.com/varusjz/blockchain_chain)    

确保 8000 端口没有占用，如有请自行修改 src/index.js 的末尾监听端口    
 
如果链端路径有改动，请自行修改 src/packages/cli/conf/config.json 文件：
```
"authentication": {
    "key": "/root/blockchain_chain/fisco/nodes/127.0.0.1/sdk/node.key",
    "cert": "/root/blockchain_chain/fisco/nodes/127.0.0.1/sdk/node.crt",
    "ca": "/root/blockchain_chain/fisco/nodes/127.0.0.1/sdk/ca.crt"
},
```
将原路径换成对应的新路径

## 开启后端方法：
```shell
yarn install（或 yarn）
cd server/src/
node index.js
```