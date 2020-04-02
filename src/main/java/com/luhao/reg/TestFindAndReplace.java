package com.luhao.reg;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <p>Title: TestFind.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-02 19:12
 */
public class TestFindAndReplace {
    public static void main(String[] args) {
        test1();
        search();
        replace1();
        replace2();
    }

    //查找<a target=_blank href="www.baidu.com">百度一下</a>中的www.baidu.com
    public static void test1() {
        String str = "<a target=_blank href=\"www.baidu.com\">百度一下\"你就知道\"</a>";
        String reg = "<a.+?href=\"(.+?)\"";
        Matcher matcher = Pattern.compile(reg).matcher(str);
        while (matcher.find()) {
            System.out.println(matcher.group(1));
        }

        String reg2 = "(?<=(<a.{1,100}?href=\"))(.+?)(?=(\"))";
        Matcher matcher2 = Pattern.compile(reg2).matcher(str);
        while (matcher2.find()) {
            System.out.println(matcher2.group(2));
        }
    }

    private static void search() {
        Pattern pattern = Pattern.compile("m(o+)n", Pattern.CASE_INSENSITIVE);

        Matcher matcher = pattern.matcher("Sun Earth moon mooon Mon mooooon Mooon Mars");
        while (matcher.find()) {
            System.out.println(String.format("%s (%d~%d)", matcher.group(0), matcher.start(), matcher.end()));
        }
    }

    //批量替换
    private static void replace1() {
        String str = "10元 1000人民币 10000元 100000RMB 元来如此";

        //方法1
        String str2 = str.replaceAll("(\\d+)(元|人民币|RMB)", "$1圆");
        System.out.println(str2);

        //方法2
        Matcher matcher = Pattern.compile("(\\d+)(元|人民币|rmb)", Pattern.CASE_INSENSITIVE).matcher(str);
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            matcher.appendReplacement(sb, matcher.group(1) + "媛");
        }
        matcher.appendTail(sb);
        System.out.println(sb);

        //方法3
        String str3 = str.replaceAll("(?<=\\d)(RMB|元|人民币)", "缘");
        System.out.println(str3);
        //把1000换成2000
        String str3_1 = str.replaceAll("\\d+(?=(元|RMB|人民币))","2000");
        System.out.println(str3_1);

    }

    //批量替换
    private static void replace2() {
        Pattern p = Pattern.compile("m(o+)n", Pattern.CASE_INSENSITIVE);//忽略大小写

        Matcher m = p.matcher("Sun Earth moon mooon Mon mooooon Mooon Mars ha");
        StringBuffer sb = new StringBuffer();

        while (m.find()) {
            m.appendReplacement(sb, "Moon");
        }
        m.appendTail(sb);

        System.out.println("Result=" + sb.toString());
    }

}
