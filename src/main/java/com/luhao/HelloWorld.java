package com.luhao;

import java.util.HashMap;
import java.util.Map;

/**
 * <p>Title: HelloWorld.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-09-23 10:29
 */
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("hello world");
        Map<String,Object> map = new HashMap<String, Object>(4);
        map.put("key","value");
        System.out.println(map);
    }
}
