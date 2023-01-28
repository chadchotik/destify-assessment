import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import roomInfoReducer from '../features/RoomScreen/RoomScreenSlice';
import tabRoomReducer from '../features/TabSlider/TabSliderSlice'

export const store = configureStore({
  reducer: {
    roomInfo: roomInfoReducer,
    selectedRoomId: tabRoomReducer
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
