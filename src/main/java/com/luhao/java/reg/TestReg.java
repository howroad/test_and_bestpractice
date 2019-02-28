package com.luhao.java.reg;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Test;


/**
 * <p>Title: TestReg.java</p>
 *
 * <p>Description: </p>
 *
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * 
 * @since：2019年2月28日 上午9:44:41
 * 
 */
public class TestReg {
    public static void main(String[] args) {

    }
    
    /**
     * 判断字符串中是否按照该正则
     * @author luhao
     * @since：2019年2月28日 下午1:15:24
     */
    @Test
    public void test1() {
        String str = "123456d4asf9846asd1as5f16a4g68aw";
        String reg = "\\d+d4asf.+";
        System.out.println(str.matches(reg));
    }
    /**
     * String str = "select * from xxx t1 where 1 =1 and t1.yy = @1 and t1.zz = and t2.ll = and t3.xxx = @56;";
     * @Description:找到字符串中的字符并替换
     * @return void
     * @author luhao
     * @since：2019年2月28日 下午3:50:27
     */
    @Test
    public void test2() {
        //TODO 没想出来
        String str = "select * from xxx t1 where 1 =1 and t1.yy = @1 and t1.zz = and t2.ll = and t3.xxx = @56;";
        String reg2 = "(and\\s\\S+\\s=\\sand)";
        Pattern pattern = Pattern.compile(reg2);
        Matcher matcher = pattern.matcher(str);
        StringBuffer sb = new StringBuffer();
        while(matcher.find()) {
            // String find = matcher.group();
            matcher.appendReplacement(sb, "and ");
        }
        matcher.appendTail(sb);
        System.out.println(sb.toString());
    }
    
}
