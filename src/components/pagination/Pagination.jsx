import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Pagination.scss";
import {
  changeCurrentPage,
  changeIdxPaginate,
  siblingCount,
  changeLastIdx,
  changeFirstIdx,
  changeIdxShowingDokter
} from "../../services/redux/navbar";

function Pagination({
  txtShowing,
  displayTxtShowing,
  justifyContentConPaginate,
  id,
  renderCard,
  renderDokter,
  dataShowing,
  displayBtnPaginate,
  ...propsAddition
}) {
  // props yang wajib dikonsumsikan di masing2 page : data dan contentPerPage
  const { data, contentPerPage, nowChoose, searchDoctorStore } = propsAddition

  const dispatch = useDispatch();
  const currentPageStore = useSelector((state) => state.navbar.currentPage);
  const idxPaginateStore = useSelector((state) => state.navbar.idxPaginate);
  const firstIdxStore = useSelector((state) => state.navbar.firstIdx);
  const lastIdxStore = useSelector((state) => state.navbar.lastIdx);
  const idxShowingDokter = useSelector((state) => state.navbar.idxShowingDokter)

  const inputSearch =
    id === "jadwal-dokter" &&
    Array.from(data).filter(
      (e) =>
        e.nama.toLowerCase().includes(searchDoctorStore.toLowerCase()) ||
        e.lokasi.toLowerCase().includes(searchDoctorStore.toLowerCase()) ||
        e.poli.toLowerCase().includes(searchDoctorStore.toLowerCase()) ||
        e.subPoli.toLowerCase().includes(searchDoctorStore.toLowerCase())
    )

  const totalNumber = searchDoctorStore !== undefined && searchDoctorStore.length > 0 && inputSearch !== undefined ? Math.ceil(inputSearch.length / contentPerPage) : data && Math.ceil(data && data.length / contentPerPage);
  const showNumberPaginate = totalNumber < siblingCount ? totalNumber : siblingCount;

  const styleContainerPaginate = {
    justifyContent: justifyContentConPaginate,
  };
  const styleTxtShowing = {
    display: displayTxtShowing,
  }

  function checkIdxPaginate(countIdx, length) {
    let newArr = [];
    for (let i = countIdx; i < length; i++) {
      newArr.push(i);
    }
    return newArr;
  }

  function updateIdxShowingDokter(nowShow, toShow, ofShow, totalData) {
    dispatch(changeIdxShowingDokter({ nowShow: nowShow, toShow: toShow, ofShow: ofShow, totalData: totalData }))
  }

  function scrollToContent() {
    const wrappTemplate = document.getElementById('contentBlog')
    window.scrollTo(0, wrappTemplate.offsetTop - 80)
  }

  function goToNextPage(idx) {
    if (idx <= totalNumber) {
      scrollToContent()

      dispatch(changeCurrentPage({ pageNow: idx }));

      // for update data idxShowingDokter
      const nowShow = ((nowChoose * idx) - nowChoose) + 1
      const checkUserInput = searchDoctorStore !== undefined && searchDoctorStore.length > 0 ? inputSearch.length : data.length
      const toShowInNotLastData = nowChoose * idx

      if (id === 'jadwal-dokter') {
        if (idx !== totalNumber) {
          // not the last data or not the last idx
          updateIdxShowingDokter(nowShow, toShowInNotLastData, checkUserInput, data.length)
        } else if (idx === totalNumber) {
          // the last data or the last idx
          updateIdxShowingDokter(nowShow, checkUserInput, checkUserInput, data.length)
        }
      }
      // END for update data idxShowingDokter

      if (idx === lastIdxStore + 1) {
        const check = checkIdxPaginate(idx, totalNumber + 1)

        if (check.length > siblingCount) {
          dispatch(changeLastIdx({ idx: check[siblingCount - 1] }));
          dispatch(
            changeIdxPaginate({
              countIdx: idx,
              length: check[siblingCount - 1] + 1,
            })
          );
          dispatch(changeFirstIdx({ idx: check[0] }));
        }
        if (check.length < siblingCount) {
          dispatch(
            changeIdxPaginate({
              countIdx: idx,
              length: check[check.length - 1] + 1,
            })
          );
          dispatch(changeFirstIdx({ idx: check[0] }));
        }
        if (check.length === siblingCount) {
          dispatch(
            changeIdxPaginate({
              countIdx: idx,
              length: check[siblingCount - 1] + 1,
            })
          );
          dispatch(changeFirstIdx({ idx: check[0] }));
        }
      }
    }
  }

  function goToPreviousPage(idx) {
    if (idx >= 1) {
      scrollToContent()

      dispatch(changeCurrentPage({ pageNow: idx }));

      // for update data idxShowingDokter
      const checkUserInput = searchDoctorStore !== undefined && searchDoctorStore.length > 0 ? inputSearch.length : data.length

      if (id === 'jadwal-dokter') {
        const nowShow = idxShowingDokter.nowShow - nowChoose
        const toShow = idxShowingDokter.toShow - nowChoose
        const toShowInLastData = ((checkUserInput - toShow) + nowShow) - 1

        if (idx !== 1 && idx !== totalNumber - 1) {
          updateIdxShowingDokter(nowShow, toShow, checkUserInput, data.length)
        } else if (idx !== 1 && idx === totalNumber - 1) {
          updateIdxShowingDokter(nowShow, toShowInLastData, checkUserInput, data.length)
        } else if (idx === 1) {
          updateIdxShowingDokter(nowShow, nowChoose, checkUserInput, data.length)
        }
      }
      // END for update data idxShowingDokter

      if (idx === siblingCount) {
        dispatch(changeIdxPaginate({ countIdx: 1, length: siblingCount + 1 }));
        dispatch(changeFirstIdx({ idx: siblingCount }));
        dispatch(changeLastIdx({ idx: siblingCount }));
      }
      if (
        idx > siblingCount &&
        idx < firstIdxStore &&
        idx === firstIdxStore - 1
      ) {
        dispatch(
          changeIdxPaginate({
            countIdx: firstIdxStore - siblingCount,
            length: firstIdxStore,
          })
        );
        dispatch(changeFirstIdx({ idx: idxPaginateStore[0] }));
        dispatch(changeLastIdx({ idx: firstIdxStore - 1 }));
      }
      if (idx > 5 && idx !== firstIdxStore - 1) {
        return dispatch(changeFirstIdx({ idx: idxPaginateStore[0] }));
      }
    }
  }

  function changePage(event) {
    scrollToContent()
    
    const pageNumber = Number(event.target.textContent)

    const nowShow = nowChoose === 'semua' ? ((data && data.length * pageNumber) - (data && data.length)) + 1 : ((nowChoose * pageNumber) - nowChoose) + 1
    const checkUserInput = searchDoctorStore !== undefined && searchDoctorStore.length > 0 ? inputSearch.length : data.length
    const toShowInNotLastData = nowChoose * pageNumber

    // for update data idxShowingDokter
    if (id === 'jadwal-dokter') {
      if (pageNumber !== totalNumber) {
        // not the last data or not the last idx
        updateIdxShowingDokter(nowShow, toShowInNotLastData, checkUserInput, data.length)
      } else if (pageNumber === totalNumber) {
        // the last data or the last idx
        updateIdxShowingDokter(nowShow, checkUserInput, checkUserInput, data.length)
      }
    }
    // END for update data idxShowingDokter

    dispatch(changeCurrentPage({ pageNow: pageNumber }));
    dispatch(changeFirstIdx({ idx: idxPaginateStore[0] }));
    dispatch(
      changeLastIdx({ idx: idxPaginateStore[idxPaginateStore.length - 1] })
    );
  }

  // useEffect disini hanya untuk mendapatkan update terbaru untuk showNumberPaginate, agar mendapatkan data secara real time
  // Note : jangan lakukan update apapun selain dari case ini, karna dapat ikut update berulang ketika fungsi ini terpanggil
  useEffect(() => {
    dispatch(
      changeIdxPaginate({
        countIdx: currentPageStore,
        length: showNumberPaginate + 1,
      })
    );
    dispatch(changeLastIdx({ idx: showNumberPaginate }));
  }, [showNumberPaginate])

  const { nowShow, toShow, ofShow, totalData } = dataShowing !== undefined && Object.keys(dataShowing).length > 0 ? dataShowing : {}

  const filteredData = searchDoctorStore !== undefined && searchDoctorStore.length > 0 && totalData !== undefined && `(filtered from ${data.length} total entries)`

  return (
    <>
      <div className="wrapp-pagination">
        <div className="container-content">
          {renderCard}
          {renderDokter}
        </div>

        <div className="container-btn-paginate" style={styleContainerPaginate}>
          <p className="txt-showing" style={styleTxtShowing}>
            Showing {nowShow} to {toShow} of {ofShow} entries {filteredData}
          </p>

          <div className="paginate" style={{
            display: displayBtnPaginate
          }}>
            <button
              className={
                totalNumber !== 0 ? currentPageStore === 1
                  ? "btn-paginate previous disable"
                  : "btn-paginate previous"
                  : 'btn-paginate previous disable'
              }
              onClick={() => goToPreviousPage(currentPageStore - 1)}
            >
              Previous
            </button>
            <ul className="idx-paginate">
              {idxPaginateStore && idxPaginateStore.length > 0 ? (
                idxPaginateStore.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className={
                        item === currentPageStore
                          ? "no-paginate-active"
                          : "no-paginate"
                      }
                      onClick={changePage}
                    >
                      {item}
                    </li>
                  );
                })
              ) : (
                <></>
              )}
            </ul>
            <button
              className={
                totalNumber !== 0
                  ? currentPageStore === totalNumber
                    ? "btn-paginate next disable"
                    : "btn-paginate next"
                  : "btn-paginate next disable"
              }
              onClick={() => goToNextPage(currentPageStore + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;
