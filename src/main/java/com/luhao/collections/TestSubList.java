package com.luhao.collections;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * <p>Title: TestSubList.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-18 14:57
 */
public class TestSubList {
    public static void main(String[] args) {
        test1();
    }

    //将一个List 按照每个30个元素拆分
    public static void test1(){
        List<String> list = new ArrayList<String>();
        for (int i = 0; i < 100; i++) {
            list.add(String.valueOf(i));
        }
        for (int i = 0; i < 100; i += 30) {
            List<String> strings = list.subList(i, i + 30 < 100 ? i + 30 : 100);
            System.out.println(strings);
        }


    }
}
