import styles from './Header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';

export function Header() {


  return (
    <div className={styles.header}>
        <div className={styles.headerContainer}> 
            <MenuIcon className={styles.menuIcon}/>
            <div className={styles.headerText}>Room Dashboard</div>
            <Avatar sx={{ bgcolor: '#2e96e0', height: '70px', width: '70px'}} className={styles.avatar}>CC</Avatar>
        </div>
   
    </div>

  );
}
