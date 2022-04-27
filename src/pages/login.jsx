import { useAuth } from "../contexts/Auth";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export const ERROR_MESSAGES = {
  "Cannot find user": "",
};

const LoginPage = () => {
  const history = useHistory();
  const [state, setState] = useState({ email: "", password: "" });
  const [users, setUsers] = useState([]);
  const { toggleAuth, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = () => {
    ERROR_MESSAGES["Cannot find user"] = "";
    history.push("/register");
  };
  useEffect(() =>
    axios
      .get("http://localhost:8000/post")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err))
  ,[]);

  const handleLogin = (information) => {
    users.forEach((person) => {
      if (
        person.data.email === information.email &&
        person.data.password === information.password
      ) {
        if (!user.loggedIn) {
          toggleAuth();
          history.push("/dashboard");
        }
      } else {
        ERROR_MESSAGES["Cannot find user"] = (
          <div
            className="alert alert-danger"
            role="alert"
            style={{ textAlign: "center", width: "800px" }}
          >
            کاربردی با این مشخصات یافت نشد!
          </div>
        );
      }
    });
  };
  return (
    <div
      className="container"
      style={{ marginTop: "5vh", fontSize: "20px", marginRight: "-12vw" }}
    >
      <div className="row justify-content-center">
        <div className="col-4">
          {(errors.email && (
            <div
              className="alert alert-danger"
              role="alert"
              style={{ textAlign: "center", width: "800px" }}
            >
              {errors.email.message}
            </div>
          )) ||
            (errors.password && (
              <div
                className="alert alert-danger"
                role="alert"
                style={{ textAlign: "center", width: "800px" }}
              >
                {errors.password.message}
              </div>
            )) ||
            ERROR_MESSAGES["Cannot find user"]}
          <div
            className="card"
            style={{
              width: "50vw",
              paddingBottom: "5%",
              boxShadow: "11px 11px 40px",
            }}
          >
            <form
              className="card-body"
              onSubmit={handleSubmit(handleLogin)}
              style={{ marginRight: "158px" }}
            >
              <label htmlFor="email">ایمیل</label>
              <br />
              <input
                style={{ width: "450px" }}
                placeholder="example@example.ir"
                type="email"
                id="email"
                onInput={(e) => {
                  state.email = e.target.value;
                  setState({ ...state });
                }}
                {...register("email", {
                  required: "وارد کردن ایمیل الزامی است",
                })}
              ></input>
              <br />
              <br />
              <label htmlFor="password">گذرواژه</label>
              <br />
              <input
                style={{ width: "450px" }}
                type="password"
                id="password"
                onInput={(e) => {
                  state.password = e.target.value;
                  setState({ ...state });
                }}
                {...register("password", {
                  minLength: {
                    value: 4,
                    message: "گذرواژه باید حداقل دارای ۴ کاراکتر باشد",
                  },
                  required: "وارد کردن گذرواژه الزامی است",
                })}
              ></input>
              <br />
              <br />
              <input value="ورود" type="submit"></input>
              <input
                style={{ marginRight: "15px" }}
                value="ثبت نام"
                type="submit"
                onClick={handleRegister}
              ></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
