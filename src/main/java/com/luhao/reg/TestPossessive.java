package com.luhao.reg;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <p>Title: TestPossessive.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-02 20:19
 */
public class TestPossessive {
    public static void main(String[] args) {
        String source = "<ol><li>Ggicci's Blog</li><li>Ggicci's Facebook</li></ol>";
        Pattern pattern = Pattern.compile("<li>.*+</li>");
        Matcher matcher = pattern.matcher(source);
        while (matcher.find()) {
            System.out.println(matcher.group());
        }
    }
}
