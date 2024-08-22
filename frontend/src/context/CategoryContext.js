import { useContext } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import { baseUrl } from "../utils/baseUrl";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const { axiosJWT, token } = useContext(AuthContext);
  const [category, setCategory] = useState([]);
  const [singleCategory, setSingleCategory] = useState("");

  const navigate = useNavigate();

  const createCategory = async (data) => {
    try {
      const res = await axiosJWT.post(`${baseUrl}/api/category`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast(res.data, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        theme: "light",
      });
      getCategory();
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/category`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleCategory = async (id) => {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/category/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setSingleCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (data) => {
    try {
      const res = await axiosJWT.put(
        `${baseUrl}/api/category/${data.id}`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast(res.data, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        theme: "light",
      });
      navigate("/add-category");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axiosJWT.delete(`${baseUrl}/api/category/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast(res.data, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        theme: "light",
      });
      getCategory()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        createCategory,
        category,
        getCategory,
        getSingleCategory,
        singleCategory,
        updateCategory,
        deleteCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
