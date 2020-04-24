package com.luhao.io.nio;

import com.luhao.io.nio.cankao.TestServerChannel2;
import com.luhao.io.nio.diff.NioClient;

/**
 * <p>Title: TestChannel.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-23 22:39
 */
public class TestChannel {

    public static void main(String[] args) {
        new Thread(TestServerChannel2::selector).start();
        new Thread(() -> NioClient.client(1,false)).start();

    }


}
