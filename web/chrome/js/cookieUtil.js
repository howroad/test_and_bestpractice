if(!nstc) var nstc = {};
nstc.cookieUtil = {
		/**增加或者更新一个cookie*/
		setCookie:function(objName, objValue, objHours){
			var str = objName + "=" + escape(objValue);
			if (objHours > 0) { // 为0时不设定过期时间，浏览器关闭时cookie自动消失
				var date = new Date();
				var ms = objHours * 3600 * 1000;
				date.setTime(date.getTime() + ms);
				str += "; expires=" + date.toGMTString();
			}
			document.cookie = str;
		},
		/**删除cookie*/
		delCookie:function(name){
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = getCookie(name);
			if (cval != null)
				document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		},
		/**取出名为name的cookie值*/
		getCookie:function(name){
			var cookieArray = document.cookie.split("; "); // 得到分割的cookie名值对
			//var cookie = new Object();
			for ( var i = 0; i < cookieArray.length; i++) {
				var arr = cookieArray[i].split("="); // 将名和值分开
				if (arr[0] == name)
					return unescape(arr[1]); // 如果是指定的cookie，则返回它的值
			}
			return "";
		}
		
}
