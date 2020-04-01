package com.luhao.innerClass;

/**
 * <p>Title: InnerClassAndThis.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-01 14:35
 */
public class InnerClassAndThis {
    public int age = 18;
    class Inner {
        public int age = 20;
        public void showAge() {
            int age  = 25;
            System.out.println(age);//25
            System.out.println(this.age);//20
            System.out.println(InnerClassAndThis.this.age);//18
        }
    }

    public static void main(String[] args) {
        Inner inner = new InnerClassAndThis().new Inner();
        inner.showAge();
    }
}
