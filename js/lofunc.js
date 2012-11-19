
var moveMain ;
var totcnt;
var imgNum;
var resultList;

function init() {
	moveMain = setInterval('goMain()', 1000);
}
function goMain() {
	$.mobile.changePage("#main" ) ;
	clearInterval(moveMain);
}

$(function(){
	$ ("#li_loc").bind( "tap" , function(event){
		getTypeList("LOC");	
	});
	
	$ ("#li_pay").bind( "tap" , function(event){
		getTypeList("PAY");
	});
	
	$ ("#li_typ").bind( "tap" , function(event){
		getTypeList("TYP");
	});
	
	$ ("#li_lang").bind( "tap" , function(event){
		getTypeList("LANG");
	});
});


function getTypeList(type){
	
	$.getJSON("http://14.63.226.13/server/org_list.jsp?type="+type, "callback=?", function(json) {
		var list_html = "";
		var detail_html = "";

		resultList = json.resultList;
		/* 인터넷 오류처리 방법 확인하여 처리필요함
		if(!resultList){
			$('#type_list').html("<li>인터넷 연결이 되지 않아 목록을 가져오지 못했습니다.</li>");
		}
		*/
		totcnt = json.resultList.length;
		
		if(totcnt ==0){
			$('#typ_list').html("<p align=\"center\">목록을 가져오지 못했습니다.</p>");
		}
		else{
			var grpValue = "";
			for (var i = 0; i < totcnt; i++) {
				
				var result = resultList[i];
				if(grpValue == "" || grpValue != result.grp_value ){
					list_html += "<li data-role=\"list-divider\"  role=\"heading\" class=\"ui-li ui-li-divider ui-btn ui-bar-b ui-corner-top ui-btn-up-undefined\" >"+result.grp_value+"</li>";
				}
				list_html += "<li data-theme=\"d\" class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-d\">" +
							 "<div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\">" +
				             "<a href=\"javascript\:getTypeDetail('" + i + "')\"  class=\"ui-link-inherit\">"+ result.org_nm +"</a>" +
				             "</div><span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"></span></div></li>";
							
			}
			list_html = "<ul data-role=\"listview\" data-inset=\"true\" data-theme=\"d\" class=\"ui-listview ui-listview-inset ui-corner-all ui-shadow\" >" +
						list_html +
						"</ul>";
			$('#typ_list').html(list_html);
		}
		
	});

}

function getTypeDetail(idx){
//	alert(resultList[idx].org_nm);
	
	$('#d_org_nm').html(resultList[idx].org_nm);
	$.mobile.changePage("#org_detail" ) ;
}

function fn_egov_initl_mobilephotolist(){
	$.getJSON(contextPath + "/mbl/com/mpa/selectMobilePhotoList.mdo", function(json) {
		var list_html = "";
		var detail_html = "";
		resultList = json;

		totcnt = json.length;
		
		for (var i = 0; i < totcnt; i++) {
			var result = resultList[i];

			list_html += "<a href=\"javascript\:fn_photodetail('" + i + "')\">";
			list_html += "<li><img alt=\"" + result.photoSj +"\" title=\""+ result.photoSj +"\" src='" + contextPath + "/cmm/fms/getImage.do?atchFileId=" + result.atchFileId + "&fileSn=0' /></li>";
			list_html += "</a>";

		}
		detail_html += "<li>";
		detail_html += '<img id="imgSrc" src="" title="" alt=""/>';
		detail_html += "</li>";
							
		$('div[id="photoList"] ul[data-role="listview"]').html(list_html);
		$('div[id="detailview"]').html(detail_html);

		$('div[id="photoDetail"]').bind('swipeleft ', (function() {
			imgNum++;
			if (imgNum > totcnt-1){
			    imgNum = 0;
			}
			// id 값으로 이미지를 바꿈
			$('#imgSrc').attr('src', contextPath + '/cmm/fms/getImage.do?atchFileId=' + resultList[imgNum].atchFileId + '&fileSn=0');
			$('#imgSrc').attr('title', resultList[imgNum].photoSj);
			$('#imgSrc').attr('alt', resultList[imgNum].photoSj);
        }));
        
		$('div[id="photoDetail"]').bind('swiperight', (function() {
			imgNum--;
			if (imgNum < 0){
				imgNum = totcnt-1;
			} 
			$('#imgSrc').attr('src', contextPath + '/cmm/fms/getImage.do?atchFileId=' + resultList[imgNum].atchFileId + "&fileSn=0");
			$('#imgSrc').attr('title', resultList[imgNum].photoSj);
			$('#imgSrc').attr('alt', resultList[imgNum].photoSj);
        }));
		
		$('div[id="photoDetail"]').bind('tap', (function() {
			imgNum++;
			if (imgNum > totcnt-1){
			    imgNum = 0;
			}
			// id 값으로 이미지를 바꿈
			$('#imgSrc').attr('src', contextPath + '/cmm/fms/getImage.do?atchFileId=' + resultList[imgNum].atchFileId + '&fileSn=0');
			$('#imgSrc').attr('title', resultList[imgNum].photoSj);
			$('#imgSrc').attr('alt', resultList[imgNum].photoSj);
        }));
		
	});
}