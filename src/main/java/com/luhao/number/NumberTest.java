package com.luhao.number;

import com.luhao.model.Student;

/**
 * <p>Title: NumberTest.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-06-19 15:01
 */
public class NumberTest {
    public static void main(String[] args) {
        Integer i = null;
        Integer j  = null;
        int m = 0;
        //System.out.println(i.equals(j));
        Student student = new Student();
        student.setStudentAge(null);
        Student student1 = new Student();
        student1.setStudentAge(null);
        //System.out.println(student.getStudentAge().equals(student1.getStudentAge()));
        System.out.println(i == m);
    }
}
