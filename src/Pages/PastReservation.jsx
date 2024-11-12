import React, { useState, useEffect } from "react";
import Popup from "../Functions/Modal";
import Modal from "react-modal";
import "../Styles/Reserve.css";
import "../Styles/Modal.css";
import "../Styles/Home.css";
import BottomRouter from "../Routers/BottomRouter";
import { RequestDB } from "../Middleware/Middleware";
import { Link } from "react-router-dom";

function PastReservation({
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
  const [deals, setDeals] = useState();
  const [selectedticket, setSelectedticket] = useState();

  const valuechange = (event) => {
    setSelectedticket(event.target.value);
  };

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await fetch(`${RequestDB}`);
        const data = await response.json();
        const filteredata = data.filter(
          (item) => item.ownerid === UID.id
        );
        setDeals(filteredata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Modal isOpen={modalopen} onRequestClose={closeModal} style={modalstyle}>
        {<Popup modalvalue={modalvalue} UID={UID} setUID={setUID} />}
        <button onClick={closeModal} className="memo">
          닫기
        </button>
      </Modal>
      <Link to="/">
        <img alt="뒤로가기" className="backspace" src="img/leftarrow.png" />
      </Link>
      <header className="base">
        <h1>나의 티켓</h1>
      </header>
      <br />
      <div className="base">
        <br />
      </div>
<p>
{deals && deals.length > 0 && deals.map((item) => (
  <button key={item.id} className="contents">
    <h2 className="title">{item.washer}</h2>
    <h2 className="subtitle">{item.date}</h2>
    <h3 className="time">티켓상태: {item.division}</h3>
    <br />
  </button>
))}
</p>
      <br />
      <div className="Navi">
        <BottomRouter />
      </div>
    </>
  );
}

export default PastReservation;
