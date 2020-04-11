package com.luhao.string;

import com.nstc.util.CastUtil;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * <p>Title: TestString.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-11 11:44
 */
public class TestString {
    public static void main(String[] args) {
        test1();
        test2();
    }

    public static void test1(){
        String str = String.format("你好%s,这%d是%s这是这是这是这是！","1",2,"3");
        System.out.println(str);
        Date d = new Date();
        String str2 = String.format("转化：%1tY年%1tm月",d,d);
        System.out.println(str2);
        System.out.println(String.format("%tF",d));
        System.out.println(String.format("%tH:%<tM",d));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
        String str3 = sdf.format(d);
        System.out.println(str3);
        String str4 = String.format("%tY年%<tm月%<td日 %<tH时%<tM分%<tS秒",d);
        String str5 = String.format("%1$tY年%1$tm月%1$td日 %1$tH时%1$tM分%1$tS秒",d);
        System.out.println(str4);
        System.out.println(str5);
    }

    /* 以下转换字符用于格式化常见的日期/时间组合
'R'     24 小时制的时间，被格式化为 "%tH:%tM"
'T'     24 小时制的时间，被格式化为 "%tH:%tM:%tS"。
'r'     12 小时制的时间，被格式化为 "%tI:%tM:%tS %Tp"。上午或下午标记 ('%Tp') 的位置可能与语言环境有关。
'D'     日期，被格式化为 "%tm/%td/%ty"。
'F'     ISO 8601 格式的完整日期，被格式化为 "%tY-%tm-%td"。
'c'     日期和时间，被格式化为 "%ta %tb %td %tT %tZ %tY"，例如 "Sun Jul 20 16:17:00 EDT 1969"。
     */

    /*
    以下转换字符用来格式化日期
'B'     特定于语言环境的月份全称，例如 "January" 和 "February"。
'b'     特定于语言环境的月份简称，例如 "Jan" 和 "Feb"。
'h'     与 'b' 相同。
'A'     特定于语言环境的星期几全称，例如 "Sunday" 和 "Monday"
'a'     特定于语言环境的星期几简称，例如 "Sun" 和 "Mon"
'C'     除以 100 的四位数表示的年份，被格式化为必要时带前导零的两位数，即 00 - 99
'Y'     年份，被格式化为必要时带前导零的四位数（至少），例如，0092 等于格里高利历的 92 CE。
'y'     年份的最后两位数，被格式化为必要时带前导零的两位数，即 00 - 99。
'j'     一年中的天数，被格式化为必要时带前导零的三位数，例如，对于格里高利历是 001 - 366。
'm'     月份，被格式化为必要时带前导零的两位数，即 01 - 13。
'd'     一个月中的天数，被格式化为必要时带前导零两位数，即 01 - 31
'e'     一个月中的天数，被格式化为两位数，即 1 - 31。
    * */

    /* 以下转换字符用来格式化时间：
'H'     24 小时制的小时，被格式化为必要时带前导零的两位数，即 00 - 23。
'I'     12 小时制的小时，被格式化为必要时带前导零的两位数，即 01 - 12。
'k'     24 小时制的小时，即 0 - 23。
'l'     12 小时制的小时，即 1 - 12。
'M'     小时中的分钟，被格式化为必要时带前导零的两位数，即 00 - 59。
'S'     分钟中的秒，被格式化为必要时带前导零的两位数，即 00 - 60 （"60" 是支持闰秒所需的一个特殊值）。
'L'     秒中的毫秒，被格式化为必要时带前导零的三位数，即 000 - 999。
'N'     秒中的毫微秒，被格式化为必要时带前导零的九位数，即 000000000 - 999999999。
'p'     特定于语言环境的 上午或下午 标记以小写形式表示，例如 "am" 或 "pm"。使用转换前缀 'T' 可以强行将此输出转换为大写形式。
'z'     相对于 GMT 的 RFC 822 格式的数字时区偏移量，例如 -0800。
'Z'     表示时区缩写形式的字符串。Formatter 的语言环境将取代参数的语言环境（如果有）。
's'     自协调世界时 (UTC) 1970 年 1 月 1 日 00:00:00 至现在所经过的秒数，即 Long.MIN_VALUE/1000 与 Long.MAX_VALUE/1000 之间的差值。
'Q'     自协调世界时 (UTC) 1970 年 1 月 1 日 00:00:00 至现在所经过的毫秒数，即 Long.MIN_VALUE 与 Long.MAX_VALUE 之间的差值。

     */

    public static void test2(){
        String accountNo = "lh0001";
        Date bussDate = new Date();
        String balanceDir = "支出";
        Double amount = 30.5666666d;
        String opAccountNo = "lh0002";
        String content = String.format("贵公司账号为%1$s的账户，%2$tm月%2$td日%2$tH时%2$tM分，%3$s人民币%4$.2f元，对方户名：%5s。",
                accountNo,bussDate,balanceDir,amount,opAccountNo);
        System.out.println(content);
    }
}
