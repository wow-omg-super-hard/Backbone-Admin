import { View, $ } from 'backbone';
import { template, extend } from 'underscore';
import ModalFGModel from './ModalFGModel';
import style from './modal.css';
import tmpl from './modal.tmpl.html';

export default function createModalCom (title, width, children, onClose) {
  return View.extend({
    initialize() {
      extend(this, {
        title,
        width,
        children,
        onClose,
        modalFGModel: new ModalFGModel,
        translatingX: 0,
        translatingY: 0,
        prevTranslateX: 0,
        prevTranslateY: 0,
        offsetX: 0,
        offsetY: 0,
        canMove: false
      });

      this.listenTo(this.modalFGModel, 'change', this.move);
      this.render();
    },

    template: template(tmpl),

    events: {
      [ `click .${ style[ 'modal-close' ] }` ]: 'closeHandle',
      [ `mousedown .${ style[ 'modal-header' ] }` ]: 'dragStartHandle',
      [ `mousemove .${ style[ 'modal-shade' ] }` ]: 'dragHandle',
      [ `mouseup .${ style[ 'modal-shade' ] }` ]: 'dragStopHandle'
    },

    render() {
      this.$el.html(this.template({ title: this.title, style }));
      this.$(`.${ style[ 'modal' ] }`).css({ width: this.width });
      this.$(`.${ style[ 'modal-content' ] }`).append(this.children);
    },

    move(model) {
      const { translateX, translateY } = model.toJSON();

      this.$(`.${ style[ 'modal-move' ] }`).css('transform', `translate(${ translateX }px, ${ translateY }px)`);
    },

    setTranslating(x, y) {
      this.translatingX = x;
      this.translatingY = y;
    },

    setPrevTranslate(x, y) {
      this.prevTranslateX = x;
      this.prevTranslateY = y;
    },

    setOffset(x, y) {
      this.offsetX = x;
      this.offsetY = y;
    },

    closeHandle() {
      this.onClose();
    },

    dragStartHandle({ clientX, clientY, offsetX, offsetY }) {
      const { translateX, translateY } = this.modalFGModel.toJSON();

      this.canMove = true;
      this.setTranslating(clientX - offsetX, clientY - offsetY);
      this.setPrevTranslate(translateX, translateY);
      this.setOffset(offsetX, offsetY);
    },

    dragHandle({ clientX, clientY }) {
      const offsetTranslateX = clientX - this.offsetX - this.translatingX + this.prevTranslateX;
      const offsetTranslateY = clientY - this.offsetY - this.translatingY + this.prevTranslateY;

      if (this.canMove) {
        this.modalFGModel.setTranslate(offsetTranslateX, offsetTranslateY);
      }
    },

    dragStopHandle({ clientX, clientY, offsetX, offsetY }) {
      if (this.canMove) {
        this.canMove = false;
      }
    }
  });
}
