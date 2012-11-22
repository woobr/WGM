
var moveMain ;
var totcnt;
var imgNum;
var resultList;

var score=0;
var question=['질문1','질문2','질문3','질문4'];
var idxStatus = 0;
function goMain() {
	$.mobile.changePage("#main") ;  //, "pop", false,false
}
function tapZero(){
	
}
$(function(){
	
	//메인화면 버튼 이벤트
	$ ("#btnNoti").bind( "tap" , function(event){
		$.mobile.changePage("#org_list" ) ;
	});	
	$ ("#btnCheck").bind( "tap" , function(event){
		$.mobile.changePage("#check" ) ;
	});	
	$ ("#btnOrg").bind( "tap" , function(event){
		getTypeList("LOC");	
		$.mobile.changePage("#org_list" ) ;
	});	
	$ ("#aHomeOrgCheck").bind( "tap" , function(event){
		$.mobile.changePage("index.html" ) ;
	});	

	//기관목록 버튼 이벤트
	$ ("#liLoc").bind( "tap" , function(event){
		getTypeList("LOC");	
	});	
	$ ("#liPay").bind( "tap" , function(event){
		getTypeList("PAY");
	});	
	$ ("#liTyp").bind( "tap" , function(event){
		getTypeList("TYP");
	});	
	$ ("#liLang").bind( "tap" , function(event){
		getTypeList("LANG");
	});
	
	//홈버튼 이벤트
/*
	$ ("#aHomeOrgList").bind( "tap" , function(event){
		goMain();
	});	
*/	
	$ ("#aHomeOrgDetail").bind( "tap" , function(event){
		goMain();
	});	
	$ ("#aHomeOrgDetailF").bind( "tap" , function(event){
		goMain();
	});	
	$ ("#aListOrgDetail").bind( "tap" , function(event){
		$.mobile.changePage("#org_list" ) ;
	});	

	//번호 클릭 이벤트
	
	$ ("#TabZero").bind( "tap" , function(event){
		tapZero();
		nextRead();
	});	
	$ ("#TabOne").bind( "tap" , function(event){
		tapOne();
		readNext();
	});	
	$ ("#TabTow").bind( "tap" , function(event){
		tapTow();
		readNext();
	});	
	$ ("#TabNine").bind( "tap" , function(event){
		tapNine();
		readNext();
	});
	
	//테스트 화면이동
	$ ("#toTest").bind( "tap" , function(event){
		alert("sdjdj");
		idxStatus= 0;
		score=0;
		$.mobile.changePage("#test" ) ;
		readNext();
	});	
	
});

function tapZero(){
	
	
}

function readNext(){
	idxStatus++;
	var ques = question[idxStatus];
	$('#checkContents').html("<h3>"+ques+"</h3>");
}

function getTypeList(type){
/*	
	var jqxhr = $.ajax( "http://14.63.226.13/server/org_list.jsp?type="+type )
    .done(function() { alert("success"); })
    .fail(function() { alert("error"); })
    .always(function() { alert("complete"); });
*/	
    $.ajax({
        type: "GET",
        url: "http://14.63.226.13/server/org_list.jsp?type="+type,
        dataType: "jsonp",
        crossDomain: true,
        jsonp: "callback",
        timeout: 2000,
        error: function(jqXHR, textStatus, errorThrown) {   
            //alert('Error Message: '+textStatus);
            //alert('HTTP Error: '+errorThrown);
			var list_html_err = "<ul data-role=\"listview\" data-inset=\"true\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\" >" +
			                    "<li align=\"center\">서버로부터 목록을 가져오지 못했습니다.</li>" +
			                    "</ul>";
  
			$('#typ_list').html(list_html_err);  
        },
        success: function (json) {
        	var list_html = "";
    		var detail_html = "";

    		resultList = json.resultList;
    		totcnt = json.resultList.length;
    		var grpValue = "";
			var idxChk =0;
			for (var i = 0; i < totcnt; i++) {
				
				var result = resultList[i];
				if(grpValue == "" || grpValue != result.grp_value ){
					if(idxChk==0){
						list_html += "<li data-role=\"list-divider\"  role=\"heading\" class=\"ui-li ui-li-divider ui-btn ui-bar-b ui-corner-top ui-btn-up-undefined\" >"+result.grp_value+"</li>";
					}
					else{
						list_html += "<li data-role=\"list-divider\"  role=\"heading\" class=\"ui-li ui-li-divider ui-btn ui-bar-b ui-btn-up-undefined\" >"+result.grp_value+"</li>";
					}
					idxChk++;
				}
				list_html += "<li class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-d\">" +
							 "<div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\">" +
				             "<a href=\"javascript\:getTypeDetail('" + i + "')\"  class=\"ui-link-inherit\">"+ result.org_nm +"</a>" +
				             "</div><span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"></span></div></li>"
				             ;
			}
			list_html = "<ul data-role=\"listview\" data-inset=\"true\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\" >" +
						list_html +
						"</ul>";
			$('#typ_list').html(list_html);    		
        }
    });
/*	
	$.getJSON("http://14.63.226.13/server/org_list.jsp?type="+type, "callback=?", function(json) {
		var list_html = "";
		var detail_html = "";

		resultList = json.resultList;

		totcnt = json.resultList.length;
		
		if(totcnt ==0){
			$('#typ_list').html("<p align=\"center\">목록을 가져오지 못했습니다.</p>");
		}
		else{
			var grpValue = "";
			var idxChk =0;
			for (var i = 0; i < totcnt; i++) {
				
				var result = resultList[i];
				if(grpValue == "" || grpValue != result.grp_value ){
					if(idxChk==0){
						list_html += "<li data-role=\"list-divider\"  role=\"heading\" class=\"ui-li ui-li-divider ui-btn ui-bar-b ui-corner-top ui-btn-up-undefined\" >"+result.grp_value+"</li>";
					}
					else{
						list_html += "<li data-role=\"list-divider\"  role=\"heading\" class=\"ui-li ui-li-divider ui-btn ui-bar-b ui-btn-up-undefined\" >"+result.grp_value+"</li>";
					}
					idxChk++;
				}
				list_html += "<li class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-d\">" +
							 "<div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\">" +
				             "<a href=\"javascript\:getTypeDetail('" + i + "')\"  class=\"ui-link-inherit\">"+ result.org_nm +"</a>" +
				             "</div><span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"></span></div></li>"
				             ;
			}
			list_html = "<ul data-role=\"listview\" data-inset=\"true\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\" >" +
						list_html +
						"</ul>";
			$('#typ_list').html(list_html);
		}
		
	});
*/

}

function getTypeDetail(idx){
//	alert(resultList[idx].org_nm);
	
	$('#dvOrgNm').html("<h3>"+resultList[idx].org_nm+"</h3>");
	$('#fOrgAddr').attr('value', resultList[idx].org_addr);
	$('#fOrgTel').attr('value', resultList[idx].org_tel);
	$('#fOrgUrl').attr('href', resultList[idx].org_url);
	$('#dvOrgUrlIn').html(resultList[idx].org_url);
	$('#fOrgCapa').attr('value', resultList[idx].org_capa);
	$('#fOrgDetail').attr('value', resultList[idx].org_detail);
	$('#fOrgDesc').attr('value', resultList[idx].org_desc);
	$('#btnOrgCall').attr('href', "tel:"+resultList[idx].org_tel);
	
	$.mobile.changePage("#org_detail","slide",true,true) ;
}
