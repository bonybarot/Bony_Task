import {
  AnyAction,
  AsyncThunk,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import eventsService from '../../services/events.service';
import {RootState} from '../index';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

export const getListOfEvents: any = createAsyncThunk(
  `event/getListOfEvents`,
  async () => {
    try {
      const {data} = await eventsService.getListOfEvents();
      console.log('data------', data);
      return data;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
      throw error;
    }
  },
);

interface State {
  loading: boolean;
}
const initialState: State = {
  loading: false,
};

const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.startsWith(eventSlice.name) && action.type.endsWith('/pending');
const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.startsWith(eventSlice.name) && action.type.endsWith('/rejected');

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getListOfEvents.fulfilled, (state: State) => {
        return {
          ...state,
          loading: false,
        };
      })

      .addMatcher(isPendingAction, (state: State) => {
        return {...state, loading: true};
      })
      .addMatcher(isRejectedAction, (state: State) => {
        state.loading = false;
      });
  },
});

export const eventReducer = eventSlice.reducer;
export const eventSelector = (state: RootState) => state.event;
