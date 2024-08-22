import React from "react";
import "./category.css";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { useEffect } from "react";
import moment from "jalali-moment";
import {Link} from "react-router-dom"

const ShowCategory = () => {
  const { category, getCategory,deleteCategory } = useContext(CategoryContext);
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="columns is-justify-content-center">
      <div className="column is-two-thirds">
        <table className="table table-category is-fullwidth has-background-black">
          <thead>
            <tr>
              <th>شماره</th>
              <th>نام دسته</th>
              <th>سازنده</th>
              <th>تاریخ انتشار</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {category &&
              category?.map((cat, index) => {
                return (
                  <tr key={cat._id}>
                    <th>{index + 1}</th>
                    <th>{cat.title}</th>
                    <th>{cat?.user?.firstName}</th>
                    <th>{moment(cat.createdAt).locale("fa").format("YYYY-MM-DD")}</th>
                    <th>
                      <Link state={cat} to={`/edit-category/${cat._id}`} className="button is-success ml-4 has-text-black">
                        ویرایش
                      </Link>
                      <button onClick={()=> deleteCategory(cat._id)} className="button is-danger has-text-black">
                        حذف
                      </button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowCategory;
