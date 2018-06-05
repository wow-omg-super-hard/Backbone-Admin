/**
 * 路由处理(让url具有绑定action和监听url变化并且触发action)
 * 解决两个问题
 * 1、点击浏览器前进后退时，会离开网站
 * 2、进入到特定的url中，网站不能记住这个url映射的页面，会回到应用初始状态
 * 默认backbone的History使用onhashchange来监听url的变化，如果是不支持这个方法的浏览器（ie），则使用setInterval心跳监听
 * 还可以使用pushState，能操作当前浏览器的url，同时不会导致页面刷新
 * pushState和replaceState只是将url添加到浏览器历史和改变当前url，而不会进行跳转，还需要监听onpopstate事件
 *
 */

import Backbone from 'backbone';

export default function createAppRouter () {
  const AppRouter = Backbone.Router.extend({
    routes: {
      '': 'main',
      'topic': 'renderTopic'
    },

    main() {
      console.log('main');
    },

    renderTopic() {
      console.log('topic');
    }
  });

  new AppRouter();
  Backbone.history.start({ pushState: true, hashChange: false });
}
