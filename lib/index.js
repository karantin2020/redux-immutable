'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxActions = require('redux-actions');

var _redux = require('redux');

var generateActions = function generateActions(keyPath, dispatcher) {
  // console.log("Start genAction");
  var settings = {};
  settings.methods = ['setIn', 'deleteIn', 'mergeIn', 'updateIn'];
  settings.actionCreators = {};
  settings.methods.forEach(function (method) {
    settings.actionCreators[method] = (0, _reduxActions.createAction)(method, function () {
      return method === 'deleteIn' ? null : arguments.length <= 0 ? undefined : arguments[0];
    }, function () {
      return {
        path: keyPath,
        deep: method === 'deleteIn' ? null : (arguments.length <= 1 ? undefined : arguments[1]) || null
      };
    });
  });

  return (0, _redux.bindActionCreators)(settings.actionCreators, dispatcher);
};

exports.default = generateActions;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flatReducer = function flatReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _immutable2.default.Map({});
  var action = arguments[1];

  if (action && action.error) {
    return state;
  } else {
    var payload = action.payload;
    var keyPath = action.meta && action.meta.path;
    var method = action.type;
    if (payload && keyPath && method) {
      return state[method] && state[method](keyPath, payload);
    } else if (method === 'deleteIn') {
      return state[method] && state[method](keyPath);
    } else if (!payload && method === 'setIn') {
      return state[method] && state[method](keyPath, typeof payload === 'string' ? '' : null);
    } else {
      return state;
    }
  }
};

// const logger = store => next => action => {
//   console.log(action.type);
//   console.log('dispatching', store.getState());
//   let result = next(action);
//   console.log('next state', store.getState());
//   console.log(action.type);
//   return result;
// };

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default
// logger
)(_redux.createStore);

var flat_store = function flat_store(api_state) {
  return createStoreWithMiddleware(flatReducer, api_state);
};

exports.default = flat_store;

/* TESTS */
/*


*/
/* TESTS END */
"use strict";
