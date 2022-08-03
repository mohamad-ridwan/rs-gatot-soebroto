import React from 'react'
import './Loading.scss'

function Loading({ display }) {
    const styleWrapp = {
        display: display
    }

    return (
        <div className="wrapp-loading" style={styleWrapp}>
            <div className="circle-loading">
                
            </div>
        </div>
    )
}

export default Loading