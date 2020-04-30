package com.luhao.thread.new_thread;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * <p>Title: TestNewThread.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-30 13:45
 */
public class TestNewThread {
    /**
     * 1.通过继承Thread类，重写run方法；
     *
     * 2.通过实现runable接口；
     *
     * 3.通过实现callable接口这三种方式
     *
     * @param args
     */
    public static void main(String[] args) {
        //
        test1();
    }

    public static void test1() {
        new TestThread1().start();
        new Thread(new TestThread2()).start();
        Future<String> future = exec.submit(new TestThread3());
        Future<String> future2 = exec.submit(new TestThread3(1));
        String result = null;
        String result2 = null;
        try {
            result = future.get();//会等待线程完成才会进行下一步
            System.out.println(result + result2);
            System.out.println("谁先打印？");
            result2 = future2.get();
            System.out.println(result2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

    }

    private static ThreadPoolExecutor exec = new ThreadPoolExecutor(10, 30,
            300, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(10000),
            Executors.defaultThreadFactory(), new ThreadPoolExecutor.CallerRunsPolicy());
}
