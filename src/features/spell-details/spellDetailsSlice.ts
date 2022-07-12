import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { API_BASE_URL } from '../../helpers/constants';

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

export interface SpellDetailsState {
  spelling?: Spelling;
  status: 'idle' | 'loading' | 'failed' | 'success';
}

const initialState: SpellDetailsState = {
  spelling: {
    _id : '',
    index : '',
    name : '',
    desc : '',
    higher_level : '',
    url : '',
    material : '',
    duration : '',
    classes : [],
    subclasses : [],
  },
  status: 'idle',
};


export const spellDetailsSlice = createSlice({
  name: 'spell-details',
  initialState,
  reducers: {
    getSpellingDetails: (state:SpellDetailsState , action:any) => {
      state.spelling = action.payload;
      state.status = 'success';
    },
    getSpellingDetailsDataLoading: (state:SpellDetailsState) => {
      state.status = 'loading';
    },
  },
});

export const { getSpellingDetails, getSpellingDetailsDataLoading } = spellDetailsSlice.actions;


export const spelling = (state: RootState) => state.spellDetails.spelling;
export const spellingStatus = (state: RootState) => state.spellDetails.status;


export const getSpellingDetailsApi =  (name:string) => async (dispatch:any) => {
  dispatch(getSpellingDetailsDataLoading());
  return axios.get(`${API_BASE_URL}/spells/${name}`)
    .then(({ data }) => {
      dispatch(getSpellingDetails(data));
  });
}

export default spellDetailsSlice.reducer;
