package com.luhao.innerClass.demo002;

import java.awt.List;
import java.io.File;
import java.io.FilenameFilter;
import java.util.AbstractList;
import java.util.ArrayList;
import java.util.Collection;

/**
 * <p>Title: MyList.java</p>
 * <p>Description: 迭代器模式来应用内部类</p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-01 15:40
 */
public class MyList {

    int max = 0;

    private Object[] objects;

    public MyList(Object... objects) {
        this.objects = objects;
        max = objects.length;

    }

    public MyIterate getIterate(){
        return new MyIterateImpl();
    }

    private class MyIterateImpl implements MyIterate{
        private int i = 0;
        @Override
        public Object next() {
            return objects[i++];
        }

        @Override
        public boolean hasNext() {
            return i < max;
        }
    }
}
