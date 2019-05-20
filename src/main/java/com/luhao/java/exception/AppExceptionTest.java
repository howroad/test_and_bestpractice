package com.luhao.java.exception;

import com.nstc.exception.AppException;

/**
 * <p>
 * Title: AppExceptionTest.java
 * </p>
 *
 * <p>
 * Description:
 * </p>
 *
 * <p>
 * Company: 北京九恒星科技股份有限公司
 * </p>
 *
 * @author luhao
 * 
 * @since：2019年4月26日 上午9:49:39
 * 
 */
public class AppExceptionTest {
    public static void main(String[] args) throws AppException {
        throw new AppException("nihao");
    }
}
