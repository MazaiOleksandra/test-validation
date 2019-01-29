function drawTable() {


    var defaultSettings = {
            header:        true,
            noRowsMessage: 'No items',
            classPrefix:   'json'
        },
        getSetting = function (name) {
            var settings = this.props.settings;

            if (!settings || typeof settings[name] == 'undefined')
                return defaultSettings[name];

            return settings[name];
        };

    var TableBuilder = React.createClass({
        getSetting: getSetting,

        render: function () {
            var cols = this.normalizeColumns(),
                contents = [this.renderRows(cols)];

            if (this.getSetting('header'))
                contents.unshift(this.renderHeader(cols));

            var tableClass = this.props.className || this.getSetting('classPrefix') + 'Table';

            return React.DOM.table({className: tableClass}, contents);
        },

        renderHeader: function (cols) {
            var me = this,
                prefix = this.getSetting('classPrefix'),
                headerClass = this.getSetting('headerClass');

            var cells = Object.keys(cols[0]).map(function (col, index) {
                return React.DOM.th(
                    {className: col, key: col, onClick: me.onClickHeader, "data-key": col},
                    window.getColumnName(col)
                );
            });

            return React.DOM.thead({key: 'th'},
                React.DOM.tr({className: prefix + 'Header'}, cells)
            );
        },

        renderRows: function (cols) {
            var me = this,
                items = this.props.items,
                settings = this.props.settings || {},
                i = 1;

            if (!items || !items.length)
                return React.DOM.tbody(
                    {key: 'body'},
                    [React.DOM.tr(
                        {key: 'row'},
                        React.DOM.td(
                            {key: 'column'},
                            this.getSetting('noRowsMessage')
                        )
                    )]);

            var rows = items.map(function (item) {
                var key = me.getKey(item, i);
                return React.createElement(Row, {
                    key:         key,
                    reactKey:    key,
                    item:        item,
                    settings:    settings,
                    columns:     cols,
                    i:           i++,
                    onClickRow:  me.onClickRow,
                    onClickCell: me.onClickCell
                });
            });

            return React.DOM.tbody({key: 'body'}, rows);
        },

        getItemField: function (item, field) {
            return item[field];
        },

        normalizeColumns: function () {
            var getItemField = this.props.cellRenderer || this.getItemField,
                cols = this.props.items,
                items = this.props.items
                ;
            return cols;

            if (!cols) {
                if (!items || !items.length)
                    return [];

                return Object.keys(items[0]).map(function (key) {
                    return {key: key, label: key, cell: getItemField};
                });
            }

            return cols.map(function (col) {
                var key;
                if (typeof col == 'string') {
                    return {
                        key:   col,
                        label: col,
                        cell:  getItemField
                    };
                }

                if (typeof col == 'object') {
                    key = col.key || col.label;

                    return {
                        key:   key,
                        label: col.label || key,
                        cell:  col.cell || getItemField
                    };
                }

                return {
                    key:  'unknown',
                    name: 'unknown',
                    cell: 'Unknown'
                };
            });
        },

        getKey: function (item, i) {
            var field = this.props.settings && this.props.settings.keyField;
            if (field && item[field])
                return item[field];

            if (item.id)
                return item.id;

            if (item._id)
                return item._id;

            return i;
        },

        shouldComponentUpdate: function () {
            return true;
        },

        onClickRow: function (e, item) {
            if (this.props.onClickRow) {
                this.props.onClickRow(e, item);
            }
        },

        onClickHeader: function (e) {
            if (this.props.onClickHeader) {
                this.props.onClickHeader(e, e.target.dataset.key);
            }
        },

        onClickCell: function (e, key, item) {
            if (this.props.onClickCell) {
                this.props.onClickCell(e, key, item);
            }
        }
    });

    var Row = React.createClass({

        render: function () {
            var me = this,
                props = this.props,
                items = Object.keys(props.item);

            var cells = items.map(function (key, val) {
                var content = props.item[key];
                console.log(content);

                if (typeof content == 'function')
                    content = content(props.item, key);

                return React.DOM.td({
                    className:  key,
                    key:        key,
                    "data-key": key,
                    onClick:    me.onClickCell
                }, content);
            });

            return React.DOM.tr({
                onClick: me.onClickRow,
                key:     this.props.reactKey
            }, cells);
        },

        onClickCell: function (e) {
            this.props.onClickCell(e, e.target.dataset.key, this.props.item);
        },

        onClickRow: function (e) {
            this.props.onClickRow(e, this.props.item);
        }
    });

    $.getJSON(
        'request.php', {act: 'get_table'},
        function (data) {
            ReactDOM.render(
                <TableBuilder items={data} className="nrm_table"/>,
                document.getElementById('table')
            );
        });
}

drawTable();