/**
 * 前端交互状态变化Model
 */

import { Model } from 'backbone';

export default Model.extend({
  defaults() {
    return {
      // 当前页
      'curr_page': 1,
      // 每页多少条
      'pagesize': 10,
      // 总记录数
      'total_num': void 0,
      // 开始时间
      'start_time': '',
      // 结束时间
      'end_time': '',
      // 查找的用户名
      'search_username': '',
      // 是否显示添加会员页对话框
      'visible_add_dialog': false,
      // 是否显示修改会员页对话框
      'visible_update_dialog': false
    };
  },

  setCurrPage(currPage) {
    this.set('curr_page', currPage);
  },

  setTotalNum(totalNum) {
    this.set('total_num', totalNum);
  },

  setStartTime(startTime) {
    this.set('start_time', startTime);
  },

  setEndTime(endTime) {
    this.set('end_time', endTime);
  },

  setSearchUsername(username) {
    this.set('search_username', username);
  },

  toggleVisibleAddDialog() {
    this.set('visible_add_dialog', !this.get('visible_add_dialog'));
  },

  toggleVisibleUpdateDialog() {
    this.set('visible_update_dialog', !this.get('visible_update_dialog'));
  }
});
