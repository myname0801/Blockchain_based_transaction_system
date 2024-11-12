import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const TransactionList = (
  setislogin,
  UID,
  setUID,
  modalvalue,
  setmodalvalue,
  openModal,
  closeModal,
  modalstyle,
  modalopen,
  formatoday
) => {
  const [latestTransaction, setLatestTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [asciiData, setAsciiData] = useState("");
  const useraddress = UID.blockchain;
  const [tdata, setTdata] = useState("");

  const fetchLatestTransaction = async () => {
    setLoading(true);
    try {
      const latestTransaction = await getLatestTransaction();
      console.log("Latest Transaction:", latestTransaction);
      setLatestTransaction(latestTransaction);
      setTdata(latestTransaction.input);
    } catch (error) {
      console.error("Error fetching the latest transaction:", error);
    }
    setLoading(false);
  };

  const getLatestTransaction = async (useraddress) => {
    try {
      const latestBlockNumber = await web3.eth.getBlockNumber(useraddress);
      const block = await web3.eth.getBlock(latestBlockNumber, true);
      if (block && block.transactions.length > 0) {
        return block.transactions[block.transactions.length - 1]; // 가장 최근 트랜잭션을 반환합니다.
      }
      return null;
    } catch (error) {
      console.error("Error fetching the latest block:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchLatestTransaction();
  }, []);

  function hexToAscii(hex) {
    // Convert input to string to ensure it's a string
    hex = String(hex);

    if (hex.startsWith("0x")) {
      hex = hex.slice(2);
    }

    let asciiStr = "";
    for (let i = 0; i < hex.length; i += 2) {
      let hexCode = hex.substr(i, 2);
      let char = String.fromCharCode(parseInt(hexCode, 16));
      asciiStr += char;
    }
    return asciiStr;
  }

  const txData = tdata;

  const handleConvertHex = () => {
    try {
      const asciiData = hexToAscii(txData);
      setAsciiData(asciiData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
                <Link to = "/Deal"><p>뒤로가기</p></Link> 
      <h2>거래내역</h2>
      {loading ? (
        <p>Loading...</p>
      ) : latestTransaction ? (
        <div>
          <p>
            <strong>송신자:</strong> {latestTransaction.from}
          </p>
          <p>
            <strong>수신자:</strong> {latestTransaction.to}
          </p>
          <p>
            <strong>거래금액:</strong>{" "}
            {web3.utils.fromWei(latestTransaction.value, "ether")} ETH
          </p>
          <p>
            <strong>거래데이터:</strong> {latestTransaction.input}
          </p>
          <button onClick={handleConvertHex}>최근거래 데이터값 변환하기</button>
          {asciiData && (
            <div>
              <p>{asciiData}</p>
            </div>
          )}
        </div>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;
