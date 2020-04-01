package com.luhao.innerClass;

/**
 * <p>Title: TestInnerClass.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-01 13:54
 */
public class TestInnerClass {
    public static void test1(){
        OuterClass.InnerClass innerClass = new OuterClass().new InnerClass();
        innerClass.test();
    }

    public static void main(String[] args) {
        test1();
    }
}
