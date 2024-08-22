import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import "./users.css";
import { Link } from "react-router-dom";

const Users = () => {
  const { getUsers, users, blockUser, unBlockUser } = useContext(AuthContext);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="columns">
        <div className="column is-fullwidth">
          <table className="table table-user is-fullwidth">
            <thead>
              <tr>
                <th>شماره</th>
                <th>نام</th>
                <th>نام خانوادگی</th>
                <th>ایمیل</th>
                <th>طرفداری</th>
                <th>ارسال پیام</th>
                <th>بررسی</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users?.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <th>{index + 1}</th>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user?.followers?.length}</td>
                      <td>
                        <Link
                          state={user.email}
                          to="/user/send-email"
                          className="button is-link"
                        >
                          ارسال پیام
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/profile/${user._id}`}
                          className="button is-success"
                        >
                          پروفایل
                        </Link>
                      </td>

                      <td>
                        {user.isBlocked ? (
                          <button
                            onClick={() => unBlockUser(user._id)}
                            className="button is-dark"
                          >
                            رفع مسدود سازی
                          </button>
                        ) : (
                          <button
                            onClick={() => blockUser(user._id)}
                            className="button is-danger"
                          >
                            بلاک کردن
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
