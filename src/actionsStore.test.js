import Immutable from 'immutable';
import generateActions from './immutableActions.js';
import flat_store from './immutableStore.js';

var api_state = Immutable.Map({
  blog: Immutable.Map()
});

var store = flat_store(api_state);

var blog_state = generateActions(['blog'], store.dispatch);

// console.log(store.getState().toJS());
// blog_state.setIn(Immutable.Map({ name: 'testName', content: 'testContent' }));
// console.log(store.getState().toJS());

test('state setIn test', () => {
  blog_state.setIn(Immutable.Map({ name: 'testName', content: 'testContent' }));
  expect(
    store
      .getState()
      .getIn(['blog'])
      .toJS()
  ).toEqual({ content: 'testContent', name: 'testName' });
});
