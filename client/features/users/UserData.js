import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUsersAsync,
  selectUsers,
  deleteSingleUserAsync,
} from "./usersSlice";
import { editSingleUserAsync } from "./singleUserSlice";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid, useGridApiRef, useGridLogger } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Button } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Work Sans"].join(","),
  },
  palette: {
    primary: {
      main: "#5b7b7a",
    },
    secondary: {
      main: "#ceb5a7",
    },
  },
});

const UserData = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  const [isAdmin, setIsAdmin] = useState(true);

  const handleDelete = async (userId) => {
    await dispatch(deleteSingleUserAsync({ userId }));
  };

  const handleEdit = async (userId) => {
    userId && isAdmin === false ? setIsAdmin(true) : null;

    userId && isAdmin === true ? setIsAdmin(false) : null;
    await dispatch(editSingleUserAsync({ userId, isAdmin }));
    await dispatch(fetchUsersAsync());
  };

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const columns = [
    { field: "col1", headerName: "ID", width: 50 },
    { field: "col2", headerName: "First Name", width: 150 },
    { field: "col3", headerName: "Last Name", width: 150 },
    { field: "col4", headerName: "Email", width: 200 },
    { field: "col5", headerName: "Admin Status", width: 120 },

    {
      field: "col6",
      headerName: "",
      width: 180,
      renderCell: (users) => {
        return (
          <Button
            variant="outlined"
            size="small"
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(handleEdit(users.id, users.isAdmin));
            }}
          >
            Edit Admin Status
          </Button>
        );
      },
    },

    {
      field: "col7",
      headerName: "",
      width: 80,
      renderCell: (users) => {
        return (
          <IconButton
            aria-label="delete"
            onClick={async (evt) => {
              evt.preventDefault();
              dispatch(handleDelete(users.id));
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    col1: user.id,
    col2: user.firstName,
    col3: user.lastName,
    col4: user.email,
    col5: user.isAdmin ? "Admin" : "Not Admin",
    col6: user.id,
    col7: user.id,
  }));

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: "90vh", width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </ThemeProvider>
  );
};

export default UserData;
