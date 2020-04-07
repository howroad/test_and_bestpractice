package com.luhao.functionParam;

/**
 * <p>Title: TestFunction.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-07 18:13
 */
public class TestFunction {
    public static void test1(String...args){
        System.out.println(args.length);
    }
    public static void test2(String[] args){ //跟不定参不一样，不传会报错，不定参不传编译不会报错
        System.out.println(args.length);
    }

    public static void main(String[] args) {
        test1(); // 打印0
        test1(null); //报错
        test2(null); //报错
    }
}
