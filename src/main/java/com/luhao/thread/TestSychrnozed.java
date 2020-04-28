package com.luhao.thread;

/**
 * <p>Title: TestSychrnozed.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-28 09:14
 */
public class TestSychrnozed {
    private static int count = 0;

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            Thread thread = new Thread(new SynchrnoziedDemo());
            thread.start();
        }
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //结果不是10 * 1000000，说明有同步问题
        System.out.println("result: " + count);
    }

    private static class SynchrnoziedDemo implements Runnable{
        @Override
        public void run() {
            for (int i = 0; i < 1000000; i++) {
                count++;
            }
        }
    }
}
