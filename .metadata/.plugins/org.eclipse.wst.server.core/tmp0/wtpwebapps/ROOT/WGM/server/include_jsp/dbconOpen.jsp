<%@ page import="java.sql.*" %>
<%
	String dbUrl = "jdbc:mysql://14.63.226.13:3306/okwp"; 
	Class.forName("com.mysql.jdbc.Driver");
	Connection conn = DriverManager.getConnection(dbUrl, "okuser","okpass");
	
	Statement stmt = conn.createStatement();

%>