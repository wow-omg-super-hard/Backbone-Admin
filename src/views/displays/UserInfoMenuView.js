/**
 * 基于backbone的组件化
 * 首先具有封装性，就是说交互js、css、和模板放到一起
 * 组件也是视图、数据、状态的集合
 * 组件内部定义model，控制着组件的交互、和数据展示
 */
import { template } from 'underscore';
import { View } from 'backbone';
import UserInfoMenuModel from 'models/ui/UserInfoMenuModel';
import dropdownStyle from 'statics/css/displays/userinfo-menu.css';
import dropdownTmpl from 'templates/userinfo-menu-tmpl.html';

export default View.extend({
  initialize(options) {
    // 选择下拉项改变触发
    this.onChange = options.onChange;
    // 根据此id来判断当前是否选择不同的下拉项
    this.prevKey = void 0;
    this.model = new UserInfoMenuModel();
    this.listenTo(this.model, 'change:can_visible', this.renderDropdownMenu);
    this.render(this.model);
  },

  className: 'dropdown',

  template: template(dropdownTmpl),

  events: {
    [ `click .${ dropdownStyle[ 'dropdown-btn' ] }` ]: 'toggleDropdownMenu',
    [ `click .${ dropdownStyle[ 'dropdown-list' ] }` ]: 'toggleDropdownListItemSelected'
  },

  toggleDropdownMenu(e) {
    this.model.toggleVisible();
    this.resetEvent(e);
  },

  toggleDropdownListItemSelected(e) {
    const key = e.target.dataset.key;
    const text = e.target.innerHTML;

    if (this.prevKey !== key) {
      this.prevKey = key;
      this.onChange(text);
    }

    this.resetEvent(e);
  },

  resetEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  },

  render(model) {
    const pedDropdownStyle = { ...dropdownStyle, 'dropdown-list': `${ dropdownStyle[ 'dropdown-list' ] } ${ model.get('can_visible') ? '' : dropdownStyle[ 'hide' ] }` };

    return this.$el.html(this.template({ style: pedDropdownStyle }));
  },

  renderDropdownMenu(model) {
    this.$(`.${ dropdownStyle[ 'dropdown-list' ] }`).toggleClass(dropdownStyle[ 'hide' ], !model.get('can_visible'));
  }
});
