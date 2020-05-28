package com.luhao.string;

import org.apache.commons.lang.StringUtils;

/**
 * <p>Title: TestSubstring.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-05-28 17:57
 */
public class TestSubstring {
    public static void main(String[] args) {
        String 你好朋友啊朋友啊123 = StringUtils.abbreviate("你好朋友啊朋友啊123", 10);
        System.out.println(你好朋友啊朋友啊123);
    }
}
