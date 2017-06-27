var zookeeper =  require('node-zookeeper-client');

var CONNECT_STRING = 'localhost:2181';
var OPTIONS = {
    sessionTimeout: 5000
};

var zk = zookeeper.createClient(CONNECT_STRING, OPTIONS);

zk.on('connected', function() {
    console.log(zk);
    zk.close();
});
zk.connect();