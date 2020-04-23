package com.luhao.io.nio;

import com.luhao.io.TestRandomAccessFile;

import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.channels.FileChannel;

/**
 * <p>Title: TestBuffer.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-23 20:22
 */
public class TestBuffer {
    public static void main(String[] args) {
//        test1();
        test2();

    }

    /**
     * capacity 缓冲区数组的总长度
     *
     * position 下一个要操作的数据元素的位置
     *
     * limit  缓冲区数组中不可操作的下一个元素的位置：limit<=capacity
     *
     * mark  用于记录当前position的前一个位置或者默认是-1
     */
    public static void test1() {
        ByteBuffer byteBuffer = ByteBuffer.allocate(1024);
        byteBuffer.put(0, (byte) 1);
        byte[] array = byteBuffer.array();
        System.out.println(array[0]);

        String str = "你好，world！";
        CharBuffer charBuffer1 = CharBuffer.allocate(16);
        charBuffer1.put(str);
        char[] array1 = charBuffer1.array();
        for (char c : array1) {
            System.out.println(c);
        }
    }
    
    public static void test2() {
        RandomAccessFile randomAccessFile = null;
        try {
            randomAccessFile = TestRandomAccessFile.getRAFWithModelRW();
            FileChannel channel = randomAccessFile.getChannel();
            ByteBuffer byteBuffer = ByteBuffer.allocate(10);
            System.out.println(byteBuffer);
//        System.out.println("刚创立：" + byteBuffer.position());
//        System.out.println("刚创立：" + byteBuffer.limit());
//        System.out.println("刚创立：" + byteBuffer.capacity());
            System.out.println("执行mark:用mark来记录当前的position");
            byteBuffer.put(0,(byte)1);
            System.out.println("put了一个值，发现无变化！");
            System.out.println(byteBuffer);
            channel.read(byteBuffer,3);
            System.out.println("读了3个长度,实际上pos到10了");
            System.out.println(byteBuffer);

            byteBuffer.flip();
            System.out.println("执行了flip方法，相当于初始化了！");
            System.out.println(byteBuffer);

            byteBuffer.mark();
            System.out.println("将这个position = 0 到mark中。");

            channel.write(byteBuffer,4);
            System.out.println("写了4个长度,实际上pos到10了");
            System.out.println(byteBuffer);

            byteBuffer.reset();
            System.out.println("执行reset把postion = 0");
            System.out.println(byteBuffer);

            byteBuffer.clear();
            System.out.println("执行了clear,和flip的区别是limit = cap，而flip中limit = pos");
            System.out.println(byteBuffer);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
