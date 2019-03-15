// 劫持表单的submit属性，使其指向自定义函数，在这个函数中先手动调用表单的onsubmit方法，
// 如果onsubmit返回true则执行原先指向的那个submit方法。
// 1. 如果onsubmit返回true，则不影响其他地方调用form.submit()方法
// 2. 如果返回false,则不执行原提交操作
$(function(){
	var forms = document.getElementsByTagName('form');
	for(var i=0;i<forms.length;i++){
		var func = forms[0].submit;
		forms[0].submit=function(){
			if(this.onsubmit() != false)
				func.apply(this); // IE8  如果是IE6,7改为 func();   
		}
	}
}); 

// 转换方法,如果有其他转换需求，添加case入口即可
/**
function convert(obj){
	var eles = $("#"+obj.id+" :text[format],#"+obj.id+" :hidden[format]");
	$.each(eles,function(i,n){
		var format = $(n).attr("format").toUpperCase();
		switch (format){
		case 'MONEY':
			convertFromMoney(n);
			break;
		default :
			alert("无法完成格式转换，未知的转换格式："+format);
		}
	});

	var f1 = window['build_FormValue_SlickGrid_Unit_Data'];
	if(Object.prototype.toString.apply(f1) === '[object Function]'){
		f1(obj);
	}

	return true;
	
}
// 转化金额
function convertFromMoney(text){
	text.value = text.value.replace(/,/g,"");
}
优化后的函数
**/
//转换方法,如果有其他转换需求，添加case入口即可
function convert(obj){
	//var eles = $("#"+obj.id+" :text[format],#"+obj.id+" :hidden[format]");
	var eles = $("#"+obj.id+" [format]");

	$.each(eles,function(i,n){
		var format = $(n).attr("format").toUpperCase();
		switch (format){
		case 'MONEY':
			convertFromMoney(n);
			break;
		default :
			alert("无法完成格式转换，未知的转换格式："+format);
		}
	});

	var f1 = window['build_FormValue_SlickGrid_Unit_Data'];
	if(Object.prototype.toString.apply(f1) === '[object Function]'){
		f1(obj);
	}

	return true;
	
}
//转化金额
function convertFromMoney(text){
	if("undefined" != typeof(text.value) && "undefined" != typeof(text.type) ){
		if("text" == text.type || "hidden" == text.type){
           text.value = text.value.replace(/,/g,"");
		}
		
	}
}