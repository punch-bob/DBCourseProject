import React from 'react';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import '../styles/Header.css';

const Header = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className='header'>
            <nav>
                <ul>
                    <li><NavLink className='header-item' to={'/athlete'}>Athletes</NavLink></li>
                    <li><NavLink className='header-item' to={'/club'}>Clubs</NavLink></li>
                    <li><NavLink className='header-item' to={'/competition'}>Competitions</NavLink></li>
                    <li><NavLink className='header-item' to={'/organizer'}>Organizers</NavLink></li>
                    <li><NavLink className='header-item' to={'/coach'}>Coaches</NavLink></li>
                    <li><NavLink className='header-item' to={'/sports-facility'}>Sports facility</NavLink></li>
                    <span className='header-item' onClick={() => setOpen(!open)}>Tables links</span>
                    <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                        <ul>
                            <li><NavLink className='header-item dropdown-item' to={'/comp-athlete'}>Competition {'&'} athlete</NavLink></li>
                            <li><NavLink className='header-item dropdown-item' to={'/comp-organizer'}>Competition {'&'} organizer</NavLink></li>
                            <li><NavLink className='header-item dropdown-item' to={'/facility-sport'}>Facility {'&'} sport</NavLink></li>
                            <li><NavLink className='header-item dropdown-item' to={'/club-athlete'}>Club {'&'} athlete</NavLink></li>
                            <li><NavLink className='header-item dropdown-item' to={'/sport-athlete'}>Sport {'&'} athlete</NavLink></li>
                            <li><NavLink className='header-item dropdown-item' to={'/coach-athlete'}>Coach {'&'} athlete</NavLink></li>
                        </ul>
                    </div>
                    <li><NavLink className='header-item' to={'/sports'}>Sports</NavLink></li>
                    <li><NavLink className='header-item' to={'/type-of-facility'}>Type of facility</NavLink></li>
                    <li><NavLink className='header-item' to={'/coating-type'}>Coating type</NavLink></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;