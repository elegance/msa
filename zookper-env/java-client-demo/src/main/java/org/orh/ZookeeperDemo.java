package org.orh;

import java.io.IOException;
import java.util.concurrent.CountDownLatch;

import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.ZooKeeper;

public class ZookeeperDemo {
	private static final String CONNECT_STRING = "127.0.0.1:2181";
	private static final int SESSION_TIMEOUT = 5000;
	
	private static CountDownLatch latch = new CountDownLatch(1);
	
	public static void main(String[] args) throws IOException, InterruptedException {
		ZooKeeper zk = new ZooKeeper(CONNECT_STRING, SESSION_TIMEOUT, new Watcher() {
			
			public void process(WatchedEvent event) {
				if (event.getState() == Event.KeeperState.SyncConnected) {
					latch.countDown();
				}
			}
		});
		latch.await();
		
		System.out.println(zk);
	}

}
