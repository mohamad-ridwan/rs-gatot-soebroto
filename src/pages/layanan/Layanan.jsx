import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import './Layanan.scss'
import Card from '../../components/card/Card'
import Pagination from '../../components/pagination/Pagination'
import Template from '../../components/template/Template'
import address from '../../services/api/address'
import { changeContentPerPage, changeCurrentPage, changeFirstIdx, changeIdxPaginate, changeIdxShowingDokter, changeLastIdx, changePath, siblingCount } from '../../services/redux/navbar'
import API from '../../services/api'

function Layanan() {
    const [data, setData] = useState({})
    const [page, setPage] = useState([])
    const [hoverCard, setHoverCard] = useState(null)
    // for page doctor
    const [activeMenuChoose, setActiveMenuChoose] = useState(false)
    const [idxActiveChoose, setIdxActiveChoose] = useState(1)
    const [nowChoose, setNowChoose] = useState(10)
    const [searchDoctorStore, setSearchDoctorStore] = useState('')
    const [activeChooseHeader, setActiveChooseHeader] = useState('nama')
    const [onActiveChooseOfHeader, setOnActiveChooseOfHeader] = useState(true)
    const [loading, setLoading] = useState(true)
    const [chooseShowing] = useState([
        {
            nama: "semua",
        },
        {
            nama: "10",
        },
        {
            nama: "20",
        },
        {
            nama: "50",
        },
        {
            nama: "100",
        },
    ]);
    const [headerTable] = useState([
        {
            nama: "Nama",
        },
        {
            nama: "Lokasi",
        },
        {
            nama: "Poli",
        },
        {
            nama: "Sub-Poli",
        },
    ]);

    // redux
    const dispatch = useDispatch()
    const contentPerPageCard = useSelector((state) => state.navbar.contentPerPageCard)
    const currentPageStore = useSelector((state) => state.navbar.currentPage)
    const idxShowingDokter = useSelector((state) => state.navbar.idxShowingDokter)

    const params = useParams()
    const navigate = useNavigate()

    function updatePaginate(data, contentPerPage) {
        const totalNumber = data && Math.ceil(data[0].data.length / contentPerPage)
        const showNumberPaginate = totalNumber < siblingCount ? totalNumber : siblingCount
        dispatch(changeIdxPaginate({ countIdx: 1, length: showNumberPaginate + 1 }))
    }

    function setAPI() {
        setLoading(true)
        document.body.style.overflowY = 'hidden'

        // update for page doctor
        setActiveMenuChoose(false)
        setIdxActiveChoose(1)
        setNowChoose(10)
        setSearchDoctorStore('')
        setActiveChooseHeader('nama')
        setOnActiveChooseOfHeader(true)

        API.APILayanan()
            .then(res => {
                const result = res.data
                const dataPage = result.filter(e => e.path === `/layanan/${params.id}`)

                let newIdxPage = null
                const idxPage = result.map((e, i) => e.path === `/layanan/${params.id}` ? newIdxPage = i : undefined)

                let newPage = []
                if (dataPage.length > 0) {
                    newPage.push(
                        {
                            name: 'Home',
                            path: '/'
                        },
                        {
                            name: 'Layanan',
                            path: null
                        },
                        {
                            name: dataPage[0].header,
                            path: null
                        }
                    )
                }else{
                    navigate('/page-not-found')
                }

                dispatch(changePath([2, newIdxPage]))
                dispatch(changeCurrentPage({ pageNow: 1 }))
                dispatch(changeFirstIdx({ idx: siblingCount }))
                dispatch(changeLastIdx({ idx: siblingCount }))
                setData(dataPage[0])
                setPage(newPage)

                if (dataPage.length > 0 && dataPage[0].id !== 'jadwal-dokter') {
                    updatePaginate(dataPage, 6)
                    dispatch(changeContentPerPage({ contentPerPage: 6 }))
                }
                if (dataPage.length > 0 && dataPage[0].id === 'jadwal-dokter') {
                    updatePaginate(dataPage, 10)
                    dispatch(changeContentPerPage({ contentPerPage: 10 }))
                    dispatch(changeIdxShowingDokter({ nowShow: 1, toShow: 10, ofShow: dataPage[0].data.length, totalData: dataPage[0].data.length }))
                }
                setLoading(false)
                document.body.style.overflowY = 'scroll'

                return idxPage
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI()
    }, [params])

    const dataCard = data && data.data

    const inputSearch =
        data && data.id === "jadwal-dokter" &&
        Array.from(dataCard).filter(
            (e) =>
                e.nama.toLowerCase().includes(searchDoctorStore.toLowerCase()) ||
                e.lokasi.toLowerCase().includes(searchDoctorStore.toLowerCase()) ||
                e.poli.toLowerCase().includes(searchDoctorStore.toLowerCase()) ||
                e.subPoli.toLowerCase().includes(searchDoctorStore.toLowerCase())
        );

    const totalNumber = searchDoctorStore.length > 0 && inputSearch !== undefined ? Math.ceil(inputSearch.length / contentPerPageCard) : dataCard && Math.ceil(dataCard.length / contentPerPageCard);
    const showNumberPaginate = totalNumber < siblingCount ? totalNumber : siblingCount;

    // page dokter
    const styleMenuShow = {
        display: activeMenuChoose ? "flex" : "none",
    };

    function getPaginateDataDoctor(data) {
        const startIndex = currentPageStore * contentPerPageCard - contentPerPageCard;
        const endIndex = startIndex + contentPerPageCard;
        return data.slice(startIndex, endIndex);
    }

    function dataDoctor() {
        const newInputSearch = inputSearch !== undefined && inputSearch.length > 0 ? inputSearch : []

        if (activeChooseHeader === "nama") {
            if (onActiveChooseOfHeader) {
                return getPaginateDataDoctor(
                    Array.from(newInputSearch).sort((a, b) => a.nama.localeCompare(b.nama))
                );
            } else {
                return getPaginateDataDoctor(
                    Array.from(newInputSearch).sort((a, b) => {
                        if (a.nama > b.nama) {
                            return -1;
                        }
                        if (b.nama > a.nama) {
                            return 1;
                        }

                        return 0;
                    })
                );
            }
        }
        if (activeChooseHeader === "lokasi") {
            if (onActiveChooseOfHeader) {
                return getPaginateDataDoctor(
                    Array.from(newInputSearch).sort((a, b) =>
                        a.lokasi.localeCompare(b.lokasi)
                    )
                );
            } else {
                return getPaginateDataDoctor(
                    Array.from(newInputSearch).sort((a, b) => {
                        if (a.lokasi > b.lokasi) {
                            return -1;
                        }
                        if (b.lokasi > a.lokasi) {
                            return 1;
                        }

                        return 0;
                    })
                );
            }
        }
        if (activeChooseHeader === "poli") {
            if (onActiveChooseOfHeader) {
                return getPaginateDataDoctor(
                    Array.from(newInputSearch).sort((a, b) => a.poli.localeCompare(b.poli))
                );
            } else {
                return getPaginateDataDoctor(
                    Array.from(newInputSearch).sort((a, b) => {
                        if (a.poli > b.poli) {
                            return -1;
                        }
                        if (b.poli > a.poli) {
                            return 1;
                        }

                        return 0;
                    })
                );
            }
        }
        if (activeChooseHeader === "subpoli") {
            if (onActiveChooseOfHeader) {
                return getPaginateDataDoctor(
                    Array.from(newInputSearch).sort((a, b) =>
                        a.subPoli.localeCompare(b.subPoli)
                    )
                );
            } else {
                return getPaginateDataDoctor(
                    Array.from(newInputSearch).sort((a, b) => {
                        if (a.subPoli > b.subPoli) {
                            return -1;
                        }
                        if (b.subPoli > a.subPoli) {
                            return 1;
                        }

                        return 0;
                    })
                );
            }
        }

        return [];
    }

    function updateIdxShowingDokter(nowShow, toShow, ofShow, totalData) {
        dispatch(changeIdxShowingDokter({ nowShow: nowShow, toShow: toShow, ofShow: ofShow, totalData: totalData }))
    }

    function userInputSearch(e) {
        const value = e.target.value
        setSearchDoctorStore(value)

        // hanya untuk update data showing, agar mendapatkan data secara real time
        const newInputSearch =
            data && data.id === "jadwal-dokter" &&
            Array.from(dataCard).filter(
                (e) =>
                    e.nama.toLowerCase().includes(value.toLowerCase()) ||
                    e.lokasi.toLowerCase().includes(value.toLowerCase()) ||
                    e.poli.toLowerCase().includes(value.toLowerCase()) ||
                    e.subPoli.toLowerCase().includes(value.toLowerCase())
            )
        // END hanya untuk update data showing, agar mendapatkan data secara real time

        const checkValueNowChoose = nowChoose === 'semua' ? dataCard.length : nowChoose

        // update idxShowingDokter
        if (checkValueNowChoose > newInputSearch.length) {
            if (newInputSearch.length > 0) {
                updateIdxShowingDokter(1, newInputSearch.length, newInputSearch.length, dataCard.length)
            } else {
                updateIdxShowingDokter(0, newInputSearch.length, newInputSearch.length, dataCard.length)
            }
        } else if (newInputSearch.length > checkValueNowChoose) {
            updateIdxShowingDokter(1, checkValueNowChoose, newInputSearch.length, dataCard.length)
        } else if (checkValueNowChoose === newInputSearch.length) {
            updateIdxShowingDokter(1, checkValueNowChoose, newInputSearch.length, dataCard.length)
        }
        // END update idxShowingDokter

        dispatch(
            changeIdxPaginate({ countIdx: 1, length: showNumberPaginate + 1 })
        );
        dispatch(changeCurrentPage({ pageNow: 1 }));
        dispatch(changeFirstIdx({ idx: siblingCount }));
        dispatch(changeLastIdx({ idx: siblingCount }));
    }

    function clickDeleteInput() {
        const totalNumber = dataCard && Math.ceil(dataCard.length / contentPerPageCard);
        const showNumberPaginate =
            totalNumber < siblingCount ? totalNumber : siblingCount;

        setSearchDoctorStore('')
        dispatch(
            changeIdxPaginate({ countIdx: 1, length: showNumberPaginate + 1 })
        );
        dispatch(changeCurrentPage({ pageNow: 1 }));
        dispatch(changeFirstIdx({ idx: siblingCount }));
        dispatch(changeLastIdx({ idx: siblingCount }));
        const checkValueNowChoose = nowChoose === 'semua' ? dataCard.length : nowChoose
        updateIdxShowingDokter(1, checkValueNowChoose, dataCard.length, dataCard.length)
    }

    function changeActiveHeader(valueHeader, condition) {
        if (valueHeader !== activeChooseHeader) {
            setActiveChooseHeader(valueHeader)
            setOnActiveChooseOfHeader(true)
        }
        if (valueHeader === activeChooseHeader && condition) {
            setOnActiveChooseOfHeader(false)
        }
        if (valueHeader === activeChooseHeader && !condition) {
            setOnActiveChooseOfHeader(true)
        }
    }

    function onShowMenuChoose() {
        setActiveMenuChoose(!activeMenuChoose)
    }

    function updateDataOfRedux(length, allData) {
        setNowChoose(allData !== undefined ? allData : length)

        // NOTE!! : state name of > contentPerPageCard jika nilainya dirubah harus tetap berupa integer, karna nilainya berupa jumlah data dokter yang di tampilkan dalam satu halaman.
        dispatch(changeContentPerPage({ contentPerPage: length }))

        // update idxShowingDokter
        if (inputSearch.length > 0) {
            if (searchDoctorStore.length > 0) {
                if (inputSearch.length > length) {
                    updateIdxShowingDokter(1, length, inputSearch.length, dataCard.length)
                } else if (length > inputSearch.length || length === inputSearch.length) {
                    updateIdxShowingDokter(1, inputSearch.length, inputSearch.length, dataCard.length)
                }
            } else if (searchDoctorStore.length === 0) {
                if (length > dataCard.length || dataCard.length === length) {
                    updateIdxShowingDokter(1, dataCard.length, dataCard.length, dataCard.length)
                } else if (dataCard.length > length) {
                    updateIdxShowingDokter(1, length, dataCard.length, dataCard.length)
                }
            }
        }
        // END update idxShowingDokter

        const totalNumber = searchDoctorStore.length > 0 && inputSearch !== undefined ? Math.ceil(inputSearch.length / contentPerPageCard) : dataCard && Math.ceil(dataCard.length / contentPerPageCard);
        const showNumberPaginate = totalNumber < siblingCount ? totalNumber : siblingCount;

        dispatch(
            changeIdxPaginate({ countIdx: 1, length: showNumberPaginate + 1 })
        );
        dispatch(changeFirstIdx({ idx: siblingCount }));
        dispatch(changeLastIdx({ idx: siblingCount }));
        dispatch(changeCurrentPage({ pageNow: 1 }));
    }

    function updateShowDokter(idx, length) {
        setIdxActiveChoose(idx)

        if (length !== "semua") {
            // NOTE!! : state name of > contentPerPageCard jika nilainya dirubah harus tetap berupa integer, karna nilainya berupa jumlah data dokter yang di tampilkan dalam satu halaman.
            return updateDataOfRedux(parseInt(length));
        }
        if (length === "semua") {
            return updateDataOfRedux(dataCard.length, "semua");
        }
    }

    const newDataDoctor = dataDoctor();

    const renderJadwalDokter = data && data.id === "jadwal-dokter" ? (
        <div className="wrapp-content-jadwal-dokter">
            {/* search */}
            <div className="container-search-jadwal">
                <div className="column-txt-show">
                    <p className="filter-show">
                        Show{" "}
                        <button className="btn-filter" onClick={onShowMenuChoose}>
                            {nowChoose} <i className="fas fa-sort icon-filter"></i>
                            {/* menu choose */}
                            <ul className="menu-choose-show" style={styleMenuShow}>
                                {chooseShowing.map((e, i) => (
                                    <li
                                        key={i}
                                        className={
                                            idxActiveChoose === i
                                                ? "list-choose active-choose"
                                                : "list-choose"
                                        }
                                        onClick={() => updateShowDokter(i, e.nama)}
                                    >
                                        {e.nama}
                                    </li>
                                ))}
                            </ul>
                        </button>
                        entries
                    </p>
                </div>
                <div className="column-search">
                    <p className="txt-search">Search:</p>
                    <div className="col-input-search">
                        <input
                            type="text"
                            className="input-search"
                            id="inputSearch"
                            onChange={userInputSearch}
                            value={searchDoctorStore}
                        />
                        <i
                            className={`fas fa-times icon-remove ${searchDoctorStore.length > 0 ? "icon-remove-active" : ""
                                }`}
                            onClick={clickDeleteInput}
                        ></i>
                    </div>
                </div>
            </div>

            {/* table */}
            <div className="container-table-dokter">
                <table className="table-dokter">
                    <tr style={{ backgroundColor: "#fff" }}>
                        {headerTable.map((e, i) => (
                            <th
                                key={i}
                                onClick={() =>
                                    changeActiveHeader(
                                        e.nama.toLowerCase().split("-").join(""),
                                        onActiveChooseOfHeader
                                    )
                                }
                            >
                                {e.nama}{" "}
                                <div className="column-icon-updown">
                                    <i
                                        className={`fas fa-long-arrow-alt-up icon-up ${e.nama.toLowerCase().split("-").join("") ===
                                            activeChooseHeader && onActiveChooseOfHeader
                                            ? "icon-active"
                                            : ""
                                            }`}
                                    ></i>
                                    <i
                                        className={`fas fa-long-arrow-alt-down icon-down ${e.nama.toLowerCase().split("-").join("") ===
                                            activeChooseHeader && !onActiveChooseOfHeader
                                            ? "icon-active"
                                            : ""
                                            }`}
                                    ></i>
                                </div>
                            </th>
                        ))}
                    </tr>
                    {newDataDoctor && newDataDoctor.length > 0 ? (
                        newDataDoctor.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td>{e.nama}</td>
                                    <td style={{ paddingRight: "20px" }}>{e.lokasi}</td>
                                    <td>{e.poli}</td>
                                    <td>{e.subPoli}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </table>
            </div>
        </div>
    ) : (
        <></>
    )
    // end page dokter

    // page card
    function RenderHTML({ e }) {
        return <p dangerouslySetInnerHTML={{ __html: e }}></p>;
    }

    const getPaginatedDataCard = () => {
        const startIndex = currentPageStore * contentPerPageCard - contentPerPageCard;
        const endIndex = startIndex + contentPerPageCard;
        const result = dataCard && dataCard !== undefined ? dataCard.slice(startIndex, endIndex) : []
        return result
    };

    const styleCard = {
        widthWrapp: "100%",
        displayCircleIcon: "flex",
        fontSizeTitle: "18px",
        fontSizeParagraphOne: "14px",
        fontWeightTitle: "bold",
        displayBtn: "none",
        textAlignTitle: "start",
        textAlignParagraphOne: "start",
        heightCircleIcon: "60px",
        widthCircleIcon: "60px",
        paddingDeskripsi: "30px",
        marginWrapp: "0 0 25px 0",
        bdrRadiusWrapp: "5px",
        lineHeightDeskripsi: "1.5",
        fontStyleIcon: "normal",
        marginTitle: "30px 0 10px 0",
        cursorWrapp: "pointer",
    };

    const newDataCard = getPaginatedDataCard()

    const renderCard = newDataCard !== undefined && data && data.id !== "jadwal-dokter" ? (
        <div className="container-card-three-line-page">
            {newDataCard.map((e, i) => {
                const removeElement =
                    e && e.paragraph !== undefined
                        ? e.paragraph.replace(/<\/?[^>]+(>|$)/g, "")
                        : "";

                return (
                    <Card
                        {...styleCard}
                        key={i}
                        title={e.header}
                        iconCirle={e.icon}
                        paragraphOne={
                            <RenderHTML
                                e={
                                    removeElement.length > 100
                                        ? removeElement.substr(0, 100) + "..."
                                        : removeElement
                                }
                            />
                        }
                        colorTitle={hoverCard === i ? "#fff" : "#4d784e"}
                        bgColorCircleIcon={hoverCard === i ? "#fff" : "#4d784e"}
                        colorCircleIcon={hoverCard === i ? "#4d784e" : "#fff"}
                        colorParagraphOne={hoverCard === i ? "#fff" : "#333"}
                        mouseEnterWrapp={() => mouseOverCard(i)}
                        mouseLeaveWrapp={mouseLeaveCard}
                        bgColorWrapp={hoverCard === i ? "#4d784e" : "#fff"}
                        clickWrapp={() => toPageDetail(`/layanan/${params.id}/${e.path}`)}
                    />
                );
            })}
        </div>
    ) : (
        <></>
    )

    function toPageDetail(path) {
        navigate(path)
    }

    function mouseOverCard(i) {
        setHoverCard(i);
    }

    function mouseLeaveCard() {
        setHoverCard(null);
    }
    // end page card

    // note : props data tetap di kasih data dari page, karna untuk menyesuaikan data pagination dari data page
    const styleOnCardTemplate = {
        displayBtnPaginate: data && data.id === 'jadwal-dokter' ? newDataDoctor && newDataDoctor.length > 0 ? 'flex' : 'none' : 'flex',
        displayTxtShowing: data && data.id !== 'jadwal-dokter' ? 'none' : 'flex',
        justifyContentConPaginate: data && data.id !== 'jadwal-dokter' ? 'center' : 'space-between',
        data: dataCard,
        contentPerPage: contentPerPageCard,
        id: data && data.id === 'jadwal-dokter' ? 'jadwal-dokter' : undefined,
        renderCard: renderCard,
        renderDokter: renderJadwalDokter,
        dataShowing: idxShowingDokter,
        nowChoose: nowChoose,
        searchDoctorStore: searchDoctorStore,
    }

    return (
        <Template
            page={page}
            card={dataCard !== undefined && dataCard.length > 0 ? <Pagination {...styleOnCardTemplate} /> : ''}
            title={data && data.header}
            barTitle={`${data && data.header} | RSPAD Gatot Soebroto`}
            img={`${address}/${data && data.image}`}
            paragraph={data && data.paragraph !== 'null' && data.id !== 'layanan-unggulan' ? data.paragraph : ''}
            loading={loading ? 'flex' : 'none'}
        />
    )
}

export default Layanan