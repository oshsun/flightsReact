import React, { useState } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";


export default function Navbar(props) {
  const [navbarState, setNavbarState] = useState(false);
  console.log(props.IsStaff);

  const handleLogout = () => {
    console.log("logout from navbar");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("is_super_user");
    localStorage.removeItem("is_staff_member");
    props.setIsSuperUser(false);
    props.setIsStaff(false);
    props.setUsername("");
    props.setLogged(false);
  };

  return (
    <>
      <Nav>
        <div className='brand'>
          <div className='container'>Travelosh</div>
          {props.username && (
            <span style={{ marginLeft: "50px" }}>Welcome {props.username}</span>
          )}


          <div className='toggle'>
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavbarState(true)} />
            )}
          </div>
        </div>

        <ul>
          <li>
            <Link to='' onClick={() => setNavbarState(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to='/deals' onClick={() => setNavbarState(false)}>
              Last Minute Deals
            </Link>
          </li>
          <li>
            <Link to='/countries' onClick={() => setNavbarState(false)}>
              Countries
            </Link>
          </li>

          {props.logged && (
            <>
              <li>
                <Link
                  to='/customer-profile'
                  onClick={() => setNavbarState(false)}>
                  My Profile
                </Link>
              </li>
              <li>
                <Link to='/my-tickets'>My Tickets</Link>
              </li>
            </>
          )}
        </ul>
        {props.logged ? (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={props.toggleShowRegister}>Register</button>
            <button onClick={props.toggleShowLogin}>Login</button>
          </>
        )}

       {localStorage.getItem("is_staff_member") === "true" &&
          localStorage.getItem("is_super_user") === "false" && (
            <Link to='/Staff'>
              <button>Staff</button>
            </Link>
          )}
        

        {localStorage.getItem("is_super_user") === "true" && (
          <a href='http://127.0.0.1:8000/admin/' target='_blank'>
            <button>Admin</button>
          </a>
        )}
      </Nav>
      <ResponsiveNav state={navbarState}>
        <ul>
          <li>
            <Link to='' onClick={() => setNavbarState(false)}>
              Home
            </Link>
          </li>
          <li>
            <a href='#services' onClick={() => setNavbarState(false)}>
              About
            </a>
          </li>
          <li>
            <a href='#recommend' onClick={() => setNavbarState(false)}>
              Places
            </a>
          </li>
          <li>
            <a href='#testimonials' onClick={() => setNavbarState(false)}>
              Testimonials
            </a>
          </li>
        </ul>
      </ResponsiveNav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .brand {
    .container {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.2rem;
      font-weight: 900;
      text-transform: uppercase;
    }
    .toggle {
      display: none;
    }
  }
  ul {
    display: flex;
    gap: 1rem;
    list-style-type: none;
    li {
      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #023e8a;
          font-weight: 900;
        }
      }
    }
  }
  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 1rem;
    border: none;
    color: white;
    background-color: #48cae4;
    font-size: 1.1rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #023e8a;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .toggle {
        display: block;
      }
    }
    ul {
      display: none;
    }
    button {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  top: ${({ state }) => (state ? "50px" : "-400px")};
  background-color: white;
  height: 30vh;
  width: 100%;
  align-items: center;
  transition: 0.3s ease-in-out;
  ul {
    list-style-type: none;
    width: 100%;
    li {
      width: 100%;
      margin: 1rem 0;
      margin-left: 2rem;

      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #023e8a;
          font-weight: 900;
        }
      }
    }
  }
`;
