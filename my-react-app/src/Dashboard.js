import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Admin from "./AdminPage";
import Pagination from "./Pagination";

export default function Dashboard() {
  const employeeDataUrl =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  const [originalData, setOriginalData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);
  const [adminCheckbox, setAdminCheckbox] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let currentPost = paginateFunction(adminData, currentPage, postPerPage);
    setPaginatedData(currentPost);
  }, [currentPage, adminData]);

  async function fetchData() {
    try {
      const response = await fetch(employeeDataUrl);
      if (!response.ok) {
        console.log("HTTP Error:", response.status);
        return;
      }
      const data = await response.json();
      setAdminData(data);
      setOriginalData(data);
      setTotalItems(data.length);
    } catch (error) {
      console.error("Error Found", error);
    }
  }

  function paginateFunction(adminData, currentPage, postPerPage) {
    const indexOfFirstPost = (currentPage - 1) * postPerPage;
    const indexOfLastPost = indexOfFirstPost + postPerPage;
    return adminData.slice(indexOfFirstPost, indexOfLastPost);
  }
  //changing page according to page number
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //search functionality using any key
  const handleSearch = async (e) => {
    let value = e.target.value;
    setSearch(value);

    let filteredDataValue = originalData.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()) ||
        item.role.toLowerCase().includes(value.toLowerCase())
    );
    let searchList = [];
    filteredDataValue.forEach((obj) => {
      if (obj !== null) {
        searchList.push(obj);
      }
    });
    setAdminData(searchList);
    setCurrentPage(1);
    setTotalItems(searchList.length);
  };

  return (
    <div className="container">
      <div className="content text-white">
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name, email and role."
          className="search-desktop"
        ></input>

        <Admin
          data={paginatedData}
          adminData={adminData}
          setAdminData={setAdminData}
          setOriginalData={setOriginalData}
          setCurrentPage={setCurrentPage}
          setTotalItems={setTotalItems}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editData={editData}
          setEditData={setEditData}
          selectAllCheckbox={selectAllCheckbox}
          setSelectAllCheckbox={setSelectAllCheckbox}
          adminCheckbox={adminCheckbox}
          setAdminCheckbox={setAdminCheckbox}
        />

        <Pagination
          postPerPage={postPerPage}
          totalPosts={totalItems}
          paginate={paginate}
          currentPage={currentPage}
          adminCheckbox={adminCheckbox}
          adminData={adminData}
          selectAllCheckbox={selectAllCheckbox}
          setAdminCheckbox={setAdminCheckbox}
          setSelectAllCheckbox={setSelectAllCheckbox}
          setCurrentPage={setCurrentPage}
          setOriginalData={setOriginalData}
          setAdminData={setAdminData}
          setTotalItems={setTotalItems}
        />
      </div>
    </div>
  );
}
