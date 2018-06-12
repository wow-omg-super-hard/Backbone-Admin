import { View } from 'backbone';
import { template } from 'underscore';
import MemberCollection from 'collections/MemberCollection';
import FetchModel from 'models/ui/FetchModel';
import MemberFGModel from 'models/ui/MemberFGModel';
import memberListTmpl from 'templates/member-list-tmpl.html';
import style from 'statics/css/pages/member.css';
import createInputCom from 'components/ui/InputCom';
import createSubmitButtonCom from 'components/ui/SubmitButtonCom';
import createModalCom from 'components/ui/modal/ModalCom';
import createTableCom from 'components/ui/table/TableCom';
import createSearchView from 'views/displays/SearchView';

export default View.extend({
  initialize() {
    const inputClassName = style[ 'input-search' ];
    const inputActiveClassName = style[ 'input-active-search' ];
    const btnDynamicClassName = style[ 'btn-dynamic' ];
    const btnDynamicActiveClassName = style[ 'btns-disabled-dynamic' ];
    const inputComs = [
      new (createInputCom('start_time', inputClassName, inputActiveClassName, '请选择开始日期'))({ model: this.model }),
      new (createInputCom('end_time', inputClassName, inputActiveClassName, '请选择结束日期'))({ model: this.model }),
      new (createInputCom('start_time', inputClassName, inputActiveClassName, '请输入用户名'))({ model: this.model })
    ];
    const columns = [{
      dataKey: 'username',
      title: '用户名'
    }, {
      dataKey: 'sex',
      title: '性别',
      render: member => member.sex === 0 ? '男' : '女',
    }, {
      dataKey: 'usernick',
      title: '昵称'
    }, {
      dataKey: 'email',
      title: '邮箱'
    }, {
      dataKey: 'address',
      title: '地址'
    }, {
      dataKey: 'can_enabled',
      title: '状态',
      render: member => member[ 'can_enabled' ] ? '已启用' : '未启用'
    }];

    this.delsBtnCom = new (createSubmitButtonCom('fetching', `${ btnDynamicClassName } ${ style[ 'btn-dels' ] }`, btnDynamicActiveClassName, '批量删除', this.onBatchDelMemberHandle.bind(this)))({ model: this.delFetchModel });
    this.addBtnCom = new (createSubmitButtonCom('fetching', `${ btnDynamicClassName } ${ style[ 'btn-add' ] }`, btnDynamicActiveClassName, '添加', this.onAddMemberHandle.bind(this)))({ model: this.addFetchModel });
    this.searchView = new (createSearchView(inputComs))({ model: this.model });
    this.tableCom = new (createTableCom(columns, style[ 'table' ]))({ collection: this.collection });
    this.addMemberModalCom = new (createModalCom('添加用户', 450, 'dfdsf', () => alert('关闭')));
    this.render();
  },

  className: 'member-list',

  template: template(memberListTmpl),

  model: new MemberFGModel,

  collection: new MemberCollection([{
    "id": 1,
    "username": "13834220689",
    "usernick": "小明",
    "sex": 0,
    "email": "461111111@qq.com",
    "address": "北京海淀区",
    "create_time": "2017-01-01 11:11:42",
    "can_enabled": true
  }, {
    "id": 2,
    "username": "12222222222",
    "usernick": "小红",
    "sex": 1,
    "email": "221111111@qq.com",
    "address": "上海浦东新区樱花路220号",
    "create_time": "2017-10-33 15:31:12",
    "can_enabled": true
  }, {
    "id": 2,
    "username": "13333333333",
    "usernick": "小蓝",
    "sex": 1,
    "email": "43333333333@qq.com",
    "address": "深圳宝山区",
    "create_time": "2015-03-21 16:31:12",
    "can_enabled": true
  }]),

  delFetchModel: new FetchModel,

  addFetchModel: new FetchModel,

  render() {
    this.$el.html(this.template({ style, totalNum: this.model.get('total_num') || 0 }));

    // 添加搜索View
    this.$(`.${ style[ 'panel-search' ] }`).html(this.searchView.$el);

    // 添加批量删除和添加按钮组件
    this.$('.btns-dynamic')
      .append(this.delsBtnCom.$el)
      .append(this.addBtnCom.$el);

    this.$(`.${ style[ 'table-show' ] }`).html(this.tableCom.$el);

    // 添加添加会员对话框
    this.$el.append(this.addMemberModalCom.$el);
  },

  onBatchDelMemberHandle() {
    alert('删除');
  },

  onAddMemberHandle() {
    alert('添加');
  }
});
