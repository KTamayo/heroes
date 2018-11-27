import {
  SAVE_QUERY_DATA,
  SAVE_QUERY_STRING,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
} from '../actions/actionTypes';


const initialState = {
  requestPending: false,
  requestSuccess: false,
  requestFailure: false,
  queryString: '',
  heroData: {},
}

const heroesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_QUERY_DATA:
      return {
        ...state,
        heroData: Object.assign({}, state.heroData, action.apiData)
      };
    case SAVE_QUERY_STRING:
      return {
        ...state,
        queryString: action.inputString,
      };
    case REQUEST_PENDING:
      return {
        ...state,
        requestPending: action.requestPending,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        requestSuccess: action.requestSuccess,
      };
    case REQUEST_FAILURE:
      return {
        ...state,
        requestFailure: action.requestFailure,
      }
    case REQUEST_RESET:
    return {
      ...sate,
      requestPending: action.requestPending,
      requestSuccess: action.requestSuccess,
      requestFailure: action.requestFailure,
    }
    default:
      return { ...state };
  }
}

export default heroesReducer;
