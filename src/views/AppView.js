/**
 * 最外层容器view
 */
import { View, Model } from 'backbone';
import { template } from 'underscore';
import appTmpl from 'templates/app-tmpl.html';
import appStyle from 'statics/css/app.css';
import UserinfoMenuView from 'views/displays/UserinfoMenuView';
import WebsiteMenuView from 'views/displays/WebsiteMenuView';
import MemberListView from 'views/pages/member/MemberListView';

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
    this.websiteMenuView = new WebsiteMenuView;

    // 初始化内容view
    this.memberListView = new MemberListView;

    this.render();
  },

  render() {
    const res = { style: appStyle };

    // 添加网站整体框架
    this.$el.html(this.template({ style: appStyle })).appendTo(document.body);

    // 添加用户信息菜单
    this.$(`.${ appStyle[ 'userinfo-menu' ] }`).html(this.userinfoMenuView.$el);

    // 添加左侧菜单
    this.$('nav').html(this.websiteMenuView.$el);

    // 添加内容
    this.$('section').html(this.memberListView.$el);
  }
});
