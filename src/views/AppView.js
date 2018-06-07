/**
 * 最外层容器view
 */
import { View, Model } from 'backbone';
import { template } from 'underscore';
import appTmpl from 'templates/app-tmpl.html';
import indexStyle from 'statics/css/layouts/index.css';
import UserinfoMenuView from 'views/displays/UserinfoMenuView';
import WebsiteMenuView from 'views/displays/WebsiteMenuView';

export default Backbone.View.extend({
  id: 'app',

  template: template(appTmpl),

  initialize() {
    // 初始化用户信息菜单view
    this.userinfoMenuView = new UserinfoMenuView({
      onChange(text) {
        alert(text);
      }
    });
    // 初始化网站菜单view
    this.websiteMenuView = new WebsiteMenuView();
    this.render();
  },

  render() {
    const res = { style: indexStyle };

    this.$el.html(this.template({ style: indexStyle })).appendTo(document.body);
    this.$(`.${ indexStyle[ 'userinfo-menu' ] }`).html(this.userinfoMenuView.$el);
    this.$('nav').html(this.websiteMenuView.$el);
  }
});
