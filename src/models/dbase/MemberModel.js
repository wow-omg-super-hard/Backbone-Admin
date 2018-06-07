import { Model } from 'backbone';

export default Model.extend({
  // 数据设置默认值，一般是针对数据而不是状态
  // 数据和状态的区别是数据不会变化，而状态会变化
  defaults: {
    usernick: '',
    sex: 0,
    email: '',
    address: '',
    create_time: '',
    can_enabled: false
  },

  // 和后台交互的根url
  urlRoot: ''

  // 切换'can_enabled'字段
  toggle() {
    this.save({
      'can_enabled': !this.get('can_enabled')
    });
  }
});
