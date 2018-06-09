/**
 * ui组件，便于构建可扩展组件
 */

import { View } from 'backbone';
import { template } from 'underscore';

export default function createInputCom(model, changeProp, className, placeholder) {
  return View.extend({
    initialize() {
      //this.listenTo(this.model, `change:${ changeProp }`, this.setModelValue);
      this.render();
    },

    tagName: 'input',

    className,

    attributes: {
      placeholder
    },

    style: {
      'border': '1px solid #e6e6e6',
      'border-radius': '2px',
      'width': '100%',
      'padding': '10px',
      'box-sizing': 'border-box',
      'outline': 'none'
    },

    model,

    events: {
      'click': 'selectedHandle1',
      'blur': 'unselectedHandle'
    },

    render() {
      this.$el.css(this.style);
    },

    selectedHandle1() {
      this.$el.css({ 'border-color': '#009688' });
    },

    unselectedHandle() {
      this.$el.css({ 'border-color': '#e6e6e6' });
    },

    setValueHandle(e) {
      this.model.set(changeProp, e.target.value);
    },

    setModelValue(model) {
      this.$el.val(model.get(changeProp));
    }
  });
}
