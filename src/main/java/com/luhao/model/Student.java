package com.luhao.model;
/**
 * <p>Title: Student.java</p>
 *
 * <p>Description: </p>
 *
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * 
 * @since：2019年5月9日 下午3:14:38
 * 
 */
public class Student {
    private String studentName;
    private Integer studentAge;
    private Double studentAmount;
    private Teacher studentTeacher;
    public String getStudentName() {
        return studentName;
    }
    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
    public Integer getStudentAge() {
        return studentAge;
    }
    public void setStudentAge(Integer studentAge) {
        this.studentAge = studentAge;
    }
    public Double getStudentAmount() {
        return studentAmount;
    }
    public void setStudentAmount(Double studentAmount) {
        this.studentAmount = studentAmount;
    }
    public Teacher getStudentTeacher() {
        return studentTeacher;
    }
    public void setStudentTeacher(Teacher studentTeacher) {
        this.studentTeacher = studentTeacher;
    }
    public Student(String studentName, Integer studentAge, Double studentAmount, Teacher studentTeacher) {
        super();
        this.studentName = studentName;
        this.studentAge = studentAge;
        this.studentAmount = studentAmount;
        this.studentTeacher = studentTeacher;
    }
    public String toString() {
        return "Student [studentName=" + studentName + ", studentAge=" + studentAge + ", studentAmount=" + studentAmount
                + ", studentTeacher=" + studentTeacher + "]";
    }
    
}
