import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchSelectedRoomId } from './TabSliderAPI';

export interface TabSliderState {
  selectedRoomId: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TabSliderState = {
  selectedRoomId: '',
  status: 'idle',
};


export const getSelectedRoomId = createAsyncThunk(
  'room/getSelectedRoomId',
  async (selectedRoomId: string) => {
    const response = await fetchSelectedRoomId();
    return response.data;
  }
);

export const tabRoomSlice = createSlice({
  name: 'selectedRoomId',
  initialState,
  reducers: {
    updateSelectedRoomId: (state, action: PayloadAction<string>) => {
      state.selectedRoomId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSelectedRoomId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSelectedRoomId.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedRoomId = action.payload;
      })
      .addCase(getSelectedRoomId.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

 export const { updateSelectedRoomId } = tabRoomSlice.actions;


export const selectSelectedRoomid = (state: RootState) => state.selectedRoomId;

export default tabRoomSlice.reducer;
