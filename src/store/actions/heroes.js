import { 
  SAVE_QUERY_DATA, 
  SAVE_QUERY_STRING,
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
  }
}