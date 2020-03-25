package com.luhao.webService.webService001;

import com.luhao.webService.webService001.IHelloWebService;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import java.net.URL;

/**
 * <p>Title: TestClient.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-03-25 10:33
 */
public class TestClient {
    public static void main(String[] args) throws Exception{
        URL url = new URL("http://192.168.20.120:8888/pro/webService?wsdl");
        // 指定命名空间和服务名称
        QName qName = new QName("http://impl.webService.luhao.com/", "webserviceName");
        Service service = Service.create(url, qName);
        // 通过getPort方法返回指定接口
        IHelloWebService myServer = service.getPort(new QName("http://impl.webService.luhao.com/",
                "HelloWebServiceImplPort"), IHelloWebService.class);
        // 调用方法 获取返回值
        String result = myServer.sayHi();
        System.out.println(result);
    }
}
