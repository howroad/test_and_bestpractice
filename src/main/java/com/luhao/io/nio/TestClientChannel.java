package com.luhao.io.nio;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.util.concurrent.TimeUnit;

/**
 * <p>Title: TestClientChannel.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-23 20:42
 */
public class TestClientChannel {
    public static void main(String[] args) {
        //NIO的客户端，设置了阻塞,在service里面打断点，客户端不会被阻塞，会持续发送
        client();
        //NIO的客户端，设置了非阻塞，在service里面打断点，客户端不会被阻塞，会持续发送,跟上面一样
        //test1();
        //BIO的客户端
        //service里面打断点，client的socket被强制结束了
        //test2();
    }



    //NIO客户端
    public static void client() {
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        SocketChannel socketChannel = null;
        try {
            socketChannel = SocketChannel.open();
            //是否阻塞，暂时不知道有什么用
            //socketChannel.configureBlocking(false);
            socketChannel.configureBlocking(true);
            socketChannel.connect(new InetSocketAddress("127.0.0.1", 8080));
            //试图完成连接远程服务器的操作，
            // 在非阻塞模式下，连接从connect开始close结束，如果已有连接，则立即返回true，否则则false；
            // 在阻塞模式下，如果连接没有完成则阻塞，直到完成
            if (socketChannel.finishConnect()) {
                int i = 0;
                while (true) {
                    TimeUnit.SECONDS.sleep(1);
                    String info = "I'm " + i++ + "-th information from client";
                    buffer.clear();
                    buffer.put(info.getBytes());
                    buffer.flip();
                    while (buffer.hasRemaining()) {
                        System.out.println(buffer);
                        socketChannel.write(buffer);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (socketChannel != null) {
                    socketChannel.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    //我理解的NIO客户端
    public static void test1() {
        ByteBuffer byteBuffer = ByteBuffer.allocate(256);
        SocketChannel socketChannel = null;
        try {
            socketChannel = SocketChannel.open();
            //设置通道为非阻塞模式
            socketChannel.configureBlocking(false);
            socketChannel.connect(new InetSocketAddress("127.0.0.1", 8080));
            int i = 0;
            //如果不加判断，有可能连接还没建立完
            if (socketChannel.finishConnect()) {
                while (true) {
                    TimeUnit.SECONDS.sleep(1);
                    byteBuffer.clear();
                    byteBuffer.put(("这是一次连接的第" + ++i + "次发送").getBytes());
                    System.out.println("发送！");
                    byteBuffer.flip();
                    while (byteBuffer.hasRemaining()) {
                        socketChannel.write(byteBuffer);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //我理解的BIO的客户端
    public static void test2(){
        int i = 0;
        try {
            Socket socket = new Socket();
            socket.connect(new InetSocketAddress("127.0.0.1", 8080));
            while (true) {
                OutputStream outputStream = socket.getOutputStream();
                TimeUnit.SECONDS.sleep(1);
                outputStream.write(("这是一次连接的第" + ++i + "次发送").getBytes());
                System.out.println("发送...");
                socket.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
