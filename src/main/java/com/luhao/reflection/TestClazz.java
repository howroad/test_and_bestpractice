package com.luhao.reflection;

import com.luhao.model.Student;
import sun.reflect.Reflection;

/**
 * <p>Title: TestClazz.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-27 20:20
 */
public class TestClazz {
    public static void main(String[] args) throws ClassNotFoundException {
        //test1();
        test2();
    }

    /**
     * 反射对象的三种方式
     * @throws ClassNotFoundException
     */
    public static void test1() throws ClassNotFoundException {
        Student student = new Student();
        Class<Student> st1 = Student.class;
        Class<? extends Student> st2 = student.getClass();
        Class<?> st3 = Class.forName("com.luhao.model.Student");
        System.out.println(st1 == st2);
        System.out.println(st2 == st3);
        //Class是单例的
    }

    //开发人员不要使用sun包
    public static void test2() {
        Class<?> callerClass = Reflection.getCallerClass();
        System.out.println(callerClass);//要报错
    }

    public static void test3() {

    }
}
