import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import spellReducer from '../features/spell/spellSlice';
import spellDetailsSlice from '../features/spell-details/spellDetailsSlice';

export const store = configureStore({
  reducer: {
    spell: spellReducer,
    spellDetails: spellDetailsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
