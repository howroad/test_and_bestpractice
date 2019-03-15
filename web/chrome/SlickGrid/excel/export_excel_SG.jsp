<%@page contentType="text/html;charset=GBK"%>
<%@page import="java.util.regex.Pattern"%>
<%@page import="java.util.regex.Matcher"%>
<jsp:useBean id="xml" scope="session" class="com.nstc.exportkit.excel.ExportExcel"/>
<%

	String name = request.getParameter("name");
	String fileName=name ==null ||"".equals(name)? "EXCEL.xls":name+".xls";
	fileName=java.net.URLEncoder.encode(fileName, "UTF-8");// 编码中文，避免乱码(文件名不能超过17个汉字)
	response.reset();
	response.setContentType( "application/vnd.ms-excel;charset=GBK");
	request.setCharacterEncoding("GBK");
	response.setHeader("Content-disposition","attachment; filename=\"" + fileName + "\"");
	String table = request.getParameter("_ExcelText_");

	table = table.replaceAll("\\*", "200");
	String regex = " on.*?=\".*?\"";
	Pattern p = Pattern.compile(regex,Pattern.CASE_INSENSITIVE);
	Matcher m = p.matcher(table);
	table= m.replaceAll("");
	
	regex = "<font .*?>";
	p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table = m.replaceAll("");
	
	regex = "<input .*?>";
	p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table = m.replaceAll("");
	
	regex = "</font>";
	p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table = m.replaceAll("");	
	
	regex = "linkUrl=\".*?\"";
	p = Pattern.compile(regex,Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table= m.replaceAll("");
	
	regex = "<BR>";
	p = Pattern.compile(regex,Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table= m.replaceAll("");
	
	regex = "<TR.*?>";
	p = Pattern.compile(regex,Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table= m.replaceAll("<TR>");
	
	regex = "hasMnyUnit=\".*?\"";
	p = Pattern.compile(regex,Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table= m.replaceAll("");
	
	regex = "mny=\".*?\"";
	p = Pattern.compile(regex,Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table= m.replaceAll("dataType=\"money\"");
	
	regex = "STYLE=(\'|\").*?(\'|\")";
	p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table = m.replaceAll("");
	
	regex = "TITLE=.{4}";
	p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table = m.replaceAll("");
	table = table.replaceAll("\\$", "\\\\\\$");
	///
	regex = "<SPAN.*?>";
	p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table = m.replaceAll("");
	
	regex = "</SPAN>";
	p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table = m.replaceAll("");
	
	regex = "<LABEL.*?>";
	p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table = m.replaceAll("");
	
	regex = "</LABEL>";
	p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
	m = p.matcher(table);
	table = m.replaceAll("");


	xml.export(table,response.getOutputStream());
%>