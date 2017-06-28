package org.orh.msa.framework.registry;

/**
 * 服务注册表
 * @author orh
 *
 */
public interface ServiceRegistry {

	/**
	 * 注册服务信息
	 * @param serviceName 服务名称
	 * @param serviceAddress 服务地址
	 */
	void register(String serviceName, String serviceAddress);
}
