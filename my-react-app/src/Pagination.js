import React, { memo, useState } from "react";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./Pagination.css";

const Pagination = ({
  postPerPage,
  totalPosts,
  paginate,
  currentPage,
  adminCheckbox,
  adminData,
  selectAllCheckbox,
  setAdminCheckbox,
  setSelectAllCheckbox,
  setCurrentPage,
  setOriginalData,
  setAdminData,
  setTotalItems,
}) => {
  const [isActive, setIsActive] = useState(false);

  const showButtons = (totalPosts, postPerPage) => {
    const noOfPages = Math.ceil(totalPosts / postPerPage);
    const buttonsValue = [];
    for (let i = 1; i <= noOfPages; i++) {
      buttonsValue.push(i);
    }
    return buttonsValue;
  };

  //This function represents delete selected button, multiple selected rows deleted by this function
  const deleteSelected = async () => {
    let selectedData = [];
    for (const id in adminCheckbox) {
      if (adminCheckbox[id]) {
        selectedData.push(id);
      }
    }
    if (selectedData.length === 0) {
      return;
    }
    const updateAdminTable = adminData.filter(
      (element) => !selectedData.includes(element.id)
    );
    if (selectAllCheckbox) {
      setAdminCheckbox({});
      setSelectAllCheckbox(false);
    }
    setCurrentPage(1);
    setOriginalData(updateAdminTable);
    setAdminData(updateAdminTable);
    setTotalItems(updateAdminTable.length);
  };

  // Handle clicking the double arrow left button
  function DoubleArrowLeft() {
    setIsActive(true);
    setCurrentPage(1);
  }

  // Handle clicking the previous button
  function previousButton() {
    console.log(">>", isActive);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setIsActive(false);
    }
  }

  // Handle clicking the forward arrow right button
  function forwardArrowRight() {
    if (currentPage === Math.ceil(totalPosts / postPerPage)) {
      setIsActive(false);
      alert("You are on Last Page please click previous arrow button");
    } else {
      setIsActive(currentPage === 4);
      paginate(currentPage + 1);
    }
  }

  // Handle clicking the double arrow right button
  function doubleArrowRight() {
    console.log(">>>");
    setCurrentPage(Math.ceil(totalPosts / postPerPage));
    setIsActive(false);
  }

  return (
    <div>
      <div className="pagination">
        <div className="btn">
          <button className="delete-all-btn" onClick={() => deleteSelected()}>
            Delete Selected
          </button>
        </div>
        <ul>
          <button
            className={isActive ? "btn1" : "btn1 active"}
            onClick={(e) => {
              console.log("isActive", isActive);
              e.stopPropagation();
              DoubleArrowLeft();
            }}
          >
            <KeyboardDoubleArrowLeftIcon />
          </button>
          <button
            className={isActive ? "btn2" : "btn2 active"}
            onClick={(e) => {
              e.stopPropagation();
              previousButton();
            }}
          >
            <ArrowBackIosNewSharpIcon />
          </button>
          {showButtons(totalPosts, postPerPage).map((number) => {
            const isActive = number === currentPage;
            const liActiveclassName = isActive ? "link active" : "link";
            return (
              <li
                className={liActiveclassName}
                key={number}
                onClick={() => paginate(number)}
              >
                {number}
              </li>
            );
          })}
          <button
            className={isActive ? "btn3" : "btn3 active"}
            onClick={(e) => {
              e.stopPropagation();
              forwardArrowRight();
            }}
          >
            <ArrowForwardIosOutlinedIcon />
          </button>
          <button
            className={isActive ? "btn4" : "btn4 active"}
            onClick={(e) => {
              e.stopPropagation();
              doubleArrowRight();
            }}
          >
            <KeyboardDoubleArrowRightIcon />
          </button>
        </ul>
      </div>
    </div>
  );
};

export default memo(Pagination);
