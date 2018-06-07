import { findIndex } from 'underscore';
import { Model } from 'backbone';

export default Model.extend({
  defaults() {
    return {
      // 是否显示下拉菜单
      'can_visible': false
    };
  },

  toggleVisible() {
    return this.set('can_visible', !this.get('can_visible'));
  }
});
