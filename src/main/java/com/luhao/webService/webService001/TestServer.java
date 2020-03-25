package com.luhao.webService.webService001;

import com.luhao.webService.webService001.HelloWebServiceImpl;
import com.luhao.webService.webService001.IHelloWebService;

import javax.xml.ws.Endpoint;

/**
 * <p>Title: TestWebService.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-03-25 09:42
 */
public class TestServer {
    public static void main(String[] args) {
        IHelloWebService hw = new HelloWebServiceImpl();
        Endpoint.publish("http://192.168.20.120:8888/pro", hw);
        System.out.println("fb");
    }
}
