package com.luhao.io.nio.diff;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * <p>Title: BioServer.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-24 14:16
 */
public class BioServer {

    public static void server() {
        try {
            ServerSocket serverSocket = new ServerSocket(8080);
            int num = 0;
            while (num < 10) {
                System.out.println("进入第" + ++num + "个socket");
                Socket socket = serverSocket.accept();
                new Thread(new ServerThread(socket)).start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static class ServerThread implements Runnable{

        private Socket socket;

        ServerThread(Socket socket) {
            this.socket = socket;
        }

        @Override
        public void run() {
            try {
                InputStream inputStream = socket.getInputStream();
                OutputStream outputStream = socket.getOutputStream();
                int len = 0;
                byte[] bytes = new byte[1024];
                while ((len = inputStream.read(bytes)) > 0) {
                    String msg = new String(bytes,0,len);
                    System.out.println("[服务端]：" + msg);
                    outputStream.write(("已收到" + msg).getBytes());
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
