package com.luhao.oracle;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class DBUtil {

    public static void main(String[] args) {
        List<List<Object>> query = query("select * from nsclient");
        System.out.println(query);
    }
    
    private static Connection conn;
    static {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public static Connection getConn(){
        if(conn == null){
            try {
                conn = DriverManager.getConnection("jdbc:oracle:thin:@192.168.20.35:1521:sas", "SPIC1204", "123456");
            } catch (SQLException e) {
                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
            }
        }
        return conn;
    }
    public static void closeConn(){
        validateConn();
        try {
            conn.close();
            conn = null;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }
    public static PreparedStatement newPreparedStatement(String sql){
        PreparedStatement pre = null;
        try {
            pre = getConn().prepareStatement(sql);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
        return pre;
    }
    public static void closePreparedStatement(PreparedStatement preparedStatement){
        validateConn();
        if(preparedStatement != null){
            try {
                preparedStatement.close();
                preparedStatement = null;
            } catch (SQLException e) {
                throw new RuntimeException(e.getMessage());
            }
        }
    }
    private static ResultSet getResult(String sql,Object... objs){
        ResultSet resultSet = null;
        try {
            PreparedStatement preparedStatement = newPreparedStatement(sql);
            for (int i = 0; i < objs.length; i++) {
                preparedStatement.setObject(i + 1, objs[i]);
            }
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage());
        }
        return resultSet;
    }

    public static void closeResultset(ResultSet resultset){
        validateConn();
        if(resultset != null){
            try {
                resultset.close();
                resultset = null;
            } catch (SQLException e) {
                throw new RuntimeException(e.getMessage());
            }
        }
    }
    private static void validateConn(){
        if(conn == null){
            throw new RuntimeException("连接已经被关闭！");
        }
    }

    public static List<List<Object>> query(String sql,Object...objs){
        List<List<Object>> resultList = new ArrayList<List<Object>>();
        ResultSet result = getResult(sql, objs);
        try {
            int count = result.getMetaData().getColumnCount();
            while (result.next()) {
                List<Object> list = new ArrayList<Object>();
                for (int i = 0; i < count; i++) {
                    list.add(result.getObject(i + 1));
                }
                resultList.add(list);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage());
        } finally {

        }
        return resultList;
    }

}
