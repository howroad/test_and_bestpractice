package com.luhao.reg;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <p>Title: TestCommont.java</p>
 * <p>Description: 正则注释</p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-02 20:47
 */
public class TestCommont {
    public static void main(String[] args) {
        String regex =  "(19|20)\\d\\d[- /.]#年，只允许是19或20开头的\n" + //#开头 回车结尾
                "(0?[1-9]|1[012])[- /.]#月，只允许1-12\n" +
                "(0?[1-9]|[12][0-9]|3[01])#日，只允许1到31";
        Pattern p = Pattern.compile(regex, Pattern.COMMENTS);
        Matcher m = p.matcher("2010.2.21");
        System.out.println(m.matches());
        m = p.matcher("1879.1.8");
        System.out.println(m.matches());
        m = p.matcher("2010.13.21");
        System.out.println(m.matches());
        m = p.matcher("2010.2.32");
    }
}
