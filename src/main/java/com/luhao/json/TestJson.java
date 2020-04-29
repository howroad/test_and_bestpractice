package com.luhao.json;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>Title: TestJson.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-29 20:41
 */
public class TestJson {
    public static void main(String[] args) throws JsonProcessingException {
//        test1();
        test2();
    }

    //测试BigDecimal转成json后在value上会不会有引号
    public static void test1() throws JsonProcessingException {
        Map<String,Object> map = new HashMap<>();
        map.put("key1",1234567);
        map.put("key2",1.23);
        map.put("key3",1.23f);
        map.put("key4",0xF);
        map.put("key5",true);
        map.put("key6",new BigDecimal("123456789123456789123456.1234567891234567891234567891234567891321354698"));
        String str = new ObjectMapper().writeValueAsString(map);
        System.out.println(str);
    }

    public static void test2() throws JsonProcessingException {
        String str = "{\"key1\":1234567,\"key2\":1.23,\"key5\":true,\"key6\":123456789123456789123456.1234567891234567891234567891234567891321354698,\"key3\":1.23,\"key4\":15}";
        Map map = new ObjectMapper().readValue(str, Map.class);
        System.out.println(map);
    }
}
