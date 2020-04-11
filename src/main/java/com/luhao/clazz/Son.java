package com.luhao.clazz;

/**
 * <p>Title: Son.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-11 16:06
 */
public class Son extends  Father{

    private void privateMethod(){
        System.out.println("son's private!");
    }
    protected void protectedMethod(){
        System.out.println("son's protected!");
    }
}
