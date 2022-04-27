import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const [state, setState] = useState({
    nationalCode: "",
    email: "",
    password: "",
  });
  const handleRegister = (data) => {
    axios
      .post("http://localhost:8000/post", {
        data,
      })
      .then((response) => console.log(response.status))
      .catch((err) => console.log(err));
    window.alert("ثبت نام با موفقیت انجام شد");
    history.push("/login");
  };
  const handleLogin = () => {
    history.push("/login");
  };
  return (
    <div
      className="container"
      style={{ marginTop: "5vh", fontSize: "20px", marginRight: "-12vw" }}
    >
      <div className="row justify-content-center">
        <div className="col-4">
          {(errors.nationalCode && (
            <div
              className="alert alert-danger"
              role="alert"
              style={{ textAlign: "center", width: "800px"}}
            >
              {errors.nationalCode.message}
            </div>
          )) ||
            (errors.email && (
              <div
                className="alert alert-danger"
                role="alert"
                style={{ textAlign: "center" }}
              >
                {errors.email.message}
              </div>
            )) ||
            (errors.password && (
              <div
                className="alert alert-danger"
                role="alert"
              >
                {errors.password.message}
              </div>
            ))}
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
              onSubmit={handleSubmit(handleRegister)}
              style={{ marginRight: "158px" }}
            >
              <br />
              <label htmlFor="nationalCode">کد ملی</label>
              <br />
              <input
                style={{ width: "450px" }}
                type="number"
                id="nationalCode"
                onChange={(e) => {
                  state.nationalCode = e.target.value;
                  setState({ ...state });
                }}
                {...register("nationalCode", {
                  minLength: {
                    value: 10,
                    message: "کد ملی باید حداقل دارای ۱۰ کاراکتر باشد",
                  },
                  required: "وارد کردن کد ملی الزامی است",
                })}
              ></input>
              <br />
              <br />
              <label htmlFor="email">ایمیل</label>
              <br />
              <input
                style={{ width: "450px" }}
                type="email"
                placeholder="example@example.ir"
                id="email"
                onChange={(e) => {
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
                onChange={(e) => {
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
              <input value="ورود" type="submit" onClick={handleLogin}></input>
              <input
                value="تایید"
                type="submit"
                style={{ marginRight: "15px" }}
              ></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
