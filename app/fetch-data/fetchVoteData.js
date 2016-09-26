import { voteService } from 'services';
import * as types from 'types';

const fetchData = (params, store) => {
  return voteService.getTopics()
    .then(res => {
      store.dispatch({type: types.GET_TOPICS_SUCCESS, data: res.data});
      return res.data;
    });
};

export default fetchData;
