package com.luhao.java8;

import com.luhao.model.Student;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Spliterator;
import java.util.function.Consumer;

/**
 * <p>Title: TestConsumer.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-07 14:03
 */
public class TestConsumer {

    public static void main(String[] args) {
        test1();
        System.out.println("--2--");
        test2();
        System.out.println("--3--");
        test3();
    }

    //函数式接口
    public static void test1(){
        //定义一个方法
        Consumer<Integer> consumer = x-> System.out.println(x * x); //不能有返回值
        Consumer<Integer> consumer2 = x-> {
            Student student = new Student();
            student.setStudentName("很气愤！");
        };
        Consumer<String> consumer3 = y -> Integer.valueOf(y);

        consumer.accept(3);//调用
        consumer2.accept(4);
        consumer3.accept("5");
    }

    //链式调用
    public static void test2(){
        Student student = new Student();
        student.setStudentAge(0);
        Consumer<Student> consumer1 = x -> {
            student.setStudentAge(student.getStudentAge() + 1);
        };
        consumer1.andThen(consumer1).andThen(consumer1).accept(student);
        System.out.println(student.getStudentAge());
    }

    //链式调用顺序
    public static void test3(){
        Consumer<String> consumer1 = x -> System.out.println("consumer1");
        Consumer<String> consumer2 = x -> System.out.println("consumer2");
        Consumer<String> consumer3 = x -> System.out.println("consumer3");
        consumer1.andThen(consumer2).andThen(consumer3); //无输出
        consumer1.andThen(consumer2).andThen(consumer3).accept(null); //1,2,3
    }

}
