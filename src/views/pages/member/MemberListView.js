import { View } from 'backbone';
import { template } from 'underscore';
import MemberCollection from 'collections/MemberCollection';
import MemberFGModel from 'models/ui/MemberFGModel';
import memberListTmpl from 'templates/member-list-tmpl.html';
import style from 'statics/css/pages/member.css';
import createInputCom from 'components/ui/InputCom';
import createSearchView from 'views/displays/SearchView';

export default View.extend({
  initialize() {
    const inputComs = [
      new (createInputCom(this.model, 'start_time', '', '请选择开始日期')),
      // new (createInputCom(this.model, 'end_time', '', '请选择结束日期')),
      // new (createInputCom(this.model, 'start_time', '', '请输入用户名'))
    ];

    this.searchView = new (createSearchView(this.model, inputComs));
    this.render();
  },

  className: 'member-list',

  template: template(memberListTmpl),

  events: {

  },

  model: new MemberFGModel(),

  render() {
    this.$el.html(this.template({ style }));

    // 添加搜索View
    this.$(`.${ style[ 'panel-search' ] }`).html(this.searchView.$el);
  }
});
