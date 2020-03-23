package com.luhao.path;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

/**
 * <p>Title: TestPath.java</p>
 * <p>Description: java获取文件路径的各种方法</p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-03-23 11:25
 */

/**
 * 	返回	空参数	“/”参数	相对路径写法	绝对路径写法classLoader的不加/	是否可以获得文件	是否可以获得文件夹
 * TestPath.class.getResource("")	URL	当前类所在的目录	classes目录	"1.txt"	"/com/luhao/path/1.txt"	可以	可以
 * TestPath.class.getClassLoader().getResource("");	URL	classes目录	null	无	"com/luhao/path/1.txt"	可以	可以
 * Class.class.getResourceAsStream()	InputStream	null	null	"1.txt"	"/com/luhao/path/1.txt"	可以	虽然能得到但不能用
 * TestPath.class.getClassLoader().getResourceAsStream()	InputStream	classes目录的ins	null	无	"com/luhao/path/1.txt"	可以	虽然能得到但不能用
 * System.getProperty("user.dir");	String,获得工程目录						
 * System.getProperty("java.class.path")	String，获得classPath路径
 * new File("").getCanonicalPath();	工程目录
 */
public class TestPath {

    //总结方法一共以下：
    // TestPath.class.getResource(""); 带/是classes路径，不带是当前类所在的包路径
    // TestPath.class.getClassLoader().getResource(""); 没有带/的写法，直接进入classes路径
    // System.out.println(System.getProperty("user.dir")); 工程目录
    // System.out.println(System.getProperty("java.class.path")); 所有的classpath目录
    // Class.class.getResourceAsStream("/com/luhao/path/TestPath.class"); 从classes目录取
    // TestPath.class.getResourceAsStream("1.txt"); 相对路径


    public static void main(String[] args) {
        testClassgetResource();
        testClassLoaderGetResource();
        testClassGetResourceAsStream();
        testClassLoderGetResourceAsStream();
        String property = System.getProperty("user.dir");
        String property1 = System.getProperty("java.class.path");
        System.out.println(property); //工程目录
        System.out.println(property1); //所有的classpath目录
        try {
            String canonicalPath = new File("").getCanonicalPath();
            System.out.println(canonicalPath);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private static void testClassgetResource(){
        System.out.println("-TestPath.class.getResource(\"\")-");
        URL resource = TestPath.class.getResource("/com/luhao/path/1.txt");//带/是classes路径，不带是当前类所在的包路径
        System.out.println(resource.getPath());
        URL resource1 = TestPath.class.getResource("1.txt");//带/是classes路径，不带是当前类所在的包路径
        System.out.println(resource1.getPath());
        URL resource2 = TestPath.class.getResource("");//带/是classes路径，不带是当前类所在的包路径
        System.out.println(resource2.getPath());
        URL resource3 = TestPath.class.getResource("/");//带/是classes路径，不带是当前类所在的包路径
        System.out.println(resource3.getPath());
        System.out.println("-TestPath.class.getResource(\"\")end-");
    }

    public static void testClassLoaderGetResource(){
        System.out.println("testClassLoaderGetResource--start");
        URL resource001 = TestPath.class.getClassLoader().getResource("");
        System.out.println(resource001.getPath());
        URL resource002 = TestPath.class.getClassLoader().getResource("/");
        System.out.println(resource002);
        URL resource003 = TestPath.class.getClassLoader().getResource("com/luhao/path/1.txt");
        System.out.println(resource003);
        URL resource004 = TestPath.class.getClassLoader().getResource("com/luhao/path");
        System.out.println(resource004);
    }

    public static void testClassGetResourceAsStream(){
        System.out.println("astream--");
        System.out.println(Class.class.getResourceAsStream(""));//null
        System.out.println(Class.class.getResourceAsStream("/"));//null
        System.out.println(Class.class.getResourceAsStream("1.txt"));
        InputStream ins = Class.class.getResourceAsStream("/com/luhao/path/TestPath.class");//从classes目录取
        InputStream ins2 = Class.class.getResourceAsStream("/com/luhao/path");//从classes目录取
        System.out.println(ins);
        byte[] ints = new byte[1024];
        try {
            while(-1 != ins2.read(ints)){
                System.out.println(new String(ints));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("astream--");
    }


    public static void testClassLoderGetResourceAsStream(){
        System.out.println("loder--astream--");
        System.out.println(TestPath.class.getClassLoader().getResourceAsStream(""));
        System.out.println(TestPath.class.getClassLoader().getResourceAsStream("/"));//null
        System.out.println(TestPath.class.getClassLoader().getResourceAsStream("com/luhao/path/1.txt"));
        InputStream ins = TestPath.class.getClassLoader().getResourceAsStream("com/luhao/path/TestPath.class");//从classes目录取
        InputStream ins2 = TestPath.class.getClassLoader().getResourceAsStream("com/luhao/path");//从classes目录取
        System.out.println(ins);
        byte[] ints = new byte[1024];
        try {
            while(-1 != ins2.read(ints)){
                System.out.println(new String(ints));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("astream--");
    }

    public static void test1() {

        File f = new File(TestPath.class.getResource("/").getPath());
        System.out.println(f);//E:\Project\test_and_bestpractice\target\classes

        File f2 = new File(TestPath.class.getResource("").getPath());
        System.out.println(f2);//E:\Project\test_and_bestpractice\target\classes\com\luhao\path
    }

    public static void test2() {
        File directory = new File("");//参数为空
        String courseFile = null;
        try {
            courseFile = directory.getCanonicalPath();
            System.out.println(courseFile);//E:\Project\test_and_bestpractice
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void test3() {
        URL xmlpath0 = TestPath.class.getClassLoader().getResource("");
        System.out.println(xmlpath0);
        URL xmlpath1 = TestPath.class.getClassLoader().getResource("/");
        System.out.println(xmlpath1);
        URL xmlpath = TestPath.class.getClassLoader().getResource("com/luhao/path/TestPath.class");
        System.out.println(xmlpath);//file:/E:/Project/test_and_bestpractice/target/classes/com/luhao/path/TestPath.class
    }

    public static void test4() {
        System.out.println(System.getProperty("user.dir")); //E:\Project\test_and_bestpractice
    }

    public static void test5() {
        System.out.println(System.getProperty("java.class.path"));//classpath 一大堆，所有的classPath
    }

    public static void test6() {
        InputStream ins = Class.class.getResourceAsStream("/com/luhao/path/TestPath.class");
        System.out.println(ins);
    }

    public static void test7() {
        InputStream ins = TestPath.class.getResourceAsStream("1.txt");
        System.out.println(ins);
    }
}
