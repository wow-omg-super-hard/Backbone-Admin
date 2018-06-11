import { View } from 'backbone';
import { extend } from 'underscore';

export default function createSubmitButtonCom (changeProp, className, disabledClassName, text, onSubmit) {
  return View.extend({
    initialize() {
      extend(this, { changeProp, disabledClassName, text, onSubmit });

      this.listenTo(this.model, `change:${ this.changeProp }`, this.render);
      this.render(this.model);
    },

    className,

    tagName: 'button',

    events: {
      'click': 'fetchHandle'
    },

    render(model) {
      this.$el
        .toggleClass(this.disabledClassName, model.get(this.changeProp))
        .attr('disabled', model.get(this.changeProp))
        .text(this.text);
    },

    fetchHandle() {
      this.model.fetching();
      this.onSubmit();
    }
  });
}
