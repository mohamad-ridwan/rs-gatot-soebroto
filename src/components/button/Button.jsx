import React, {useState} from 'react'
import './Button.scss'

function Button({click, name, widthBtn, paddingBtn, bdrRadiusBtn, bgColorBtn, colorDefault, colorChange, displayBtn, marginIcon, bdrRadiusShadow, displayIcon, marginBtn, cursorBtn}){
    const [hover, setHover] = useState(false)

    const styleBtn = {
        display: displayBtn,
        width: widthBtn,
        padding: paddingBtn,
        borderRadius: bdrRadiusBtn,
        backgroundColor: bgColorBtn,
        margin: marginBtn,
        cursor: cursorBtn
    }
    const styleIcon = {
        margin: marginIcon,
        display: displayIcon,
    }

    return(
        <>
        <button className="btn-card" style={styleBtn} 
        onClick={click}
        onMouseEnter={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
        >
            <p>{name}</p> <i className="fas fa-angle-right" style={styleIcon}></i>
            <div className="shadow-btn" style={{
                backgroundColor: hover ? colorChange : colorDefault,
                borderRadius: bdrRadiusShadow
            }}></div>
        </button>
        </>
    )
}

export default Button