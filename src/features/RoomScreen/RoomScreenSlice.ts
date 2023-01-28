import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchRoomInfo } from './RoomScreenAPI';

export interface TabSliderState {
  roomInfo: Array<any>;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TabSliderState = {
  roomInfo: [],
  status: 'idle',
};


export const getRoomInfo = createAsyncThunk(
  'room/getRoomInfo',
  async (roomIds: Array<string>) => {
    const response = await fetchRoomInfo(roomIds);
    return response.roomInfo;
  }
);

export const roomInfoSlice = createSlice({
  name: 'roomInfo',
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(getRoomInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRoomInfo.fulfilled, (state, action) => {
        state.status = 'idle';
        state.roomInfo = action.payload;
      })
      .addCase(getRoomInfo.rejected, (state) => {
        state.status = 'failed';
      });
  },
});


export const selectRoomInfo = (state: RootState) => state.roomInfo;



export default roomInfoSlice.reducer;
