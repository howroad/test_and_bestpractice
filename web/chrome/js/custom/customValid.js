/**
 * 验证编号唯一性
 * @param obj
 */
function smartForm_uniqueValid(obj) {
	var form = nstc.sf.findParent(obj, "FORM");
	form.action = obj.id + ".sf";
	var uniqueFlag = false;
	var flag = nstc.sf.validateForm(obj);
	if (true == flag){
		var id = $(nstc.sf.findParent(obj,"FORM")).attr("id");
		var inStr = "";
		if(id){
			inStr="#"+id+" ";
		}
		inStr = inStr + "input[name='dbms_remittingbank.bankno']"+":visible";
		var vinputs = $(inStr);
		for ( var i = 0; i < vinputs.length; i++) {
			var input = vinputs[i];
			var one = input.value;
			var temp = "input[name='dbms_remittingbank.bankno'][value='"+one+"']";
			var len = $(temp).length;
			if(len>1){
				alert('编号'+one+'不能重复');
				uniqueFlag = true;
				return;
			}
		}
		if(!uniqueFlag){
			form.submit();
		}
	}
	
}
