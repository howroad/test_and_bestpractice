(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "CheckboxSelectColumn": CheckboxSelectColumn
    }
  });


  function CheckboxSelectColumn(options) {
    var _grid;
    var _self = this;
    var _handler = new Slick.EventHandler();
    var _selectedRowsLookup = {};
	var _showtext_slickCnt = {};
    var _defaults = {
      columnId: "_checkbox_selector",
      cssClass: null,
      toolTip: "Select/Deselect All",
      width: 30
    };

    var _options = $.extend(true, {}, _defaults, options);

    function init(grid) {
      _grid = grid;
      _handler
        .subscribe(_grid.onSelectedRowsChanged, handleSelectedRowsChanged)
        .subscribe(_grid.onClick, handleClick)
        .subscribe(_grid.onHeaderClick, handleHeaderClick)
        .subscribe(_grid.onKeyDown, handleKeyDown);
    }

    function destroy() {
      _handler.unsubscribeAll();
    }

    function handleSelectedRowsChanged(e, args) {
      var selectedRows = _grid.getSelectedRows();
      var lookup = {}, row, i;
      for (i = 0; i < selectedRows.length; i++) {
        row = selectedRows[i];
        lookup[row] = true;
        if (lookup[row] !== _selectedRowsLookup[row]) {
          _grid.invalidateRow(row);
          delete _selectedRowsLookup[row];
        }
      }
      for (i in _selectedRowsLookup) {
        _grid.invalidateRow(i);
      }
      _selectedRowsLookup = lookup;
      _grid.render();
	  var _showtext_slickCnt_count = 0;
	  $.each(_showtext_slickCnt, function(i_key,i_value){
		_showtext_slickCnt_count= 1+_showtext_slickCnt_count;
	  });
      if (selectedRows.length && selectedRows.length == _grid.getDataLength()-_showtext_slickCnt_count ) {
        _grid.updateColumnHeader(_options.columnId, "<input type='checkbox' checked='checked'>", _options.toolTip);
      } else {
        _grid.updateColumnHeader(_options.columnId, "<input type='checkbox'>", _options.toolTip);
      }
    }

    function handleKeyDown(e, args) {
      if (e.which == 32) {
        if (_grid.getColumns()[args.cell].id === _options.columnId) {
          // if editing, try to commit
          if (!_grid.getEditorLock().isActive() || _grid.getEditorLock().commitCurrentEdit()) {
            toggleRowSelection(args.row);
          }
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      }
    }

    function handleClick(e, args) {
      // clicking on a row select checkbox
      if (_grid.getColumns()[args.cell].id === _options.columnId && $(e.target).is(":checkbox")) {
        // if editing, try to commit
        if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }

        toggleRowSelection(args.row);
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }

    function toggleRowSelection(row) {
      if (_selectedRowsLookup[row]) {
        _grid.setSelectedRows($.grep(_grid.getSelectedRows(), function (n) {
          return n != row
        }));
      } else {
        _grid.setSelectedRows(_grid.getSelectedRows().concat(row));
      }
    }

    function handleHeaderClick(e, args) {
      if (args.column.id == _options.columnId && $(e.target).is(":checkbox")) {
        // if editing, try to commit
        if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }

        if ($(e.target).is(":checked")) {
          var rows = [];
          for (var i = 0; i < _grid.getDataLength(); i++) {
			var __temRowData = _grid.getDataItem(i);
			if(isNullOrUndefined_SG(_showtext_slickCnt[__temRowData.slickCnt] )){
	            rows.push(i);
			}
          }
          _grid.setSelectedRows(rows);
        } else {
          _grid.setSelectedRows([]);
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }

    function getColumnDefinition() {
      return {
        id: _options.columnId,
        name: "<input type='checkbox'>",
        toolTip: _options.toolTip,
        field: "sel",
        width: _options.width,
        resizable: false,
        sortable: false,
        cssClass: _options.cssClass,
        formatter: checkboxSelectionFormatter
      };
    }

    function checkboxSelectionFormatter(row, cell, value, columnDef, dataContext) {
      if(!isNullOrUndefined_SG(_showtext_slickCnt[dataContext.slickCnt])){
		return 'ÒÑÑ¡Ôñ';
      }
      if (dataContext) {
        return _selectedRowsLookup[row]
            ? "<input type='checkbox' checked='checked'>"
            : "<input type='checkbox'>";
      }
      return null;
    }

	function set_showtext_slickCnt(i_showtext_slickCnt){
		_showtext_slickCnt = i_showtext_slickCnt
	}
    $.extend(this, {
      "init": init,
      "destroy": destroy,

      "set_showtext_slickCnt": set_showtext_slickCnt,
	  "getColumnDefinition": getColumnDefinition
    });
  }
})(jQuery);