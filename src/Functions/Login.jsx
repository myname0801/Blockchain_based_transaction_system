import React, { useCallback, useState, useEffect } from "react";
import Modal from "react-modal";
import BottomRouter from "../Routers/BottomRouter";
import axios from "axios";
import "../Styles/Account.css";
import { Link } from "react-router-dom";
import { DB } from "../Middleware/Middleware";
import Popup from "./Modal";

function Login({
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
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

  const Idtype = (event) => {
    setId(event.target.value);
  };
  const Passwordtype = (event) => {
    setPassword(event.target.value);
  };

  const [result, setResult] = useState([]);

  const logincheck = async () => {
    try {
      const response = await axios.get(DB);
      console.log(response);
      setResult(response.data);
      console.log(result);

      const Logincheck = response.data.find(
        (item) => item.id === Id && item.password === Password
      );
      if (Logincheck === undefined) {
        setUID("null")
        setmodalvalue("loginfail")
        openModal()
        console.log("error");
        setislogin(false);
      } else {
        console.log("correct!");
        setislogin(true);
        setUID(response.data.find((item) => item.id === Id));
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  
    };

  const handleLogin = (e) => {
    e.preventDefault(); // 폼의 기본 동작 막기
    logincheck();
  };

  useEffect(() => {
    console.log(result);
  }, [result]);


  return (
    <>
      <Modal isOpen={modalopen} onRequestClose={closeModal} style={modalstyle}>
      {<Popup modalvalue={modalvalue} UID={UID} setUID={setUID} />}
      <button onClick={closeModal} className="memo">
          닫기
      </button>
      </Modal>
      <div className="login">
        <form className="loginform" onSubmit={handleLogin}>
          <label>사용자 아이디</label>
          <input type="Id" value={Id} onChange={Idtype} />
          <br />
          <label>비밀번호</label>
          <input type="Password" value={Password} onChange={Passwordtype} />
          <br />
          <button >로그인</button>
        </form>
        <div className="signup">
          <h5>회원이 아니신가요?</h5>
          <button>
            <Link to="/Signup">
              <li>회원가입</li>
            </Link>
          </button>
        </div>
      </div>
      <div className="Navi">
        <BottomRouter />
      </div>
    </>
  );
}

export default Login;
