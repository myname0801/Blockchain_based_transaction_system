import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { DB, Review } from "./Middleware/Middleware";
import Home from "./Pages/Home";
import Reserve from "./Pages/Reserve";
import UserInfo from "./Functions/UserInfo";
import Login from "./Functions/Login";
import Signup from "./Functions/Signup";
import Userinfoedit from "./Pages/Userinfoedit";
import ReviewList from "./Pages/ReviewList";
import ReviewInfo from "./Pages/ReviewInfo";
import Consertinfo from "./Pages/Consertinfo";
import PastReservation from "./Pages/PastReservation";
import Deal from "./Pages/Deal";
import Admininfo from "./Functions/Admininfo";
import Tickets from './Pages/Tickets';
import Events from "./Pages/Contents";
import Ticketdeal from './Functions/Ticketdeal';
import TransactionList from "./Functions/Getxdata";


function App() {
  const [islogin, setislogin] = useState(false);
  const [UID, setUID] = useState("");
  const [modalvalue, setmodalvalue] = useState("");
  const [modalopen, setmodalOpen] = useState(false);
  const today = new Date();
  const formatoday = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${today.getHours()}:${today.getMinutes()} `;

  const datarefresh = async () => {
    try {
      const response = await axios.get(DB);
      let tempdata = UID.id;
      setUID(response.data.find((item) => item.id === tempdata));
      console.log(UID);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = (e) => {
    setmodalOpen(true);
    setmodalvalue(e.target.value);
    console.log(modalvalue)
  };
  const Modalid = (e) => {
    setmodalOpen(true);
    setmodalvalue(e.target.value);
    console.log(modalvalue)
  };

  const closeModal = () => {
    setmodalOpen(false);
    setmodalvalue(null);
    datarefresh();
  };

  const modalstyle = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      width: "60%",
      height: "20%",
      margin: "auto",
      borderRadius: "7px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    },
  };

  const props = {
    setislogin,
    UID,
    setUID,
    modalvalue,
    setmodalvalue,
    openModal,
    closeModal,
    modalstyle,
    modalopen,
    formatoday,
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/CenterInfo" element={<Consertinfo {...props} />} />
        <Route path="/Signup" element={<Signup {...props} />}></Route>
        <Route path="/Tickets" element={<Tickets {...props} />}></Route>
        <Route path="/Events" element={<Events {...props} />}></Route>
        <Route
        path="/Account"
  element={
    islogin ? (
      UID.id === "admin" ? (
        <Admininfo {...props} /> // 특정 아이디일 경우 이 페이지를 렌더링
      ) : (
        <UserInfo {...props} /> // 로그인만 되어 있을 경우 이 페이지를 렌더링
      )
    ) : (
      <Login {...props} /> // 로그인되지 않았을 경우 로그인 페이지를 렌더링
    )
  }
></Route>

        <Route
          path="/Userinfo"
          element={islogin ? <Userinfoedit {...props} /> : <Login {...props} />}
        ></Route>
        <Route
          path="/Reserve"
          element={islogin ? <Reserve {...props} /> : <Login {...props} />}
        ></Route>
        <Route
          path="/PastReservation"
          element={
            islogin ? <PastReservation {...props} /> : <Login {...props} />
          }
        ></Route>
        <Route
          path="/Deal"
          element={islogin ? <Deal {...props} /> : <Login {...props} />}
        ></Route>
        <Route path="/Deal/Ticketdeal/:id" element={islogin ? <Ticketdeal {...props} /> : <Login {...props} />}></Route>
        <Route path="/Dealist" element={<TransactionList  {...props}  />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
