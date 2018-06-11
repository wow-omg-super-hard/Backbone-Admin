import { View } from 'backbone';
import { extend, template } from 'underscore';
import TableCollection from './TableCollection';
import createTableRowView from './TableRowView';
import style from './table.css';
import tmpl from './table.tmpl.html';

export default function createTableCom (columns, className) {
  return View.extend({
    initialize() {
      extend(this, { columns, tableCollection: new TableCollection });

      this.listenTo(this.collection, 'reset', this.render);
      this.render(this.collection);
    },

    className,

    tagName: 'table',

    template: template(tmpl),

    render(collection) {
      this.$el.html(this.template({ columns }));

      collection.forEach(model => {
        const tableRowView = new (createTableRowView(this.columns))({ model });
        this.$('tbody').append(tableRowView.$el);
      });
    }
  });
}
