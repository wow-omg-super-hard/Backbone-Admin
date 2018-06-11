import { View } from 'backbone';
import { template, extend } from 'underscore';
import tmpl from './table-item.tmpl.html';
import TableRowModel from './TableRowModel';

export default function createTableRowView (columns) {
  return View.extend({
    initialize() {
      extend(this, { columns, tableRowModel: new TableRowModel });

      this.listenTo(this.tableRowModel, 'change:selected', this.toggleSelected);
      this.render();
    },

    tagName: 'tr',

    template: template(tmpl),

    events: {
      'click input[type="checkbox"]': 'selectHandle'
    },

    render() {
      this.$el.html(
        this.template({
          tds: this.getDataListByModel()
        })
      );
    },

    getDataListByModel() {
      const datalist = [];
      let value;

      datalist.id = this.model.get(this.model.idAttribute);

      this.columns.forEach(column => {
        value = this.model.get(column.dataKey);

        if (column.render) {
          value = column.render(value);
        }

        datalist.push(value);
      });

      return datalist;
    },

    toggleSelected(model) {
      this.$('input[type="checkbox"]').attr('checked', model.get('selected'));
    },

    selectHandle() {
      this.tableItemModel.toggleSelected();
    }
  });
}
