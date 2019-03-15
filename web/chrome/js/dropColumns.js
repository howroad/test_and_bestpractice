//编辑隐藏与显示的列
if (!nstc)
    var nstc = {};
if (!nstc.sf)
    nstc.sf = {};
nstc.sf.dropColumns={};
nstc.sf.dropColumns._table;
nstc.sf.dropColumns._columns;
nstc.sf.dropColumns._hiddenColums;
nstc.sf.dropColumns._isFixedHead = false;
function dropColumns(){
    var tables=document.getElementsByTagName('table');
    var id="NULL";
    for(ti=0;ti<tables.length;ti++){
        if($(tables[ti]).attr('isEditColumn')=='true'){
            id=tables[ti].id;
        } else if ($(tables[ti]).attr('isEditColumnFixed')=='true') {
            id=tables[ti].id;
            nstc.sf.dropColumns._isFixedHead = true;
        }
    }
    if(id=="NULL"){
        return;
    }
    initDrop(id);
}
function  initDrop(id){
    var tmpVal = "";
    nstc.sf.dropColumns._table=$("#"+id);
    nstc.sf.dropColumns._columns=$("#"+id).find("thead").find("label");
    var columnsTh=$(nstc.sf.dropColumns._columns).parent();
    if ($("#dropColumns_hiddenColumnEdit").length == 0) {
        $(nstc.sf.dropColumns._table).parent().append('<input type="hidden" id="dropColumns_hiddenColumns" class="tip" /><div id="dropColumns_hiddenColumnEdit" style="width:80%;display:none"></div>');
        var chtml = "<span>隐藏列:</span>";
        for(var i=0;i<nstc.sf.dropColumns._columns.length;i++){
            var checkedStr="";
            if($(columnsTh[i]).css("display")=="none"){
                checkedStr='checked="true"';
                tmpVal += $(nstc.sf.dropColumns._columns[i]).html()+";";
            }
            //chtml += "<div style='word-wrap:break-word; width:450px; '>";
            chtml += '<div style="float:left;padding:15px;white-space:nowrap;"><input type="checkbox" '+checkedStr+' name="columns" value="1" class="{required:true}" /><span style="margin-left:10px">'
                +$(nstc.sf.dropColumns._columns[i]).html()+'</span></div>';
            //chtml += "</div>";
        }
        var divVar=$("#dropColumns_hiddenColumnEdit");
        $(divVar).html(chtml);
        var dia = $.dialog(
            {
                title: "隐藏列", width: "500px",
                content: $(divVar).html(),
                close: function () {
                    this.hide();
                    return false;
                }
            }
        ).hide();
    }
    if (nstc.sf.dropColumns._isFixedHead) {
        $( nstc.sf.dropColumns._table).parent().prev().find("thead").dblclick(function () {
            try {
                dia.show();
            } catch(e) {}
        });
    } else {
        $( nstc.sf.dropColumns._table).find("thead").dblclick(function () {
            dia.show();
        });
    }
    var _hiddenColums=$("#dropColumns_hiddenColumns");
    $(_hiddenColums).val(tmpVal);
    $("input[name='columns']").click(function () {
        try {
            nstc.sf.dropColumns._columns=$("#"+id).find("thead").find("label");
            if ($(this).attr("checked")) {
                $(_hiddenColums).val($(_hiddenColums).val() + $(this).parent().text() + ";");
            } else {
                if ($(this).parent().text() == "" && $(_hiddenColums).val().indexOf(";;") > -1)
                {
                    $(_hiddenColums).val($(_hiddenColums).val().replace(';;', ";"));
                } else {
                    $(_hiddenColums).val($(_hiddenColums).val().replace($(this).parent().text() + ';', ""));
                }
            }
            var hiddenColumns= $(_hiddenColums).val().split(";");
            showColumnAll();
            for(var i=0;i<hiddenColumns.length-1;i++){
                for(var j=0;j<nstc.sf.dropColumns._columns.length;j++){
                    var  mes = $(nstc.sf.dropColumns._columns[j]).html().replace( /^\s+|\s+$/g, "" );
                    if(mes==hiddenColumns[i].trim()){
                        hiddenColumn(j);
                    }
                }
            }
            try {
                resetFixTitle();
                fixTableObj.keetDefault();
            } catch (e) {}
        } catch (e) {
            $(_hiddenColums).val("");
        }
    })

}
function hiddenColumn(j){
    if (nstc.sf.dropColumns._isFixedHead) {
        hiddenColumnFixed(j);
    }
    var trs=$(nstc.sf.dropColumns._table).find("tr");
    var len = trs[0].cells.length - $("#dropColumns_hiddenColumnEdit").find("input").length;
    $(trs).each(function(){
        var cell=this.cells[j+len];
        $(cell).css("display","none");
    });
}
function hiddenColumnFixed(j){
    var trs=$(nstc.sf.dropColumns._table).parent().prev().find("tr");
    var len = trs[0].cells.length - $("#dropColumns_hiddenColumnEdit").find("input").length;
    $(trs).each(function(){
        var cell=this.cells[j+len];
        $(cell).css("display","none");
    });
}
function showColumnAll(){
    if (nstc.sf.dropColumns._isFixedHead) {
        //resizableColumns();
        showColumnAllFixed();
    }
    var ths=$(nstc.sf.dropColumns._table).find("th");
    var trs=$(nstc.sf.dropColumns._table).find("tr");
    var lastIndex=0;
    $(ths).each(function(i){
        $(this).css("display","");
        lastIndex=i;
    });
    for(var i=1;i<trs.length;i++){
        if($(trs[i]).attr("id").trim()==""){
            var tds=$(trs[i]).find("td");
            $(tds).each(function(j){
                if(j<=lastIndex){
                    $(this).css("display","");
                }
            });
        }
    }
}
function showColumnAllFixed() {
    var ths=$(nstc.sf.dropColumns._table).parent().prev().find("th");
    $(ths).each(function(i){
        $(this).css("display","");
    });
    var trs=$(nstc.sf.dropColumns._table).parent().prev().find("tr");
    $(trs).each(function(i){
        $(this).css("display","");
    });
}
function resetFixTitle() {
    // 结束宽度调整后，保证固定表头列宽不小于普通表头，需重新设置
    try {
        var table = $(nstc.sf.dropColumns._table)[0];
        var trs=$(nstc.sf.dropColumns._table).parent().prev().find("tr");
        for (var i = 0; i < table.rows[0].cells.length; i++) {
            trs[0].cells[i].style.width = table.rows[0].cells[i].offsetWidth;
            table.rows[0].cells[i].style.width = trs[0].cells[i].style.width;
        }
    } catch(e) {}
}
