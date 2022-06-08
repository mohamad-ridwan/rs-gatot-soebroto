import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Layanan.scss'
import Card from '../../components/card/Card'
import Pagination from '../../components/pagination/Pagination'
import Template from '../../components/template/Template'
import address from '../../services/api/address'
import { changeActiveChooseHeader, changeActiveMenuChoose, changeContentPerPage, changeCurrentPage, changeFirstIdx, changeIdxActiveChoose, changeIdxPaginate, changeLastIdx, changeNowChoose, changeOnActiveChooseOfHeader, changeSearchDoctor, siblingCount } from '../../services/redux/navbar'

function Layanan() {
    const [hoverCard, setHoverCard] = useState(null)
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
    const data = useSelector((state) => state.navbar.dataLayanan)
    const page = useSelector((state) => state.navbar.pageLayanan)
    const contentPerPageCard = useSelector((state) => state.navbar.contentPerPageCard)
    const currentPageStore = useSelector((state) => state.navbar.currentPage)
    const searchDoctorStore = useSelector((state) => state.navbar.searchDoctor)
    const idxActiveChoose = useSelector((state) => state.navbar.idxActiveChoose);
    const activeChooseHeader = useSelector(
        (state) => state.navbar.activeChooseHeader
    );
    const onActiveChooseOfHeader = useSelector(
        (state) => state.navbar.onActiveChooseOfHeader
    );
    const activeMenuChoose = useSelector(
        (state) => state.navbar.activeMenuChoose
    );
    const nowChoose = useSelector((state) => state.navbar.nowChoose);

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

    function userInputSearch(e) {
        const value = e.target.value;
        dispatch(changeSearchDoctor({ input: value }));

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

        dispatch(changeSearchDoctor({ input: "" }));
        dispatch(
            changeIdxPaginate({ countIdx: 1, length: showNumberPaginate + 1 })
        );
        dispatch(changeCurrentPage({ pageNow: 1 }));
        dispatch(changeFirstIdx({ idx: siblingCount }));
        dispatch(changeLastIdx({ idx: siblingCount }));
    }

    function changeActiveHeader(valueHeader, condition) {
        if (valueHeader !== activeChooseHeader) {
            dispatch(changeActiveChooseHeader({ nama: valueHeader }));
            dispatch(changeOnActiveChooseOfHeader({ condition: true }));
        }
        if (valueHeader === activeChooseHeader && condition) {
            dispatch(changeOnActiveChooseOfHeader({ condition: false }));
        }
        if (valueHeader === activeChooseHeader && !condition) {
            dispatch(changeOnActiveChooseOfHeader({ condition: true }));
        }
    }

    function onShowMenuChoose() {
        dispatch(changeActiveMenuChoose({ activeStats: !activeMenuChoose }));
    }

    function updateDataOfRedux(length, allData) {
        dispatch(
            changeNowChoose({ choose: allData !== undefined ? allData : length })
        );

        // NOTE!! : state name of > contentPerPageCard jika nilainya dirubah harus tetap berupa integer, karna nilainya berupa jumlah data dokter yang di tampilkan dalam satu halaman.
        dispatch(changeContentPerPage({ contentPerPage: length }));

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
        dispatch(changeIdxActiveChoose({ idx: idx }));

        if (length !== "semua") {
            // NOTE!! : state name of > contentPerPageCard jika nilainya dirubah harus tetap berupa integer, karna nilainya berupa jumlah data dokter yang di tampilkan dalam satu halaman.
            return updateDataOfRedux(parseInt(length));
        }
        if (length === "semua") {
            return updateDataOfRedux(dataCard.length, "semua");
        }
    }

    function RenderJadwalDokter() {
        const newData = dataDoctor();

        return (
            <>
                {data && data.id === "jadwal-dokter" ? (
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
                                        autoFocus
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
                            {newData && newData.length > 0 ? (
                                newData.map((e, i) => {
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
                ) : (
                    <></>
                )}
            </>
        );
    }
    // end page dokter

    // page card
    function RenderHTML({ e }) {
        return <p dangerouslySetInnerHTML={{ __html: e }}></p>;
    }

    const getPaginatedDataCard = () => {
        const startIndex = currentPageStore * contentPerPageCard - contentPerPageCard;
        const endIndex = startIndex + contentPerPageCard;
        return dataCard.slice(startIndex, endIndex);
    };

    const styleCard = {
        displayCircleIcon: "flex",
        iconCirle: "fas fa-user",
        widthWrapp: "calc(95%/3)",
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

    function RenderCard() {
        const dataCard = getPaginatedDataCard();

        return (
            <>
                {dataCard !== undefined && data && data.id !== "jadwal-dokter" ? (
                    dataCard.map((e, i) => {
                        const removeElement =
                            e && e.paragraph !== undefined
                                ? e.paragraph.replace(/<\/?[^>]+(>|$)/g, "")
                                : "";

                        return (
                            <Card
                                {...styleCard}
                                key={i}
                                title={e.header}
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
                            />
                        );
                    })
                ) : (
                    <></>
                )}
            </>
        );
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
        displayTxtShowing: data && data.id !== 'jadwal-dokter' ? 'none' : 'flex',
        justifyContentConPaginate: data && data.id !== 'jadwal-dokter' ? 'center' : 'space-between',
        data: dataCard,
        contentPerPage: contentPerPageCard,
        id: data && data.id === 'jadwal-dokter' ? 'jadwal-dokter' : null,
        renderCard: <RenderCard />,
        renderDokter: <RenderJadwalDokter />
    }

    return (
        <Template
            page={page}
            card={dataCard !== undefined && dataCard.length > 0 ? <Pagination {...styleOnCardTemplate} /> : ''}
            title={data && data.header}
            img={`${address}/${data && data.image}`}
            paragraph={data && data.paragraph !== 'null' && data.id !== 'layanan-unggulan' ? data.paragraph : ''}
        />
    )
}

export default Layanan