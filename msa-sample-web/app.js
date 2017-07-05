var express = require('express');
var zookeeper = require('node-zookeeper-client');
var httpProxy = require('http-proxy');

var PORT = 1234;

var CONNECTION_STRING = '127.0.0.1:2181';
var REGISTRY_ROOT = '/registry';

// 连接zookeeper
var zk = zookeeper.createClient(CONNECTION_STRING);
zk.connect();

// 创建代理服务器对象并监听错误事件
var proxy = httpProxy.createProxyServer();
proxy.on('error', (err, req, res) => {
    res.end(); //输出空白响应数据
});

// WEB 服务
var app = express();
app.use(express.static('public'));

app.all('*', (req, res) => {
    if (req.path === '/favicon.ico') {
        res.end();
        return;
    }
    var serviceName = req.get('Service-Name');
    console.log(`serviceName: ${serviceName}`);

    if (!serviceName) {
        console.log(`Service-Name request header is not exists`)
        res.end();
        return;
    }

    // 获取服务路径
    var servicePath = REGISTRY_ROOT + '/' + serviceName;
    console.log(`servicePath: ${servicePath}`);

    // 获取服务路径下的地址节点
    zk.getChildren(servicePath, (error, addressNodes) => {
        if (error) {
            console.log(error.stack);
            res.end();
            return;
        }

        var size  = addressNodes.length;
        if (size === 0) {
            console.log('address node is not exist');
            res.end();
            return;
        }

        // 生成路径
        var addressPath = servicePath + '/';
        if (size === 1) {
            // 若只有一个地址，则获取该地址
            addressPath += addressNodes[0];
        } else {
            // 若存在多个地址，则随机获取一个地址（这里可以做负载的切入点）
            addressPath += addressNodes[parseInt(Math.random() * size)];
        }

        console.log(`addressPath: ${addressPath}`);

        // 获取服务地址
        zk.getData(addressPath, (error, serviceAddress) => {
            if (error) {
                console.log(error.stack);
                res.end();
                return;
            }
            console.log(`serviceAddress: ${serviceAddress}`);
            if (!serviceAddress) {
                console.log('service address is not exist');
                res.end();
                return;
            }

            // 执行反向代理
            proxy.web(req, res, {
                target: 'http://' + serviceAddress // 目标地址
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
});