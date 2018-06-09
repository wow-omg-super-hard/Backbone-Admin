import { Model } from 'backbone';

export default Model.extend({
  defaults() {
    return {
      // 是否请求数据中
      fetching: false
    };
  }

  toggleFetching() {
    this.set('fetching', !this.get('fetching'));
  }
});
