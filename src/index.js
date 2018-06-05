/**
 * 入口文件，初始化第三方库或框架
 * 初始化路由
 */

import createRoute from 'routes/route';
import MainPageView from 'views/MainPageView';

// 初始化路由
createRoute(MainPageView);

// 针对开发环境，热替换hack
if (NODE_ENV === 'dev') {
  if (module.hot) {
    module.hot.accept('views/MainPageView', () => {
      const MainPage = require('views/MainPageView').default;
      createRoute(MainPage, true);
    });
  }
}
