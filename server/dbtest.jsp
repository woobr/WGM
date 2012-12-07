<%//@ page contentType="text/html;charset=utf-8" %>
<%@ page language="java" pageEncoding="utf-8"%>
<%@include file="./include_jsp/dbconOpen.jsp" %>
<%
String funName = request.getParameter("serverKey");

if(funName == null){
	
	funName = "callback";
}

	String sql = "select id, choice,computerchoice, date_format(datetime, '%Y%m%d') as regdate, judgement from game ";

	ResultSet rs = stmt.executeQuery(sql);
	//int totalCnt = rs.getRow(); 
%>
<%=funName%>([
<%
	int i=0;
	while(rs.next()){

		if(i!=0){
			out.print(",");
		}
		i++;
%>
	{ 
		"id": "<%=rs.getString("id") %>", 
		"choice": "<%=rs.getString("choice") %>", 
		"computerchoice": "<%=rs.getString("computerchoice") %>" 
		"regdate": "<%=rs.getString("regdate") %>" 
		"judgement": "<%=rs.getString("judgement") %>" 
	}
	
<%	}%>	
]);

<%@include file="./include_jsp/dbconClose.jsp" %>