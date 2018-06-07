/**
 * 封装backbone ajax请求，统一处理http错误(非200)、格式化、后台逻辑错误(errCode非0)
 */

import Backbone from 'backbone';

export default function createFetchModel (extractKey) {
  return Backbone.Model.extend({
    // 格式化
    parse(resp) {
      const res = resp[ extractKey ];

      // 如果返回是有效数据
      if (res != null) {
        return res;
      }

      this.trigger('error', this, '请返回规定的数据结构');

      return void 0;
    },

    fetch(options) {
      const fetch = this.constructor.__super__.fetch;

      options = this.addValidateErrCodeOption(options);
      fetch.call(this, options);
    },

    // 验证由于未提交某些参数导致的逻辑错误(errCode非0)
    addValidateErrCodeOption(options) {
      const success = options.success;

      options.success = resp => {
        if (resp.errCode !== 0) {
          this.trigger('error', this, resp.errMess);
        } else {
          success(resp);
        }
      };

      return options;
    }
  });
}
