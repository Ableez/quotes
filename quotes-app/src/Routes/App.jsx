import React, { useEffect, useState } from "react";
import menu from "../assets/menu-icon.svg";
import quoteIcon from "../assets/quote--icon.svg";
import "../App.css";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import "../index.css";
import { Outlet } from "react-router-dom";
const App = () => {
  const getQuotes = JSON.parse(localStorage.getItem("quotes"));
  const [quotes, setQuotes] = useState(getQuotes || []);
  const [currQuote, setCurrQuote] = useState(0);
  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      )
      .then((result) => {
        localStorage.setItem("quotes", JSON.stringify(result.data.quotes));
        setQuotes(result.data.quotes);
        console.log(result.data.quotes);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  function handleNext() {
    setCurrQuote((prev) => (prev + 1) % quotes.length);
    console.log(currQuote);
  }

  function handlePrev() {
    setCurrQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
    console.log(currQuote);
  }

  if (quotes.length === 0) {
    return <div>Loading...</div>;
  }

  if (currQuote < 0 || currQuote >= quotes.length) {
    setCurrQuote(0);
  }

  return (
    <div className="App">
      <nav className="navbar flex align-middle justify-between border-2">
        <div className="menu">
          <img src={menu} alt="" />
        </div>
        <div className="logo">Quotes Secrets</div>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <button
                className="user cursor-pointer"
                style={{}}
                {...bindTrigger(popupState)}
              ></button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div style={{ marginBlock: "10px",padding: "5px 10px", display: "grid", placeItems: "center" }}>
                  <p className="user--p">
                  <Typography>UserName</Typography>
                  </p>
                  <p className="user--p">
                    <Typography>UserName</Typography>
                  </p>
                  <button className="user--btn">
                    <Typography>UserName</Typography>
                  </button>
                </div>
              </Popover>
            </div>
          )}
        </PopupState>
      </nav>
      <div className="quote">
        <div className="quote--icon">
          <img src={quoteIcon} alt="" />
        </div>
        <div className="quote--card">
          {quotes ? (
            <>
              <h2>{quotes[currQuote].quote}</h2>
              <p className="author">{quotes[currQuote].author}</p>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="btns">
          <button onClick={handlePrev} className="previous">
            P
          </button>
          <button onClick={handleNext} className="newQuote">
            Next Quote
          </button>
          <button className="share">S</button>
        </div>
      </div>
      <div id="detail">{Outlet}</div>
    </div>
  );
};

export default App;
