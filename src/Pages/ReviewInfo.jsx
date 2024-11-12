// import BottomRouter from "../Routers/BottomRouter";
// import "../Styles/ReviewInfo.css";
// import React from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { DB, ReviewDB } from "../Middleware/Middleware";

// function ReviewInfo({
//   setislogin,
//   UID,
//   setUID,
//   modalvalue,
//   setmodalvalue,
//   openModal,
//   closeModal,
//   modalopen,
// }) {
//   const [review, setReview] = useState({});
//   const [reviewtext, setReviewtext] = useState("");
//   const [rating, setRating] = useState(0);

//   //해당 리뷰 가져오기
//   const getReview = async () => {
//     try {
//       console.log(UID);
//       const result = await axios.get(ReviewDB);
//       setReview(result.data.find((item) => item.id === UID.id));

//       console.log(rating);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   //리뷰 업데이트
//   const upDateReivew = async () => {
//     try {
//       await axios.patch(`${ReviewDB}${UID.id}`, {
//         reviewtext: reviewtext,
//         rating: rating,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getReview();
//   }, []);

//   //리뷰내용 변경될때 값 초기화
//   useEffect(() => {
//     setReviewtext(review.reviewtext);
//     setRating(parseInt(review.rating, 10));
//   }, [review]);

//   const updateReview = (e) => {
//     /*리뷰 내용 변경*/
//     setReviewtext(e.target.value);
//   };

//   const updateRating = (e) => {
//     if (e.target.checked) {
//       setRating(e.target.value);
//     }
//   };

//   return (
//     <div>
//       <div className="all">
//         <div>
//           <h1>상세리뷰관리</h1>
//         </div>
//         <form>
//           <div>
//             <img className="Imgborder"></img>
//             <button className="enrollImgbutton">사진 첨부</button>
//           </div>
//           <div>
//             <p>구분 : {review.division}</p>
//             <p>차량 : {review.car}</p>
//             <p>세차업자 : {review.washer}</p>
//           </div>
//           <div>
//             <div className="star-rating">
//               {[1, 2, 3, 4, 5].map((index) => {
//                 return (
//                   <input
//                     type="radio"
//                     className={index <= rating ? "filled-star" : "star"}
//                     value={index}
//                     onClick={updateRating}
//                     checked={index == rating}
//                   ></input>
//                 );
//               })}
//             </div>
//           </div>
//           <textarea
//             id="update"
//             className="reviewbox"
//             type="text"
//             value={reviewtext}
//             onChange={updateReview}
//           ></textarea>
//           <button className="enrollreviewbutton" onClick={upDateReivew}>
//             등록
//           </button>
//         </form>
//       </div>
//       <div className="Navi">
//         <BottomRouter />
//       </div>
//     </div>
//   );
// }
// export default ReviewInfo;
