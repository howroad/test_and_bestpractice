package com.luhao.dateformat;

import org.apache.commons.lang3.time.DateFormatUtils;
import sun.util.resources.LocaleData;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

/**
 * <p>Title: TestDateFormat.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-11 14:02
 */
public class TestDateFormat {
    public static void main(String[] args) {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(sdf.format(date)); //1

        System.out.println(String.format("%1$tY-%1$tm-%1$td %1$tH:%1$tM:%1$tS",date)); //2
        System.out.println(String.format("%tY-%<tm-%<td %<tH:%<tM:%<tS",date)); //2.5

        Calendar calendar = Calendar.getInstance();
        System.out.println(calendar.get(Calendar.YEAR) + "-" + (calendar.get(Calendar.MONTH) + 1) + "-" + calendar.get(Calendar.DAY_OF_MONTH) +
                " " + calendar.get(Calendar.HOUR_OF_DAY) + ":" + calendar.get(Calendar.MINUTE) + ":" + calendar.get(Calendar.SECOND)); //3

        System.out.println(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));//3.5

        System.out.println(DateFormatUtils.format(date,"yyyy-MM-dd HH:mm:ss"));//4
    }
}
