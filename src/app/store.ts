import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import roomInfoReducer from '../features/RoomScreen/RoomScreenSlice';
import tabRoomReducer from '../features/TabSlider/TabSliderSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
