package com.luhao.innerClass.supperClass;

/**
 * <p>Title: Son03.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-01 14:04
 */
public class Son03 extends Father02{
    public int id = 3;
    public int name = 3;
    public void test(){
        System.out.println("this:" + this.id);
        System.out.println("super:" + super.id);
        System.out.println("super.super:" + super.superId()); //子类无法访问爷爷类的同名变量
        System.out.println("super.super:" + super.name); //除非下一个父类也没有这个变量
    }
}
