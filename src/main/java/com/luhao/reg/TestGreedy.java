package com.luhao.reg;

/**
 * <p>Title: TestGreedy.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-02 20:07
 */
public class TestGreedy {
    public static void main(String[] args) {
        //Greedy 默认贪婪匹配 先匹配所有，然后从右边开始回溯（吐出）
        //Reluctant 懒惰 ?? *? +? {n}? {n,m}? {n,}? 从左边一个一个进行匹配，直到读完
        //possessive 独占 效率最高 ?+ *+ ++ {n}+ {n,}+ {n,m}+ 一次读取所有字符串进行匹配

        String Greedy = "abbbbc".replaceAll("b+b", "x"); // axc

        String Reluctant = "abbbbc".replaceAll("b+?b", "x"); // axxc

        String Possessive = "abbbbc".replaceAll("b++b", "x"); // abbbbc

        System.out.println(Greedy);
        System.out.println(Reluctant);
        System.out.println(Possessive);
    }
}
