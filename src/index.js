/**
 * 入口文件，初始化第三方库或框架
 * 初始化路由
 */

import createRoute from 'routers/app-router';
import AppView from 'views/AppView';

// 初始化路由
createRoute(AppView);

// 针对开发环境，热替换hack
if (NODE_ENV === 'dev') {
  if (module.hot) {
    module.hot.accept('views/AppView', () => {
      const AppViewA = require('views/AppView').default;
      createRoute(AppPageA, true);
    });
  }
}
