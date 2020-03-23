package com.luhao.guava;

import com.luhao.model.Student;
import org.junit.Test;

import com.google.common.base.Preconditions;

/**
 * <p>Title: TestValidate.java</p>
 *
 * <p>Description: </p>
 *
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * 
 * @since：2019年2月28日 下午7:04:38
 * 
 */
public class TestValidate {
    @Test
    public void test1() {
        String str2 = "1";
        run1(str2);
        String str = null;
        run1(str);
    }

    @Test
    public void test2() {
        Student stu = null;
        run2(stu);
        Student stu2 = new Student();
        run2(stu2);
    }

    /**
     * Preconditions 检查参数
     *
     * @param str
     * @author luhao
     * @since：2019年2月28日 下午7:14:04
     */
    public void run1(String str) {
        Preconditions.checkNotNull(str);
        System.out.println("运行！");
    }

    public void run2(Student stu) {
        Preconditions.checkNotNull(stu);
        System.out.println("运行！");
    }

}
