import _ from 'lodash';
import Reflux from 'reflux';
import axios from 'axios';
import kindalike from 'kindalike';
import {ContactActions} from './actions';

export const ContactStore = Reflux.createStore({
  listenables: [ContactActions],
  init() {
    this.list = [];
  },
  onQueryList(query) {
    if (query.length < 3) {
      this.filteredList = this.list;
    } else {
      let matches = kindalike(query, this.list.map(item => item.name));
      this.filteredList = this.list.filter(item => {
        return _.find(matches, {subject: item.name});
      });
    }
    this.trigger(this.filteredList);
  },
  onLoad() {
    axios.get('/api/contacts.json').then(resp => {
      this.list = resp.data;
      this.trigger(this.list);
    });
  }
});
