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
`;
const MenueItem = styled.li`
    display:flex;
    align-items:center;
    color:var(--darkgray);
`;
const Sidebar = () => {
  return (
    <Container>
      <Menue>
        <MenueItem>
            <FaHome/>
            <Link to="/" className="link">Home</Link>
        </MenueItem>

        <MenueItem>
            <HiTrendingUp/>
            <Link to="/sales" className="link">Sales</Link>
        </MenueItem>

        <MenueItem>
            <MdTimeline/>
            <Link to="/analytics" className="link">Analytics</Link>
        </MenueItem>

        <MenueItem>
            <FaMoneyBillWaveAlt/>
            <Link to="/transactions" className="link">Transaktionen</Link>
        </MenueItem>

        <MenueItem>
            <MdOutlineBarChart/>
            <Link to="/reports" className="link">Reports</Link>
        </MenueItem>

        <MenueItem>
            <MdMailOutline/>
            <Link to="/mail" className="link">Mail</Link>
        </MenueItem>

        <MenueItem>
            <MdOutlineFeedback/>
            <Link to="/feedback" className="link">Feedback</Link>
        </MenueItem>

        <MenueItem>
            <MdOutlineNotificationImportant/>
            <Link to="/messages" className="link">Nachrichten</Link>
        </MenueItem>

        <MenueItem>
            <MdOutlineManageAccounts/>
            <Link to="/manage" className="link">Manage</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/user" className="link">User</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/products" className="link">Produkte</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/productlistChild" className="link">Produkt Menue Kinder</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/productlistWomen" className="link">Produkt Menue Damen</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/productlistMen" className="link">Produkt Menue Herren</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/productlistSportschuhe" className="link">Produkt Menue Sportschuhe</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/productlistSneaker" className="link">Produkt Menue Sneaker</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/cardImages" className="link">Bilder Frontseite Produktrubriken</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/sneakerImage" className="link">Hintergrundbild Sneaker</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/newsletterBackground" className="link">Newsletter Hintergrund</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/productlistChild" className="link">Produkt Menue Kinder</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/sliderImage" className="link">Slider Bilder</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/descriptionItems" className="link">Text Frontseite</Link>
        </MenueItem>
        
        <MenueItem>
            <Link to="/productlistChild" className="link">Produkt Menue Kinder</Link>
        </MenueItem>
      </Menue>
    </Container>
  )
}

export default Sidebar
