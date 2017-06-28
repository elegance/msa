package org.orh.msa.framework.registry;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "register")
public class RegistryConfig {

	private String servers;
	
	public ServiceRegistry serverRegistry() {
		return  new ServiceRegistryImpl(servers);
	}

	public void setServers(String servers) {
		this.servers = servers;
	}

}
