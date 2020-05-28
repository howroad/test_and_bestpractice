package com.luhao.map;



import java.util.HashMap;
import java.util.Map;

/**
 * <p>Title: TestMap2Bean.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-05-19 13:22
 */
public class TestMap2Bean {
    static Map<String,Object> map = new HashMap<String,Object>(6);
    static {
        map.put("NAME","luhao");
        map.put("AGE",18);
    }

    public static void main(String[] args) {
        //no idea map to Bean
        // this map to Student
    }
}
