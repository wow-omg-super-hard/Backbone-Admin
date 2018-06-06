/**
 * 最外层容器view
 */
import { View, Model } from 'backbone';
import { template } from 'underscore';
import appTmpl from 'templates/AppTmpl.html';
import indexStyle from 'statics/css/layouts/index.css';
import Dropdown from 'components/dropdown/Dropdown';

export default Backbone.View.extend({
  id: 'app',

  template: template(appTmpl),

  initialize() {
    // 初始化下拉列表组件
    this.dropdownCom = new Dropdown({
      dropdowns: [ '个人信息', '退出' ],
      onChange(text) {
        alert(text);
      }
    });
    this.render();
  },

  render() {
    const res = { style: indexStyle };

    this.$el.html(this.template({ style: indexStyle })).appendTo(document.body);
    this.$(`.${ indexStyle[ 'user-dropdown' ] }`).append(this.dropdownCom.$el);
  }
});
