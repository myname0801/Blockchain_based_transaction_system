import React, { useState } from "react";
import Popup from "../Functions/Modal";
import Modal from "react-modal";
import "../Styles/Reserve.css";
import "../Styles/Modal.css";
import "../Styles/Home.css";
import BottomRouter from "../Routers/BottomRouter";

function Tickets({
  setislogin,
  UID,
  setUID,
  modalvalue,
  setmodalvalue,
  openModal,
  closeModal,
  modalopen,
  modalstyle,
}) {
  return (
    <>
      <Modal isOpen={modalopen} onRequestClose={closeModal} style={modalstyle}>
        {<Popup modalvalue={modalvalue} UID={UID} setUID={setUID} />}
        <button onClick={closeModal} className="memo">
          닫기
        </button>
      </Modal>
      <header className="base">
        <h1>{UID.name} 님의 티켓 발행 내역</h1>
      </header>
      <br />
      <div className="base">
        <br/>
        <h5 className="subtitle">연동된 블록체인 주소 : {UID.blockchain}</h5>{""}
        {/*여기에 블록체인 props로 받아와야댐 서버로부터 따로 컴포넌트 만들어서 넣을 예정*/}
      </div>
      <p>
        <button className="contents">
          {" "}
          {/*여기도 서버에서 예약 정보 받아오는 컴포넌트 들어갈예정*/}
          <h3 className="title">%%%%콘서트</h3>
          <h3 className="subtitle">5월 18일 토요일</h3>
          <h5 className="time">시간 : ~~~~~~~~~</h5>
        </button>
        <button className="memo" value={"memo"} onClick={openModal}>
          상세보기
        </button>
      </p>
      <p>
        <button className="contents">
          {" "}
          {/*여기도 서버에서 예약 정보 받아오는 컴포넌트 들어갈예정*/}
          <h3 className="title">%%%%콘서트</h3>
          <h3 className="subtitle">5월 18일 토요일</h3>
          <h5 className="time">시간 : ~~~~~~~~~</h5>
        </button>
        <button className="memo" value={"memo"} onClick={openModal}>
          상세보기
        </button>
      </p>
      <p>
        <button className="contents">
          {" "}
          {/*여기도 서버에서 예약 정보 받아오는 컴포넌트 들어갈예정*/}
          <h3 className="title">%%%%콘서트</h3>
          <h3 className="subtitle">5월 18일 토요일</h3>
          <h5 className="time">시간 : ~~~~~~~~~</h5>
        </button>
        <button className="memo" value={"memo"} onClick={openModal}>
          상세보기
        </button>
      </p>
      <p>
        <button className="contents">
          {" "}
          {/*여기도 서버에서 예약 정보 받아오는 컴포넌트 들어갈예정*/}
          <h3 className="title">%%%%콘서트</h3>
          <h3 className="subtitle">5월 18일 토요일</h3>
          <h5 className="time">시간 : ~~~~~~~~~</h5>
        </button>
        <button className="memo" value={"memo"} onClick={openModal}>
          상세보기
        </button>
      </p>
      <p>
        <button className="contents">
          {" "}
          {/*여기도 서버에서 예약 정보 받아오는 컴포넌트 들어갈예정*/}
          <h3 className="title">%%%%콘서트</h3>
          <h3 className="subtitle">5월 18일 토요일</h3>
          <h5 className="time">시간 : ~~~~~~~~~</h5>
        </button>
        <button className="memo" value={"memo"} onClick={openModal}>
          상세보기
        </button>
      </p>      <p>
        <button className="contents">
          {" "}
          {/*여기도 서버에서 예약 정보 받아오는 컴포넌트 들어갈예정*/}
          <h3 className="title">%%%%콘서트</h3>
          <h3 className="subtitle">5월 18일 토요일</h3>
          <h5 className="time">시간 : ~~~~~~~~~</h5>
        </button>
        <button className="memo" value={"memo"} onClick={openModal}>
          상세보기
        </button>
      </p>      <p>
        <button className="contents">
          {" "}
          {/*여기도 서버에서 예약 정보 받아오는 컴포넌트 들어갈예정*/}
          <h3 className="title">%%%%콘서트</h3>
          <h3 className="subtitle">5월 18일 토요일</h3>
          <h5 className="time">시간 : ~~~~~~~~~</h5>
        </button>
        <button className="memo" value={"memo"} onClick={openModal}>
          상세보기
        </button>
      </p>      <p>
        <button className="contents">
          {" "}
          {/*여기도 서버에서 예약 정보 받아오는 컴포넌트 들어갈예정*/}
          <h3 className="title">%%%%콘서트</h3>
          <h3 className="subtitle">5월 18일 토요일</h3>
          <h5 className="time">시간 : ~~~~~~~~~</h5>
        </button>
        <button className="memo" value={"memo"} onClick={openModal}>
          상세보기
        </button>
      </p>      <p>
        <button className="contents">
          {" "}
          {/*여기도 서버에서 예약 정보 받아오는 컴포넌트 들어갈예정*/}
          <h3 className="title">%%%%콘서트</h3>
          <h3 className="subtitle">5월 18일 토요일</h3>
          <h5 className="time">시간 : ~~~~~~~~~</h5>
        </button>
        <button className="memo" value={"memo"} onClick={openModal}>
          상세보기
        </button>
      </p>      <p>
        <button className="contents">
          {" "}
          {/*여기도 서버에서 예약 정보 받아오는 컴포넌트 들어갈예정*/}
          <h3 className="title">%%%%콘서트</h3>
          <h3 className="subtitle">5월 18일 토요일</h3>
          <h5 className="time">시간 : ~~~~~~~~~</h5>
        </button>
        <button className="memo" value={"memo"} onClick={openModal}>
          상세보기
        </button>
      </p>      <p>
        <button className="contents">
          {" "}
          {/*여기도 서버에서 예약 정보 받아오는 컴포넌트 들어갈예정*/}
          <h3 className="title">%%%%콘서트</h3>
          <h3 className="subtitle">5월 18일 토요일</h3>
          <h5 className="time">시간 : ~~~~~~~~~</h5>
        </button>
        <button className="memo" value={"memo"} onClick={openModal}>
          상세보기
        </button>
      </p>
      <div className='setCenter'>
        <button className='reservateSpotbut'>티켓 추가발행</button>
    </div>
      <br />
      <br />
      <div className="Navi">
        <BottomRouter />
      </div>
    </>
  );
}

export default Tickets;
