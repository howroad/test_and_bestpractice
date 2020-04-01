package com.luhao.innerClass;

/**
 * <p>Title: OuterClass.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-01 13:53
 */
public class OuterClass {
    private Integer id = 0;
    private String name = "外部类名称";
    public class InnerClass {
        private Integer id = 1;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }
        public void test(){
            System.out.println(this.id);
            System.out.println(OuterClass.this.id);//内部类访问外部类同名变量
            System.out.println(name);
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}
