import { Link, NavLink } from "react-router-dom"
import { useState, useEffect } from "react";
import iconImg from "../assets/avatar-icon.png"
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLine } from "react-icons/ri";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [mobileScreen, setMobileScreen] = useState(false)


    useEffect(()=> {
        if(window.innerWidth > 600) {
            setMobileScreen(false)
        } else setMobileScreen(true)

        window.addEventListener('resize', ()=> {
            if(window.innerWidth > 600) {
                setMobileScreen(false)
            } else setMobileScreen(true)
        })
    }, [])


    function fakeLogOut() {
        localStorage.removeItem("loggedin")
    }


    return(
        <header>
        
            <nav className="home-nav">
                <Link className="logo" to="/">#Vanlife</Link>
                <button className="open-menu-btn" onClick={()=>{setIsOpen(!isOpen)}}>{isOpen ? <RiCloseLine /> : <RxHamburgerMenu />}</button>

                <div className={`navigation ${mobileScreen & isOpen ? 'open' : '' } `}>
                <div className="navigation-menu">
                    <NavLink to="/host" 
                        className={({isActive}) => isActive ? 'active-link' : null}>
                        Host
                    </NavLink>
                    <NavLink to="/about" 
                        className={({isActive}) => isActive ? 'active-link' : null}>
                        About
                    </NavLink>
                    <NavLink to="/vans" 
                        className={({isActive}) => isActive ? 'active-link' : null}>
                        Vans
                    </NavLink>
                    <Link to='login' className="login-link">
                        <img src={iconImg}
                        className="login-icon"
                        />
                    </Link>
                    
                    <button className="logout-btn" onClick={fakeLogOut}>Logout</button>
                    </div>
                </div>

            </nav>
        </header>
    )
}