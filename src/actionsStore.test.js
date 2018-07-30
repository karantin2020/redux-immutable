import Immutable from 'immutable';
import generateActions from './immutableActions.js';
import flat_store from './immutableStore.js';

var api_state = Immutable.Map({
  blog: Immutable.Map()
});

var messageBody = Immutable.Map({ content: 'testContentBody', name: 'testNameBody' });
var promiseBody = Immutable.Map({ content: 'testContentPromise', name: 'testNamePromise' });
var service = {
  get: () => messageBody,
  promise: () => Promise.resolve(promiseBody)
};

var store = flat_store(api_state);

var blog_actions = generateActions(['blog'], store.dispatch);

test('state setIn test', () => {
  blog_actions.setIn(Immutable.Map({ name: 'testName', content: 'testContent' }));
  expect(
    store
      .getState()
      .getIn(['blog'])
      .toJS()
  ).toEqual({ content: 'testContent', name: 'testName' });
});

test('state setIn test with function payload', () => {
  blog_actions.setIn(service.get())
  var state = store.getState().getIn(['blog']);
  expect(state).toEqual(messageBody);
});

test('state setIn test with promise payload', async () => {
  blog_actions.setIn(service.promise());
  var state = await store.getState().getIn(["blog"]);
  expect(state).toEqual(promiseBody);
});
