import React, { memo, useState } from "react";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./Pagination.css";

const Pagination = ({ postPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  const [isActive, setIsActive] = useState(false);

  function DoubleArrowLeft() {
    console.log("double previous button");
    try {
      if (currentPage === 1) {
        setIsActive(false);
        alert("You are on First Page please click next arrow button");
      } else {
        setIsActive(currentPage <= 3);
        paginate(currentPage - 2);
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  function previousButton() {
    console.log("previous button");
    try {
      if (currentPage === 1) {
        setIsActive(false);
        alert("You are on First Page please click next arrow button");
      } else {
        setIsActive(currentPage <= 2);
        paginate(currentPage - 1);
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  function forwardArrowRight() {
    try {
      if (currentPage === 5) {
        setIsActive(false);
        alert("You are on Last Page please click previous arrow button");
      } else {
        setIsActive(currentPage === 4);
        paginate(currentPage + 1);
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  function doubleArrowRight() {
    try {
      if (currentPage === 5) {
        setIsActive(false);
        alert("You are on Last Page please click previous arrow button");
      } else {
        setIsActive(currentPage === 3);
        paginate(currentPage + 2);
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  return (
    <div>
      <div class="pagination">
        <button
          className={isActive ? "btn1 active" : "btn1 "}
          onClick={(e) => {
            e.stopPropagation();
            DoubleArrowLeft();
          }}
        >
          <KeyboardDoubleArrowLeftIcon />
        </button>
        <button
          className={isActive ? "btn2 active" : "btn2 "}
          onClick={(e) => {
            e.stopPropagation();
            previousButton();
          }}
        >
          <ArrowBackIosNewSharpIcon />
        </button>
        <ul>
          {pageNumbers.map((number) => {
            const isActive = number === currentPage;
            const liActiveClass = isActive ? "link active" : "link";
            return (
              <li
                className={liActiveClass}
                key={number}
                onClick={() => paginate(number)}
              >
                {number}
              </li>
            );
          })}
        </ul>
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
      </div>
    </div>
  );
};

export default memo(Pagination);
