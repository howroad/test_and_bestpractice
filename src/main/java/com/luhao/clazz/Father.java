package com.luhao.clazz;

/**
 * <p>Title: Father.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-11 16:05
 */
public class Father {

    private void privateMethod(){
        System.out.println("father's private!");
    }
    protected void protectedMethod(){
        System.out.println("father's protected!");
    }
    public void show(){
        privateMethod();
        protectedMethod();
    }
}
