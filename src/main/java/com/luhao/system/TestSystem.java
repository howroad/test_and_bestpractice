package com.luhao.system;

import com.luhao.model.Student;
import com.luhao.model.StudentWithHashCode;

import java.util.Arrays;

/**
 * <p>Title: TestSystem.java</p>
 * <p>Description: java.lang.System的有趣用法</p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-27 20:44
 */
public class TestSystem {
    public static void main(String[] args) {
//        test1();
        test2();

    }

    /**
     * hashCode
     */
    public static void test1() {
        Student student = new Student();
        Student student2 = new Student();
        StudentWithHashCode student3 = new StudentWithHashCode();//对于重写了hashCode()的类，两种方法得到的结果不一样
        System.out.println(System.identityHashCode(student));
        System.out.println(System.identityHashCode(student2));
        System.out.println(System.identityHashCode(student3));
        System.out.println(student.hashCode());
        System.out.println(student2.hashCode());
        System.out.println(student3.hashCode());
    }

    /**
     * arrayCopy
     */
    public static void test2() {
        int[] arr = new int[]{1,2,3,4,5,6,78,9,10};
        int[] arr2 = new int[10];
        //原数组，原数组的开始，目标数组，目标数组的开始，长度
        System.arraycopy(arr,0,arr2,0,5);
        System.out.println(Arrays.asList(arr2));
    }


}
