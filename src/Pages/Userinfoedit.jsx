import React from "react";
import Modal from "react-modal";
import "../Styles/UserInfo.css";
import "../Styles/Modal.css";
import "../Styles/Home.css";
import Popup from "../Functions/Modal";
import { Link } from "react-router-dom";
import BottomRouter from "../Routers/BottomRouter";

function Userinfoedit({
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
  console.log (modalvalue)
  return (
    <>
      <Modal isOpen={modalopen} onRequestClose={closeModal} style={modalstyle}>
        {<Popup modalvalue={modalvalue} UID={UID} setUID={setUID} />}
        <button onClick={closeModal} className="memo">
          닫기
        </button>
      </Modal>
      <div className="main">
      <Link to = "/Account"><img alt="뒤로가기" className="backspace" src="img/leftarrow.png"/></Link> 
        <h1 className="title">계정 정보</h1>
        <div className="center">
          <br />
          <div className="infoedit">
            <h3>이름</h3>

          </div>
          <h3>{UID.name}</h3>
          <button className="change" value={"uname"} onClick={openModal}>
            변경
          </button>
          <br />
          <div className="infoedit">
            <h3>전화번호</h3>

          </div>
          <h3>{UID.phone}</h3>
          <button className="change" value={"phone"} onClick={openModal}>
            변경
          </button>
          <div className="infoedit">
            <h3>연결된 Metamask의 공개 키</h3>
          </div>
          <h3>{UID.blockchain}</h3>
          <button className="change" value={"blockchain"} onClick={openModal}>
            변경
          </button>
          <div className="Navi">
            <BottomRouter />
          </div>
        </div>
      </div>
    </>
  );
}

export default Userinfoedit;
