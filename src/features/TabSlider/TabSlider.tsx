import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateSelectedRoomId } from './TabSliderSlice'
import styles from './TabSlider.module.css';


export function TabSlider() {
  const roomInfoList = useAppSelector(state => state.roomInfo);
  const selectedRoomId = useAppSelector(state => state.selectedRoomId);
  const dispatch = useAppDispatch();


  const handleChange = (event: React.SyntheticEvent, newValue: any ) => {
    dispatch(updateSelectedRoomId(newValue));
  };


  useEffect(() => {
    if(!selectedRoomId?.selectedRoomId)
       dispatch(updateSelectedRoomId(roomInfoList.roomInfo[0].room[0].id))
  },
  [roomInfoList])


  return (
    <Box sx={{ width: '70vh'}}>
      {roomInfoList.roomInfo.length > 0 && 
      <Tabs
        value={selectedRoomId.selectedRoomId}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        classes={{
          root: styles.tabSlider,
          indicator: styles.tabIndicator
        }}
       
      >
        {roomInfoList.roomInfo.map((room: any) => 
        <Tab 
        key={room?.room[0].id} 
        value={room?.room[0].id} 
        label={<div className={styles.tabLabel} style={{color: selectedRoomId.selectedRoomId === room?.room[0].id ? '#07768d' : '#c2c2c2'}}>{room?.room[0]?.roomName}</div>}></Tab>
        )}

        {/* Excess Data to show Slider Arrows  */}

        {/* <Tab label="extra"></Tab>
        <Tab label="extra"></Tab>
        <Tab label="extra"></Tab>
        <Tab label="extra"></Tab>
        <Tab label="extra"></Tab>
        <Tab label="extra"></Tab>
        <Tab label="extra"></Tab>
        <Tab label="extra"></Tab> */}

        
      </Tabs>
      }
    </Box>
  );
}