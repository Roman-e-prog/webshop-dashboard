import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import {FaHome, FaMoneyBillWaveAlt} from 'react-icons/fa';
import {HiTrendingUp} from 'react-icons/hi'
import {MdTimeline, 
    MdOutlineBarChart,
    MdMailOutline,
    MdOutlineFeedback,
    MdOutlineNotificationImportant, 
    MdOutlineManageAccounts} from 'react-icons/md'
const Container = styled.div`
    flex:1;
`;
const Menue = styled.ul`
    display:flex;
    flex-direction:column;
    width:100%;
    
`;
const MenueItem = styled.li`
    display:flex;
    align-items:center;
    color:var(--darkGray);
    width:100%;
    padding:10px;
    cursor: pointer;
    font-size:20px;
`;
const Sidebar = () => {
  return (
    <Container>
      <Menue>
        <MenueItem>
            <FaHome/>
            <Link to="/" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}}>Home</Link>
        </MenueItem>

        <MenueItem>
            <HiTrendingUp/>
            <Link to="/sales" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}}>Sales</Link>
        </MenueItem>

        <MenueItem>
            <MdTimeline/>
            <Link to="/analytics" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}}>Analytics</Link>
        </MenueItem>

        <MenueItem>
            <FaMoneyBillWaveAlt/>
            <Link to="/transactions" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}}>Transaktionen</Link>
        </MenueItem>

        <MenueItem>
            <MdOutlineBarChart/>
            <Link to="/reports" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}}>Reports</Link>
        </MenueItem>

        <MenueItem>
            <MdMailOutline/>
            <Link to="/mail" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}}>Mail</Link>
        </MenueItem>

        <MenueItem>
            <MdOutlineFeedback/>
            <Link to="/feedback" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}}>Feedback</Link>
        </MenueItem>

        <MenueItem>
            <MdOutlineNotificationImportant/>
            <Link to="/messages" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}}>Nachrichten</Link>
        </MenueItem>

        <MenueItem>
            <MdOutlineManageAccounts/>
            <Link to="/manage" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}}>Manage</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/user" className="link" style={{color:"var(--darkGray)"}}>User</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/products" className="link" style={{color:"var(--darkGray)"}}>Produkte</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/productlistChild" className="link" style={{color:"var(--darkGray)"}}>Produkt Menue Kinder</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/productlistWomen" className="link" style={{color:"var(--darkGray)"}}>Produkt Menue Damen</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/productlistMen" className="link" style={{color:"var(--darkGray)"}}>Produkt Menue Herren</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/productlistSportschuhe" className="link" style={{color:"var(--darkGray)"}}>Produkt Menue Sportschuhe</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/productlistSneaker" className="link" style={{color:"var(--darkGray)"}}>Produkt Menue Sneaker</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/cardImages" className="link" style={{color:"var(--darkGray)"}}>Bilder Frontseite Produktrubriken</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/sneakerImage" className="link" style={{color:"var(--darkGray)"}}>Hintergrundbild Sneaker</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/newsletterBackground" className="link" style={{color:"var(--darkGray)"}}>Newsletter Hintergrund</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/sliderImage" className="link" style={{color:"var(--darkGray)"}}>Slider Bilder</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/descriptionItems" className="link" style={{color:"var(--darkGray)"}}>Text Frontseite</Link>
        </MenueItem>
      </Menue>
    </Container>
  )
}

export default Sidebar
