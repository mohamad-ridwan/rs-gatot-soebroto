import React from 'react'
import './Card.scss'
import Button from '../button/Button'

function Card({ img, title, paragraphOne, paragraphTwo, bdrRadiusWrapp, justifyContentDeskripsi, textAlignTitle, textAlignParagraphOne, textAlignParagraphTwo, fontSizeTitle, fontWeightTitle, fontSizeParagraphOne, fontSizeParagraphTwo, widthWrapp, paddingDeskripsi, colorParagraphOne, colorParagraphTwo, displayWrapp, mouseEnterImg, mouseLeaveImg, opacityHoverImg, displayCircleIcon, bgColorCircleIcon, heightCircleIcon, widthCircleIcon, iconCirle, colorTitle, marginWrapp, lineHeightDeskripsi, marginTitle, cursorWrapp, mouseEnterWrapp, mouseLeaveWrapp, bgColorWrapp, colorCircleIcon, bdrTopLeftRadiusImg, bdrTopRightRadiusImg, heightImg, cursorContainerImg, mouseEnterTitle, mouseLeaveTitle, cursorTitle, date, admin, displayDateCard, transformImg, whiteSpaceDeskripsi, heightWrapp, bgColorDeskripsi, heightDeskripsi, marginDeskripsi, bdrRadiusDeskripsi, justifyContentCircleIcon, fontSizeIcon, textAlignDeskripsi, minHeightTitle, bdrTopParagraphOne, paddingCircleIcon, paddingParagraphOne, paddingParagraphTwo, fontWeightParagraphOne, positionDeskripsi, bdrRadiusHoverImg, displayBtn, positionWrapp, fontStyleIcon, bdrBottomLeftRadiusImg, bdrBottomRightRadiusImg, bdrRadiusContainerImg, bdrTopLeftRadiusContainerImg, bdrTopRightRadiusContainerImg, clickImg, clickTitle, flexDirectionWrapp, widthImg, widthContainerImg, classWrapp, displayDateCardSearch, clickWrapp, clickBtnCard, maxHeightTitle, overflowXTitle }) {

    const styleWrapp = {
        display: displayWrapp,
        borderRadius: bdrRadiusWrapp,
        width: widthWrapp,
        margin: marginWrapp,
        cursor: cursorWrapp,
        backgroundColor: bgColorWrapp,
        height: heightWrapp,
        position: positionWrapp,
        flexDirection: flexDirectionWrapp,
    }
    const styleDeskripsi = {
        justifyContent: justifyContentDeskripsi,
        padding: paddingDeskripsi,
        lineHeight: lineHeightDeskripsi,
        whiteSpace: whiteSpaceDeskripsi,
        backgroundColor: bgColorDeskripsi,
        height: heightDeskripsi,
        margin: marginDeskripsi,
        borderRadius: bdrRadiusDeskripsi,
        textAlign: textAlignDeskripsi,
        position: positionDeskripsi
    }
    const styleTitle = {
        textAlign: textAlignTitle,
        fontSize: fontSizeTitle,
        fontWeight: fontWeightTitle,
        color: colorTitle,
        margin: marginTitle,
        cursor: cursorTitle,
        minHeight: minHeightTitle,
        maxHeight: maxHeightTitle,
        overflowX: overflowXTitle
    }
    const styleParagraphOne = {
        textAlign: textAlignParagraphOne,
        fontSize: fontSizeParagraphOne,
        color: colorParagraphOne,
        borderTop: bdrTopParagraphOne,
        padding: paddingParagraphOne,
        fontWeight: fontWeightParagraphOne
    }
    const styleParagraphTwo = {
        textAlign: textAlignParagraphTwo,
        fontSize: fontSizeParagraphTwo,
        color: colorParagraphTwo,
        padding: paddingParagraphTwo
    }
    const styleContainerImg = {
        cursor: cursorContainerImg,
        borderRadius: bdrRadiusContainerImg,
        borderTopLeftRadius: bdrTopLeftRadiusContainerImg,
        borderTopRightRadius: bdrTopRightRadiusContainerImg,
        width: widthContainerImg
    }
    const styleHoverImg = {
        opacity: opacityHoverImg,
        borderRadius: bdrRadiusHoverImg,
    }
    const styleCircleIcon = {
        display: displayCircleIcon,
        backgroundColor: bgColorCircleIcon,
        height: heightCircleIcon,
        width: widthCircleIcon,
        color: colorCircleIcon,
        justifyContent: justifyContentCircleIcon,
        padding: paddingCircleIcon
    }
    const styleIcon = {
        fontSize: fontSizeIcon,
        fontStyle: fontStyleIcon
    }
    const styleImg = {
        borderTopLeftRadius: bdrTopLeftRadiusImg,
        borderTopRightRadius: bdrTopRightRadiusImg,
        borderBottomLeftRadius: bdrBottomLeftRadiusImg,
        borderBottomRightRadius: bdrBottomRightRadiusImg,
        height: heightImg,
        transform: transformImg,
        width: widthImg
    }
    const styleDateCard = {
        display: displayDateCard
    }
    const styleDateCardSearch = {
        display: displayDateCardSearch
    }
    const styleBtnCard = {
        displayBtn: displayBtn,
        colorDefault: 'transparent',
        colorChange: '#000',
        bgColorBtn: '#666',
        widthBtn: '0px',
        paddingBtn: '8px 13px',
        bdrRadiusBtn: '5px',
        marginIcon: '0 0 0 1px',
        bdrRadiusShadow: '5px',
        click: clickBtnCard
    }

    return (
        <>
            <div className={`wrapp-card ${classWrapp}`} style={styleWrapp}
                onMouseOver={mouseEnterWrapp}
                onMouseLeave={mouseLeaveWrapp}
                onClick={clickWrapp}
            >
                <div className="container-img-card" style={styleContainerImg}
                    onMouseOver={mouseEnterImg}
                    onMouseLeave={mouseLeaveImg}
                    onClick={clickImg}
                >
                    <img src={img} alt="" className="img-card" style={styleImg} />

                    <div className="shadow-hover-img" style={styleHoverImg}></div>
                </div>
                <div className="container-deskripsi-card" style={styleDeskripsi}>
                    <div className="circle-icon" style={styleCircleIcon}>
                        <i className={`${iconCirle} icon-in-circle`} style={styleIcon}></i>
                    </div>
                    <p className="title-card" style={styleTitle}
                        onMouseOver={mouseEnterTitle}
                        onMouseLeave={mouseLeaveTitle}
                        onClick={clickTitle}
                    >
                        {title}
                    </p>
                    <div className="date-card-search" style={styleDateCardSearch}>
                        <p><i className="fas fa-calendar-alt icon-date"></i>{date}</p>
                    </div>
                    <p className="paragraph-one-card" style={styleParagraphOne}>
                        {paragraphOne}
                    </p>
                    <p className="paragraph-two-card" style={styleParagraphTwo}>
                        {paragraphTwo}
                    </p>
                    <Button {...styleBtnCard}/>
                    <div className="date-card" style={styleDateCard}>
                        <p><i className="fas fa-calendar-alt icon-date"></i>{date}</p>
                        <p><i className="fas fa-user icon-date"></i>{admin}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card