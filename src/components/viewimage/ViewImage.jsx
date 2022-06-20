import React from 'react'
import './ViewImage.scss'
import address from '../../services/api/address'

function ViewImage({data, idxActive, beforeImg, nextImg, closeView, displayWrapp}) {

    const styleWrapp = {
        display: displayWrapp
    }

    return (
        <>
            <div className="wrapp-view-image" style={styleWrapp}>
                <div className="close-area-view-img" onClick={closeView}></div>

                <i className="fas fa-arrow-left icon-left-view icon-view" onClick={beforeImg}></i>

                <div className="container-center-view-img">
                    <i className="fas fa-times icon-close-view" onClick={closeView}></i>

                    {data && data.length > 0 ? data.map((e, i) => {
                        return (
                            <>
                                <img src={`${address}/${e.image}`} alt="" className="img-view" style={{
                                    display: i === idxActive ? 'flex' : 'none'
                                }}
                                onClick={nextImg}
                                />

                                <div className="txt-bottom-view-img" style={{
                                    display: i === idxActive ? 'flex' : 'none'
                                }}>
                                    <p className="name-img">
                                        entries_gallery/{i === idxActive && e.name}
                                    </p>

                                    <p className="idx-img">
                                        {idxActive + 1} of {data.length}
                                    </p>
                                </div>
                            </>
                        )
                    }) : (
                        <></>
                    )}
                </div>

                <i className="fas fa-arrow-right icon-right-view icon-view" onClick={nextImg}></i>
            </div>
        </>
    )
}

export default ViewImage