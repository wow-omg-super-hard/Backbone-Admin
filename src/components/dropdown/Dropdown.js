/**
 * 基于backbone的组件化
 * 首先具有封装性，就是说交互js、css、和模板放到一起
 * 组件也是视图、数据、状态的集合
 * 组件内部定义model，控制着组件的交互、和数据展示
 */
import { template, findIndex } from 'underscore';
import { View, Model } from 'backbone';
import dropdownStyle from './dropdown.css';
import dropdownTmpl from './dropdown.html';

const DropdownModel = Model.extend({
  defaults() {
    return {
      // 是否显示下拉菜单
      'can_visible': false,
      // 下拉数据列表
      'dropdowns': []
    };
  },

  getDropdownIndexById(id) {
    const index = findIndex(this.get('dropdowns'), item => item.id === id);

    return index;
  },

  toggleVisible() {
    return this.set('can_visible', !this.get('can_visible'));
  }
});

export default View.extend({
  initialize(options) {
    // 选择下拉项改变触发
    this.onChange = options.onChange;
    // 根据此id来判断当前是否选择不同的下拉项
    this.prevDropdownId = void 0;
    this.model = new DropdownModel({ dropdowns: this.combinationDropdowns(options.dropdowns) });
    this.listenTo(this.model, 'change:can_visible', this.renderDropdownMenu);
    this.render(this.model);
  },

  className: 'dropdown',

  template: template(dropdownTmpl),

  events: {
    [ `click .${ dropdownStyle[ 'dropdown-btn' ] }` ]: 'toggleDropdownMenu',
    [ `click .${ dropdownStyle[ 'dropdown-list' ] }` ]: 'toggleDropdownListItemSelected'
  },

  combinationDropdowns(dropdowns) {
    return dropdowns.map(
      (text, idx) => ({ text, id: idx })
    );
  },

  toggleDropdownMenu(e) {
    this.model.toggleVisible();
    this.resetEvent(e);
  },

  toggleDropdownListItemSelected(e) {
    const id = +e.target.dataset.id;
    const text = e.target.innerHTML;
    
    if (this.prevDropdownId !== id) {
      this.prevDropdownId = id;
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

    return this.$el.html(this.template({ style: pedDropdownStyle, dropdowns: model.get('dropdowns') }));
  },

  renderDropdownMenu(model) {
    this.$(`.${ dropdownStyle[ 'dropdown-list' ] }`).toggleClass(dropdownStyle[ 'hide' ], !model.get('can_visible'));
  },
});
