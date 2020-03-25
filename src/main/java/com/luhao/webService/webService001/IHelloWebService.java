package com.luhao.webService.webService001;

import javax.jws.WebService;

/**
 * <p>Title: IHelloWebService.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-03-25 09:37
 */
@WebService(targetNamespace = "http://impl.webService.luhao.com/", serviceName = "webserviceName")
public interface IHelloWebService {
    String sayHi();
}
