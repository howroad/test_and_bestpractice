/**
*	替换原生的window.open方法，同时使用windowClose
*	版本 1.0
*/
window.x_open=window.open;
window.open=function(url,name,features){
   if(top.Layer){ // 如果存在弹出框框架
		return top.Layer.open(url, name, features, window, true);
   }else if(url){ // 如过URL不为空
	   // ZPJ修改：为弹出窗口增加标识，不使用查询导航
	   url = url.indexOf("?") > -1 ? (url + "&isJumpWindow=1") : (url + "?isJumpWindow=1");
		name='_'+(name==null?'W':name);
	    var newWin = window.x_open('',name,features);
		var k=x_link(newWin,url,null);
		if(k==null){//在新窗体创建失败在本窗体尝试创建
			k=x_link(window,url,name);
		}
	    k.click();
		return newWin;
   }else{ // 最后使用原生方法
	   // ZPJ修改：为弹出窗口增加标识，不使用查询导航
	   url = url.indexOf("?") > -1 ? (url + "&isJumpWindow=1") : (url + "?isJumpWindow=1");
		return window.x_open(url,name,features);
   }
}

window.x_link=function(win,url,target){
   try{
	   var k = win.document.getElementById('_LK');
	   if(k==null){
		  k=win.document.createElement('A');
		  k.id='_LK';
		  k.style.display='none';
		  if(target!=null){
			k.target=target;
		  }
		  k.href=url;
		  win.document.body.appendChild(k);
	   }
	   if(target!=null){
			k.target=target;
	   }
	   k.href=url;
   }catch(e){}
   return win.document.getElementById('_LK');//必须重新获取
}

window.replaceURL=function(url){
   x_link(window,url,'_self').click();
}
windowOpen = window.open;// 通用的打开窗口方法
windowClose = function(){// 通用的关闭窗口方法	SMP1.4.7 替换opener.NSTC_LAYER_ID
	if(top.Layer && window.frameElement.getAttribute('nstc_layer_id')){
		top.Layer.close(window.frameElement.getAttribute('nstc_layer_id'));
	}else{
		window.close();
	}
}
