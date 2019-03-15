
// 初始化固定表头对象
nstc.FixedTable = function() {
}

// 固定表头入口方法
nstc.FixedTable.prototype.fix = function(scrollObj) {
	// 实例集合
	this.stackArray = [];
	this.isFixed = false;
	// 固定表头表格数量
	this.fixSize = 0;
	// 固定前两列表格数量
	this.fixTopColsSize = 0;
	// 普通非固定表头表格数量
	this.normalSize = 0;
	var instance = this;
	// 查找相关元素编号
	var _$fixTitleDiv = _$("div.unit_content_list.fix_title");
	this.fixSize = _$fixTitleDiv.size();
	var _$fixTopColsDiv = _$("div.unit_content_list_fix_right.fix_title.fix_top_cols");
	this.fixTopColsSize = _$fixTopColsDiv.size();
	var _$normalDiv = _$("div.unit_content_list:not(div.fix_title)");
	this.normalSize = _$normalDiv.size();
	
	// 处理固定前两列表格
	if(this.fixTopColsSize>0) {
		_$fixTopColsDiv.each(function(i, e) {
			instance.stackArray.push({});
			var currStack = instance.getLatestStack();
			var _$rightDiv = _$(e);
			var acts = instance.getDivTables_fix(_$(e));
			currStack.isFixed = true;
			currStack.actDiv = acts.gridDiv;
			currStack.actTable = acts.gridTable;
			instance.keepFeatures(currStack);
			currStack.actFixedDiv = acts.titleDiv;
			currStack.actFixedTable = acts.titleTable;
			
			var _$leftDiv = _$rightDiv.parent().parent().children(":eq(0)").children(":eq(0)");
			var copys = instance.getDivTables_fix(_$leftDiv);
			currStack.copyDiv = copys.gridDiv;
			currStack.copyTable = copys.gridTable;
			currStack.copyFixedDiv = copys.titleDiv;
			currStack.copyFixedTable = copys.titleTable;
			instance.fixTopCols(currStack);
			currStack.copyDiv.scrollTop(currStack.actDiv.scrollTop());
		});
	}
	// 处理固定表头表格
	if(this.fixSize>0) {
		_$fixTitleDiv.each(function(i, e) {
			instance.stackArray.push({});
			var currStack = instance.getLatestStack();
			var acts = instance.getDivTables_fix(_$(e));
			currStack.isFixed = true;
			currStack.actDiv = acts.gridDiv;
			currStack.actTable = acts.gridTable;
			instance.keepFeatures(currStack);
			currStack.actFixedDiv = acts.titleDiv;
			currStack.actFixedTable = acts.titleTable;

			//currStack.actFixedDiv.css("height", "24px");

			currStack.copyDiv = null;
			currStack.copyTable = null;
			currStack.copyFixedDiv = null;
			currStack.copyFixedTable = null;
			instance.fixHead(currStack);
			//currStack.actDiv.scrollLeft(currStack.actFixedDiv.scrollLeft());
			currStack.actFixedTable.find("th").css({"word-break": "keep-all"});
			if (scrollObj) {
				currStack.actDiv.scrollTop(scrollObj.top);
				currStack.actDiv.scrollLeft(scrollObj.left);
			}
		});
	}
	// 处理普通表格
	if(this.normalSize>0) {
		_$normalDiv.each(function(i, e) {
			instance.stackArray.push({});
			var currStack = instance.getLatestStack();
			var acts = instance.getDivTables(_$(e));
			currStack.actTable = acts.gridTable;
			instance.keepFeatures(currStack);
			currStack.actFixedTable = null;
			instance.bindTableSort(currStack);
			currStack.actTable.find("thead").css("color","#000000");
			currStack.actTable.find("th").css({"word-break": "keep-all","color": "#000000"});
		});
	}
}

// 获取列表滚动条的高度
nstc.FixedTable.prototype.getScrollTop = function () {
	var _$fixDivs = _$("div.fix_title");
	return $(_$fixDivs).children().eq(1).scrollTop();
};

// 获取列表滚动条横向位置
nstc.FixedTable.prototype.getScrollLeft = function () {
	var _$fixDivs = _$("div.fix_title");
	return $(_$fixDivs).children().eq(1).scrollLeft();
};

// 记录表格是否支持交替行样式、鼠标跟随和点击高亮等特性
nstc.FixedTable.prototype.keepFeatures = function(currStack) {
	var _$table = currStack.actTable;
	var _$trs = _$table.find("tbody tr");
	// 是否支持交替行样式
	currStack.isAlternate = _$table.attr("isalternat")=="1"?true:false;
	// 是否支持鼠标跟随
	currStack.isCursorFollowing = _$trs.filter("tr[onmouseover]").size()>0?true:false;
	// 是否支持点击高亮
	currStack.isClickHighlight = _$trs.filter("tr[onclick]").size()>0?true:false;
}

// 获取最近登记的变量集合
nstc.FixedTable.prototype.getLatestStack = function() {
	return this.stackArray[this.stackArray.length-1]
}

nstc.FixedTable.prototype.reset = function() {
	var instance = this;
	var _$fixDivs = _$("div.fix_title");
	_$fixDivs.each(function(i, e) {
		var template = instance.defaultTemplate[i].firstChild.cloneNode(true);
		var _$table = _$(e).find("table.GridUnitTable");
		var isFixed = _$table.size()>1?true:false;

		/*var isEditTable = $("table[isEditColumnFixed='true']").length;
		if (isEditTable > 0) {
			var tempTH = _$table.filter(":eq(0)").find("thead");
			_$table.each(function (j, value) {
				_$(template).find("table:eq("+j+")").find("label").each(function (i, text) {
					_$(text).html(_$(tempTH.find("label")[i]).html())
				})
			})
		}*/

		_$(template).find("table:eq("+(isFixed?1:0)+")").append(_$table.filter(":eq("+(isFixed?1:0)+")").find("tbody"));
		_$(e).replaceWith(template);
		/*if (isEditTable > 0) {
			dragColumns();
			dropColumns();
		}*/
	});
}

// 保存固定表头原始div/table样式,供resize是还原以自适应
nstc.FixedTable.prototype.keetDefault = function() {
	this.defaultTemplate = [];
	var instance = this;
	var _$fixDivs = _$("div.fix_title");
	_$fixDivs.each(function(i, e) {
		instance.defaultTemplate.push(document.createDocumentFragment());
		instance.cloneNodeExcludeX(instance.defaultTemplate[i],e,"tbody");
	});
}
// 克隆节点及子节点(排除指定标签名的元素及子元素)
nstc.FixedTable.prototype.cloneNodeExcludeX = function(fragE, targetE, excludeTagName) {
	if(targetE.nodeType==3) {
		fragE.appendChild(document.createTextNode(targetE.nodeValue));
	} else if(targetE.nodeType==1) {
		var copyNode = targetE.cloneNode(false);
		fragE.appendChild(copyNode);
		var children = targetE.childNodes;
		for(var i=0; i<children.length; i++) {
			if(children[i].nodeType==3 || children[i].nodeType==1 && children[i].tagName.toUpperCase()!=excludeTagName.toUpperCase()) {
				this.cloneNodeExcludeX(copyNode, children[i], excludeTagName);
			}
		}
	}
	
}

nstc.FixedTable.prototype.replaceAllDot = function(str) {
	var result = str;
	if(typeof(str)!="undefined") {
		result = str.replace(/\./g,"\\.");
	}
	return result;
}

// 获取固定表头和实际表头div编号
nstc.FixedTable.prototype.getDivTableIds = function (div) {
	var _$actDivs = div.children("div");
	var _$actTitleDiv = _$actDivs.filter(":eq(0)");
	var actTitleDivId = this.replaceAllDot(_$actTitleDiv.attr("id"));
	var _$actTitleTable = _$actTitleDiv.children(":eq(0)");
	var actTitleTableId = this.replaceAllDot(_$actTitleTable.attr("id"));
	var _$actGridDiv = _$actDivs.filter(":eq(1)");
	var actGridDivId = this.replaceAllDot(_$actGridDiv.attr("id"));
	var _$actGridTable = _$actGridDiv.children(":eq(0)");
	var actGridTableId = this.replaceAllDot(_$actGridTable.attr("id"));
	return {"titleDivId":actTitleDivId,"titleTableId":actTitleTableId,"gridDivId":actGridDivId,"gridTableId":actGridTableId};
}

//获取表格表头div dom(不含固定表头的情况)
nstc.FixedTable.prototype.getDivTables = function (div) {
	var _$actGridTable = div.children(":eq(0)");
	return {"gridTable":_$actGridTable};
}

//获取固定表头和实际表头div dom
nstc.FixedTable.prototype.getDivTables_fix = function (div) {
	var _$actDivs = div.children("div");
	var _$actTitleDiv = _$actDivs.filter(":eq(0)");
	var _$actTitleTable = _$actTitleDiv.children(":eq(0)");
	var _$actGridDiv = _$actDivs.filter(":eq(1)");
	var _$actGridTable = _$actGridDiv.children(":eq(0)");
	return {"titleDiv":_$actTitleDiv,"titleTable":_$actTitleTable,"gridDiv":_$actGridDiv,"gridTable":_$actGridTable};
}

// 仅固定表头，且不固定前两列的处理
nstc.FixedTable.prototype.fixHead = function(instance) {
	//instance.actDiv.parents('div')[1].style.height = "";
	//instance.actDiv.parents('div')[0].style.height = "";
	this.bindTableSort(instance);
	//this.synScroll(instance);	//使用下面代码解决页面加载后列表右侧出现空白滚动条问题
	if (self.name == "content")	//SMP1.4.7 浏览器对document.parentWindow的兼容
	{
		var selfObj = this;
		window.setTimeout(function () {
			selfObj.synScroll(instance);
		},1);
	} else {
		this.synScroll(instance);
	}
}

// 固定表头，且固定前两列的处理
nstc.FixedTable.prototype.fixTopCols = function(instance) {
	this.synScroll(instance);
	this.synRowColor(instance);
}

var isScroll = function (el) {
	// test targets
	var elems = el ? [el] : [document.documentElement, document.body];
	var scrollX = false, scrollY = false;
	for (var i = 0; i < elems.length; i++) {
		var o = elems[i];
		// test horizontal
		var sl = o.scrollLeft();
		o.scrollLeft(o.scrollLeft() + (sl > 0) ? -1 : 1);
		o.scrollLeft() !== sl && (scrollX = scrollX || true);
		//o.scrollLeft = sl;
		// test vertical
		var st = o.scrollTop();
		o.scrollTop(o.scrollTop() + (st > 0) ? -1 : 1);
		o.scrollTop() !== st && (scrollY = scrollY || true);
		//o.scrollTop = st;
	}
	// ret
	return {
		scrollX: scrollX,
		scrollY: scrollY
	};
};

// 固定表头核心处理
nstc.FixedTable.prototype.synScroll = function(instance) {
	var t_ths = instance.actFixedTable.find('th').filter(function() {
		return _$(this).css("display")!="none";
	});
	var t_th = instance.actTable.find('th:visible');
	var w_title = 0;
	var widths = {};
	var heights = {};
	var labelWidths = {};
	t_th.each(function(i, e) {		
/*
使用下面的代码替换，解决固定表头在有滚动条时，对不齐的问题。
		widths[i] = $(this).width();
		heights[i] ="20";
*/
		widths[i] = this.offsetWidth;
		heights[i] = this.offsetHeight;
		var _$eLabel = _$(this).find("label");
		labelWidths[i] = _$eLabel.size()>0?(_$eLabel.width()):-1;
	});
	
	// 隐藏实际表头，但占位
	//instance.actTable.find("thead").css("color","#f0f0f0");
	instance.actFixedDiv.show();
	var divClientWidth = instance.actDiv[0].clientWidth;
	var divOffsetWidth = instance.actDiv[0].offsetWidth;
	instance.actFixedDiv.width(divClientWidth!=0?divClientWidth:divOffsetWidth-17);
	instance.actTable.width(divClientWidth);

	// 如果有纵向滚动条，则重新设置宽度
	if (isScroll(instance.actTable).scrollY) {
		instance.actFixedDiv.width(divOffsetWidth-17);
		//instance.actTable.width(divOffsetWidth-17);
	}

	// 取实际表格内容，放在固定表头中，保证列宽一致
	/*var fixedTbody = instance.actFixedTable.find("tbody");
	var tbody = instance.actTable.find("tbody").find("tr:eq(0)").clone(false);
	if (fixedTbody.length == 0) {
		var bb = $("<tbody></tbody>");
		bb.append(tbody);
		instance.actFixedTable.append(bb);
	} else {
		$(fixedTbody[0]).append(tbody);
	}
	var fixedTheadTr = instance.actFixedTable.find("thead").find("tr");
	var fixedDivH = "";
	if (fixedTheadTr.length == 1)
	{
		fixedDivH = "26px";
	} else {
		fixedDivH = 24*fixedTheadTr+"px";
	}
	instance.actFixedDiv.css({"overflow-y":"hidden","height":fixedDivH});
	instance.actFixedTable.find("th").css({"word-break": "keep-all"});
	instance.actTable.find("th").css({"word-break": "keep-all"});
*/


	instance.actDiv.scroll(function(){
		instance.actFixedDiv.scrollLeft(_$(this).scrollLeft());
		if(instance.copyDiv!=null) {
			instance.copyDiv.scrollTop(_$(this).scrollTop());
		}
		
	});
	if(instance.copyFixedDiv!=null) {
		instance.copyFixedDiv.show();
	}
	//$("table.fixedtable").css("height", "99%");
	//$("#div_gridtable").css("overflow-x", "hidden");

	//instance.actDiv[0].style.height = instance.actDiv[0].clientHeight;
	/*
	// 注释掉袁成添加的代码，解决SMP-719
	instance.actDiv.parents('div')[1].style.height = instance.actDiv.parents('td')[1].clientHeight;
	instance.actDiv.parents('div')[0].style.height = instance.actDiv.parents('td')[0].clientHeight;
	//instance.actFixedDiv.parent().height(instance.actFixedDiv.parent().parent()[0].clientHeight);
	if (this.fixSize > 1) {
		instance.actDiv.parents('div')[1].style.height = instance.actDiv.find("table.GridUnitTable")[0].clientHeight+2;
		instance.actDiv.parents('div')[0].style.height = instance.actDiv.parents('td')[0].clientHeight;
	}*/

	//var divHeight = instance.actDiv.height();
	//var tableHeight = instance.actTable.height();
	if (instance.actFixedDiv.find("table:eq(0)")) {
		if ($("table[isEditColumnFixed='true']").length > 0) {
			instance.actFixedDiv.find("table:eq(0)").width(instance.actTable.width());
		}
	} else {
		instance.actFixedDiv.width(instance.actTable.width());
	}
	t_ths.each(function(i, e) {
		var isWidthFit = (labelWidths[i]==-1||widths[i]-labelWidths[i]-23>0)?true:false;
		var extraWidth = (_$(e).hasClass("sort_str")||_$(e).hasClass("sort_num")||_$(e).hasClass("sort_date"))&&(!isWidthFit)?23:0;
		_$(this).width(widths[i]+extraWidth);
		_$(t_th[i]).width(widths[i]+extraWidth);
		_$(this).height(heights[i]);
		_$(t_th[i]).height(heights[i]);
	});
}

nstc.FixedTable.prototype.initMergeAttribures = function() {
	if(window.Element){
	  !Element.prototype.mergeAttribute && (Element.prototype.mergeAttributes = function(src){
		var bPreserve = arguments[1] === undefined ? true : arguments[1],
			attrs = src.attributes,
			i = attrs.length - 1;
		for(;i>=0;i--){
		  var name = attrs[i].name;
		  if(bPreserve && name.toLowerCase() === 'id')
			continue;
		  this.setAttribute(name, attrs[i].value);
		}
	  })
  } 
}

nstc.FixedTable.prototype.copyCols = function(resultListOfTransCheck,left_title,div_left_title) {
	var tableFrag=document.createDocumentFragment();
	var table = document.getElementById(resultListOfTransCheck);
	tableFrag.appendChild(table.cloneNode(true));
	var _$copyTheadTableFrag = _$(tableFrag.firstChild).find("thead").clone(true);
	_$copyTheadTableFrag.find("tr th:gt(1)").remove();
	_$("#"+left_title).append(_$copyTheadTableFrag);
	var copyTbodyTableFrag = tableFrag.cloneNode(true);
	// 处理固定表头区
	var copyFixedTable = document.createElement("table");
	copyFixedTable.mergeAttributes(copyTbodyTableFrag.firstChild);
	copyFixedTable.setAttribute("id", left_title);
	var _$theadFrag = _$(copyTbodyTableFrag.firstChild).find("thead");
	var _$copyTheadFrag = _$theadFrag.clone(true);
	_$copyTheadFrag.find("th:gt(1)").remove();
	copyFixedTable.appendChild(_$copyTheadFrag[0].cloneNode(true));
	document.getElementById(div_left_title).appendChild(copyFixedTable);

	// 处理数据区
	_$(copyTbodyTableFrag.firstChild).attr("id",this.copyTableId);
	// 隐藏实际表头前2列
	var _$theadTrs = _$theadFrag.find("tr");
	_$theadTrs.each(function(i, e) {
		_$(e).find('th:gt(1)').each(function(j, m) {
			_$(m).remove();
		});
	});
	// 隐藏表体前2列
	var _$tbodyTrs = _$(copyTbodyTableFrag.firstChild).find("tbody tr");
	_$tbodyTrs.each(function(i, e) {
		_$(e).find('td:gt(1)').each(function(j, m) {
			_$(m).remove();
		});
	});
	
	var divLeftData = document.getElementById("div_left_data");
	divLeftData.appendChild(copyTbodyTableFrag);
}

nstc.FixedTable.prototype.hideCols = function(actTableId, fixedTableId) {
	_$("#"+this.fixedTableId+" thead tr th:lt(2)").hide();
	_$("#"+this.actTableId+" thead tr").each(function(i, e) {
		_$(e).find("th:lt(2)").hide();
	});
	_$("#"+this.actTableId+" tbody tr").each(function(i, e) {
		_$(e).find("td:lt(2)").hide();
	});
}

nstc.FixedTable.prototype.adjustCopyHeadWidth = function(left_title,left_data) {
	var widths = {};
	_$("#"+left_data+" tbody tr:first td:visible").each(function(i, e) {
		widths[i] = _$(e).outerWidth();
	});
	_$("#"+left_title+" thead tr th").each(function(i, e) {
		_$(e).width(widths[i]);
	});
	_$("#"+left_data+" thead tr th").each(function(i, e) {
		_$(e).width(widths[i]);
	});
}

nstc.FixedTable.prototype.adjustCopyBodyHeight = function() {
	var heights = {};
	this.actTable.find("tbody tr").each(function(i, e) {
		heights[i] = e.clientHeight;
	});
	this.copyTable.find("tbody tr").each(function(i, e) {
		_$(e).find("td").height(heights[i]);
	});
}

nstc.FixedTable.prototype.synRowColor = function(instance) {
	var _$leftTrs = instance.copyTable.find("tbody tr");
	var _$rightTrs = instance.actTable.find("tbody tr");
	// 右侧tr事件影响左侧
	this.leftRightGridColorEvent(instance, _$leftTrs, _$rightTrs);
	// 左侧tr事件影响右侧
	this.leftRightGridColorEvent(instance, _$rightTrs, _$leftTrs);
}

nstc.FixedTable.prototype.leftRightGridColorEvent = function(instance, _$left, _$right) {
	_$right.each(function(i, e) {
		_$(e).bind('click mouseout mouseover',function(event) {
			if(event.type=='click' && !instance.isClickHighlight 
					|| (event.type=='mouseout'||event.type=='mouseover') && !instance.isCursorFollowing) {
				return;
			}
			if(event.type=='click' && instance.isClickHighlight)
				smartForm_tr_onclick(_$left.eq(i)[0],0);
			else if(event.type=='mouseout' && instance.isCursorFollowing)
				smartForm_tr_onmouseout(_$left.eq(i)[0],0);
			else if(event.type=='mouseover' && instance.isCursorFollowing)
				smartForm_tr_onmouseover(_$left.eq(i)[0]);
		});
	});
}

// 绑定排序列
nstc.FixedTable.prototype.bindTableSort = function(instance) {
	var _$this = this;
	if(instance.actTable.find("thead tr th").filter(".sort_str,.sort_num,.sort_date").length == 0){return ;}
	//var _$actTableThs = instance.actTable.find("thead tr th:visible");
	var _$actTableThs = instance.actTable.find("thead tr th");
	var size = _$actTableThs.filter(".sort_str,.sort_num,.sort_date").size();
	if(size==0) {
		return;
	}
	var actTable = instance.actTable!=null?instance.actTable[0]:null;
	var actFixedTable = instance.actFixedTable!=null?instance.actFixedTable[0]:null;
	var _$lastRow = instance.actTable.find("tbody tr:last");
	// 是否有"合计"
	var hasTotal = (_$lastRow.find("th").size()*_$lastRow.find("td").size())>0?true:false;
	var sorter=new nstc.Sort(actTable,actFixedTable,instance.isFixed,1,hasTotal?1:0);
	_$actTableThs.each(function(i, e) {
		if(e.className!=null && e.className!="") {
			var arr = e.className.split(" ");
			if(_$.inArray("sort_num", arr)!=-1) {
				sorter.bindCell(i,'NUMBER');
			} else if(_$.inArray("sort_date", arr)!=-1) {
				sorter.bindCell(i,'DATE');
			} else if(_$.inArray("sort_str", arr)!=-1) {
				sorter.bindCell(i,'STRING');
			}
		}
	});
	if(instance.actFixedTable==null) {
		_$actTableThs.bind('click',function() {
			_$this.forkCssStyle(instance);
		});
	} else {
		var _$fixThs = instance.actFixedTable.find("thead tr th");
		_$fixThs.each(function(i, e) {
			_$(e).bind('click',function() {
				_$actTableThs.eq(this.cellIndex).trigger("click");
				_$this.forkCssStyle(instance);
			});
		});
	}
	
}

nstc.FixedTable.prototype.linkTriggerSort = function(primaryTableId, minorTableId) {
	var mThs = _$("#"+minorTableId+" thead tr th");
	_$("#"+primaryTableId+" thead tr th").each(function(i, e) {
		_$(e).bind('click', function() {
			mThs.filter(":eq("+i+")").trigger('click');
		}).bind('click',function() {
			//this.forkCssStyle(this.actTableId);
			//this.forkCssStyle(this.copyTableId);
		});		
	});
}

// 间隔样式
nstc.FixedTable.prototype.forkCssStyle = function(instance) {
	// 如设置无需交替行样式,则直接返回
	if(!instance.isAlternate) return;
	var _$trs = _$("#"+instance.actTable.attr("id")+" tbody tr:visible");
	_$trs.each(function(i, e) {
		//移除底色样式
		e.style.backgroundColor = "";
		e.className=(e.className=="rowSelected")?"rowSelected":(i%2==0?"rowCss1":"rowCss2");
	});
}

// 排序后间隔样式调整
nstc.FixedTable.prototype.forkCssStyleAfterSort =  function(resultListOfTransCheck,left_data) {
	forkCssStyle(resultListOfTransCheck);
	forkCssStyle(left_data);
}