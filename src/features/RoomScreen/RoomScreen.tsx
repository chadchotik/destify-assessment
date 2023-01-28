import React, {useEffect} from 'react';

import { Header } from '../Header/Header';
import { TabSlider } from '../TabSlider/TabSlider';
import { RoomPanel } from '../RoomPanel/RoomPanel'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getRoomInfo } from './RoomScreenSlice';
import CircularProgress from '@mui/material/CircularProgress';


function RoomScreen() {
    const roomInfoList = useAppSelector(state => state.roomInfo);
    const dispatch = useAppDispatch();

    //Test for no ongoing room info
    //const roomInfoList:any = {roomInfo :[]};

    

    useEffect(() => {
        dispatch(getRoomInfo(['ceae0d77-2fd6-dbe3-0f33-61c355c106ff', '4c0ad727-1652-3b6e-4adb-61c21a17a4b1']));
      }, [])

  return (
    <>        
        <Header />
        {roomInfoList.status === 'loading' &&  <CircularProgress style={{paddingTop:'20px'}}/>}
        {roomInfoList.status === 'idle' && roomInfoList.roomInfo.length > 0 && 
        <>
            <TabSlider /> 
            <RoomPanel />
        </>
        }
        {
         roomInfoList.status === 'idle' && roomInfoList.roomInfo.length <= 0 && 
            <div style={{paddingTop: '50px'}}>You have no ongoing trips.</div>
        }    
    </>
  );
}

export default RoomScreen;
