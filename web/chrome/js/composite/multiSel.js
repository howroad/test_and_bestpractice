/**
 * 
 */
/*--------- ÃüÃû¿Õ¼ä ---------*/
if (!nstc)
	var nstc = {};
if (!nstc.sf)
	nstc.sf = {};
nstc.sf.changeMultiboxValue = function(ele) {
	var brotherNodes = ele.parentNode.childNodes;
	var hiddenEle = null;
	var selectValues = '';
	for ( var i = 0; i < brotherNodes.length; i++) {
		var node = brotherNodes[i];
		if (node.type && 'checkbox' == node.type && node.checked) {
			selectValues += node.value + ',';
		}
		if (node.type && 'hidden' == node.type) {
			hiddenEle = node;
		}
	}
	if ('' != selectValues) {
		selectValues = selectValues.substring(0, selectValues.length - 1);
	}
	hiddenEle.value = selectValues;
	nstc.sf.changeFlag(ele.parentNode, 'modified');
};