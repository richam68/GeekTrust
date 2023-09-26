import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import "./AdminPage.css";

const AdminPage = ({
  data,
  adminData,
  setAdminData,
  setOriginalData,
  setCurrentPage,
  setTotalItems,
  isEdit,
  setIsEdit,
  editData,
  setEditData,
  selectAllCheckbox,
  setSelectAllCheckbox,
  adminCheckbox,
  setAdminCheckbox,
}) => {
  //Each row consist checkbox for selecting them
  const handleCheckBox = (event, id) => {
    setAdminCheckbox((prevState) => ({
      ...prevState,
      [id]: event,
    }));
  };

  //we have also select all checkbox for handling this function is helpful
  const handleAllCheckbox = (event) => {
    setSelectAllCheckbox(event);
    let checkboxValues = {};
    data.forEach((value) => {
      checkboxValues[value.id] = event;
    });
    setAdminCheckbox(checkboxValues);
  };

  //as each row can edit their data for input change
  const handleChange = (key, value) => {
    setEditData((editData) => ({
      ...editData,
      [key]: value,
    }));
  };

  //esit button functionality for each row
  const handleEditButtonClick = (id) => {
    setIsEdit(id);
    setEditData(data.find((ele) => ele.id === id));
  };

  //after edited data save your data
  const handleSave = (id) => {
    let editingData = adminData.map((element) => {
      return element.id === id ? { ...element, ...editData } : element;
    });
    setAdminData(editingData);
    setOriginalData(editingData);
    setCurrentPage(1);
    setTotalItems(editingData.length);
    setIsEdit(null);
    setEditData({});
  };

  //in each row cancel option is available if you click on edit but you change your mind not to edit
  const handleCancel = () => {
    setIsEdit(null);
    setEditData({});
  };

  //delete using delete icon
  const handleDelete = async (id) => {
    const deletedData = adminData.filter((item) => item.id !== id);
    setAdminData(deletedData);
    setOriginalData(deletedData);
    setCurrentPage(1);
    setTotalItems(deletedData.length);
  };

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: " collapse" }}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAllCheckbox}
                onChange={(e) => {
                  handleAllCheckbox(e.target.checked);
                }}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        {data.map((items) => {
          return (
            <tbody key={items.id}>
              <tr className={adminCheckbox[items.id] ? "selected-row" : ""}>
                <td>
                  <input
                    type="checkbox"
                    checked={adminCheckbox[items.id] || false}
                    onChange={(e) => handleCheckBox(e.target.checked, items.id)}
                  />
                </td>
                <td>
                  {isEdit === items.id ? (
                    <input
                      type="text"
                      placeholder="Enter name"
                      name="name"
                      value={editData.name}
                      onChange={(e) => {
                        handleChange("name", e.target.value);
                      }}
                    />
                  ) : (
                    items.name
                  )}
                </td>
                <td>
                  {isEdit === items.id ? (
                    <input
                      type="text"
                      placeholder="Enter Email"
                      name="email"
                      value={editData.email}
                      onChange={(e) => {
                        handleChange("email", e.target.value);
                      }}
                    />
                  ) : (
                    items.email
                  )}
                </td>
                <td>
                  {isEdit === items.id ? (
                    <input
                      type="text"
                      placeholder="Enter Role"
                      name="role"
                      value={editData.role}
                      onChange={(e) => {
                        handleChange("role", e.target.value);
                      }}
                    />
                  ) : (
                    items.role
                  )}
                </td>
                <td className="table-data">
                  {isEdit === items.id ? (
                    <div style={{ display: "flex" }}>
                      <button
                        onClick={() => handleSave(items.id)}
                        className="save-btn"
                      >
                        <DoneIcon />
                      </button>
                      <button
                        onClick={() => handleCancel()}
                        className="cancel-btn"
                      >
                        <CancelIcon />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleEditButtonClick(items.id);
                      }}
                      className="edit-btn"
                    >
                      <EditIcon />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(items.id)}
                    className="delete-btn"
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default AdminPage;
