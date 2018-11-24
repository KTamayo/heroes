import { 
  SAVE_QUERY_DATA,
  SAVE_QUERY_STRING,
} from '../actions/actionTypes';


const initialState = {
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
    default:
      return { ...state };
  }
}

export default heroesReducer;