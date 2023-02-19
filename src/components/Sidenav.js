import { navData } from "../lib/navData"; 
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

export default function Sidenav(){
    return (
        <div>
    <button className={styles.menuBtn}>
        <KeyboardDoubleArrowLeftIcon />
    </button>
    {navData.map(item =>{
        return <div key={item.id} className={styles.sideitem}>
 {item.icon}
 <span className={styles.linkText}>{item.text}</span>
 </div>
        })}
 </div>
    )
}