import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Styles/Home.css";
import Search from "../Functions/Search";
import BottomRouter from "../Routers/BottomRouter";


const redirect = () =>{
  <Link to={"Deal"}></Link>;
}
function Home() {
  return (
    <div>
      <Search />
      <br />

      <button className="left">
        <img className="nearimg" src="img/nearwash.png" /> 주변 행사 보기
      </button>
      <Link to="Deal">
      <button className="right">
        <img className="mapimg" src="img/map.png" /> 티켓 거래하기
      </button>
      </Link>
      <br />
      <br />
      <h4 className="text">지금 예매중!</h4>
      <div>
        {/* <Link to="CenterInfo"> */}
        <Link to="Deal">
          <img className="washimg" src="img/SAMPLE.png" />
          <h5> @@@콘서트</h5>
          <h6> 어쩌구저쩌구어쩌라구</h6>
        </Link>
      </div>
      <div>
        <img className="washimg" src="img/SAMPLE.png" />
        <h5> @@@박람회</h5>
        <h6> 어쩌구저쩌구어쩌라구</h6>
      </div>
      <div>
        <img className="washimg" src="img/SAMPLE.png" />
        <h5> @@@전시회</h5>
        <h6> 어쩌구저쩌구어쩌라구</h6>
      </div>
      <br />
      <h4 className="text">곧 예매 예정</h4>
      <div>
        <img className="washimg" src="img/SAMPLE.png" />
        <h5> @@@</h5>
        <h6> 5월 5일 13:00 오픈 예정!</h6>
      </div>
      <div>
        <img className="washimg" src="img/SAMPLE.png" />
        <h5> @@@</h5>
        <h6> 4월 19일 12:30 오픈 예정!</h6>
      </div>
      <div className="Navi">
        <BottomRouter />
      </div>
    </div>
  );
}

export default Home;
