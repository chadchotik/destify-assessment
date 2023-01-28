import React, {useEffect} from 'react';

import { Header } from '../Header/Header';
import { TabSlider } from '../TabSlider/TabSlider';
import { RoomPanel } from '../RoomPanel/RoomPanel'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getRoomInfo } from './RoomScreenSlice';

function RoomScreen() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getRoomInfo(['ceae0d77-2fd6-dbe3-0f33-61c355c106ff', '4c0ad727-1652-3b6e-4adb-61c21a17a4b1']));
      }, [])


  return (
    <>        
        <Header />
        <TabSlider /> 
        <RoomPanel />    
    </>
  );
}

export default RoomScreen;
