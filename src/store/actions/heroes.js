import { 
  SAVE_QUERY_DATA, 
  SAVE_QUERY_STRING,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
} from './actionTypes';

export const save_query_data = (response) => {
  return {
    type: SAVE_QUERY_DATA,
    apiData: response.data.results,
  };
};

export const save_query_string = (inputString) => {  
  return {
    type: SAVE_QUERY_STRING,
    inputString: inputString
  };
};

export const request_pending = () => {
  return {
    type: REQUEST_PENDING,
    requestPending: true,
    // requestSuccess: false,
    // requestFailure: false,
  };
};

export const request_success = () => {
  return {
    type: REQUEST_SUCCESS,
    // requestPending: false,
    requestSuccess: true,
    // requestFailure: false,
  }
};

export const request_failure = () => {
  return {
    type: REQUEST_FAILURE,
    // requestPending: false,
    // requestSuccess: false,
    requestFailure: true,
  };
};