import React,{ useState, useRef } from "react";
import '../Styles/Search.css'
function Search(){
    const [text, setText] = useState("")
    const textRef = useRef("")

    const InputT = (e) => {
        textRef.current = e.target.value
    }
    const ClickB = () => {
        setText(textRef.current)
    }
return(
    <div>
        <input className="searchtext" placeholder = "행사를 검색해보세요!"onChange={InputT} type="text"/>
        <button className="search" onClick={ClickB}><img src="img/search.png"/></button>
    </div>
)
}

export default Search
