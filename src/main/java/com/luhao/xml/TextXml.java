package com.luhao.xml;

import com.luhao.interface_validate.RemoteParam;
import com.luhao.interface_validate.RemoteParamValidator;

import java.util.HashMap;
import java.util.List;

/**
 * <p>Title: TextXml.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-03-23 15:02
 */
public class TextXml {
    public static void main(String[] args) {
        test();
    }
    private static void test(){
        //参考类：RemoteParamValidator
        RemoteParamValidator remoteParamValidator = RemoteParamValidator.getInstance();
        remoteParamValidator.init();
        HashMap<String, List<RemoteParam>> remoteParamsMap = remoteParamValidator.getRemoteParamsMap();
        System.out.println(remoteParamsMap);
    }
}
