package com.luhao.io.nio.diff;

import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.util.concurrent.TimeUnit;

/**
 * <p>Title: NioClient.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-24 15:10
 */
public class NioClient {
    public static void main(String[] args) {
        new Thread(BioServer::server).start();
        new Thread(() -> client(1, true)).start();
        new Thread(() -> client(2, false)).start();
        new Thread(() -> client(3, false)).start();
    }

    /**
     * 客户端
     * @param i 第几个
     * @param isBlock 客户端是否阻塞
     */
    public static void client(int i, boolean isBlock) {
        try {
            ByteBuffer byteBuffer = ByteBuffer.allocate(1024);
            ByteBuffer readBuffer = ByteBuffer.allocate(1024);
            SocketChannel socketChannel = SocketChannel.open();
            socketChannel.connect(new InetSocketAddress("127.0.0.1", 8080));
            //改成true的时候，socketChannel的read方法将会阻塞，程序无法进行下一步，所以要在read那里进行判断跳出循环
            //改成flase的时候，就可以继续进行了
            //blocking说的是read方法
            socketChannel.configureBlocking(isBlock);
            int num = 0;
            if (socketChannel.finishConnect()) {

                //发送5条消息
                while (num < 5) {

                    String msg = String.format("这是第%d个客户端的第%d条消息。", i, ++num);
                    byte[] bytes = msg.getBytes();
                    byteBuffer.clear();
                    byteBuffer.put(bytes);
                    byteBuffer.flip();
                    System.out.println("[客户端" + i + "发送消息]：" + msg);
                    //1024足够大了，不进行byteBuffer.remaining()判断循环写入了
                    socketChannel.write(byteBuffer);

                    //让read有机会读取到服务器返回，不然非阻塞情况下很容易直接就跳过了最后一条
                    TimeUnit.SECONDS.sleep(1);

                    //读取服务端消息
                    int len = 0;
                    //这个NIO的read方法没有进行阻塞，是一直接收着的，如果阻塞了，是无法继续下一步的
                    readBuffer.clear();
                    while ((len = socketChannel.read(readBuffer)) > 0) {
                        System.out.println("[客户端" + i + "接收消息]：" + new String(readBuffer.array(), 0, len));
                        readBuffer.flip();

                        // 非阻塞的可以不用跳出
                        if (isBlock && len < readBuffer.capacity()) {
                            break;
                        }
                    }


                }


            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
