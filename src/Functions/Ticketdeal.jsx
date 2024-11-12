import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Recentdeal from "./Getxdata";
import { Link, useParams, useNavigate  } from "react-router-dom";
import { RequestDB } from "../Middleware/Middleware";
import BottomRouter from './../Routers/BottomRouter';
import axios from "axios";

function Ticketdeal({
  setislogin,
  UID,
  setUID,
  modalvalue,
  setmodalvalue,
  openModal,
  closeModal,
  modalopen,
}) {
  let { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [asciiData, setAsciiData] = useState("");

  const ticketdata = () => {
    console.log(amount);
    switch (amount) {
      case "1":
        return "Discounted";
      case "2":
        return "Valid";
      default:
        return "Unvalid";
    }
  };

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await fetch(`${RequestDB}${id}`);
        const data = await response.json();
        console.log(data)
        setReceiver(data.accountaddress)
        console.log(receiver)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAmount(e.target.amount.value);
    setShowModal(true); 
  };
  
  const ticketsold = {
    Ticketstatus : 'owned',
    ownerid : UID.id,
    accountaddress : UID.blockchain
  }

  const sold = async() => {
    axios.patch(`${RequestDB}${id}`, ticketsold)
    .then(response => {
      console.log('데이터가 성공적으로 수정되었습니다:', response.data);
    })
    .catch(error => {
      console.error('데이터 수정 중 오류 발생:', error);
    });
}

  /* 전송 */
  const handleConfirm = async () => {
    if (receiver === UID.blockchain) {
      setShowModal(false);
      return(
        alert("본인 티켓을 구매할수 없습니다!!!")
      )
    }
    else{
    const data = ticketdata();
    const dataString = JSON.stringify(data);
    setShowModal(false);
    const web3 = new Web3(window.ethereum);
    await web3.eth.sendTransaction({
      from: account,
      to: receiver,
      value: web3.utils.toWei(amount, "ether"),
      data: web3.utils.utf8ToHex(dataString),
    });
    setTimeout(() => {
      navigate('/');
      sold()
    }, 5000)
  };
}

  const handleCancel = () => {
    setShowModal(false);
  };

  /* 메타마스크 연결 */
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // MetaMask 계정 요청
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log("Connected account:", accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  return (
    <>
          <Link to = "/Deal"><p>뒤로가기</p></Link> 
    <div>
      <h1>블록체인으로 거래하기</h1>
      {console.log(ticketsold)}
      {account ? (
        <div>
          <h3>연동된 계정 주소: {account}</h3>
          <h3>!!!연결된 계정을 꼭 확인하세요!!!</h3>
          <br/>
          <form onSubmit={handleSubmit}>
            <p>판매자 지갑 주소: {receiver}</p>
            <input type="number" id="amount" placeholder="보낼 금액" />
            <input type="submit" id="value" />
          </form>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <p>송금 내역 확인단계</p>
                <p>받는이: {receiver}</p>
                <p>금액: {amount} ETH</p>
                {console.log(ticketdata())}
                <button onClick={handleConfirm}>보내기</button>
                <button onClick={handleCancel}>취소</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button onClick={connectMetaMask}>Metamask 연결하기</button>
      )}
    </div>
    <div className="Navi">
        <BottomRouter />
      </div>
    </>
  );
};

export default Ticketdeal;
