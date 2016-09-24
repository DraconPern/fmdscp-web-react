/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'types';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */
export function makeDestinationRequest(method, id, data, api = '/api/destinations') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function destroy(id) {
  return { type: types.DESTROY_DESTINATION, id };
}


export function typing(text) {
  return {
    type: types.TYPING,
    newDestination: text
  };
}

/*
 * @param data
 * @return a simple JS object
 */
export function createDestinationRequest(data) {
  return {
    type: types.CREATE_DESTINATION_REQUEST,
    id: data.id,
    name: data.name,
    destinationhost: data.destinationhost,
    destinationport: data.destinationport,
    destinationAE: data.destinationAE,
    sourceAE: data.sourceAE
  };
}

export function createDestinationSuccess() {
  return {
    type: types.CREATE_DESTINATION_SUCCESS
  };
}

export function createDestinationFailure(data) {
  return {
    type: types.CREATE_DESTINATION_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createDestinationDuplicate() {
  return {
    type: types.CREATE_DESTINATION_DUPLICATE
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createDestination(text) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (text.trim().length <= 0) return;

    const id = md5.hash(text);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { destinationAE } = getState();
    const data = {
      id,
      text
    };

    // Conditional dispatch
    // If the topic already exists, make sure we emit a dispatch event
    if (destination.destinations.filter(destinationItem => destinationItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate topic
      return dispatch(createDestinationDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createDestinationRequest(data));

    return makeDestinationRequest('post', id, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_DESTINATION_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createDestinationSuccess());
        }
      })
      .catch(() => {
        return dispatch(createDestinationFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}

// Fetch posts logic
export function fetchDestinations() {
  console.log('fetchDestinations');
  return {
    type: types.GET_DESTINATIONS,
    promise: makeDestinationRequest('get')
  };
}

export function destroyDestination(id) {
  return dispatch => {
    return makeDestinationRequest('delete', id)
      .then(() => dispatch(destroy(id)))
      .catch(() => dispatch(createDestinationFailure({id,
        error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}
