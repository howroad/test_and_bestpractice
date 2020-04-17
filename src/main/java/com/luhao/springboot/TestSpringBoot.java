package com.luhao.springboot;

/**
 * <p>Title: TestSpringBoot.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * 原文链接：https://blog.csdn.net/m0_37106742/article/details/64438892
 * @author luhao
 * @since 2020-04-17 14:07
 */
public class TestSpringBoot {
    /**
     Spring 诞生时是 Java 企业版（Java Enterprise Edition，JEE，也称 J2EE）的
     轻量级代替品。无需开发重量级的 Enterprise JavaBean（EJB），Spring 为企业级
     Java 开发提供了一种相对简单的方法，通过依赖注入和面向切面编程，用简单的Java 对象（Plain Old Java Object，POJO）实现了 EJB 的功能。
     虽然 Spring 的组件代码是轻量级的，但它的配置却是重量级的。

     第一阶段：xml配置

     在Spring 1.x时代，使用Spring开发满眼都是xml配置的Bean，随着项目的扩大，我们需要把xml配置文件放到不同的配置文件里，那时需要频繁的在开发的类和配置文件之间进行切换

     第二阶段：注解配置

     在Spring 2.x 时代，随着JDK1.5带来的注解支持，Spring提供了声明Bean的注解（例如@Component、@Service），大大减少了配置量。主要使用的方式是应用的基本配置（如数据库配置）用xml，业务配置用注解

     第三阶段：java配置

     Spring 3.0 引入了基于 Java 的配置能力，这是一种类型安全的可重构配置方式，可以代替 XML。我们目前刚好处于这个时代，Spring4.x和Spring Boot都推荐使用Java配置。

     所有这些配置都代表了开发时的损耗。 因为在思考 Spring 特性配置和解决业务问题之间需要进行思维切换，所以写配置挤占了写应用程序逻辑的时间。除此之外，项目的依赖管理也是件吃力不讨好的事情。决定项目里要用哪些库就已经够让人头痛的了，你还要知道这些库的哪个版本和其他库不会有冲突，这难题实在太棘手。并且，依赖管理也是一种损耗，添加依赖不是写应用程序代码。一旦选错了依赖的版本，随之而来的不兼容问题毫无疑问会是生产力杀手。

      

     Spring Boot 让这一切成为了过去。

     Spring Boot 简化了基于Spring的应用开发，只需要“run”就能创建一个独立的、生产级别的Spring应用。
     Spring Boot为Spring平台及第三方库提供开箱即用的设置（提供默认设置），这样我们就可以简单的开始。
     多数Spring Boot应用只需要很少的Spring配置。

     我们可以使用SpringBoot创建java应用，并使用java –jar 启动它，或者采用传统的war部署方式。

      

     Spring Boot 主要目标是：

     1 为所有 Spring 的开发提供一个从根本上更快的入门体验

     2 开箱即用，但通过自己设置参数，即可快速摆脱这种方式。

     3 提供了一些大型项目中常见的非功能性特性，如内嵌服务器、安全、指标，健康检测、外部化配置等

     4 绝对没有代码生成，也无需 XML 配置


     2. Spring Boot 入门

     2.1. 环境准备
     数据库：MySQL
     Spring-Boot：1.4.4
     Maven： 3.3.3 （官方声明1.4.4版本需要Maven 3.2+）
     本地仓库：需要使用资料中的仓库
     2.2.1. 创建一个Maven工程
     2.2.2. 添加依赖

     * */
}
