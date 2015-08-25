import _ from 'lodash';
import Reflux from 'reflux';
import axios from 'axios';
import kindalike from 'kindalike';
import {ContactActions} from './actions';

export const ContactStore = Reflux.createStore({
  listenables: [ContactActions],
  init() {
    this.query = '';
    this._store = {
      list: [],         // Raw list of all currently loaded contacts
      filteredList: [], // Filtered list currently loaded contacts
      current: null     // Contact currently being edited or added
    };
  },

  onQueryList(query) {
    this.query = query;
    this.createFilteredList();
    this.trigger(this._store);
  },

  onUpdateItem(id, attrs) {
    let item = _.find(this._store.list, {id: id});
    _.assign(item, attrs);
    this._store.current = null;
    this.trigger(this._store);
  },

  onUpdateCurrent(attrs) {
    let item = this._store.current;
    _.assign(item, attrs);
    this.trigger(this._store);
  },

  onEditItem(id) {
    let item = _.clone(_.find(this._store.list, {id: id}));
    this._store.current = item;
    this.trigger(this._store);
  },

  onLoad() {
    axios.get('/api/contacts.json').then(resp => {
      this._store.list = resp.data;
      this.createFilteredList();
      this.trigger(this._store);
    });
  },

  /**
   * Create filtered list from raw list and query
   */
  createFilteredList() {
    let list = this._store.list,
        filteredList;

    if (this.query.length < 3) {
      filteredList = list;
    } else {
      let matches = kindalike(this.query, list.map(item => item.name));
      filteredList = list.filter(item => {
        return _.find(matches, {subject: item.name});
      });
    }
    this._store.filteredList = filteredList;
  }
});
