/**
 * 初始化一级view
 * 路由处理(让url具有绑定action和监听url变化并且触发action)
 * 解决两个问题
 * 1、点击浏览器前进后退时，会离开网站
 * 2、进入到特定的url中，网站不能记住这个url映射的页面，会回到应用初始状态
 * 默认backbone的History使用onhashchange来监听url的变化，如果是不支持这个方法的浏览器（ie），则使用setInterval心跳监听
 * 还可以使用pushState，能操作当前浏览器的url，同时不会导致页面刷新
 * pushState和replaceState只是将url添加到浏览器历史和改变当前url，而不会进行跳转，还需要监听onpopstate事件
 *
 */

import { Router } from 'backbone';

export default function createRouter (AppView, noStartHistory) {
  const AppRouter = Router.extend({
    initialize() {
      // 初始化主View
      this.appView = new AppView();
    },

    routes: {
      '': 'main',
      'topic': 'renderTopic'
    },

    main() {

    },

    renderTopic() {
      this.setView();
    },

    setMainView(view) {
      this.cleanMainView();
      this.mainView = view.render().appendTo(this.appView.$el);
    },

    cleanMainView() {
      if (this.mainView) {
        this.mainView.remove();
        this.mainView = null;
      }
    }
  });

  // 初始化Router，通过路由规则绑定action
  new AppRouter();

  // 监听url变化，触发action
  if (!noStartHistory) {
    Backbone.history.start();
  }
}
