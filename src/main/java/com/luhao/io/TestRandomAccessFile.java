package com.luhao.io;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

/**
 * <p>Title: TestRandomAccessFile.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-23 19:20
 */
public class TestRandomAccessFile {


    private static final String url = "C:/cdwriter--/system.properties";
    /**
     * r	以只读的方式打开文本，也就意味着不能用write来操作文件
     * rw	读操作和写操作都是允许的
     * rws	每当进行写操作，同步的刷新到磁盘，刷新内容和元数据
     * rwd	每当进行写操作，同步的刷新到磁盘，刷新内容
     */
    private static final String [] model = {"r","rw","rws","rwd"};

    public static RandomAccessFile getRAFWithModelR() throws FileNotFoundException {
        RandomAccessFile raf = new RandomAccessFile(new File(url), model[0]);
        return raf;
    }

    public static RandomAccessFile getRAFWithModelRW() throws FileNotFoundException {
        RandomAccessFile raf = new RandomAccessFile(new File(url), model[1]);
        return raf;
    }

    public static RandomAccessFile getRAFWithModelRWS() throws FileNotFoundException {
        RandomAccessFile raf = new RandomAccessFile(new File(url), model[2]);
        return raf;
    }

    public static RandomAccessFile getRAFWithModelRWD() throws FileNotFoundException {
        RandomAccessFile raf = new RandomAccessFile(new File(url), model[3]);
        return raf;
    }


    public static void main(String[] args) {
//        test1();
//        test2();
        test3();
    }


    public static void test1() {

        try {
            RandomAccessFile randomAccessFile = getRAFWithModelRW();
            FileChannel channel = randomAccessFile.getChannel();
            ByteBuffer byteBuffer = ByteBuffer.allocate(16);
            int length = 0;
            while ((length = channel.read(byteBuffer)) > 0) {
                System.out.write(byteBuffer.array(), 0 , length);
                byteBuffer.flip();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void test2() {
        try {
            RandomAccessFile randomAccessFile = getRAFWithModelRW();
            System.out.println("文本内容长度length:" + randomAccessFile.length());
            System.out.println("文本头指针:" + randomAccessFile.getFilePointer());
            //指定光标位置
            randomAccessFile.seek(3);
            System.out.println("文本头指针:" + randomAccessFile.getFilePointer());

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void test3() {
        try {
            RandomAccessFile randomAccessFile = getRAFWithModelRW();
            byte[] bytes = new byte[(int) randomAccessFile.length()];
            randomAccessFile.readFully(bytes);
            System.out.write(bytes);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
        }
    }
}
