import React, { useState, useCallback, useEffect } from "react";
import "../Styles/Modal.css";
import axios from "axios";
import { DB, RequestDB } from "../Middleware/Middleware";
import Web3 from "web3";

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

function Popup({
  setislogin,
  UID,
  setUID,
  modalvalue,
  setmodalvalue,
  openModal,
  closeModal,
  modalopen,
}) {
  const [changevalue, setchangevalue] = useState("");
  const [result, setResult] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const valuetype = (event) => {
    setchangevalue(event.target.value);
  };
  let newdata = {};
  if (modalvalue === "uname") {
    newdata = {
      name: changevalue,
    };
  } else if (modalvalue === "blockchain") {
    newdata = {
      blockchain: changevalue,
    };
  } else if (modalvalue === "phone") {
    newdata = {
      phone: changevalue,
    };
  }
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      console.log("UID", UID);
    },
    [UID.id, changevalue]
  );
  const ticketonsale = {
    Ticketstatus : 'onsale'
  }
  const sellbutton = async() => {
    axios.patch(`${RequestDB}${changevalue}`, ticketonsale)
    .then(response => {
      console.log('데이터가 성공적으로 수정되었습니다:', response.data);
    })
    .catch(error => {
      console.error('데이터 수정 중 오류 발생:', error);
    });
}

  const TransactionList = () => {
    // 모든 트랜잭션을 불러오는 함수입니다.
    const fetchAllTransactions = async () => {
      setLoading(true);
      try {
        const allTransactions = await getAllTransactions();
        console.log("All Transactions:", allTransactions);
        setTransactions(allTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
      setLoading(false);
    };

    // 특정 범위의 블록을 탐색하며 트랜잭션을 불러오는 함수입니다.
    const getAllTransactions = async () => {
      try {
        const latestBlockNumber = await web3.eth.getBlockNumber();
        let allTransactions = [];

        for (let i = 0; i <= latestBlockNumber; i++) {
          const block = await web3.eth.getBlock(i, true);
          if (block && block.transactions) {
            allTransactions = allTransactions.concat(block.transactions);
          }
        }

        return allTransactions;
      } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
      }
    };

    // 컴포넌트가 마운트될 때 트랜잭션을 불러옵니다.
    useEffect(() => {
      fetchAllTransactions();
    }, []);
  };

  useEffect(() => {
    if (/^Ticket\d+$/.test(modalvalue)) {
      console.log(modalvalue);
      // 서버로부터 데이터 가져오기
      fetch("http://localhost:3002/reservation")
        .then((response) => response.json())
        .then((data) => {
          // modalvalue와 일치하는 데이터를 필터링
          const result = data.filter((item) => item.id === modalvalue)[0];
          setResult(result);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          return "데이터를 가져오는 중 오류가 발생했습니다.";
        });
    }
  }, [modalvalue]);

  useEffect(() => {
    if (modalvalue === "Sale") {
      // 데이터를 가져오는 함수
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3002/reservation/');
          const data = await response.json();
          // ownerid가 targetOwnerId와 일치하는 항목만 필터링
          const filteredData = data.filter(item => item.ownerid === UID.id);
          const filteredbystatus = filteredData.filter(item => item.Ticketstatus === "owned")
          setResult(filteredbystatus);
          console.log(result)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [modalvalue, UID.id]);

  const udatachange = async () => {
    try {
      const response = await axios.get(DB);
      let tempdata = UID.id;
      if (changevalue === UID.name) {
        alert("기존 이름과 동일합니다!");
      } else if (changevalue === UID.Blockchain) {
        alert("기존 블록체인 주소와 동일합니다!");
      } else if (changevalue === UID.phone) {
        alert("기존 전화번호와 동일합니다!");
      } else {
        axios.patch(`${DB}${UID.id}`, newdata);
      }
    } catch (error) {
      console.error("데이터 통신 오류", error);
    }
  };
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

  if (modalvalue === "phone") {
    return (
      <>
        <div className="namechange">
          <h3>휴대폰번호 변경</h3>
          <input className="input" onChange={valuetype}></input>
          <button
            onClick={() => {
              udatachange();
              // datarefresh()
            }}
          >
            변경
          </button>
        </div>
        <br />
      </>
    );
  } else if (modalvalue === "uname") {
    return (
      <>
        <div className="namechange">
          <h3>이름 변경</h3>
          <input className="input" onChange={valuetype}></input>
          <button
            onClick={() => {
              udatachange();
              // datarefresh()
            }}
          >
            변경
          </button>
        </div>
        <br />
      </>
    );
  } else if (modalvalue === "blockchain") {
    return (
      <>
        <div className="namechange">
          <h3>블록체인 주소 변경</h3>
          <input className="input" onChange={valuetype}></input>
          <button
            onClick={() => {
              udatachange();
              // datarefresh()
            }}
          >
            변경
          </button>
        </div>
        <br />
      </>
    );
  } else if (modalvalue === "loginfail") {
    return (
      <>
        <h3>
          아이디 또는 <br />
          비밀번호를 확인하세요!
        </h3>
      </>
    );
  } else if (modalvalue === "memo") {
    return (
      <>
        <h3>메모임 ㅇㅇ</h3>
      </>
    );
  }

  if (modalvalue === "signupfail") {
    return (
      <>
        <h3>
          이미 존재하는 <br />
          아이디입니다!
        </h3>
      </>
    );
  }

  if (modalvalue === "signupfine") {
    return (
      <>
        <h3>정상적으로 등록했습니다!</h3>
      </>
    );
  }

  if (modalvalue === "dataerror") {
    return (
      <>
        <h3>빈칸을 확인하세요!</h3>
      </>
    );
  }
  if (/^Ticket\d+$/.test(modalvalue)) {
    return (
      <div>
        <h3>
          행사명: {result.washer}
          <br />
          <br />
        </h3>
        <h3>
          행사일지: {result.date}
          <br />
          <br />
        </h3>
        <h3>
          티켓상태: {result.division}
          <br />
        </h3>
      </div>
    );
  }
  if (modalvalue === "Alldata") {
    return (
      <div>
        <h1>거래 내역</h1>
        {loading ? (
          <p>Loading transactions...</p>
        ) : (
          <ul>
            {transactions.map((tx, index) => (
              <li key={index}>
                <p>Transaction Hash: {tx.hash}</p>
                <p>From: {tx.from}</p>
                <p>To: {tx.to}</p>
                <p>Value: {web3.utils.fromWei(tx.value, "ether")} ETH</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  if (modalvalue === "Sale") {
    return (
      <>
      {result ? (
         <div>
         <label>
         <select value={changevalue} onChange={valuetype}>
          <option value="">판매하실 티켓을 선택해주세요</option>
          {result.map((item, index) => (
            <option key={index} value={item.id}>
              {item.id} - {item.washer} - {item.date}
            </option>
          ))}
        </select>
      </label>
      {changevalue && <p>{changevalue} 을 선택하셨습니다</p>}
      <button className="buyme" onClick={sellbutton}>판매하기</button>
         </div>
      ) : (
      <p>판매할 티켓이 없습니다!</p>
      )}

            </>
      )}

  if (modalvalue === "ticketdeal") {
    return (
      <>
        <h3>
          이미 존재하는 <br />
          아이디입니다!
        </h3>
      </>
    );
  }

}

export default Popup;


