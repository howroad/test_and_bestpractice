package com.luhao.innerClass.demo002;

/**
 * <p>Title: Test.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-01 15:54
 */
public class Test {
    public static void main(String[] args) {
        MyList myList = new MyList("你好","我好","大家好！");
        MyIterate myIterate = myList.getIterate();
        while(myIterate.hasNext()){
            System.out.println(myIterate.next());
        }
    }
}
