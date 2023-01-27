import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   incrementIfOdd,
//   selectCount,
// } from './counterSlice';
import styles from './Header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';

export function Header() {
//   const count = useAppSelector(selectCount);
//   const dispatch = useAppDispatch();
//   const [incrementAmount, setIncrementAmount] = useState('2');


  return (
    <div className={styles.header}>
        <div className={styles.headerContainer}> 
            <MenuIcon className={styles.menuIcon}/>
            <div className={styles.headerText}>Room Dashboard</div>
            <Avatar sx={{ bgcolor: '#5eb9e4', height: '60px', width: '60px'}} className={styles.avatar}>CC</Avatar>
        </div>
   
    </div>

  );
}
