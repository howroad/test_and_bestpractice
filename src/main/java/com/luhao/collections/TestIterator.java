package com.luhao.collections;

import java.util.Iterator;

/**
 * <p>Title: TestIterator.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-07 15:22
 */
public class TestIterator {

    public static void main(String[] args) {
        test4();
        test5();
    }

    //Iterator迭代器 和 Iterable可迭代 的区别
    public static void test4(){
        //定义一个迭代器
        Iterator<Integer> iterator = new Iterator<Integer>() {
            int x = 0;
            @Override
            public boolean hasNext() {
                return x < 10;
            }

            @Override
            public Integer next() {
                return ++x;
            }
        };
        iterator.forEachRemaining(x -> System.out.println(x));
        /* 跟forEachRemaining 功能一样
        for(;iterator.hasNext();){
            System.out.println(iterator.next());
        }
         */
    }

    public static void test5(){
        Iterable<Integer> iterable = new Iterable<Integer>() {
            @Override
            public Iterator<Integer> iterator() {
                return new Iterator<Integer>() {
                    int x = 0;
                    @Override
                    public boolean hasNext() {
                        boolean b = x < 10;
                        if(x >= 10){
                            x = 0;
                        }
                        return b;
                    }

                    @Override
                    public Integer next() {
                        return ++x;
                    }
                };
            }
        };
        //因为这是一个iterable，可以用foreach
        iterable.forEach(x -> System.out.println(x));
        //也可以这样
        iterable.iterator().forEachRemaining(x -> System.out.println(x));
        //这就是他们的区别！
    }

}
