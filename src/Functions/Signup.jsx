import React, { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomRouter from "../Routers/BottomRouter";
import axios from "axios";
import "../Styles/Account.css";
import { DB } from "../Middleware/Middleware";
import { Link } from "react-router-dom";
import Popup from "./Modal";
import Modal from "react-modal";

function Signup({
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
  const [Newid, setNewid] = useState("");
  const [Newpassword, setNewpassword] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Bnumber, setBnumber] = useState("");
  const [Lphone, setLphone] = useState("");
  const [Mphone, setMphone] = useState("");
  const [Fphone, setFphone] = useState("010");

  const Idtype = (event) => {
    setNewid(event.target.value);
  };
  const Passwordtype = (event) => {
    setNewpassword(event.target.value);
  };
  const Lnametype = (event) => {
    setLname(event.target.value);
  };
  const Fnametype = (event) => {
    setFname(event.target.value);
  };
  const Bnumbertype = (event) => {
    setBnumber(event.target.value);
  };
  const Mphonetype = (event) => {
    setMphone(event.target.value);
  };
  const Lphonetype = (event) => {
    setLphone(event.target.value);
  };
  const Fphonetype = (event) => {
    setFphone(event.target.value);
  };

  const prevent = (e) => {
    e.preventDefault();
  };

  const Newuserdata = {
    id: Newid,
    password: Newpassword,
    name: Lname + Fname,
    blockchain: Bnumber,
    phone: Fphone + Mphone + Lphone,
  };

  const [result, setResult] = useState([]);

  const Newuser = async () => {
    try {
      const response = await axios.get(DB);
      console.log(response);
      setResult(response.data);
      console.log(result);

      // if (
      //   Newid ||
      //   Newpassword ||
      //   Lname ||
      //   Fname ||
      //   Bnumber ||
      //   Mphone ||
      //   Lphone === null
      // ) {
      //   setUID("null");
      //   setmodalvalue("dataerror");
      //   openModal();
      // } else 
      {
        const signupcheck = response.data.find((item) => item.id === Newid);
        if (signupcheck === undefined) {
          axios.post(DB, Newuserdata);
          setUID("null");
          setmodalvalue("signupfine");
          openModal();
        } else {
          setUID("null");
          setmodalvalue("signupfail");
          openModal();
          console.log("error");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const redirectologin = () =>
  //   {
  //    <Route path="/Login"></Route>;
  //   }
  return (
    <>
      <Modal isOpen={modalopen} onRequestClose={closeModal} style={modalstyle}>
        {<Popup modalvalue={modalvalue} UID={UID} setUID={setUID} />}
        <button onClick={closeModal} className="memo">
          닫기
        </button>
      </Modal>
      <div className="login">
        <form className="loginform" onSubmit={(e) => prevent(e)}>
          <label>아이디</label>
          <input
            type="Newid"
            value={Newid}
            onChange={Idtype}
            placeholder="사용할 아이디"
          />
          <br />
          <label>비밀번호</label>
          <input
            type="Newpassword"
            value={Newpassword}
            onChange={Passwordtype}
            placeholder="사용할 비밀번호"
          />
          <br />
          <label className="name">
            <h5>성</h5>
            <h5>이름</h5>
          </label>
          <div className="name">
            <input
              type="Lname"
              value={Lname}
              onChange={Lnametype}
              placeholder="성씨를 입력"
            />
            <input
              type="Fname"
              value={Fname}
              onChange={Fnametype}
              placeholder="이름을 입력"
            />
          </div>
          <br />
          <label>블록체인 주소</label>
          <input
            type="Bnumber"
            value={Bnumber}
            onChange={Bnumbertype}
            placeholder="블록체인 주소를 입력"
          />
          <br />
          <label>전화번호</label>
          <div>
            <select
              name="Fphone"
              value={Fphone}
              className="fphone"
              onSelect={Fphonetype}
            >
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="016">016</option>
              <option value="019">019</option>
            </select>
            -
            <input
              className="fphone"
              type="mphone"
              value={Mphone}
              onChange={Mphonetype}
            />
            -
            <input
              className="fphone"
              type="lphone"
              value={Lphone}
              onChange={Lphonetype}
            />
          </div>
          <br />
          <div className="signup">
            <button
              type="submit"
              onSubmit={(e) => prevent(e)}
              onClick={Newuser}
            >
              신청하기
            </button>
          </div>
        </form>
        <div className="Navi">
          <BottomRouter />
        </div>
      </div>
    </>
  );
}

export default Signup;
