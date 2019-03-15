	Layer = {};
	/***
	 * Layer 弹出层处理类，主要用于展示和隐藏弹出层。提供如下方法对外服务：
	 * 
	 * 替代window.open方法：
	 * open(url,name,feature,sourceWindow[,mask,moveLimited]);
	 * close([id])
	 * 
	 * 仿窗口操作，在弹出层中嵌入iframe，并载入指定url：
	 * openWin(url,name,feature,sourceWindow[,mask,moveLimited]);
	 * closeWin([id])
	 * 
	 * 弹出层操作，弹出一个弹出层，填充指定html代码：
	 * showDiv(title, html, width, height[, top, left, mask,moveLimited])
	 * hideDiv([id])
	 * 
	 * @author CHENLONG
	 */
	Layer = {
		WIN_WIN_PREF : "LAYOUT_WIN_",
		WIN_DIV_PREF : "LAYOUT_DIV_",
		zIndex : 100,// 如果弹出层被遮挡时，可以增大此参数
		/**
		 * 模拟一个新窗口，和close()方法一起使用，此方法用于直接替换window.open方法：
		 * url 连接名称
		 * title 标题
		 * features 弹出框参数。类似：'width=200,height=100'
		 * sourceWindow 源窗口，此窗口会作为弹出窗口的opener
		 * mask 是否需要蒙版，默认有(可选)
		 * moveLimited 拖动时是否限制(只能在当前窗口拖动) 默认是(可选) 弹出窗口比较大时，不能限制
		 */
		open:function(url, title, features, sourceWindow, mask,moveLimited){
			try{
				if(top.Layer){
					// 处理一下url
					if(!(NsUtil.startWith(url,"/") || NsUtil.startWith(url,"https:")|| NsUtil.startWith(url,"http:")|| NsUtil.startWith(url,"file:"))){
						var path = (sourceWindow||window).document.location.pathname;
						var context = path.substring(0,path.indexOf('/',2)+1);
						url = context +url;
					}
					return top.Layer.openWin(url,title, features, sourceWindow, mask,moveLimited);
				}
			}catch(e){
				if(!e.message || e.message.indexOf("权限") < 0){
					throw e;
				}
			}
			return Layer.openWin(url,title, features, sourceWindow, mask,moveLimited);
		},
		/**
		 * 关闭窗口，和open()方法一起使用，此方法用于直接替换window.open方法：
		 * id 需要关闭窗口的ID，默认关闭全部(可选)
		 */
		close : function(id){
			try{
				if(self!=top && top.Layer){
					top.Layer.closeWin(id);
				}
			}catch(e){
				if(!e.message || e.message.indexOf("权限") < 0){
					throw e;
				}
			}
			Layer.closeWin(id);
		},
		/**
		 * 模拟一个新窗口，和closeWin()方法一起使用：
		 * url 连接名称
		 * title 标题
		 * features 弹出框参数。类似：'width=200,height=100'
		 * sourceWindow 源窗口，此窗口会作为弹出窗口的opener(可选)
		 * mask 是否需要蒙版，默认有(可选)
		 * moveLimited 拖动时是否限制(只能在当前窗口拖动) 默认是(可选)
		 */
		openWin : function(url, title, features, sourceWindow, mask,moveLimited,border) {
			var _id = escape(this.WIN_WIN_PREF + url);
			var exists = NsUtil.F(_id);
			if(!!exists){
				return ;
			}
			// 解析参数
			features = features || "";
			var featureArray = features.split(",");
			var featureObject = new Object();
			for ( var i = 0; i < featureArray.length; i++) {
				var array = featureArray[i].toString().split("=");
				featureObject[NsUtil.trim(array[0])] = NsUtil.trim(array[1]);
			}
			//创建蒙板
			moveLimited = !(moveLimited === false);
			mask = !(mask === false);
			if (true == mask)
				this.createMask(_id, function() {
					Layer.close(_id);
				});
			// 创建弹出窗口
			var iframeName = "iframe_" + this.zIndex;
			var iframeHtml = "<iframe id='" + _id + "_iframe' src='' width=100% height=100% frameborder=0 name="
					+ iframeName + " ></iframe>";
			this.createContentDiv(_id, iframeHtml, title, featureObject.width,
					featureObject.height, featureObject.top,
					featureObject.left, border,function() {
						Layer.close(_id);
					},featureObject.fullscreen);
			try {
				(sourceWindow || {}).NSTC_LAYER_ID = _id;
				window[iframeName].NSTC_LAYER_ID = _id;
				window[iframeName].opener = sourceWindow;
				window[iframeName].close = function() {
					Layer.closeWin(_id);
				}
				// TJF修改：解决个别页面二次加载js冲突报错的问题
				window[iframeName].location.href=url;
			} catch (e) {
				NsUtil.log("弹出层操作发生错误:"+ e?e.message:"未知");
			}
			// 支持拖拽
			new Dragable(_id, {
				mxContainer : document.body,
				Handle : _id + "_header",
				Limit : moveLimited
			});
			// 将光标交给新窗口
			try{
				window[iframeName].focus();
			}catch(e){
			}
			try{
				var text = window[iframeName].jQuery(":text:visible");
				text[0] && text[0].focus();
			}catch(e){}
			
			return window[iframeName];
		},
		/**
		 * 关闭窗口，和openWin()方法一起使用：
		 * id 需要关闭窗口的ID，默认关闭全部(可选)
		 */
		closeWin : function(id) {
			if (!id) {
				// 不指定id时，移除所有弹出层
				var divs = document.getElementsByTagName("div") || [];
				for ( var i = 0, k = divs.length; i < k; i++) {
					var div = divs[i];
					if (div && div.layId && NsUtil.startWith(div.id, this.WIN_WIN_PREF)) {
						Layer.closeWin(div.id);
					}
				}
				return;
			}
			// 先移除Iframe，某些脑残的IE版本可能会出现移除父对象，但iframe仍然留存的BUG
			var ifr = NsUtil.F(id+"_iframe");
			if(ifr){
				ifr.src="";
				ifr.parentElement.removeChild(ifr);
			}
			// 移除弹出层DIV
			var div = NsUtil.F(id);
			if (div) {
				div.parentElement.removeChild(div);
			}
			// 移除蒙版
			var maskId = id + "_layoutBackground";
			var mask = NsUtil.F(maskId);
			if (mask) {
				mask.parentElement.removeChild(mask);
			}
		},
		/**
		 * 弹出一个层，层内填充指定HTML，和hideDiv()方法一起使用：
		 * title 标题
		 * html 待填充的html
		 * width 高度
		 * height 宽度
		 * top 距当前窗口顶部距离(可选)
		 * left 距当前窗口左侧距离(可选)
		 * mask 是否有蒙版,默认有(可选)
		 * moveLimited 拖动时是否限制(只能在当前窗口拖动) 默认是(可选)
		 */
		showDiv : function(title, html, width, height, top, left, mask,moveLimited,border) {
			var _id = escape(this.WIN_DIV_PREF + new Date().getTime());
			//创建蒙板
			moveLimited = !(moveLimited===true);
			mask = !(mask === false);
			if (mask) {
				this.createMask(_id, function() {
					Layer.hideDiv(_id);
				});
			}
			// 创建弹出层
			this.createContentDiv(_id, html, title, width, height, top, left,border,
					function() {
						Layer.hideDiv(_id);
					});
			// 拖拽
			new Dragable(_id, {
				mxContainer : document.body,
				Handle : _id + "_header",
				Limit : moveLimited
			});
			return _id;
		},
		/**
		 * 关闭弹出层，和showDiv()方法一起使用
		 * id 弹出层的id,默认关闭所有弹出层(可选)
		 */
		hideDiv : function(id) {
			if (!id) {
				var divs = document.getElementsByTagName("div") || [];
				for ( var i = 0, l = divs.length; i < l; i++) {
					var div = divs[i];
					if (div && div.layId && NsUtil.startWith(div.id, this.WIN_DIV_PREF)) {
						Layer.hideDiv(div.id);
					}
				}
				return;
			}
			var div = NsUtil.F(id);
			if (div) {
				div.parentElement.removeChild(div);
			}
			var maskId = id + "_layoutBackground";
			var mask = NsUtil.F(maskId);
			if (mask) {
				mask.parentElement.removeChild(mask);
			}
		},
		/* 创建蒙版，请勿外部调用 */
		createMask : function(_id, cancleCb) {
			var bgObj = NsUtil.F(_id + "_layoutBackground");
			if (!bgObj) {
				//<div id="layoutBackground" class="layoutBackground" style="display:none;"></div>
				bgObj = document.createElement("DIV");
				bgObj.id = _id + "_layoutBackground";
				bgObj.className = "layoutBackground";
				bgObj.style.display = "block";
				bgObj.style.zIndex = this.zIndex++;
				NsUtil.addEventHandler(bgObj, "dblclick", cancleCb);
				document.body.appendChild(bgObj);
			}
		},
		/* 创建弹出层，请勿外部调用 */
		createContentDiv : function(id, html, title, width, height, top, left,border,
				closeCb,fullscreen) {
			// 计算合适的位置
			// 计算大小
			if(fullscreen==1 || fullscreen == 'yes'){
				// 支持全屏
				width = 1000000;
				height = 1000000;
			}
			var _width_p = null;
			var _width = parseInt(width) || 860;
			var _height = parseInt(height) || 500;
			if(_width>document.body.clientWidth){
				_width = document.body.clientWidth;
				_width_p="100%";
			}
			if(_height>document.body.clientHeight){
				_height=document.body.clientHeight-28;
			}
			// 计算位置
			var _left = parseInt(left)
					|| (parseInt((document.body.clientWidth - _width) / 2) );
			var _top = parseInt(top)
					|| (parseInt((document.body.clientHeight - _height) / 2) - 50);
			// left和top如果经过计算小于0了则设置为0
			if (_left < 0) {
				_left = 0;
			} 
			if (_top < 0) {
				_top = 0;
			}
			// 处理title
			if(!title || NsUtil.trim(title)=="_blank" || NsUtil.trim(title)=="_self" || NsUtil.trim(title)=="blank"){
				title = "";
			}
			// 组装HTML
			var divId = id;
			var divContent = document.createElement("DIV");
			var divContentHeaderLeft = document.createElement("DIV");
			var divContentHeaderCen = document.createElement("DIV");
			var divContentHeaderRight = document.createElement("DIV");
			var divContentBody = document.createElement("DIV");
			// 弹出层容器
			divContent.id = id;
			divContent.className = "layoutContentDiv";
			divContent.layId=id;
			divContent.style.width = _width_p||(_width + "px");
			//divContent.style.height=_height+"px";
			divContent.style.top = _top + "px";
			divContent.style.left = _left + "px";
			divContent.style.zIndex = this.zIndex++;
			divContent.style.postion = "absolute";
			divContent.style.display = "block";
			if(!(border===false)) divContent.style.border="1px solid #c0c0c0";
			// 标题
			divContentHeaderLeft.className = "layoutContentHeader_left";
			divContentHeaderCen.className = "layoutContentHeader_center";
			divContentHeaderCen.id = id + "_header";
			// 填充标题
			divContentHeaderCen.innerHTML = "<b>" + title + "</b>";
			// 改变鼠标形状
			divContentHeaderCen.style.cursor="move";
			// 关闭按钮
			divContentHeaderRight.className = "layoutContentHeader_right";
			NsUtil.addEventHandler(divContentHeaderRight, "click", closeCb
					|| function() {
						Layer.close(id);
					});
			// 内容区
			divContentBody.id = id + "_body";
			divContentBody.style.width = "100%";
			divContentBody.style.height = _height + "px";
			divContentBody.style.display = "block";
			divContentBody.innerHTML = html;

			divContent.appendChild(divContentHeaderLeft);
			divContent.appendChild(divContentHeaderCen);
			divContent.appendChild(divContentHeaderRight);
			divContent.appendChild(divContentBody);
			
			document.body.appendChild(divContent);
		}
	};

	var NsUtil = NsUtil || {};
	function Extend(destination, source) {
		for ( var property in source) {
			destination[property] = source[property];
		}
	}
	Extend(NsUtil, {
		isIE : (document.all) ? true : false,
		/**
		 * 向控制台打印信息
		 */
		log : function (msg) {
			if (window.console && window.console.log && msg) {
				console.log(msg);
			}
		},
		/**
		 * document.getElementById缩写
		 */
		F : function(id) {
			if(!!id){
				if(id.tagName) return id;
				return document.getElementById(id);
			}
			return null;
		},
		/**
		 * 调用initialize新建类
		 */
		Class : {
			create : function() {
				return function() {
					this.initialize.apply(this, arguments);
				}
			}
		},
		Bind : function(object, fun) {
			return function() {
				return fun.apply(object, arguments);
			}
		},
		BindAsEventListener : function(object, fun) {
			return function(event) {
				return fun.call(object, (event || window.event));
			}
		},
		CurrentStyle : function(element) {
			return element.currentStyle
					|| document.defaultView.getComputedStyle(element, null);
		},
		addEventHandler : function(oTarget, sEventType, fnHandler) {
			if (oTarget.addEventListener) {
				oTarget.addEventListener(sEventType, fnHandler, false);
			} else if (oTarget.attachEvent) {
				oTarget.attachEvent("on" + sEventType, fnHandler);
			} else {
				oTarget["on" + sEventType] = fnHandler;
			}
		},
		removeEventHandler : function(oTarget, sEventType, fnHandler) {
			if (oTarget.removeEventListener) {
				oTarget.removeEventListener(sEventType, fnHandler, false);
			} else if (oTarget.detachEvent) {
				oTarget.detachEvent("on" + sEventType, fnHandler);
			} else {
				oTarget["on" + sEventType] = null;
			}
		},
		trim : function(val) {
			return val?val.replace(/(^\s*)|(\s*$)/g, ""):"";
		},
		startWith : function(str, s) {
			if (s == null || s == "" || str.length == 0
					|| s.length > str.length)
				return false;
			if (str.substr(0, s.length) == s)
				return true;
			else
				return false;
			return true;
		},
		endWith : function(str, s) {
			if (s == null || s == "" || str.length == 0
					|| s.length > str.length)
				return false;
			if (str.substring(str.length - s.length) == s)
				return true;
			else
				return false;
			return true;
		}
	});
	// 拖放程序
	var Dragable = NsUtil.Class.create();
	Dragable.prototype = {
		// 拖放对象
		initialize : function(drag, options) {
			this.Drag = NsUtil.F(drag);// 拖放对象
			this._x = this._y = 0;// 记录鼠标相对拖放对象的位置
			this._marginLeft = this._marginTop = 0;// 记录margin
			// 事件对象(用于绑定移除事件)
			this._fM = NsUtil.BindAsEventListener(this, this.Move);
			this._fS = NsUtil.Bind(this, this.Stop);
			this.SetOptions(options);
			this.Limit = !!this.options.Limit;
			this.mxLeft = parseInt(this.options.mxLeft);
			this.mxRight = parseInt(this.options.mxRight);
			this.mxTop = parseInt(this.options.mxTop);
			this.mxBottom = parseInt(this.options.mxBottom);

			this.LockX = !!this.options.LockX;
			this.LockY = !!this.options.LockY;
			this.Lock = !!this.options.Lock;

			this.onStart = this.options.onStart;
			this.onMove = this.options.onMove;
			this.onStop = this.options.onStop;

			this._Handle = NsUtil.F(this.options.Handle) || this.Drag;
			this._mxContainer = NsUtil.F(this.options.mxContainer) || null;

			this.Drag.style.position = "absolute";
			this.positionMove = !!this.options.positionMove;
			// 透明
			if (NsUtil.isIE && !!this.options.Transparent) {
				// 填充拖放对象
				with (this._Handle.appendChild(document.createElement("div")).style) {
					width = height = "100%";
					backgroundColor = "#fff";
					filter = "alpha(opacity:0)";
					fontSize = 0;
				}
			}
			// 修正范围
			this.Repair();
			NsUtil.addEventHandler(this._Handle, "mousedown", NsUtil
					.BindAsEventListener(this, this.Start));
		},
		// 设置默认属性
		SetOptions : function(options) {
			this.options = {// 默认值
				Handle : "",// 设置触发对象（不设置则使用拖放对象）
				Limit : false,// 是否设置范围限制(为true时下面参数有用,可以是负数)
				mxLeft : 0,// 左边限制
				mxRight : 9999,// 右边限制
				mxTop : 0,// 上边限制
				mxBottom : 9999,// 下边限制
				mxContainer : "",// 指定限制在容器内
				LockX : false,// 是否锁定水平方向拖放
				LockY : false,// 是否锁定垂直方向拖放
				Lock : false,// 是否锁定
				Transparent : false,// 是否透明
				positionMove : false,// 初始状态是否标记为已移动
				onStart : function() {
				},// 开始移动时执行
				onMove : function() {
				},// 移动时执行
				onStop : function() {
				}// 结束移动时执行
			};
			Extend(this.options, options || {});
		},
		// 准备拖动
		Start : function(oEvent) {
			if (this.Lock) {
				return;
			}
			// 清除选择
			window.getSelection ? window.getSelection().removeAllRanges()
					: document.selection.empty();
			this.Repair();
			// 记录鼠标相对拖放对象的位置
			this._x = oEvent.clientX - this.Drag.offsetLeft;
			this._y = oEvent.clientY - this.Drag.offsetTop;
			// 记录margin
			this._marginLeft = parseInt(NsUtil.CurrentStyle(this.Drag).marginLeft) || 0;
			this._marginTop = parseInt(NsUtil.CurrentStyle(this.Drag).marginTop) || 0;
			// mousemove时移动 mouseup时停止
			NsUtil.addEventHandler(document, "mousemove", this._fM);
			NsUtil.addEventHandler(document, "mouseup", this._fS);
			if (NsUtil.isIE) {
				// 焦点丢失
				NsUtil.addEventHandler(this._Handle, "losecapture", this._fS);
				// 设置鼠标捕获
				this._Handle.setCapture();
			} else {
				// 焦点丢失
				NsUtil.addEventHandler(window, "blur", this._fS);
				// 阻止默认动作
				oEvent.preventDefault();
			}
			// 附加程序
			this.onStart();
		},
		// 修正范围
		Repair : function() {
			if (this.Limit) {
				// 修正错误范围参数
				this.mxRight = Math.max(this.mxRight, this.mxLeft
						+ this.Drag.offsetWidth);
				this.mxBottom = Math.max(this.mxBottom, this.mxTop
						+ this.Drag.offsetHeight);
				// 如果有容器必须设置position为relative或absolute来相对或绝对定位，并在获取offset之前设置
				!this._mxContainer
						|| NsUtil.CurrentStyle(this._mxContainer).position == "relative"
						|| NsUtil.CurrentStyle(this._mxContainer).position == "absolute"
						|| (this._mxContainer.style.position = "relative");
			}
		},
		// 拖动
		Move : function(oEvent) {
			// 判断是否锁定
			if (this.Lock) {
				this.Stop();
				return;
			}
			// 设置移动参数
			var iLeft = oEvent.clientX - this._x, iTop = oEvent.clientY
					- this._y;
			// 设置范围限制
			if (this.Limit) {
				// 设置范围参数
				var mxLeft = this.mxLeft, mxRight = this.mxRight, mxTop = this.mxTop, mxBottom = this.mxBottom;
				// 如果设置了容器，再修正范围参数
				if (!!this._mxContainer) {
					mxLeft = Math.max(mxLeft, 0);
					mxTop = Math.max(mxTop, 0);
					mxRight = Math.min(mxRight, this._mxContainer.clientWidth);
					mxBottom = Math.min(mxBottom,
							this._mxContainer.clientHeight);
				}
				// 修正移动参数
				iLeft = Math.max(Math.min(iLeft, mxRight - this.Drag.offsetWidth), mxLeft);
				iTop = Math.max(Math.min(iTop, mxBottom - this.Drag.offsetHeight), mxTop);
			}
			// 设置位置，并修正margin
			if (!this.LockX) {
				this.Drag.style.left = iLeft - this._marginLeft + "px";
			}
			if (!this.LockY) {
				this.Drag.style.top = iTop - this._marginTop + "px";
			}
			// 附加程序
			this.onMove();
		},
		// 停止拖动
		Stop : function() {
			// 移除事件
			NsUtil.removeEventHandler(document, "mousemove", this._fM);
			NsUtil.removeEventHandler(document, "mouseup", this._fS);
			if (NsUtil.isIE) {
				NsUtil.removeEventHandler(this._Handle, "losecapture",this._fS);
				this._Handle.releaseCapture();
			} else {
				NsUtil.removeEventHandler(window, "blur", this._fS);
			}
			this.positionMove = true;
			// 附加程序
			this.onStop();
		}
	};

