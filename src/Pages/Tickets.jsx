import React from "react";
import BottomRouter from "../Routers/BottomRouter";
import "../Styles/PastReservation.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "../Styles/Modal.css";
import Popup from "../Functions/Modal";

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
  const [option, selectOption] = useState("latest");
  const [reservations, setReservation] = useState([]);

  const [startIndex, setstartIndex] = useState(0); // 시작인덱스 무조건 0으로 초기화
  const [endIndex, setendIndex] = useState(startIndex + 7); // 끝 인덱스 무조건 starIndex + 7

  const [page, setPage] = useState(1);

  const getReservations = async () => {
    try {
      const result = await axios.get("http://localhost:3002/reservation");
      setReservation(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  /*선택별 출력값을 달리하는 함수*/
  const filteredReservations = reservations.filter((reservation) => {
    if (option === "latest") {
      return true; // 모든 리뷰를 표시
    } else if (option === "long") {
      return reservation.division === "정상"; // 장기만 표시
    } else if (option === "short") {
      return reservation.division === "비정상"; // 단기만 표시
    }
    return false;
  });

  const Printreservations = filteredReservations
    .slice(startIndex, endIndex)
    .map((reservation, index) => {
      return (
        <>
        <Modal isOpen={modalopen} onRequestClose={closeModal} style={modalstyle}>
        {<Popup modalvalue={modalvalue} UID={UID} setUID={setUID} />}
        <button onClick={closeModal} className="memo">
          닫기
        </button>
      </Modal>
          <div className="reservationBox flexbox" key={index}>
            <p className="reservationFont">{reservation.washer}</p>
            <p className="reservationFont">{reservation.division}</p>
            <p className="reservationFont">{reservation.date}</p>
          </div>
        <button className="memo" value={`${reservation.id}`} onClick={openModal}>
        상세보기
      </button>
      </>
      );
    });
  /*페이지 번호생성 */
  const createButton = () => {
    const buttons = [];
    for (var i = 0; i < reservations.length / 7; i++) {
      const leftvalue = 40 + 5 * i + "%";
      const leftstyle = { left: leftvalue };
      buttons.push(
        <button
          className="pagebutton"
          onClick={handlePtrpage}
          value={i + 1}
          key={i}
        >
          {i + 1}{" "}
        </button>
      );
    }
    return buttons;
  };
  useEffect(() => {
    getReservations();
  }, []);

  /*페이지 번호 바뀔떄마다 랜더링 */
  useEffect(() => {
    setstartIndex((page - 1) * 7);
    setendIndex((page - 1) * 7 + 7);
  }, [page]);

  /*정렬 선택 */
  const handleSortreview = (e) => {
    const selectedValue = e.target.value;
    selectOption(selectedValue);
  };

  /*페이지에 따른 리뷰 출력*/
  const handlePtrpage = (e) => {
    const selectedValue = e.target.value;
    setPage(selectedValue);
  };

  return (
    <>
                {/* <BrowserRouter>
            <Routes
            path={`/Tickets/${.reservation.id}`}>
            </Routes>
            </BrowserRouter> */}
      <div>
        <div className="All">
          <div>
            <h1>티켓 발행 현황</h1>
          </div>
          <br />
          <select
            id="selectsort"
            className="selectsortbut"
            onChange={handleSortreview}
            value={option}
          >
            <option value="latest" className="selectoption">
              최신순
            </option>
            <option value="long" className="selectoption">
              정상
            </option>
            <option value="short" className="selectoption">
              비정상
            </option>
          </select>
          <div className="contents">
            <div>{Printreservations}</div>
            <div className="flexbox center">{createButton()}</div>
          </div>
        </div>
        <div className="Navi">
          <BottomRouter />
        </div>
      </div>
    </>
  );
}
export default PastReservation;
