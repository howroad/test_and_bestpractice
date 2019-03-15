//通过拖拽对列进行排序
if (!nstc)
    var nstc = {};
if (!nstc.sf)
    nstc.sf = {};
nstc.sf.dragColumns={};
nstc.sf.dragColumns.Util = new Object;
nstc.sf.dragColumns._table;
nstc.sf.dragColumns._row;
nstc.sf.dragColumns._column = new Array();
nstc.sf.dragColumns._fromIndex = -1;
nstc.sf.dragColumns._toIndex = -1;
nstc.sf.dragColumns._canDragFromIndex = 0;
nstc.sf.dragColumns._tempDragTarget;
nstc.sf.dragColumns._fromDragTarget;
nstc.sf.dragColumns._toDropTarget;
nstc.sf.dragColumns._isDrag = false;
nstc.sf.dragColumns.whenCanDropToTargStyle = "";
nstc.sf.dragColumns.whenCannotDropToTargStyle = "";
nstc.sf.dragColumns._isFixedHead = false;
function dragColumns(){
    var tables=document.getElementsByTagName('table');
    var id="NULL";
    for(ti=0;ti<tables.length;ti++){
        if($(tables[ti]).attr('isEditColumn')=='true'){
            id=tables[ti].id;
        } else if ($(tables[ti]).attr('isEditColumnFixed')=='true') {
            id=tables[ti].id;
            nstc.sf.dragColumns._isFixedHead = true;
        }
    }
    if(id=="NULL"){
        return;
    }
    Drag(id);
}
function Drag(table){
    var ochek=document.getElementById(table+".content");
    $(ochek).append('<div id="box"></div>');
    var otable=document.getElementById(table);
    var otody=otable.tBodies[0];
    var oth=otable.getElementsByTagName("th");
    /*if (nstc.sf.dragColumns._isFixedHead) {
     oth = otable.parentNode.previousSibling.getElementsByTagName("th");
     // oth = $(otable).parent().prev().find("th");
     }*/
    var otd=otody.getElementsByTagName("td");
    var box=document.getElementById("box");
    var cls = "";
    arrn=[];
    for (var i = 0; i < otd.length; i++) {
        // 给tbody内的所有td添加点击事件，实现拖拽功能
        otd[i].onmousedown=function(e){
            var idx = getCellIndex(this);
            if (oth[idx].getAttribute("banedit") == "true") {
                return;
            }
            var e=e||window.event,
                target = e.target||e.srcElement,
                thW = target.offsetWidth,
                maxl=ochek.offsetWidth-thW,
                rows=otable.rows,
                ckL=ochek.offsetLeft,
                scrollL = $(ochek).find("div:eq(0)").scrollLeft() || $("body").scrollLeft(),
                disX=target.offsetLeft,
                _this=this,
                _align=target.getAttribute("align"),
                cdisX=e.clientX - ckL - disX;
            // 如果点击的元素不是td（td内的内容）时，不触发拖拽事件
            if (target.tagName.toLowerCase() != "td") {
                return;
            }
            // 获取点击列表头样式
            cls = otable.rows[0].cells[getCellIndex(this)].className;
            // 获取点击列的元素，创建可拖动列内容
            for (var i = 0; i < rows.length; i++) {
                var op=document.createElement("p");
                op.innerHTML=rows[i].cells[getCellIndex(this)].innerHTML;
                if (rows[i].style.display == "none") {
                    op.style.display = "none";
                }
                box.appendChild(op);
            }
            // 保存列位置
            for (var i = 0; i < oth.length; i++) {
                arrn.push(oth[i].offsetLeft);
            }
            box.style.display="block";
            box.style.zIndex = "210";
            box.style.width=thW+"px";
            box.style.left=(nstc.sf.dragColumns._isFixedHead ? (disX - scrollL) : disX)+"px";
            box.style.cursor = "move";
            // 列移动事件处理
            document.onmousemove=function(e){
                var e=e||window.event,
                    target = e.target||e.srcElement,
                    thW = target.offsetWidth;
                box.style.top=0;
                box.style.left=e.clientX-ckL-cdisX-(nstc.sf.dragColumns._isFixedHead ? scrollL : 0)+"px";
                if(box.offsetLeft>maxl){
                    box.style.left=maxl+"px";
                }else if(box.offsetLeft<0){
                    box.style.left=0;
                }
                document.onselectstart=function(){return false};
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            }
            // 放置列事件处理
            document.onmouseup=function(e){
                var e=e||window.event,
                    opr=box.getElementsByTagName("p"),
                    oboxl=box.offsetLeft+cdisX+(nstc.sf.dragColumns._isFixedHead ? (2*scrollL) : scrollL);
                e.mouseDown =false;
                box.style.cursor = "default";

                // 计算拖动列改变后的列位置序号
                for (var i = 0; i < arrn.length; i++) {
                    if(arrn[i]<oboxl&&$(rows[0].cells[i]).css("display")!="none"){
                        var index=i;
                    }
                }
                if (oth[index].getAttribute("banedit") == "true") {
                    arrn.splice(0,arrn.length);
                    box.innerHTML="";
                    box.style.display="none";
                    document.onmousemove=null;
                    document.onmouseup=null;
                    document.onselectstart=function(){return false};
                    saveColumnsStyle();
                    return;
                }
                for (i = 0; i < rows.length; i++) {
                    var moveW = rows[0].cells[getCellIndex(_this)].style.width || rows[0].cells[getCellIndex(_this)].clientWidth;
                    if (i == 0) {
                        // 两列事件互换
                        var eventClick = rows[0].cells[getCellIndex(_this)].onclick;
                        var eventMSover = rows[0].cells[getCellIndex(_this)].onmouseover;
                        var eventMSout = rows[0].cells[getCellIndex(_this)].onmouseout;
                        rows[0].cells[getCellIndex(_this)].onclick = rows[0].cells[index].onclick;
                        rows[0].cells[getCellIndex(_this)].onmouseover = rows[0].cells[index].onmouseover;
                        rows[0].cells[getCellIndex(_this)].onmouseout = rows[0].cells[index].onmouseout;
                        rows[0].cells[index].onclick = eventClick;
                        rows[0].cells[index].onmouseover = eventMSover;
                        rows[0].cells[index].onmouseout = eventMSout;

                        // 防止表头中的排序图标丢失
                        var html = rows[0].cells[getCellIndex(_this)].innerHTML;
                        rows[0].cells[getCellIndex(_this)].innerHTML = rows[0].cells[index].innerHTML;
                        rows[0].cells[getCellIndex(_this)].setAttribute("align", rows[0].cells[index].getAttribute("align"));
                        rows[0].cells[getCellIndex(_this)].className = rows[0].cells[index].className;
                        rows[0].cells[getCellIndex(_this)].style.width = rows[0].cells[index].style.width || rows[0].cells[index].clientWidth;
                        rows[0].cells[index].innerHTML = html;
                        rows[0].cells[index].setAttribute("align", _align);
                        rows[0].cells[index].className = cls;
                        rows[0].cells[index].style.width = moveW;
                        // 固定表头处理
                        if (nstc.sf.dragColumns._isFixedHead) {
                            var eventClickFixed = $(otable).parent().prev().find("th")[getCellIndex(_this)].onclick;
                            var eventMSoverFixed = $(otable).parent().prev().find("th")[getCellIndex(_this)].onmouseover;
                            var eventMSoutFixed = $(otable).parent().prev().find("th")[getCellIndex(_this)].onmouseout;
                            $(otable).parent().prev().find("th")[getCellIndex(_this)].onclick = $(otable).parent().prev().find("th")[index].onclick;
                            $(otable).parent().prev().find("th")[getCellIndex(_this)].onmouseover = $(otable).parent().prev().find("th")[index].onmouseover;
                            $(otable).parent().prev().find("th")[getCellIndex(_this)].onmouseout = $(otable).parent().prev().find("th")[index].onmouseout;
                            $(otable).parent().prev().find("th")[index].onclick = eventClickFixed;
                            $(otable).parent().prev().find("th")[index].onmouseover = eventMSoverFixed;
                            $(otable).parent().prev().find("th")[index].onmouseout = eventMSoutFixed;

                            // 防止表头中的排序图标丢失
                            var htmlFixed = $(otable).parent().prev().find("th")[getCellIndex(_this)].innerHTML;
                            $(otable).parent().prev().find("th")[getCellIndex(_this)].innerHTML = $(otable).parent().prev().find("th")[index].innerHTML;
                            $(otable).parent().prev().find("th")[getCellIndex(_this)].className = $(otable).parent().prev().find("th")[index].className;
                            $(otable).parent().prev().find("th")[getCellIndex(_this)].style.width = $(otable).parent().prev().find("th")[index].style.width || $(otable).parent().prev().find("th")[index].clientWidth;
                            $(otable).parent().prev().find("th")[index].innerHTML = htmlFixed;
                            $(otable).parent().prev().find("th")[index].className = cls;
                            $(otable).parent().prev().find("th")[index].style.width = moveW;
                        }
                    } else {
                        // 原始列（拖动）内容更新为被替换列内容
                        rows[i].cells[getCellIndex(_this)].innerHTML="";
                        rows[i].cells[getCellIndex(_this)].innerHTML=rows[i].cells[index].innerHTML;
                        rows[i].cells[getCellIndex(_this)].setAttribute("align", rows[i].cells[index].getAttribute("align"));
                        // 使用拖动列内容更新被替换列内容
                        rows[i].cells[index].innerHTML="";
                        rows[i].cells[index].innerHTML=opr[i].innerHTML;
                        rows[i].cells[index].setAttribute("align", _align);
                    }
                }
                arrn.splice(0,arrn.length);
                box.innerHTML="";
                box.style.display="none";
                document.onmousemove=null;
                document.onmouseup=null;
                document.onselectstart=function(){return false};
                if (nstc.sf.dragColumns._isFixedHead) {
                    try {
                        fixTableObj.keetDefault();
                    } catch (e) {}
                    resizableColumns();
                }
                resetFixTitle();
                saveColumnsStyle();
            }

        }
    };

}
