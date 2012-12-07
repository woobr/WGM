<%@ page session="false" %>
<%@ page contentType="text/html;charset=utf-8" %>
<%@include file="./include_jsp/dbconOpen.jsp" %>
<%

	String sql = "select id, choice,computerchoice, date_format(datetime, '%Y%m%d') as regdate, judgement from game ";

	ResultSet rs = stmt.executeQuery(sql);


//	String sql = "select addon, is_used, date_format(regdate, '%Y%m%d') as regdate from xe_addons where is_used = 'Y' ";
%>
<!DOCTYPE html>

<html >
    <head>
        <title>sss</title>
        <link href="favicon.ico" rel="icon" type="image/x-icon" />
        <link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="tomcat.css" rel="stylesheet" type="text/css" />
        <meta charset="UTF-8">
    </head>

    <body>

<%
	while(rs.next()){
		
		out.print(rs.getString("id"));
		out.print(" || ");
		out.print(rs.getString("choice"));
		out.print(" || ");
		out.print(rs.getString("computerchoice"));
		out.print(" || ");
		out.print(rs.getString("regdate"));
		out.print(" || ");
		out.print(rs.getString("judgement"));
		out.print("<br>");
	
	}
%>
    </body>

</html>

<%@include file="./include_jsp/dbconClose.jsp" %>