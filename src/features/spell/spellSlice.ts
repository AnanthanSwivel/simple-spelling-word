import { createSlice  } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { apiError } from '../../helpers/api-error';
import { API_BASE_URL } from './../../helpers/constants';

export interface Spelling {
  _id : string,
  index : string,
  name : string,
  desc : string,
  higher_level : string,
  url : string,
  material : string,
  duration : string,
  classes : SpellingWordList[],
  subclasses : SpellingWordList[],
}


export interface SpellingWordList {
  index : string,
  name : string,
  url : string
}


export interface SpellApiData {
  results : SpellingWordList[],
  count : number
}

export interface SpellState {
  spellings: SpellApiData;
  status: 'idle' | 'loading' | 'failed' | 'success';
}

const initialState: SpellState = {
  spellings: {
    results: [],
    count:0
  },
  status: 'idle',
};


export const spellSlice = createSlice({
  name: 'spell',
  initialState,
  reducers: {
    getSpellingData: (state:SpellState , action:any) => {
      state.spellings = action.payload;
      state.status = 'success';
    },
    getSpellingDataLoading: (state:SpellState) => {
      state.status = 'loading';
    },
    getSpellingDataFailed: (state:SpellState) => {
      state.status = 'failed';
    },
  },
});

export const { getSpellingData, getSpellingDataLoading,getSpellingDataFailed } = spellSlice.actions;


export const spellings = (state: RootState) => state.spell.spellings;
export const spellingsStatus = (state: RootState) => state.spell.status;


export const getSpellingDataApi =  (name?:string) => async (dispatch:any) => {
  dispatch(getSpellingDataLoading());
  return axios.get(`${API_BASE_URL}/spells?name=${name}`)
    .then(({ data }) => {
      dispatch(getSpellingData(data))
    })
    .catch(function(error:any){
        apiError(error);
        dispatch(getSpellingDataFailed())
    });
}

export default spellSlice.reducer;
