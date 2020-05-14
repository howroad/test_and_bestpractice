package com.luhao.string;

import java.util.Arrays;

/**
 * <p>Title: TestBuss.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-05-14 12:09
 */
public class TestBuss {
    public static void main(String[] args) {
        String[] roles = new String[]{"账户管理岗（上线账户）", "资金中心结算账户管理岗（上线账户）"};
        String[] levels = new String[]{"1","2"};
        System.out.println(String.format("无法查到需要提醒的用户！，单位级别：%s，岗位名称：%s。",
                Arrays.toString(levels), Arrays.toString(roles)));
    }
}
