import Backbone from 'backbone';

export default Backbone.View.extend({
  id: 'app',

  initialize() {
    this.render();
  },

  render() {
    this.$el
      .css('color', 'red').text('1232s')
      .prependTo(document.body);
  }
});
