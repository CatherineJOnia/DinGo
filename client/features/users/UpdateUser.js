import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleUser, editSingleUser } from "./singleUserSlice";

const UpdateUser = () => {
  const dispatch = useDispatch();

  const { userId } = useParams();
  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch]);

  const handleAdmin = (evt) => {
    evt.preventDefault();
    setAdmin(evt.target.value);
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await dispatch(editSingleUser({ userId, isAdmin }));
  };

  return (
    <div>
      <form className="update-user" onSubmit={handleSubmit}>
        <select value={isAdmin} onChange={handleAdmin}>
          <option value="true" onChange={handleAdmin}>
            Admin
          </option>
          <option value="false" onChange={handleAdmin}>
            Customer
          </option>
        </select>
        <button type="submit">Update Admin</button>
      </form>
    </div>
  );
};

export default UpdateUser;
