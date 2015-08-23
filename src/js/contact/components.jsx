import React from 'react';
import {ContactStore} from './stores';
import {ContactActions} from './actions';

/**
 * Contacts module
 */
export class ContactController extends React.Component {
  constructor(props) {
    super(props);
    ContactActions.load();
    ContactStore.listen(this.onStoreChange.bind(this));
    this.state = {list: []}
  }
  onStoreChange(list) {
    this.setState({list: list});
  }
  render() {
    return (
      <div className="contacts">
        <ContactSearch />
        <ContactList list={this.state.list} />
      </div>
    )
  }
}

/**
 * Search Component
 */
export class ContactSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {query: ''};
  }
  queryChange(event) {
    let query = event.target.value;
    this.setState({query: query});
    ContactActions.queryList(query);
  }
  render() {
    return (
      <div className="pure-form" style={{marginBottom: '1rem'}}>
        <input
          type="text"
          ref="input"
          value={this.state.query}
          onChange={this.queryChange.bind(this)}
        />
      </div>
    )
  }
}

/**
 * List Component
 */
class ContactList extends React.Component {
  render() {
    return (
      <table className="pure-table pure-table-horizontal">
        <thead>
          <th>#</th>
          <th>Name</th>
          <th>Position</th>
        </thead>
        <tbody>
          {this.props.list.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.title}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

ContactList.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export {ContactList};
