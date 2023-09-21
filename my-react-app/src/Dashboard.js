import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Admin from "./AdminPage";
import Pagination from "./Pagination";

export default function Dashboard() {
  const employeeDataUrl =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  //states
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);
  const [adminCheckbox, setAdminCheckbox] = useState({});

  //slicing data according to requirement-
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = adminData.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(employeeDataUrl);
      const data = await response.json();
      setAdminData(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  //changing page according to page number
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //delete using delete icon
  const handleDelete = async (id) => {
    try {
      const deletedData = adminData.filter((item) => item.id !== id);
      setAdminData(deletedData);
    } catch (err) {
      console.log("err", err);
    }
  };

  //delete using checkbox
  const deleteSelected = async () => {
    let selectedData = [];

    try {
      for (const id in adminCheckbox) {
        if (adminCheckbox[id]) {
          selectedData.push(id);
        }
      }

      if (selectedData.length === 0) {
        return;
      }

      if (selectAllCheckbox) {
        setCurrentPage();
        // setAdminData([]);
        setAdminCheckbox({});
        setSelectAllCheckbox(false);
      } else {
        const updateAdminTable = adminData.filter(
          (element) => !selectedData.includes(element.id)
        );
        setAdminData(updateAdminTable);
        let multipleSelectedCheckbox = { ...adminCheckbox };
        selectedData.forEach((id) => {
          delete multipleSelectedCheckbox[id];
        });
        setAdminCheckbox(multipleSelectedCheckbox);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  //saving edited data
  const handleSave = (id) => {
    let editingData = adminData.map((element) => {
      return element.id === id ? { ...element, ...editData } : element;
    });
    setAdminData(editingData);
    setIsEdit(null);
    setEditData({});
  };

  useEffect(() => {}, [adminData]);

  //search using any key
  const handleSearch = async (e) => {
    let value = e.target.value;
    setSearch(value);

    if (value === "") {
      return;
    } else {
      let filteredDataValue = adminData.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.role.toLowerCase().includes(value.toLowerCase())
      );
      setAdminData(filteredDataValue);
      setCurrentPage(1);
    }
  };

  return (
    <div class="container">
      <div class="content text-white">
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name, email and role."
          class="search-desktop"
          width="100px"
        ></input>

        <>
          <Admin
            loading={loading}
            data={currentPost}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            editData={editData}
            setEditData={setEditData}
            handleSave={handleSave}
            handleDelete={handleDelete}
            selectAllCheckbox={selectAllCheckbox}
            setSelectAllCheckbox={setSelectAllCheckbox}
            adminCheckbox={adminCheckbox}
            setAdminCheckbox={setAdminCheckbox}
          />
          <div class="footer">
            <button class="delete-all-btn" onClick={() => deleteSelected()}>
              Delete Selected
            </button>

            <Pagination
              postPerPage={postPerPage}
              totalPosts={adminData.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </>
      </div>
    </div>
  );
}
