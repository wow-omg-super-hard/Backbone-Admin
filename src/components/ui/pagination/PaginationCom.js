import { View, $ } from 'backbone';
import { template } from 'underscore';
import PaginationFGModel from './PaginationFGModel';
import tmpl from './pagination.tmpl.html';
import style from './pagination.css';

export default function createPaginationCom (number) {
  return View.extend({
    initialize() {
      this.listenTo(this.model, 'change:currPage', this.changeCurrPage);
      this.listenTo(this.model, 'change:hasPrevPage', this.togglePrevPage);
      this.listenTo(this.model, 'change:hasNextPage', this.toggleNextPage);
      this.render();
    },

    className: style[ 'pagination' ],

    template: template(tmpl),

    model: new PaginationFGModel({ number }),

    events: {
      'click .btn-num': 'targetPageHandle',
      'click .btn-first': 'targetFirstPageHandle',
      'click .btn-end': 'targetEndPageHandle',
      'click .btn-prev': 'targetPrevPageHandle',
      'click .btn-next': 'targetNextPageHandle'
    },

    render() {
      const pageNumber = this.model.getNumberPage();

      this.$el.html(
        this.template({
          style,
          visibleNumber: pageNumber > 5 ? 5 : pageNumber,
          pageNumber,
          currPage: this.model.get('currPage'),
          hasPrevPage: this.model.get('hasPrevPage'),
          hasNextPage: this.model.get('hasNextPage')
        })
      );
    },

    targetPageHandle(e) {
      this.model.setPage(+e.target.dataset.num);
    },

    targetFirstPageHandle(e) {
      this.model.setPage(+e.target.dataset.num);
    },

    targetEndPageHandle(e) {
      this.model.setPage(+e.target.dataset.num);
    },

    targetPrevPageHandle() {
      this.model.setPage(this.model.get('currPage') - 1);
    },

    targetNextPageHandle() {
      this.model.setPage(this.model.get('currPage') + 1);
    },

    changeCurrPage(model) {
      const currPage = model.get('currPage');
      const activeClassName = style[ 'active' ];

      this.$('.btn-num').removeClass(activeClassName);
      this.$(`.btn-num[data-num="${ currPage }"]`).addClass(activeClassName);

      // 触发切换页数需要调用的回调
      this.trigger('page', currPage);
    },

    togglePrevPage(model) {
      this.$('.btn-prev').attr('disabled', !model.get('hasPrevPage'));
    },

    toggleNextPage(model) {
      this.$('.btn-next').attr('disabled', !model.get('hasNextPage'));
    }
  });
}
