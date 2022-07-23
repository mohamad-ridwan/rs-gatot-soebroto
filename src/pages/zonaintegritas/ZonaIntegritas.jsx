import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import API from '../../services/api'
import address from '../../services/api/address'
import Form from '../../components/form/Form'
import Template from '../../components/template/Template'
import { changePath } from '../../services/redux/navbar'

function ZonaIntegritas() {
    const [data, setData] = useState({})
    const [valueImg, setValueImg] = useState('')
    const [errMsg, setErrMsg] = useState({})
    const [inputValue, setInputValue] = useState({
        nama: '',
        email: '',
        alamat: '',
        tempatKejadian: '',
        waktuKejadian: '',
        detailPengaduan: '',
        image: null,
    })
    const [inputCard, setInputCard] = useState([
        {
            label: 'Nama',
            placeholder: 'Nama',
            name: 'nama',
            value: '',
            errorMessage: ''
        },
        {
            label: 'E-mail',
            placeholder: 'Alamat e-mail',
            name: 'email',
            value: '',
            errorMessage: ''
        },
        {
            label: 'Alamat',
            placeholder: 'Alamat',
            name: 'alamat',
            value: '',
            errorMessage: ''
        },
        {
            label: 'Perkiraan Tempat Kejadian',
            placeholder: 'Perkiraan Tempat Kejadian',
            name: 'tempatKejadian',
            value: '',
            errorMessage: ''
        },
        {
            label: 'Perkiraan Waktu Kejadian',
            placeholder: 'Perkiraan Waktu Kejadian',
            name: 'waktuKejadian',
            value: '',
            errorMessage: ''
        }
    ])
    const [page] = useState([
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Whistle Blowing System',
            path: null
        }
    ])

    const dispatch = useDispatch()

    function setAPI() {
        API.APIZonaIntegritas()
            .then(res => {
                const result = res.data

                if (result) {
                    setData(result[0])
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        dispatch(changePath('/whistle-blowing-system'))
        setAPI()
    }, [])

    const styleForm = {
        inputCard: inputCard,
        placeholder: 'Detail Pengaduan',
        label: 'Detail Pengaduan',
        stars: '*',
        name: 'detailPengaduan',
        labelBtn: 'Lampiran PDF',
        nameBtnSubmit: 'SUBMIT',
        valueImg: valueImg,
        valueArea: inputValue.detailPengaduan,
        errInputArea: errMsg && errMsg.detailPengaduan,
        errFiles: errMsg && errMsg.image,
        changeInput: (e, i) => changeInput(e, i),
        submit: submitData
    }

    function changeInput(e, i) {
        const value = e.target.value
        const name = e.target.name
        setInputCard((state) => state.map((el, idx) => idx === i ? { ...el, value: value } : el))

        if (name !== 'image') {
            setInputValue({ ...inputValue, [name]: value })

            if (Object.keys(errMsg).length > 0) {
                setErrMsg({ ...errMsg, [name]: '' })
                setInputCard((state) => state.map((el, idx) => idx === i ? { ...el, errorMessage: '' } : el))
            }
        } else if (name === 'image') {
            const files = e.target.files[0]
            setValueImg(value)
            setInputValue({ ...inputValue, [name]: files })

            if (Object.keys(errMsg).length > 0) {
                setErrMsg({ ...errMsg, [name]: '' })
            }
        }
    }

    async function validateForm() {
        return await new Promise((resolve, reject) => {
            let err = {}

            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

            const { nama, email, alamat, tempatKejadian, waktuKejadian, detailPengaduan, image } = { ...inputValue }

            if (nama.length === 0 || !nama.trim()) {
                setInputCard((state) => state.map((el, idx) => idx === 0 ? { ...el, errorMessage: 'Must be required' } : el))
                err.nama = 'Must be required'
            }
            if (email.length === 0 || !email.trim()) {
                setInputCard((state) => state.map((el, idx) => idx === 1 ? { ...el, errorMessage: 'Must be required' } : el))
                err.email = 'Must be required'
            } else if (!email.match(validRegex)) {
                setInputCard((state) => state.map((el, idx) => idx === 1 ? { ...el, errorMessage: 'Invalid email' } : el))
                err.email = 'Invalid email'
            }
            if (alamat.length === 0 || !alamat.trim()) {
                setInputCard((state) => state.map((el, idx) => idx === 2 ? { ...el, errorMessage: 'Must be required' } : el))
                err.alamat = 'Must be required'
            }
            if (tempatKejadian.length === 0 || !tempatKejadian.trim()) {
                setInputCard((state) => state.map((el, idx) => idx === 3 ? { ...el, errorMessage: 'Must be required' } : el))
                err.tempatKejadian = 'Must be required'
            }
            if (waktuKejadian.length === 0 || !waktuKejadian.trim()) {
                setInputCard((state) => state.map((el, idx) => idx === 4 ? { ...el, errorMessage: 'Must be required' } : el))
                err.waktuKejadian = 'Must be required'
            }
            if (detailPengaduan.length === 0 || !detailPengaduan.trim()) {
                err.detailPengaduan = 'Must be required'
            }
            if (image === null) {
                err.image = 'Must be required'
            } else if (image.type !== 'application/pdf') {
                err.image = 'File must be of type ".pdf"'
            }

            if (Object.keys(err).length > 0) {
                reject({ message: 'error' })
            } else if (Object.keys(err).length === 0) {
                resolve({ message: 'success' })
            }

            setErrMsg(err)
        })
    }

    function postDataToAPI(_id, data) {
        API.APIPostZonaIntegritas(_id, data)
            .then(res => {
                if (res && res.data) {
                    alert('Anda telah berhasil mengirimkan data')
                    setErrMsg({})
                    setInputCard([
                        {
                            label: 'Nama',
                            placeholder: 'Nama',
                            name: 'nama',
                            value: '',
                            errorMessage: ''
                        },
                        {
                            label: 'E-mail',
                            placeholder: 'Alamat e-mail',
                            name: 'email',
                            value: '',
                            errorMessage: ''
                        },
                        {
                            label: 'Alamat',
                            placeholder: 'Alamat',
                            name: 'alamat',
                            value: '',
                            errorMessage: ''
                        },
                        {
                            label: 'Perkiraan Tempat Kejadian',
                            placeholder: 'Perkiraan Tempat Kejadian',
                            name: 'tempatKejadian',
                            value: '',
                            errorMessage: ''
                        },
                        {
                            label: 'Perkiraan Waktu Kejadian',
                            placeholder: 'Perkiraan Waktu Kejadian',
                            name: 'waktuKejadian',
                            value: '',
                            errorMessage: ''
                        }
                    ])
                    setInputValue({
                        nama: '',
                        email: '',
                        alamat: '',
                        tempatKejadian: '',
                        waktuKejadian: '',
                        detailPengaduan: '',
                        image: null,
                    })
                    setValueImg('')
                } else {
                    alert('Terjadi kesalahan server!\nMohon coba lagi nanti')
                }
            })
            .catch(err => {
                alert('Terjadi kesalahan server!\nMohon coba lagi nanti')
                console.log(err)
            })
    }

    function submitData() {
        validateForm()
            .then(res => {
                if (res && res.message === 'success') {
                    const nameDay = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
                    const nameMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

                    const years = new Date().getFullYear()
                    const dateNow = new Date().getDate()
                    const month = new Date().getMonth()
                    const day = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

                    const getHours = new Date().getHours()
                    const hours = getHours.toString().length === 1 ? `0${getHours}` : getHours
                    const getMinute = new Date().getMinutes()
                    const minute = getMinute.toString().length === 1 ? `0${getMinute}` : getMinute

                    const { nama, email, alamat, tempatKejadian, waktuKejadian, detailPengaduan, image } = { ...inputValue }

                    const newData = new FormData()
                    newData.append('nama', nama)
                    newData.append('email', email)
                    newData.append('alamat', alamat)
                    newData.append('tempatKejadian', tempatKejadian)
                    newData.append('waktuKejadian', waktuKejadian)
                    newData.append('detailPengaduan', detailPengaduan)
                    newData.append('image', image)
                    newData.append('date', `${nameDay[day]}, ${dateNow} ${nameMonth[month]} ${years} ${hours}:${minute}`)
                    return postDataToAPI(data && data._id, newData)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Template
            title={data && data.header}
            img={`${address}/${data && data.image}`}
            paragraph={data && data.paragraph}
            form={<Form {...styleForm} />}
            page={page}
        />
    )
}

export default ZonaIntegritas