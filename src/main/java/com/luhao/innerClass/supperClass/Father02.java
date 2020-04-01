package com.luhao.innerClass.supperClass;

/**
 * <p>Title: Father02.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-01 14:04
 */
public class Father02 extends Father01 {
    public int id = 2;

    protected int superId() {
        return super.id;
    }
}
