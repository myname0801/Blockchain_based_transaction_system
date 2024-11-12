
import { Link } from "react-router-dom";
import '../Styles/BottomRouter.css'
function BottomRouter(){
    return(
        <ul className="Bottom">
        <Link to = "/Reserve"><li><img alt="예약" className="Bimg" src="img/reserve.png"/></li></Link> 
        <Link to = "/" className="Bmid" ><li><img alt="홈"  className="Bimg" src="img/home.png"/></li></Link> 
        <Link to = "/Account"><li><img alt="계정" className="Bimg" src="img/account.svg"/></li></Link> 
        </ul>
    )
}

export default BottomRouter