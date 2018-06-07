import { View } from 'backbone';
import { template } from 'underscore';
import config from '../../config';
import WebsiteMenuCollection from 'collections/WebsiteMenuCollection';
import style from 'statics/css/displays/website-menu.css';
import tmpl from 'templates/website-menu-tmpl.html';

export default View.extend({
  initialize() {
    this.render();
  },

  className: 'website-inner-menu',

  collection: new WebsiteMenuCollection(config.testMenuData),

  template: template(tmpl),

  createTreeMenuHTML() {
    const menus = this.collection.getTreeMenus();
    const html = ['<ul class="'+ style.wrapper +'">'];

    function create (menu) {
      html.push('<li>');
      html.push(this.template({ menu }));

      if (menu.child) {
        html.push('<ul class="'+ style[ 'sub-wrapper' ] +'">')
        menu.child.forEach(cMenu => {
          create.call(this, cMenu);
        });
        html.push('</ul>');
      }

      html.push('</li>');
    }

    menus.forEach(menu => create.call(this, menu));

    html.push('</ul>');

    return html.join('');
  },

  render() {
    this.$el.html(this.createTreeMenuHTML());
  }
});
