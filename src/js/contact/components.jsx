import React from 'react';
import {ContactStore, CategoryStore} from './stores';
import {ContactActions} from './actions';

/**
 * Contacts module
 */
export class ContactController extends React.Component {
  constructor(props) {
    super(props);
    ContactActions.load();
    ContactStore.listen(this.onContactChange.bind(this));
    CategoryStore.listen(this.onCategoryChange.bind(this));
    this.state = {categoryList: [], filteredList: [], currentContact: null}
  }

  onContactChange(contacts) {
    this.setState({
      currentContact: contacts.current,
      filteredList: contacts.filteredList
    });
  }

  onCategoryChange(categories) {
    this.setState({
      categoryList: categories.list
    });
  }

  render() {
    return (
      <div className="pure-g" style={{maxWidth: "600px", margin: "auto"}}>
        <div className="pure-u-1">
          <ContactSearch className="pure-u-1" />
        </div>
        <div className="pure-u-1">
          <CategoryList list={this.state.categoryList} className="pure-u-1" />
        </div>
        <div className="pure-u-1">
          <ContactList list={this.state.filteredList} className="pure-u-1" />
        </div>
        {() => {
          if (this.state.currentContact) {
            return (
              <div className="pure-u-1">
                <ContactEdit contact={this.state.currentContact} className="pure-u-1" />
              </div>
            );
          }
        }()}
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
      <div className="pure-form" style={{marginBottom: "1rem"}}>
        <input
          type="text"
          ref="input"
          value={this.state.query}
          onChange={this.queryChange.bind(this)}
          style={{width: "50%"}}
        />
      </div>
    )
  }
}

/**
 * List Component
 */
class ContactList extends React.Component {
  itemClick(itemId, event) {
    ContactActions.editItem(itemId);
  }
  render() {
    return (
      <table className="pure-table pure-table-horizontal" style={{width: "100%", marginBottom: "1rem"}}>
        <thead>
          <th style={{width: "1rem"}}>#</th>
          <th>Name</th>
          <th style={{width: "1rem"}}>&nbsp;</th>
        </thead>
        <tbody>
          {this.props.list.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name} ({item.category})</td>
                <td><button
                  className="button-xsmall pure-button"
                  onClick={this.itemClick.bind(this, item.id)}>Edit</button></td>
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

/**
 * Edit Component
 */
class ContactEdit extends React.Component {
  inputChange(attrName, event) {
    let value = this.refs[attrName].getDOMNode().value;
    ContactActions.updateCurrent({[attrName]: value})
  }

  submit(event) {
    event.preventDefault();
    ContactActions.updateItem(this.props.contact.id, this.props.contact);
  }

  render() {
    return (
      <form className="pure-form pure-form-stacked" onSubmit={this.submit.bind(this)}>
        <label htmlFor="name">Name</label>
        <input
          ref="name"
          id="name"
          type="text"
          value={this.props.contact.name}
          onChange={this.inputChange.bind(this, 'name')} />
        <label htmlFor="category">Category</label>
        <input
          ref="category"
          id="category"
          type="text"
          value={this.props.contact.category}
          onChange={this.inputChange.bind(this, 'category')} />
        <button type="submit" className="pure-button pure-button-primary">Save</button>
      </form>
    )
  }
}

ContactEdit.propTypes = {
  contact: React.PropTypes.object
};
export {ContactEdit};

class CategoryList extends React.Component {
  render() {
    return (
      <ul>
      {
        this.props.list.map(item => {
          return <li>{item}</li>;
        })
      }
      </ul>
    )
  }
}

CategoryList.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
export {CategoryList};
