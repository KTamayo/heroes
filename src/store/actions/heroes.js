import {
  SAVE_QUERY_DATA,
  SAVE_QUERY_STRING,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  REQUEST_RESET,
} from './actionTypes';

export const save_query_data = (responseData) => {
  return {
    type: SAVE_QUERY_DATA,
    responseData: responseData,
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
  };
};

export const request_success = () => {
  return {
    type: REQUEST_SUCCESS,
    requestSuccess: true,
  }
};

export const request_failure = () => {
  return {
    type: REQUEST_FAILURE,
    requestFailure: true,
  };
};

export const request_reset = () => {
  return {
    type: REQUEST_RESET,
    requestPending: false,
    requestSuccess: false,
    requestFailure: false,
  }
}
