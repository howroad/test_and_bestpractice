<%@ page language="java" contentType="text/html; charset=GB2312"   pageEncoding="UTF-8"%>
<jsp:useBean id="xml" scope="session" class="com.nstc.exportkit.excel.ExportExcel"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
    String path = request.getContextPath();   
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path ;    
	String fileName="EXCEL";
	//response.setContentType( "application/vnd.ms-excel;charset=GB2312");
	response.setContentType("application/x-download");    
	response.setHeader("Content-disposition","attachment; filename=\"" + fileName + ".xls\"");
	String table_data = request.getParameter("table_data");//从上个页面（需要导出数据的页面）取得<table>…</table>之间的字符串

	xml.export(table_data,response.getOutputStream());//调用导出方法，完成excel的导出工作
%>
