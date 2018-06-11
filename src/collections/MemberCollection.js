import { Collection } from 'backbone';
import MemberModel from 'models/dbase/MemberModel';

export default Collection.extend({
  model: MemberModel        
});
