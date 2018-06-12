import { Model } from 'backbone';

export default Model.extend({
  defaults() {
    return {
      translateX: 0,
      translateY: 0
    };
  },

  setTranslate(translateX, translateY) {
    this.set({ translateX, translateY });
  }
});
