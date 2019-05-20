package com.luhao.map;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.luhao.model.Student;

/**
 * <p>Title: CloneMap.java</p>
 *
 * <p>Description: </p>
 *
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * 
 * @since：2019年5月9日 下午3:02:51
 * 
 */
public class CloneMap {
    public static void main(String[] args) {
        Map<String, Object> oldMap = new HashMap<String, Object>();
        oldMap.put("key1", "key1");
        oldMap.put("key2", "key2");
        oldMap.put("key3", "key3");
        Map<String, Object> newMap = new HashMap<String, Object>();
        newMap.putAll(oldMap);
        newMap.put("key1","newKey1");
        Object object = newMap.get("key2");
        object = "newKey2";
        System.out.println(oldMap);
        System.out.println(newMap);
       
    }
    
    @Test
    public void test1() {
        String key1 = new String("key1");
        Student student1 = new Student("stu1", 22, 22.22, null);
        Map<String, Object> oldMap = new HashMap<String, Object>();
        oldMap.put("key1", key1);
        oldMap.put("key2", student1);
        oldMap.put("key3", "key3");
        
        //putAll
        Map<String, Object> newMap = new HashMap<String, Object>();
        newMap.putAll(oldMap);
        key1 = new String("newkey1");
        student1 = new Student("stu2", 22, 22.22, null);
        
        System.out.println(oldMap);
        System.out.println(newMap);
        
    }
}

