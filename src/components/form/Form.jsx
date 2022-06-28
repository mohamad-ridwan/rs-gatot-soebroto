import React from 'react'
import './Form.scss'
import Button from '../button/Button'

function Form({ inputCard, label, stars, placeholder, name, labelBtn, changeInput, valueArea, submit, valueImg, errInputArea, errFiles, nameBtnSubmit, displayInputFile }) {

    const styleBtn = {
        name: nameBtnSubmit,
        displayIcon: 'none',
        widthBtn: '150px',
        marginBtn: '20px 0 0 0',
        colorDefault: 'transparent',
        colorChange: '#000',
        click: submit
    }
    const styleInputFile = {
        display: displayInputFile
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
        }} className="wrapp-form">
            {inputCard && inputCard.length > 0 ? inputCard.map((e, i) => {
                return (
                    <>
                        <div key={i} className="col-input">
                            <label htmlFor="label" className="label-input">{e.label} <p className="red-stars">*</p></label>
                            <input type="text" className="input-card" placeholder={e.placeholder} name={e.name} value={e.value}
                                onChange={(el, idx = i) => changeInput(el, idx)}
                            />
                            <p className="error-message">{e.errorMessage}</p>
                        </div>
                    </>
                )
            }) : (
                <></>
            )}
            <div className="col-input">
                <label htmlFor="label" className="label-input">{label} <p className="red-stars">{stars}</p></label>
                <textarea type="text" className="input-area" placeholder={placeholder} name={name} onChange={changeInput} value={valueArea}>

                </textarea>
                <p className="error-message">{errInputArea}</p>
            </div>

            <div className="col-input" style={styleInputFile}>
                <label htmlFor="label" className="label-input">{labelBtn} <p className="red-stars">*</p></label>
                <input type="file" className="input-file" name='image' accept='application/pdf,application/vnd.ms-excel' onChange={changeInput} value={valueImg} />
                <p className="error-message">{errFiles}</p>
            </div>

            <Button {...styleBtn} />
        </form>
    )
}

export default Form