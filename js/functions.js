window.addEventListener("load", windowLoaded, false);
function windowLoaded() {
	chrome.tabs.getSelected(null, function(tab) {
		apontame(tab.url);
	});
}

apontame = function(url) {
	$.ajax({
		timeout: 10000,
		url: "http://www.aponta.me/add",
		data: ({'wt': 'json', 'url': url}),
		dataType: 'json',
		type: "GET",
		success: function(data) {
			if(data.shortURL == 'null'){
				showShortUrl('Ops! Falhei =/', false);
			} else {
				showShortUrl(data.shortURL, true);
				generateQR(data.shortURL);
			}
		},
		error: function(){
			showShortUrl('Ops! Falhei =/', false);
		}
	});
};

generateQR = function(url){
	$("#qrCode img").attr('src', url+".qrcode").fadeIn();
};

showShortUrl = function(url, hasShortUrl) {
	if ( hasShortUrl ) {
		var htmlUrl = "";
		htmlUrl += '<input type="text" id="txtUrl" value="'+url+'">';
		htmlUrl += '<br />';
		htmlUrl += '<input type="button" id="copyUrl" value="Copiar">';

		$("#apontame").html(htmlUrl);
		$("#copyUrl").click(function() {
			$("#txtUrl").select();
			document.execCommand("copy", false, null);
			$(this).val("Link copiado!").focus();
		});
	} else {
		$("#apontame").html(url);
	}
};