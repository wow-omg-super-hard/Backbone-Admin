import { Model } from 'backbone';

export default Model.extend({
  defaults() {
    return {
      fetching: false
    }
  },

  fetching() {
    this.set('fetching', true);
  },

  fetched() {
    this.set('fetching', false);
  }
});
