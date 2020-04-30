package com.luhao.thread.new_thread;

import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

/**
 * <p>Title: TestThread3.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-30 14:51
 */
public class TestThread3 implements Callable {

    private int num = 10;

    public TestThread3(int num) {
        this.num = num;
    }

    public TestThread3() {
    }

    @Override
    public Object call() throws Exception {
        for (int i = 0; i < num; i++) {
            try {
                TimeUnit.SECONDS.sleep(1L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.print("哼");
        }
        return "end.";
    }
}
