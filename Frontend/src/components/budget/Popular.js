import {React} from 'react';
import { Link } from "react-router-dom";
import styles from "./Popular.module.css";
import location from "../../assets/location.png"
import spot from "../../assets/spot.png"

const Popular = () => {
  return (
  <div style={{maxWidth:'87%', width: '87%', backgroundColor:'#316FDF',
  display:'flex',justifyContent:'space-evenly', margin: '0.5rem auto',
  borderRadius:'1rem'}}>
    <div style={{marginLeft:'0.4rem', padding:'1.3rem 0.5rem 1.1rem 0.6rem'}} >
      <p style={{opacity:'0.8',fontSize:'0.9rem',color:'#FFF',fontFamily:'preLt',marginTop:0,marginBottom:'0.3rem',textAlign:'start'}}>놀면 뭐하니?</p>
      <p style={{color:'white',fontSize:'1.1rem',fontFamily:'preBd',margin:'0 0 1.2rem 0',textAlign:'start'}}>내 근처 인기있는 장소는?</p>
      <Link to='/popular' style={{color: 'white',textDecoration:'none'}}>
        <button style={{paddingTop:'0.2rem',paddingBottom:'0.2rem',marginBottom:'0.5rem', color: 'white', border:'0.02rem solid white',borderRadius:'0.4rem',
        display:'flex',margin: 0, textDecoration:'none'}} className={styles.more}>보러가기 &gt; 
        </button></Link>
    </div>
    <img style={{margin:'0', padding:'1.3rem 1rem 0.9rem 0rem', 
    // alignItems:'center',width:'5rem', height:'4.7rem'}} src={location} alt="png"/>
    alignItems:'center',width:'5.4rem', height:'5.2rem'}} src={spot} alt="png"/>
  </div>
  );
};

export default Popular;
