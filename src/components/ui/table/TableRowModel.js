import { Model } from 'backbone';

export default Model.extend({
  defaults() {
    return {
      selected: false
    };
  },

  toggleSelected() {
    this.set('selected', !this.get('selected'));
  }
});
