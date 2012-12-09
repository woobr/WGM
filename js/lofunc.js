//----------------------------------------------------------------------
//----------------------------------------------------------------------
// 변수선언
//----------------------------------------------------------------------
//----------------------------------------------------------------------

//기관정보 관련 
var totcntLoc;    
var resultListLoc;
var totcntPay;
var resultListPay;
var totcntTyp;
var resultListTyp;
var totcntLang;
var resultListLang;

//위치알람 관련 
var myOptions; //지도생성옵션
var map;  //지도객체

//자가진단 관련 
var ninecount=0;
var score=0;
var question=[
              '1. 며칠 전에 나누었던 대화 내용을 기억하는 것은 어떻습니까?',
              '2. 최근에 했던 약속을 기억하는 것은 어떻습니까?',
              '3. 최근에 주변에서 일어났던 일을 기억하는 것은 어떻습니까?',
              '4. 가스불이나 전깃불을 켜놓고 끄는 것을 잊어버리는 것은 어떻습니까?',
              '5. 새로 마련한 가전제품이나 기구의 사용법을 익히는 능력은 어떻습니까? ',
              '6. 자신의 개인위생을 관리하거나(세수, 목욕 등) 외모를 가꾸는 정도는 어떻습니까?',
              '7. 중요한 제삿날이나 기념일(배우자의 생일, 결혼기념일, 종교행사일 등)을 기억하는 것은 어떻습니까>',
              '8. 거스름돈을 계산하거나, 돈을 정확히 세서 지불하는 것은 어떻습니까?',
              '9. 이야기 도중에 머뭇거리거나 말문이 막히는 것은 어떻습니까?',
              '10 이야기 도중에 물건의 이름을 정확히 대는 정도는 어떻습니까?',
              '11. 가까운 사람(자식, 손자, 친한친구 등)의 이름을 기억하는 것은 어떻습니까?',
              '12. 가까운 사람에 관한 사항, 즉 사는 곳이나 직업등을 기억하는 것은 어떻습니까?',
              '13. 자신의 주소나 전화번호를 기억하는 것은 어떻습니까?',
              '14. 전화, 가스레인지, 텔레비젼 등 집안에서 늘 사용하던 가구를 다루는 능력은 어떻습니까?',
              '15. 어떤 옷을 입고 나갈지, 저녁식사에 무엇을 준비할지 등 일상적인 상황에서 결정을 내리는 능력은 어떻습니까?',
              ];
var idxStatus = 0;

//----------------------------------------------------------------------
//----------------------------------------------------------------------
// 이벤트 처리
//----------------------------------------------------------------------
//----------------------------------------------------------------------
$(function(){

	//-------------------------------------------------------------------
	//메인화면 버튼 (위치알람)---------------------------------------
	$ ("#btnNoti").bind( "tap" , function(event){
		/*alert("알람기능은 곧 제공 예정입니다.");
		return;*/
		//tid=setInterval(locationCheck,2000);
		if(setMapInfo() ){
			$.mobile.changePage("noti.html" ) ;
		}
		else{
			alert("해당 기기에서 위치알림에 필요한 기능을 제공하지 않습니다.");
			$.mobile.changePage("#main" ) ;
		}
		
	});	
	//메인화면 버튼 (자가진단)---------------------------------------
	$ ("#btnCheck").bind( "tap" , function(event){
		$.mobile.changePage("#check" ) ;
	});		
	//메인화면 버튼 (기관)-------------------------------------------
	$ ("#btnOrg").bind( "tap" , function(event){
		getTypeList("LOC");	
		$.mobile.changePage("#org_list" ) ;
	});	

	//-------------------------------------------------------------------
	//알림화면 버튼 ---------------------------------------------------------
	$ ("#btnSetPos").bind( "tap" , function(event){  //위치설정 저장	
		window.localStorage.setItem('posSetTxt', $('#posSetTxt').attr('value') );
		window.localStorage.setItem('posSet', $('#posSet').attr('value') );
		
		
	});

	//-------------------------------------------------------------------
	//자가진단시작화면 버튼 (검사시작)------------------------------------
	$ ("#btnCheck01").bind( "tap" , function(event){
		goCheckStart();
	});	
	//자가진단문제화면 버튼 (검사문제 번호0)-------------------------------
	$("#btnZero").bind("tap", function(event){
		readNext();
	});
	//자가진단문제화면 버튼 (검사문제 번호1)-------------------------------
	$ ("#btnOne").bind( "tap" , function(event){
		score = score+1;
		readNext();
	});	
	//자가진단문제화면 버튼 (검사문제 번호2)-------------------------------
	$ ("#btnTwo").bind( "tap" , function(event){
		score = score+2;
		readNext();
	});	
	//자가진단문제화면 버튼 (검사문제 번호9)-------------------------------
	$ ("#btnNine").bind( "tap" , function(event){
		if(ninecount ==5){
			alert("9로 체크한 문항이 5개를 초과하면 결과를 계산하지 못합니다.");
			return;
		}
		ninecount = ninecount+1;
		readNext();
	});
	//자가진단결과화면 버튼 (다시검사하기)-------------------------------
	$ ("#btnCheckR01").bind( "tap" , function(event){
		goCheckStart();
	});
	
	//-------------------------------------------------------------------
	//기관목록 화면 버튼 (지역)---------------------------------------------
	$ ("#liLoc").bind( "tap" , function(event){
		getTypeList("LOC");	
	});	
	//기관목록 화면 버튼 (비용)---------------------------------------------
	$ ("#liPay").bind( "tap" , function(event){
		getTypeList("PAY");
	});	
	//기관목록 화면 버튼 (구분)---------------------------------------------
	$ ("#liTyp").bind( "tap" , function(event){
		getTypeList("TYP");
	});	
	//기관목록 화면 버튼 (가나다)---------------------------------------------
	$ ("#liLang").bind( "tap" , function(event){
		getTypeList("LANG");
	});	
	
	//홈버튼 이동 이벤트---------------------------------------------------------
	$ ("#aHomeOrgDetail").bind( "tap" , function(event){
		goMain();
	});	
	
	$ ("#aHomeCheckQuestion").bind( "tap" , function(event){
		goMain();
	});	
	
	$ ("#aHomeCheckResult").bind( "tap" , function(event){
		goMain();
	});	

	//배너클릭 이벤트-------------------------------------------------------------
	$ ("#imgBannerMain").bind( "tap" , function(event){
		goEconovation();
	});	
	$ ("#imgBannerCheck01").bind( "tap" , function(event){
		goEconovation();
	});	
	$ ("#imgBannerCheck02").bind( "tap" , function(event){
		goEconovation();
	});	
	$ ("#imgBannerCheck03").bind( "tap" , function(event){
		goEconovation();
	});	
	$ ("#imgBannerOrg").bind( "tap" , function(event){
		goEconovation();
	});	
	$ ("#imgBannerOrgDtl").bind( "tap" , function(event){
		goEconovation();
	});		
});

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//함수처리
//----------------------------------------------------------------------
//----------------------------------------------------------------------

//자가진단 (검사시작)-------------------------------
function goCheckStart(){
	idxStatus=0;
	score=0;
	ninecount=0;
	$.mobile.changePage("#checkDetail" ) ;
	readNext();	
}

//자가진단화면 버튼 이벤트 (검사결과)-------------------------------
function showResult(score){
	$('#resultScore').html("<h1><font color='#669999'>"+score+"</font></h1>");   
	
	if(score <4){
		$('#imgCheckR02').attr('src', "./img/img_check_r_02_1.jpg");
	}
	else if(score>9){
		$('#imgCheckR02').attr('src', "./img/img_check_r_02_3.jpg");
	}
	else{
		$('#imgCheckR02').attr('src', "./img/img_check_r_02_2.jpg");
	}
	$.mobile.changePage("#checkResult" ) ;
	
}

//----------------------------------------------------------------------
//다음버튼 
//----------------------------------------------------------------------
function readNext(){
	if (idxStatus==15){
		showResult(score);
		return;
	}
	
	var ques = question[idxStatus];
	$('#checkContents').html("<h2><font color='666666'><b>"+ques+"</b></font></h2>");
	idxStatus++;
}	


//----------------------------------------------------------------------
//맵 위치정보 세팅
//----------------------------------------------------------------------
function setMapInfo(){

	 try {
		 var result = false
		 
         if(window.localStorage){
        	 
        	$('#notiYn').attr('value', (window.localStorage.getItem('notiYn') ==null )? "off": window.localStorage.getItem('notiYn') );
        	$('#posSet').attr('value', (window.localStorage.getItem('posSet') ==null )? "": window.localStorage.getItem('posSet') );
        	$('#posSetTxt').attr('value', (window.localStorage.getItem('posSetTxt') ==null )? "": window.localStorage.getItem('posSetTxt') );
        	result = true;
         }
         else{
        	 result = false;
         }
         
     	if (result && navigator.geolocation) {
     		  navigator.geolocation.getCurrentPosition(mapLoadSuccess);
     		 result = true;
     	} else {
     	  //error('not supported');
     		result = false;
     	}	
     	return result;
         
     } catch(e){
         return false; // quit because dom.storage.enabled is false
     }
	
	
}

//----------------------------------------------------------------------
//맵 세팅 성공시
//----------------------------------------------------------------------
function mapLoadSuccess(position) {  

	 var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	  myOptions = {
	    zoom: 15,
	    center: latlng,
	    mapTypeControl: false,
	    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	  
	  var marker = new google.maps.Marker({
		  //document.getElementById('pos-a').value=position;
		  //document.getElementById('pos-b').value=map;
	      position: latlng, 
	      map: map
	  });

} 

//----------------------------------------------------------------------
//locationCheck 함수 
//----------------------------------------------------------------------
var cnt=0;
function locationCheck(){
	
	var latiSet = 10;
	var longSet = 0;
	
	var latiMove = 10;
	var longMove = 20;
	
	var distance = Math.sqrt( Math.pow(latiSet-latiMove,2) +Math.pow(longSet-longMove,2) );
	
	
	if(cnt<3){
		cnt++;
		if(distance<3){
		alert(cnt+"가까워 ");
		}else{
		alert(cnt+"멀어 ");			
		}
	}else
	clearinterval(tid);
}
//----------------------------------------------------------------------
//맵 위치정보 세팅 (변경시)
//----------------------------------------------------------------------
function setChangeMapInfo(){
	
//alert("setChangeMapInfo");	
	window.localStorage.setItem("notiYn", $('#notiYn').attr('value') );
}

//----------------------------------------------------------------------
//화면 이동 (메인화면)
//----------------------------------------------------------------------
function goMain() {
	$.mobile.changePage("#main") ;  //, "pop", false,false
}

//----------------------------------------------------------------------
//화면 이동 (에코노베이션)
//----------------------------------------------------------------------
function goEconovation() {
	$.mobile.changePage("http://www.econovation.co.kr") ;  //, "pop", false,false
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
