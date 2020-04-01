package com.luhao.innerClass;

/**
 * <p>Title: FunClass.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-01 14:39
 */
public class FunClass {

    public void test(String str){ //已经不需要final修饰符了
        int i = 10; //Java 8更加智能：如果局部变量被匿名内部类访问，那么该局部变量相当于自动使用了final修饰。
        class testClass{
            //static int ss = 2; 非静态类不能有静态变量
            private int name = 10;
            void test(String s){
                System.out.println(name);
                System.out.println(s);
                System.out.println(i);
            }
        }

        new testClass().test(str);
    }

    public FunClassInteface test2(){
        String str = "001";
        String str2 = "002";
        class FunCImpl implements FunClassInteface{
            @Override
            public String getRet() {
                return str;
            }
            @Override
            public String getRetMsg() {
                return str2;
            }
        }
        return new FunCImpl();
    }

    public static void main(String[] args) {
        FunClass funClass = new FunClass();
        funClass.test("123");

        FunClassInteface test2 = funClass.test2();
        System.out.println(test2.getRet());
        System.out.println(test2.getRetMsg());
    }
}
