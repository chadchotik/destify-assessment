import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './RoomPanel.module.css'
import { Avatar, Chip } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

export function RoomPanel() {
    const [selectedRoom , setSelectedRoom] = useState<any>({});
    const roomInfoList = useAppSelector(state => state.roomInfo);
    const selectedRoomId = useAppSelector(state => state.selectedRoomId);
    const dispatch = useAppDispatch();


    useEffect(() => {
        setSelectedRoom(roomInfoList.roomInfo.find((room) => room?.room[0]?.id === selectedRoomId.selectedRoomId))
    },
    [selectedRoomId.selectedRoomId, roomInfoList.roomInfo])
  
   
    // <div>{selectedRoom?.room[0]?.roomName}</div>

    console.log('selectedroom', selectedRoom);

    const renderRoomStatus = (status: string) => {
        if(status === 'Active') return "Booked"
        if(status === 'Pending') return "Processing"
        if(status === 'Cancelled') return "Cancelled"
    }

    const renderRoomBalance = (room: any) => {
        let finalPaymentDue = room.daysTillFinalPaymentDue;
        let balance = room.remainingBalance;

        if(balance <= 0) return "Paid in Full"
        else if( balance > 0 && finalPaymentDue <= 0) return "Past Due"
        else return `Balance Due - $${balance}`
    }


  return (
    <>
    {selectedRoom?.room &&  
    <>  
        <div className={styles.roomInfoContainer}>
            <div className={styles.roomItemContainer}>
                <div className={styles.avatarContainer}><Avatar sx={{ bgcolor: '#5eb9e4', height: '60px', width: '60px'}} className={styles.avatar}/></div>
                <div className={styles.roomTextContainer}>
                    <div className={styles.roomNicknameText}>{selectedRoom?.room[0]?.roomName}</div>
                    <div className={styles.roomSubInfoText}>{`${selectedRoom?.hotel[0]?.hotelName} - ${selectedRoom?.room[0]?.roomType}`}</div>
                    <div className={styles.roomSubInfoText}>{`${selectedRoom?.room[0]?.travelStartDate} - ${selectedRoom?.room[0]?.travelEndDate}`}</div>

                </div>
                <div className={styles.moreVertContainer}>
                    <MoreVertIcon className={styles.moreVertIcon}/>
                </div>

            </div>
        </div>
        <div className={styles.imageContainer}>
            <img src={selectedRoom?.hotel[0]?.hotelImage} className={styles.image}></img>
        </div>
        <div className={styles.roomDescriptionContainer}>
            <div className={styles.descriptionBadgeContainer}>
               <Chip 
                icon={ 
                <Avatar sx={{border: '1px solid green', bgcolor: 'white', height: '20px', width: '20px'}}>
                    <CheckIcon style={{color : 'green'}}/>
                </Avatar>
                }
                 label={<div style={{color: 'green'}}>{renderRoomStatus(selectedRoom?.room[0]?.roomStatus)}</div>}
                variant ="outlined"
                 style={{height: '40px', border: '1px solid green', borderRadius: '20px', marginRight: '10px'}} 
                 />
               
           
               <Chip 
                icon={ 
                <Avatar sx={{border: '1px solid purple', bgcolor: 'white', height: '20px', width: '20px'}}>
                    <AttachMoneyIcon style={{color : 'purple'}}/>
                </Avatar>
                }
                 label={<div style={{color: 'purple'}}>{renderRoomBalance(selectedRoom?.room[0])}</div>}
                variant ="outlined"
                 style={{height: '40px', border: '1px solid purple', borderRadius: '20px'}} 
                 />
          

            </div>

            <div className={styles.descriptionText}>{selectedRoom?.hotel[0]?.hotelDescription}</div>

            <div className={styles.modifyContainer}>
                <div className={styles.modifyAction}>
                    <EditLocationAltIcon sx={{color: 'teal', marginRight: '10px'}}/> 
                    <div className={styles.modifyText}>Modify</div>
                </div>
                <div className={styles.modifyAction}>
                    <Avatar sx={{border: '1px solid teal', bgcolor: 'white', height: '20px', width: '20px', marginRight: '10px'}}>
                        <AttachMoneyIcon style={{color : 'teal'}}/>
                    </Avatar>
                    <div className={styles.modifyText}>Make Payment</div>
                </div>
               
            </div>
        </div>
    </>
    } 
    </>
  );
}

