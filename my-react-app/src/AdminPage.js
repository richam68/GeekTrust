import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import "./AdminPage.css";

const AdminPage = ({
  loading,
  data,
  isEdit,
  setIsEdit,
  editData,
  setEditData,
  handleSave,
  handleDelete,
  selectAllCheckbox,
  setSelectAllCheckbox,
  adminCheckbox,
  setAdminCheckbox,
}) => {
  const handleCheckBox = (event, id) => {
    setAdminCheckbox((prevState) => ({
      ...prevState,
      [id]: event,
    }));
  };

  const handleAllCheckbox = (event) => {
    setSelectAllCheckbox(event);
    let checkboxValues = {};
    data.forEach((value) => {
      checkboxValues[value.id] = event;
    });

    setAdminCheckbox(checkboxValues);
  };

  const handleChange = (key, value) => {
    setEditData((editData) => ({
      ...editData,
      [key]: value,
    }));
  };

  const handleEditButtonClick = (id) => {
    setIsEdit(id);
    setEditData(data.find((ele) => ele.id === id));
  };

  const handleCancel = () => {
    setIsEdit(null);
    setEditData({});
  };

  return (
    <div>
      <div className="heading">
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
          {loading ? (
            <div className="loading">
              Loading...
              <PendingIcon />
            </div>
          ) : (
            <>
              {data.map((items) => {
                return (
                  <tbody key={items.id}>
                    <tr
                      className={adminCheckbox[items.id] ? "selected-row" : ""}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={adminCheckbox[items.id] || false}
                          onChange={(e) =>
                            handleCheckBox(e.target.checked, items.id)
                          }
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
            </>
          )}
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
