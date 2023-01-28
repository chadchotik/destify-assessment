import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './RoomPanel.module.css'
import { Avatar, Chip } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import PersonIcon from '@mui/icons-material/Person';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

export function RoomPanel() {
    const [selectedRoom , setSelectedRoom] = useState<any>({});
    const roomInfoList = useAppSelector(state => state.roomInfo);
    const selectedRoomId = useAppSelector(state => state.selectedRoomId);
    const dispatch = useAppDispatch();


    useEffect(() => {
        setSelectedRoom(roomInfoList.roomInfo.find((room) => room?.room[0]?.id === selectedRoomId.selectedRoomId))
    },
    [selectedRoomId.selectedRoomId, roomInfoList.roomInfo])
  

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

    const AccordionStyle = {
        '&:before': {
          backgroundColor: 'transparent !important',
        },
      };


  return (
    <>
    {selectedRoom?.room &&  
    <>  
        <div className={styles.roomInfoContainer}>
            <div className={styles.roomItemContainer}>
                <div className={styles.avatarContainer}>
                    <Avatar sx={{ bgcolor: '#2e96e0', height: '60px', width: '60px'}} >  
                        <MeetingRoomIcon style={{color : '#47476b', fontSize: '35px'}}/>
                    </Avatar>
                </div>
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
                <Avatar sx={{border: '2px solid green', bgcolor: 'white', height: '20px', width: '20px'}}>
                    <CheckIcon style={{color : 'green'}}/>
                </Avatar>
                }
                 label={<div style={{color: 'green'}}>{renderRoomStatus(selectedRoom?.room[0]?.roomStatus)}</div>}
                variant ="outlined"
                 style={{height: '40px', border: '1px solid green', borderRadius: '20px', marginRight: '10px'}} 
                 />
               
           
               <Chip 
                icon={ 
                <Avatar sx={{border: '2px solid purple', bgcolor: 'white', height: '20px', width: '20px'}}>
                    <AttachMoneyIcon style={{color : 'purple'}}/>
                </Avatar>
                }
                 label={<div style={{color: 'purple'}}>{renderRoomBalance(selectedRoom?.room[0])}</div>}
                variant ="outlined"
                 style={{height: '40px', border: '1px solid purple', borderRadius: '20px'}} 
                 />
          

            </div>

            <div className={styles.descriptionText}>{selectedRoom?.hotel[0]?.hotelDescription}</div>

            <Accordion sx={AccordionStyle} elevation={0}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                style={{borderBottom: '1px solid rgba(178, 190, 181, 0.5)'}}>
                
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
                </AccordionSummary>
                <AccordionDetails sx={{padding: 0}}>
                    <div className={styles.guestContainer}>
                        <div className={styles.guestText}>Guests in this room</div>
                        <div className={styles.guestChipContainer}>
                            {selectedRoom?.travelers.map((traveler : any) =>  <Chip 
                                icon={traveler.age > 3 ? 
                                    <PersonIcon style={{color : 'teal'}}/>
                                    :
                                    <ChildCareIcon style={{color : 'teal'}}/>
                             
                                }
                                label={<div style={{color: 'teal'}}>{`${traveler.firstName} ${traveler.middleName} ${traveler.lastName}`}</div>}
                                variant ="outlined"
                                style={{height: '40px', border: '1px solid teal', borderRadius: '20px', marginRight: '10px'}} 
                            />
                            )
                           
                            }
                        </div>
                    </div>
                  
                </AccordionDetails>
            </Accordion>
        </div>
    </>
    } 
    </>
  );
}

