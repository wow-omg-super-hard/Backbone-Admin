import { View, $ } from 'backbone';
import { template } from 'underscore';
import tmpl from 'templates/search-tmpl.html';
import style from 'statics/css/displays/search.css';

export default function createSearchView (model, inputComs) {
  return View.extend({
    initialize() {
      this.render();
    },

    template: template(tmpl),

    model,

    render() {
      this.$el.html(this.template({ style }));

      // 渲染搜索条件框
      for (let i = inputComs.length - 1; i >= 0; i--) {
        this.$(`.${ style[ 'inner-search' ] }`)
          .prepend($('<div></div>').css({ width: 150, marginRight: 5 }).append(inputComs[ i ].$el));
      }
    }
  });
}
