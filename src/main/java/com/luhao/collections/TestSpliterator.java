package com.luhao.collections;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Spliterator;

/**
 * <p>Title: TestIterator.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-07 15:02
 */
public class TestSpliterator{

    public static void main(String[] args) {
//        test1();
//        test2();
        test3();
    }

    //可分割迭代器，并行迭代器
    public static void test1(){
        //1.8对集合的补充 声明于 iterable
        List<Integer> list = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            list.add(i);
        }
        Spliterator<Integer> spliterator = list.spliterator();
        Spliterator<Integer> integerSpliterator = spliterator.trySplit();
        spliterator.forEachRemaining(x -> System.out.println(x)); // 50-99
        integerSpliterator.forEachRemaining(x -> System.out.println(x)); //0-50
        //这个迭代器被分割了
    }

    private static void test2() {
        List<Integer> list = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            list.add(i);
        }

        Spliterator<Integer> spliterator = list.spliterator();

        spliterator.trySplit().forEachRemaining(System.out::println); //0 - 49靠前的

    }

    //两个线程同时循环呢？
    private static void test3(){
        List<Integer> list = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            list.add(i);
        }
        Spliterator<Integer> spliterator = list.spliterator();
        Spliterator<Integer> spliterator2 = spliterator.trySplit();
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                
                spliterator.forEachRemaining(x->{
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(x);
                });
            }
        };
        Runnable runnable2 = new Runnable() {
            @Override
            public void run() {
                spliterator2.forEachRemaining(x -> {
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(x);
                });

            }
        };
        new Thread(runnable).start();
        new Thread(runnable2).start();
        //这应该是这个的用法吧？
    }
}
