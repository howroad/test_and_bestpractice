package com.luhao.webService.webService002;

import com.nstc.framework.server.EventServer;
import org.apache.hadoop.HadoopIllegalArgumentException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.ipc.RPC;
import org.apache.hadoop.ipc.RPC.Server;

import java.io.IOException;

/**
 * <p>Title: RpcServer.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-05-20 11:50
 */
public class RpcServer {

    public static void main(String[] args) throws HadoopIllegalArgumentException, IOException {
        Server server = new RPC.Builder(new Configuration())
                .setInstance(new RpcServer())
                .setBindAddress("192.168.8.100")
                .setPort(9527)
                .setProtocol(EventServer.class)
                .build();
        server.start();

    }

    public String sayHi(String name) {
        // TODO Auto-generated method stub
        return "HI~" + name;
    }
}
