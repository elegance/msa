package org.orh.msa.sample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication(scanBasePackages = "org.orh.msa") // 没有指定到 sample一级是因为要扫描msa.framework包中相关的Spring Bean
public class SampleApplication {

	@RequestMapping(name = "HelloService", method = RequestMethod.GET, path = "/hello")
	public String hello() {
		return "Hello";
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SampleApplication.class, args);
	}

}
