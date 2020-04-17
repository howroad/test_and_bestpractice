package com.luhao.EJB;

/**
 * <p>Title: TestEJB.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-17 14:01
 */
public class TestEJB {

    public static void main(String[] args) {

        /**
         * EJB 就是将那些"类"放到一个服务器上，用C/S 形式的软件客户端对服务器上的"类"进
         * 行调用。
         * https://blog.csdn.net/kouzhaokui/article/details/89176541
         */

    }

    /**
     EJB是的Enterprise Java Beans技术的简称, 又被称为企业Java Beans。
     这种技术最早是由美国计算公司研发出来的。
     EJB技术的诞生标志着Java Beans的运行正式从客户端领域扩展到服务器领域。
     在电子商务领域运用EJB技术可以简化应用系统的开发, 这是由该技术的结构和特点所决定的
     * */
    /**
     * EJB容器可以接收3种EJB：会话Bean、实体Bean、消息驱动Bean
     * */
    public static void test1(){

    }
    /*
4.2 EJB 的实现技术
EJB 是运行在独立服务器上的组件，客户端是通过网络对EJB 对象进行调用的。在Java
中，能够实现远程对象调用的技术是RMI，而EJB 技术基础正是RMI。通过RMI 技术，J2EE
将EJB 组件创建为远程对象，客户端就可以通过网络调用EJB 对象了。
Remote Method Invocation 远程方法调用

总结：

a.EJB实现原理： 就是把原来放到客户端实现的代码放到服务器端，并依靠RMI进行通信。

b.RMI实现原理 ：就是通过Java对象可序列化机制实现分布计算。

c.服务器集群： 就是通过RMI的通信，连接不同功能模块的服务器，以实现一个完整的功能。
    * */
}
