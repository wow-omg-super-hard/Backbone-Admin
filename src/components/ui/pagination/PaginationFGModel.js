import { Model } from 'backbone';
import { isString, isFinite } from 'underscore';

export default Model.extend({
  defaults() {
    return {
      hasPrevPage: false,
      hasNextPage: true,
      currPage: 1,
      pageSize: 10,
      number: void 0
    };
  },

  validate(attrs) {
    // 验证传入的currPage、pageSize、totalCount是否是正整数或正整数字符串
    const { currPage, number } = attrs;

    return !isString(currPage)
      && !isFinite(currPage)
      && !isString(pageNumber)
      && !isFinite(pageNumber);
  },

  getNumberPage() {
    const { pageSize, number } = this.toJSON();

    return Math.ceil(number / pageSize);
  },

  setPage(page) {
    const attrs = {
      hasNextPage: true,
      hasPrevPage: true,
      currPage: page
    };

    if (page === 1) {
      attrs.hasPrevPage = false;
    } else if (page === this.getNumberPage()) {
      attrs.hasNextPage = false;
    }

    this.set(attrs, { validate: true });
  }
});
