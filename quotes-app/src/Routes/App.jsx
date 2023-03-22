import React, { useEffect, useState } from "react";
import menu from "../assets/menu-icon.svg";
import quoteIcon from "../assets/quote--icon.svg";
import "../App.css";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import "../index.css";
import { Link, Outlet } from "react-router-dom";
import userIcon from "../assets/account_circle_FILL1_wght200_GRAD-25_opsz40.svg";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import shareIcon from "../assets/share_FILL1_wght200_GRAD-25_opsz40.svg";
import prevIcon from "../assets/arrow_back_ios_new_FILL1_wght200_GRAD-25_opsz40.svg";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import twitter from "../assets/twitter--icon.svg";
import instagram from "../assets/instagram.svg";
import mail from "../assets/mail--icon.svg";
import facebook from "../assets/facebook--icon.svg";
import contentCopy from "../assets/content_copy_FILL1_wght200_GRAD-25_opsz40.svg";
const App = () => {
  const getQuotes = JSON.parse(localStorage.getItem("quotes"));
  const [quotes, setQuotes] = useState(getQuotes || []);
  const [currQuote, setCurrQuote] = useState(0);
  const [loader, setLoader] = useState(false);
  const [copy, setCopy] = useState(false);
  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      )
      .then((result) => {
        localStorage.setItem("quotes", JSON.stringify(result.data.quotes));
        setQuotes(result.data.quotes);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  function handleNext() {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setCurrQuote((prev) => (prev + 1) % quotes.length);
    }, Math.floor(Math.random() * 900));
  }

  function handlePrev() {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setCurrQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
    }, Math.floor(Math.random() * 900));
  }
  if (quotes.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box sx={{ textAlign: "center", color: "#ffffff" }}>
          <p>please wait</p>
          <CircularProgress sx={{ color: "#ffffff" }} />
        </Box>
      </div>
    );
  }

  if (currQuote < 0 || currQuote >= quotes.length) {
    setCurrQuote(0);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "20px",
    p: 4,
  };
  const [openshare, setOpen] = React.useState(false);
  const handleOpenshare = () => setOpen(true);
  const handleCloseshare = () => setOpen(false);
  function handleSocial() {
    alert("Social clicked");
  }
  function copyQuote() {
    const textToCopy =
      document.querySelector("#text").innerText +
      " " +
      "by " +
      quotes[currQuote].author +
      " -from Quotiva";
    navigator.clipboard.writeText(textToCopy);
    setCopy(true);
  }
  useEffect(() => {
    const card = document.querySelector(".quote--card");
    function remCopy() {
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    }
    card.addEventListener("mouseout", remCopy);
    return () => card.removeEventListener("mouseout", remCopy);
  }, []);
  return (
    <div className="App">
      <nav className="navbar flex align-middle justify-between border-2">
        <div
          className="logo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <img src={menu} alt="" style={{ paddingInline: "7px" }} />
          <span>Quotiva</span>
        </div>

        <button
          className="user--toggle"
          style={{
            background: "transparent",
            padding: "0",
            borderRadius: "50%",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "none",
          }}
          aria-describedby={id}
          variant=""
          onClick={handleClick}
        >
          <img src={userIcon} alt="" />
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            style={{
              marginBlock: "10px",
              padding: "10px 5px",
              display: "grid",
              placeItems: "center",
            }}
          >
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
      </nav>
      <div className="quote">
        <div className="quote--icon">
          <img src={quoteIcon} alt="" />
        </div>
        <div className="quote--card" id="quote-box">
          <div
            className="copy"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "2px 8px 2px 0px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={copyQuote}
          >
            <img src={contentCopy} alt="" />
            {copy && <p style={{ fontSize: "0.7em" }}>copied</p>}
          </div>
          {loader ? (
            <Box sx={{ textAlign: "center", color: "#ffffff" }}>
              <CircularProgress sx={{ color: "#ffffff" }} />
            </Box>
          ) : (
            <div>
              <h2 id="text">{quotes[currQuote].quote}</h2>
              <p id="author" className="author">
                {quotes[currQuote].author}
              </p>
            </div>
          )}
        </div>
        <div className="btns">
          <button onClick={handlePrev} className="previous">
            <img src={prevIcon} alt="" />
          </button>
          <button id="new-quote" onClick={handleNext} className="newQuote">
            Next Quote
          </button>
          <button className="share" onClick={handleOpenshare}>
            <img src={shareIcon} alt="" />
          </button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openshare}
            onClose={handleCloseshare}
            closeAfterTransition
            sx={{ backdropFilter: "blur(2px)" }}
          >
            <Fade in={openshare}>
              <Box sx={style}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: "400" }}
                  >
                    Share quote via
                  </Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography
                    title="share to Twitter"
                    onClick={handleSocial}
                    id="transition-modal-description"
                    sx={{
                      mt: 2,
                      cursor: "pointer",
                      borderRadius: "40px",
                      width: "50px",
                      height: "50px",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <a href="#" id="tweet-quote">
                      <img src={twitter} alt="" />
                    </a>
                  </Typography>
                  <Typography
                    title="share to Instagram"
                    onClick={handleSocial}
                    id="transition-modal-description"
                    sx={{
                      mt: 2,
                      cursor: "pointer",
                      borderRadius: "40px",
                      width: "50px",
                      height: "50px",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <a href="#">
                      <img src={instagram} alt="" />
                    </a>
                  </Typography>
                  <Typography
                    title="share to Facebook"
                    onClick={handleSocial}
                    id="transition-modal-description"
                    sx={{
                      mt: 2,
                      cursor: "pointer",
                      borderRadius: "40px",
                      width: "50px",
                      height: "50px",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <a href="#">
                      <img src={facebook} alt="" />
                    </a>
                  </Typography>
                  <Typography
                    title="share to Mail"
                    onClick={handleSocial}
                    id="transition-modal-description"
                    sx={{
                      mt: 2,
                      cursor: "pointer",
                      borderRadius: "40px",
                      width: "50px",
                      height: "50px",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <a href="#">
                      <img src={mail} alt="" />
                    </a>
                  </Typography>
                </div>
              </Box>
            </Fade>
          </Modal>
        </div>
      </div>
      <div style={{ color: "#fff", textAlign: "center" }} id="detail">
        {Outlet}
      </div>
    </div>
  );
};

export default App;
