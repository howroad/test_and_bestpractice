package com.luhao.innerClass.demo;

import java.util.LinkedList;

/**
 * <p>Title: ImplementClass.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-01 15:27
 */
public class ImplementClass {
    private class001 class001 = new class001();
    private class002 class002 = new class002();

    public void say001(){
        class001.sya001();
    }

    public void say002(){
        class002.sya002();
    }

    private class class001 extends AbstrcatClass001{}
    private class class002 extends AbstrcatClass002{
        @Override
        void sya002() {

        }
    }
}
