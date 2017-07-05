# msa
MicroService Architecture

## zookper
这里的微服务注册与发现暂时使用的是`zookper`, [zookper-env](zookper-env/readme.md)

当然你也选择其他你熟悉的同类产品，比如：
* Eureka
* Etcd
* Consul

## Spring Boot 
* [单页-Spring Boot Reference Guide](http://docs.spring.io/autorepo/docs/spring-boot/1.5.4.RELEASE/reference/htmlsingle/)
* [application.properties配置-common-application-properties](http://docs.spring.io/spring-boot/docs/1.5.4.RELEASE/reference/html/common-application-properties.html)
* [另外-lkyong的文章也值得参考](http://www.mkyong.com/tutorials/spring-boot-tutorials/)
* [iteye-spring-boot](http://412887952-qq-com.iteye.com/category/356333)

## 目录介绍
* [msa-hello](msa-hello/) 其实是一个展示`Spring Boot`基础功能的项目，与微服务无直接关系。
* [msa-framework](msa-framework/) 是属于一个其他发布微服务依赖的一个框架，起作用主要是提供怎么注册微服务，供其他服务实现者实现调用，相当于是一个java的`service-register-sdk`。
* [msa-sample-api](msa-sample-api/) 实现的一个样例服务，依赖`msa-framework`，已经注册服务中心。
* [msa-sample-web](msa-sample-web/) 微服务发现与使用样例。