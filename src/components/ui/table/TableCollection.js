import { Collection } from 'backbone';
import TableRowModel from './TableRowModel';

export default Collection.extend({
  model: TableRowModel,

  getSelectedList() {
    return this.filter(item => item.get('selected'));
  }
});
