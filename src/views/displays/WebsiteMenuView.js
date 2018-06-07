import { View, $ } from 'backbone';
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

  events: {
    'click': 'toggleSlideHandle'
  },

  toggleSlideHandle(e) {
    const canTrigger = !!e.target.dataset[ 'is_parent_node' ] || !!e.target.parentNode.dataset[ 'is_parent_node' ];
    const combiledClassName = style[ 'sub-wrapper' ];
    let $slideEl;

    if (canTrigger) {
      $slideEl = $(e.target).parents('li').find(`.${ combiledClassName }`);
      this.$(`.${ combiledClassName }`).slideUp(250);

      if ($slideEl.is(':hidden')) {
        $slideEl.slideDown(250);
      } else {
        $slideEl.slideUp(250);
      }
    }
  },

  createTreeMenuHTML() {
    const menus = this.collection.getTreeMenus();
    const html = ['<ul class="'+ style.wrapper +'">'];
    let isParent;

    function create (menu) {
      isParent = menu.child && !menu.url;
      html.push('<li>');
      html.push(this.template({
        title: menu.title,
        url: isParent ? 'javascript:;' : menu.url,
        addBottomLineStyle: isParent ? '' : style[ 'add-bottom-line' ],
        isParentNode: isParent
      }));

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
