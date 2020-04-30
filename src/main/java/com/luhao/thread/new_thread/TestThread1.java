package com.luhao.thread.new_thread;

import java.util.concurrent.TimeUnit;

/**
 * <p>Title: TestThread1.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-30 13:53
 */
public class TestThread1 extends Thread{
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            try {
                TimeUnit.SECONDS.sleep(1L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.print("嘻");
        }
    }
}
