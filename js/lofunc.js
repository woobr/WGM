
var totcntLoc;    
var resultListLoc;
var totcntPay;
var resultListPay;
var totcntTyp;
var resultListTyp;
var totcntLang;
var resultListLang;

//----------------------------------------------------------------------
//이벤트 처리
//----------------------------------------------------------------------
$(function(){
	
	//메인화면 버튼 이벤트
	$ ("#btnNoti").bind( "tap" , function(event){
		$.mobile.changePage("#noti" ) ;
	});		
	$ ("#btnOrg").bind( "tap" , function(event){
		getTypeList("LOC");	
		$.mobile.changePage("#org_list" ) ;
	});	
	$ ("#aHomeOrgCheck").bind( "tap" , function(event){
		$.mobile.changePage("#main" ) ;
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
	$ ("#aHomeOrgDetail").bind( "tap" , function(event){
		goMain();
	});		
	
});

//----------------------------------------------------------------------
//화면 이동 (메인화면)
//----------------------------------------------------------------------
function goMain() {
	$.mobile.changePage("#main") ;  //, "pop", false,false
}

//----------------------------------------------------------------------
//기관목록 내용 세팅
//----------------------------------------------------------------------
function setOrgList(list, count, type){
	
	var list_html = "";
	var grpValue = "";
	var idxChk =0;
	
	for (var i = 0; i < count; i++) {
		
		var result = list[i];
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
		             "<a href=\"javascript\:getTypeDetail('" + i + "','" + type + "')\"  class=\"ui-link-inherit\">"+ result.org_nm +"</a>" +
		             "</div><span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"></span></div></li>"
		             ;
	}
	list_html = "<ul data-role=\"listview\" data-inset=\"true\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\" >" +
				list_html +
				"</ul>";
	$('#typ_list').html(list_html);    	
}

//----------------------------------------------------------------------
//기관조회구분 별 목록처리
//----------------------------------------------------------------------
function getTypeList(type){
	//받아온 데이터가 있을경우 해당 데이터를 재사용하고 리턴
	switch(type){
		case "LOC": 
			if(resultListLoc !=null){
				setOrgList(resultListLoc, totcntLoc,type);
				return;
			}
		break;
		case "PAY": 
			if(resultListPay !=null){
				setOrgList(resultListPay, totcntPay,type);
				return;
			}		
		break;
		case "TYP": 
			if(resultListTyp !=null){
				setOrgList(resultListTyp, totcntTyp,type);
				return;
			}
		break;
		case "LANG": 
			if(resultListLang !=null){
				setOrgList(resultListLang, totcntLang,type);
				return;
			}
		break;
		
	}
	
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
        	//ajax로부터 읽어온 데이터를 세팅함
        	switch(type){
    		case "LOC": 
    			resultListLoc = json.resultList;
    			totcntLoc =  json.resultList.length;
    			setOrgList(resultListLoc, totcntLoc,type);
    		break;
    		case "PAY": 
    			resultListPay = json.resultList;
    			totcntPay =  json.resultList.length;
    			setOrgList(resultListPay, totcntPay,type);
    		break;
    		case "TYP": 
    			resultListTyp = json.resultList;
    			totcntTyp =  json.resultList.length;
    			setOrgList(resultListTyp, totcntTyp,type);
    		break;
    		case "LANG": 
    			resultListLang = json.resultList;
    			totcntLang =  json.resultList.length;
    			setOrgList(resultListLang, totcntLang,type);
    		break;
    		
        	}        	
        }
    });
}

//----------------------------------------------------------------------
//기관조회 상세내역 설정
//----------------------------------------------------------------------
function getTypeDetail(idx,type){

	switch(type){
	case "LOC": 
		$('#dvOrgNm').html("<h3>"+resultListLoc[idx].org_nm+"</h3>");
		$('#fOrgAddr').attr('value', resultListLoc[idx].org_addr);
		$('#fOrgTel').attr('value', resultListLoc[idx].org_tel);
		$('#fOrgUrl').attr('href', resultListLoc[idx].org_url);
		$('#dvOrgUrlIn').html(resultListLoc[idx].org_url);
		$('#fOrgCapa').attr('value', resultListLoc[idx].org_capa);
		$('#fOrgDetail').attr('value', resultListLoc[idx].org_detail);
		$('#fOrgDesc').attr('value', resultListLoc[idx].org_desc);
		$('#btnOrgCall').attr('href', "tel:"+resultListLoc[idx].org_tel);
	break;
	case "PAY": 
		$('#dvOrgNm').html("<h3>"+resultListPay[idx].org_nm+"</h3>");
		$('#fOrgAddr').attr('value', resultListPay[idx].org_addr);
		$('#fOrgTel').attr('value', resultListPay[idx].org_tel);
		$('#fOrgUrl').attr('href', resultListPay[idx].org_url);
		$('#dvOrgUrlIn').html(resultListPay[idx].org_url);
		$('#fOrgCapa').attr('value', resultListPay[idx].org_capa);
		$('#fOrgDetail').attr('value', resultListPay[idx].org_detail);
		$('#fOrgDesc').attr('value', resultListPay[idx].org_desc);
		$('#btnOrgCall').attr('href', "tel:"+resultListPay[idx].org_tel);
	break;
	case "TYP": 
		$('#dvOrgNm').html("<h3>"+resultListTyp[idx].org_nm+"</h3>");
		$('#fOrgAddr').attr('value', resultListTyp[idx].org_addr);
		$('#fOrgTel').attr('value', resultListTyp[idx].org_tel);
		$('#fOrgUrl').attr('href', resultListTyp[idx].org_url);
		$('#dvOrgUrlIn').html(resultListTyp[idx].org_url);
		$('#fOrgCapa').attr('value', resultListTyp[idx].org_capa);
		$('#fOrgDetail').attr('value', resultListTyp[idx].org_detail);
		$('#fOrgDesc').attr('value', resultListTyp[idx].org_desc);
		$('#btnOrgCall').attr('href', "tel:"+resultListTyp[idx].org_tel);
	break;
	case "LANG": 
		$('#dvOrgNm').html("<h3>"+resultListLang[idx].org_nm+"</h3>");
		$('#fOrgAddr').attr('value', resultListLang[idx].org_addr);
		$('#fOrgTel').attr('value', resultListLang[idx].org_tel);
		$('#fOrgUrl').attr('href', resultListLang[idx].org_url);
		$('#dvOrgUrlIn').html(resultListLang[idx].org_url);
		$('#fOrgCapa').attr('value', resultListLang[idx].org_capa);
		$('#fOrgDetail').attr('value', resultListLang[idx].org_detail);
		$('#fOrgDesc').attr('value', resultListLang[idx].org_desc);
		$('#btnOrgCall').attr('href', "tel:"+resultListLang[idx].org_tel);
	break;
	
	}	
	
	$.mobile.changePage("#org_detail","slide",true,true) ;
}
