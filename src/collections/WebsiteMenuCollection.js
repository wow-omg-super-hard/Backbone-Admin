import { Collection } from 'backbone';
import config from '../../config';
import MenuModel from 'models/dbase/WebsiteMenuModel';

export default Collection.extend({
  urlRoot: `${ config.api.host }:${ config.api.port }/${ config.api.pathname }/menus`,

  model: MenuModel,

  createMenuTree() {
    const treeMenus = [];
    const menus = this.toJSON();
    const iterateMenus = [ ...menus ];
    const createRootMenus = () => menus.forEach((menu, idx) => {
      if (menu.pid === 0) {
        menus.splice(idx, 1);
        treeMenus.push(getChildMenus(menu, menu.id));
      }
    });
    const getChildMenus = (menu, menuId) => {
      const childs = [];

      menus.forEach((cMenu, idx) => {
        if (cMenu.pid === menuId) {
          (menu.child || (menu.child = [])).push(cMenu);
        }
      });

      // 如果还存在子级，那么就递归求得子级的子级
      if (menu.child) {
        menu.child.forEach((ccMenu, idx) => {
          ccMenu = getChildMenus(ccMenu, ccMenu.id);

          if (ccMenu.child) {
            (menu.child[ idx ] || (menu.child[ idx ] = [])).push(ccMenu.child);
          }
        });
      }

      return menu;
    };

    createRootMenus();

    return treeMenus;
  }


});
