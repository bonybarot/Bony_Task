import {
  AnyAction,
  AsyncThunk,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import {ILogin} from '../../interfaces/common';
import authService from '../../services/auth.service';
import {RootState} from '../index';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

export const loginUser: any = createAsyncThunk(
  `auth/login`,
  async (payload: ILogin) => {
    try {
      const {data} = await authService.login(payload);
      if (data.success) {
        return data;
      } else {
        Toast.show({
          type: 'error',
          text1: data.message,
        });
      }
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
  action.type.startsWith(authSlice.name) && action.type.endsWith('/pending');
const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.startsWith(authSlice.name) && action.type.endsWith('/rejected');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(loginUser.fulfilled, (state: State) => {
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

export const authReducer = authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
