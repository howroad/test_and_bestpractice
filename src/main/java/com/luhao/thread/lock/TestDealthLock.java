package com.luhao.thread.lock;

import com.nstc.util.CastUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * <p>Title: TestDealthLock.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-28 09:39
 */
public class TestDealthLock {
    private static final String SOURCEA = "A";
    private static final String SOURCEB = "B";


    public static void main(String[] args) {
//        dealthLock();
        test2();
    }

    //一个经典的死锁
    public static void dealthLock() {
        new Thread(() -> {
            synchronized (SOURCEA) {
                System.out.println("线程1获得A");
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                synchronized (SOURCEB) {
                    System.out.println("线程1获得B");
                }
                System.out.println("线程1释放B");
            }
            System.out.println("线程1释放A");
        }).start();
        new Thread(() -> {
            synchronized (SOURCEB) {
                System.out.println("线程2获得B");
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                synchronized (SOURCEA) {
                    System.out.println("线程2获得A");
                }
                System.out.println("线程2释放A");
            }
            System.out.println("线程2释放B");
        }).start();
    }

    private static void test2() {
        Map<String, Object> map = new HashMap<>();
        for (int i = 0; i < 1000000; i++) {
            map.put(CastUtil.toNotEmptyString(i), CastUtil.toNotEmptyString(i));
        }
        for (int i = 0; i < 500; i++) {
            new Thread(() -> {
                map.forEach((x, o) -> {
                    System.out.println("[" + 500 + "]:" + o);
                });
            }).start();
        }

    }

    private static void test3() {

    }
}
