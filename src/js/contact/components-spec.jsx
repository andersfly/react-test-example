import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {ContactList, ContactSearch, __RewireAPI__ as componentsRewire} from './components';

describe('Contact Module', () => {
  it('does something', () => {
    expect(1).toBe(1);
  });
});

describe('Contact Search', () => {
  let elem, inputElem, queryListMock;

  beforeEach(() => {
    queryListMock = jasmine.createSpy('- queryList spy -');
    componentsRewire.__Rewire__('ContactActions', {
      queryList: queryListMock
    });
    elem = TestUtils.renderIntoDocument(<ContactSearch />);
    inputElem = elem.refs.input;
  });

  afterEach(() => {
    componentsRewire.__ResetDependency__('ContactActions');
  });

  it('triggers "queryList" when more characters are entered in search field', () => {
    // Simulate text input
    inputElem.getDOMNode().value = 'foo';
    TestUtils.Simulate.change(inputElem);

    expect(queryListMock).toHaveBeenCalledWith('foo');
  });
});

describe('Contact List', () => {
  let contacts, elem, items;

  beforeEach(() => {
    contacts = [
      {id: 0, name: 'John', title: 'Foo'},
      {id: 1, name: 'Jane', title: 'Bar'}
    ];

    elem = TestUtils.renderIntoDocument(<ContactList list={contacts} />);
    items = TestUtils.scryRenderedDOMComponentsWithTag(elem, 'tr');
  });

  it('renders table with number of rows matching items in list', () => {
    expect(items.length).toBe(2);
  });

  it('renders rows in correct order', () => {
    expect(+items[0].getDOMNode().querySelector('td').textContent).toBe(0);
    expect(+items[1].getDOMNode().querySelector('td').textContent).toBe(1);
  });

  it('renders name in 2nd col', () => {
    expect(items[0].getDOMNode().querySelectorAll('td')[1].textContent).toBe('John');
  });

  it('renders position in 3rd col', () => {
    expect(items[0].getDOMNode().querySelectorAll('td')[2].textContent).toBe('Foo');
  });
});
