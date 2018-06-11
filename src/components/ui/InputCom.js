/**
 * ui组件，便于构建可扩展组件
 */

import { View } from 'backbone';
import { extend } from 'underscore';

export default function createInputCom (changeProp, className, activeClassName, placeholder) {
  return View.extend({
    initialize() {
      extend(this, { changeProp, activeClassName });
      this.render();
    },

    tagName: 'input',

    className,

    attributes: {
      placeholder
    },

    events: {
      'click': 'selectedHandle1',
      'blur': 'unselectedHandle'
    },

    render() {

    },

    selectedHandle1() {
      this.$el.addClass(this.activeClassName);
    },

    unselectedHandle() {
      this.$el.removeClass(this.activeClassName);
    },

    setValueHandle(e) {
      this.model.set(this.changeProp, e.target.value);
    },

    setModelValue(model) {
      this.$el.val(model.get(this.changeProp));
    }
  });
}
