package com.luhao.model;

/**
 * <p>Title: StudentWithHashCode.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-04-27 20:49
 */
public class StudentWithHashCode extends Student {
    private int index;
    public StudentWithHashCode() {
    }

    public int hashCode() {
        return index;
    }
}
