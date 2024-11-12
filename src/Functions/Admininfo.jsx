import React from 'react';
import { Link } from "react-router-dom";
import '../Styles/UserInfo.css'
import '../Styles/Home.css'
import BottomRouter from '../Routers/BottomRouter';

function Admininfo({setislogin, UID, setUID, modalvalue, setmodalvalue, openModal, closeModal, modalopen, modalstyle}){
  const Logout = () =>{
    setislogin(false)
    setUID(null)
  }
      return (
        <div className='main'>
        <h1 className='title'>관리자 페이지</h1>
        <div className = "center">
          <div className = "imgcontent">
              <img className = "headuser" src="img/user1.png" alt="사용자1 아이콘" />
              <h2>{(UID.name)}반갑습니다</h2>
          </div>
          <br/>
          <div className = "content">
            <br/>
            <div className='imgcontent'>
            <button><Link to = "/Userinfo"><img className = "imgcss" src="img/user1.png" alt="사용자1 아이콘" /></Link></button>
            <p className='imgtext'>내 정보</p>
            </div>
              <div className = "imgcontent">
              <button><Link to = "/Tickets"><img className = "imgcss" src="img/review.png" alt="예약정보" /></Link></button>      
                <p className = "imgtext">발행 티켓 관리</p>
              </div>
              <div className = "imgcontent">
              <button><Link to = "/Events"><img className = "imgcss" src="img/review.png" alt="예약정보" /></Link></button>      
                <p className = "imgtext">나의 행사 관리</p>
              </div>
              <br/>
          </div>
          <br/>
          <div className = "content">
              <p className = "contenthead">고객 센터</p>
              <div className = "imgcontent">
                <img className = "imgcss" src="img/call1.png" alt="고객센터 연결 아이콘" />      
                <p className = "imgtext">고객센터 연결</p>
              </div>
              <div className = "imgcontent"> 
                <img className = "imgcss" src="img/report.png" alt="공지사항 아이콘" /> 
                <p className = "imgtext">공지사항</p>
              </div>
              <div className = "imgcontent"> 
                <img className = "imgcss" src="img/mail.png" alt="1:1문의 아이콘" /> 
                <p className = "imgtext">1:1 문의</p>
              </div>
              <br/>
              </div>
              <button className='logout' onClick={Logout}>로그아웃</button>
              <div className="Navi">
                <BottomRouter/>
          </div> 
        </div>
        </div>
      );
    }

  export default Admininfo;