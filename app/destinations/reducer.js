import { combineReducers } from 'redux';
import * as types from 'types';

const destination = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_DESTINATION_REQUEST:
      return {
        id: action.id,
        name: action.name,
        destinationhost: action.destinationhost,
        destinationport: action.destinationport,
        destinationAE: action.destinationAE,
        sourceAE: action.sourceAE
      };

/*    case types.INCREMENT_COUNT:
      if (state.id === action.id) {
        return { ...state, count: state.count + 1 };
      }
      return state;
    case types.DECREMENT_COUNT:
      if (state.id === action.id) {
        return { ...state, count: state.count - 1 };
      }
      return state;*/
    default:
      return state;
  }
};

const destinations = (
  state = [],
  action
) => {
  console.log('destinations action.data');
  console.log(action.type);
  console.log(action.data);
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    case types.CREATE_DESTINATION_REQUEST:
      return [...state, destination(undefined, action)];
    case types.CREATE_DESTINATION_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.DESTROY_DESTINATION:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

const newDestination = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TYPING:
      return action.newDestination;
    case types.CREATE_DESTINATION_REQUEST:
      return '';
    default:
      return state;
  }
};

const destinationReducer = combineReducers({
  destinations,
  newDestination
});

export default destinationReducer;
