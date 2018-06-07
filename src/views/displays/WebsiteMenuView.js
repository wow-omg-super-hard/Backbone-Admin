import { View } from 'backbone';
import { template } from 'underscore';
import WebsiteMenuModel from 'models/dbase/WebsiteMenuModel';
import style from 'statics/css/displays/website-menu.css';
import tmpl from 'templates/website-menu-tmpl.html';

export default View.extend({
  initialize() {
    this.render();
  }

  className: 'inner-menu',

  template: template(tmpl),

  render() {
           
  }
});
