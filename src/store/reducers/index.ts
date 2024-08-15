import {eventReducer} from './events.reducer';
import {RootState} from '../index';
import {AnyAction, combineReducers, Reducer} from 'redux';
import {authReducer} from './auth.reducer';

export const reducer: Reducer<RootState, AnyAction> = (state, action) => {
  return rootReducer(state, action);
};

export const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
});

export default rootReducer;
