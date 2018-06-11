import { View, $ } from 'backbone';
import { template } from 'underscore';
import FetchModel from 'models/ui/FetchModel';
import tmpl from 'templates/search-tmpl.html';
import style from 'statics/css/displays/search.css';
import createSubmitButtonCom from 'components/ui/SubmitButtonCom';

export default function createSearchView (inputComs) {
  return View.extend({
    initialize() {
      this.fetchModel = new FetchModel;
      this.sbCom = new (createSubmitButtonCom('fetching', style[ 'btn-search' ], style[ 'btn-disabled-search' ], '搜索', this.searchHandle.bind(this)))({ model: this.fetchModel });
      this.render();
    },

    template: template(tmpl),

    render() {
      this.$el.html(this.template({ style }));

      // 渲染搜索条件框组件
      for (let i = inputComs.length - 1; i >= 0; i--) {
        this.$(`.${ style[ 'inner-search' ] }`)
          .prepend($('<div></div>').css({ width: 150, marginRight: 5 })
          .append(inputComs[ i ].$el));
      }

      // 渲染搜索按钮组件
      this.$(`.${ style[ 'inner-search' ] }`).append(this.sbCom.$el);
    },

    searchHandle() {

    }
  });
}
