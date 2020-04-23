package com.luhao.io.nio;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * <p>Title: TestNio.java</p>
 * <p>Description: 同步，非阻塞</p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-22 23:39
 */
public class TestNioFile {
    public static void main(String[] args) {
//        test1();
        //test2();
        test4();
    }


    /**
     * 字节缓存读取
     */
    public static void test1() {
        FileInputStream fileInputStream = null;
        try {
            fileInputStream = new FileInputStream("C:/cdwriter--/system2.properties");
            FileChannel channel = fileInputStream.getChannel();
            ByteBuffer byteBuffer = ByteBuffer.allocate(64);
            int read;
            while ((read = channel.read(byteBuffer)) > 0) {
                System.out.print(new String(Arrays.copyOf(byteBuffer.array(), read)));
                byteBuffer.flip();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fileInputStream != null) {
                try {
                    fileInputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    public static void test2() {
        String filename = "C:/cdwriter--/system3.properties";
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(new File(filename));
            FileChannel channel = fos.getChannel();
            // StandardCharsets.UTF_8 代替Chaset.forName
            ByteBuffer byteBuffer = StandardCharsets.UTF_8.encode("你好你好你好你好你好我也好大家好大家好大家好大家好大家好！");
            // 字节缓冲的容量和limit会随着数据长度变化，不是固定不变的
            System.out.println("初始化容量和limit：" + byteBuffer.capacity() + ","
                    + byteBuffer.limit());
            int length;
            while ((length = channel.write(byteBuffer)) != 0) {
                /*
                 * 注意，这里不需要clear，将缓冲中的数据写入到通道中后 第二次接着上一次的顺序往下读
                 */
                System.out.println("写入长度:" + length);
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static void test3() {
        File outFile = new File("C:/cdwriter--/out.properties");
        File inFile = new File("C:/cdwriter--/in.properties");
        BufferedReader bufferedReader;
        PrintWriter printWriter;
        try {
            bufferedReader = new BufferedReader(new FileReader(inFile));
            printWriter = new PrintWriter(new FileWriter(outFile));
            //字符流没有对应的管道
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
        }
    }

    /**
     * 用nio复制文件
     */
    public static void test4() {
        File outFile = new File("C:\\Users\\Administrator\\Desktop\\流的分类2.png");
        File inFile = new File("C:\\Users\\Administrator\\Desktop\\流的分类.png");
        FileInputStream fileInputStream = null;
        FileOutputStream fileOutputStream = null;
        try {
            fileInputStream = new FileInputStream(inFile);
            fileOutputStream = new FileOutputStream(outFile, false);
            FileChannel inputStreamChannel = fileInputStream.getChannel();
            FileChannel outputStreamChannel = fileOutputStream.getChannel();
            ByteBuffer byteBuffer = ByteBuffer.allocate(64);
            while (inputStreamChannel.read(byteBuffer) > 0) {
                byteBuffer.flip();
                outputStreamChannel.write(byteBuffer);
                byteBuffer.flip();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fileInputStream != null) {
                try {
                    fileInputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (fileOutputStream != null) {
                try {
                    fileOutputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

}
