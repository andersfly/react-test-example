import {ContactStore} from './stores';
import {ContactActions} from './actions';

describe('Contact Store', () => {
  let storeListener;

  beforeEach(() => {
    storeListener = jasmine.createSpy('- listener spy -');
    ContactStore.listen(storeListener);
    ContactStore.list = [
      {name: 'foo'},
      {name: 'bar'}
    ];
  });

  it(`does not trigger filtered list if queryList action
      is triggered with less than 3 characters`, () => {
      ContactStore.onQueryList('f');
      expect(storeListener).toHaveBeenCalledWith([
        {name: 'foo'},
        {name: 'bar'}
      ]);
  });

  it(`does trigger filtered list if queryList action
      is triggered with 3 or more characters`, () => {
      ContactStore.onQueryList('foo');
      expect(storeListener).toHaveBeenCalledWith([
        {name: 'foo'}
      ]);
  });
});
