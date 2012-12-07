<%//@ page contentType="text/html;charset=utf-8" %>
<%@ page language="java" pageEncoding="utf-8"%>
<%@include file="./include_jsp/dbconOpen.jsp" %>
<%
	String funName = request.getParameter("callback");
	String type = request.getParameter("type");
	
	if(funName == null){
		funName = "callback";
	}
	if(type == null){
		type = "LOC";
	}

    String sql = " select a.grp_value "
               + "       ,c.* "
               + "   from grp_master a "
               + "       ,grp_org_map b "
               + "       ,org_master c "
               + "  where a.grp_type = '"+type+"' "
               + "    and b.grp_id   = a.grp_id "
               + "    and c.org_id   = b.org_id "
               + " order by  a.grp_order, c.org_nm ";
		

	ResultSet rs = stmt.executeQuery(sql);
	//int totalCnt = rs.getRow(); 
%>
<%=funName%>({"resultList":[
<%
	int i=0;
	while(rs.next()){

		if(i!=0){
			out.print(",");
		}
		i++;
%>
	{ 
		"grp_value": "<%=rs.getString("grp_value") %>", 
		"org_id": "<%=rs.getString("org_id") %>", 
		"org_nm": "<%=rs.getString("org_nm") %>", 
		"org_addr": "<%=rs.getString("org_addr") %>", 
		"org_tel": "<%=rs.getString("org_tel") %>",
		"org_url": "<%=rs.getString("org_url") %>", 
		"org_capa": "<%=rs.getString("org_capa") %>", 
		"org_detail": "<%=rs.getString("org_detail") %>",
		"org_desc": "<%=rs.getString("org_desc") %>" 
	}
	
<%	}%>	
]});

<%@include file="./include_jsp/dbconClose.jsp" %>