package com.luhao.interface_validate;

import java.util.List;

/**
 * <p>Title: TestInterface.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-03-23 10:55
 */
public class TestInterface {
    public static void main(String[] args) {
        RemoteParamValidator.getInstance().init();
        List<RemoteParam> remoteParams = RemoteParamValidator.getInstance().getRemoteParamsMap().get("SPICII-1-1");
        System.out.println(remoteParams.size());
        // 在此校验 RemoteParamValidator.getInstance().validate();
    }
}
