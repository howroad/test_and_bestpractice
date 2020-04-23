package com.luhao.io.io;


import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.Reader;
import java.io.Writer;

/**
 * <p>Title: TestIo.java</p>
 * <p>Description:同步、阻塞的IO </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-22 22:55
 */
public class TestIo {

    public static void main(String[] args) {
        //test1();
        //test2();
//        test3();
//        test4();
        test5();
        test6();
    }


    //字节流输入流
    public static void test1() {
        InputStream inputStream = null;
        try {
            inputStream = new FileInputStream(new File("C:/cdwriter--/system.properties"));
            byte[] bytes = new byte[1024];
            int len = 0;
            while ((len = inputStream.read(bytes, 0, 1024)) > 0) {
                System.out.println(new String(bytes, 0, len, "utf8"));
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    //字节流输出流
    public static void test2() {
        String str = "哈喽窝的！";
        String str2 = "哈喽窝的2！";
        OutputStream outputStream = null;
        try {
            outputStream = new FileOutputStream(new File("C:/cdwriter--/system2.properties"));
            byte[] b = str.getBytes("utf8");
            byte[] b2 = str2.getBytes("utf8");
            outputStream.write(b, 0, b.length);
            outputStream.write(b2, 0, b2.length);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (outputStream != null) {
                    outputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    //字符流没啥用的，不好用
    public static void test3() {
        Reader reader = null;
        try {
            reader = new FileReader(new File("C:/cdwriter--/system.properties"));
            char[] chars = new char[1024];
            while ((reader.read(chars, 0, 1024)) > 0) {
                System.out.println(chars);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    //字符输出流
    public static void test4() {
        Writer writer = null;
        String str = "新的字符流输入的内容第一行。";
        String str2 = "新的字符流输入的内容第二行。";
        try {
            writer = new FileWriter(new File("C:/cdwriter--/system2.properties"));
            writer.write(str + "\r\n");
            writer.write(str2 + "\r\n");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    //比较好用的字符输入流
    public static void test5() {
        BufferedReader bufferedReader = null;
        String s = null;
        try {
            bufferedReader = new BufferedReader(new FileReader("C:/cdwriter--/system.properties"));
            while ((s = bufferedReader.readLine()) != null) {
                System.out.println(s);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private static void test6() {
        PrintWriter printWriter = null;
        String str = "牛逼的字符输出流1";
        String str2 = "牛逼的字符输出流2";
        try {
            printWriter = new PrintWriter(new BufferedWriter(new FileWriter("C:/cdwriter--/system2.properties")));
            printWriter.println(str);
            printWriter.println(str2);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (printWriter != null) {
                printWriter.close();
            }
        }
    }

}
