package com.luhao.io.nio.diff;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.concurrent.TimeUnit;

/**
 * <p>Title: Client1.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-24 14:21
 */
public class BioClient {
    public static void main(String[] args) {
        //建立一个BIO的服务，里面有很多线程，每个read都会阻塞线程
        new Thread(BioServer::server).start();
        //每个客户端都是一个现场，每个read都会阻塞线程
        new Thread(() -> client(1)).start();
        new Thread(() -> client(2)).start();
        new Thread(() -> client(3)).start();
    }

    public static void client(int i) {
        try {
            Socket socket = new Socket();
            socket.connect(new InetSocketAddress("127.0.0.1", 8080));
            OutputStream outputStream = socket.getOutputStream();
            InputStream inputStream = socket.getInputStream();
            int num = 0;
            while (num < 10) {
                TimeUnit.SECONDS.sleep(1);
                outputStream.write(String.format("这是第%d个客户端的第%d条消息。", i, ++num).getBytes());
                byte[] bytes = new byte[1024];
                int len = inputStream.read(bytes);
                System.out.println("[客户端"+i+"接收消息]：" + new String(bytes,0,len));
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }
}
