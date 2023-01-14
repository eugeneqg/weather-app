import "./header.sass";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import { useRef, useEffect, useState } from "react";

const Header = ({setCity}) => {

  const ref = useRef();

  const openSearch = () => {
    document.querySelector(".search").classList.add("opened");
    document.querySelector(".search-input").classList.add("open-input");
  }

  const getCityName = (e) => {
    setCity(e.target.value);
  }

  useEffect(() => {

    const handler = (e) => {
      if (!ref.current.contains(e.target)) {
        document.querySelector(".search").classList.remove("opened");
        document.querySelector(".search-input").classList.remove("open-input");
      }
    }

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);

  }, [ref])

    return (
        <Navbar className="navbar">
        <Container>
          <Navbar.Brand>
            WEATHER'LY
          </Navbar.Brand>
          <div ref={ref} onClick={openSearch} className="search">
            <img src="/img/search.svg" alt="search"/>
            <input onChange={getCityName} className="search-input" type="search" name="search" placeholder="Search"></input>
          </div>
        </Container>
      </Navbar>
    )
}

export default Header;