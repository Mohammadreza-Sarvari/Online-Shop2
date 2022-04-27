import React from "react";
import { useForm } from "react-hook-form";
const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    window.alert("پیام با موفقیت ارسال شد");
  };

  return (
    <div className="container">
      <div
        className="row"
        style={{
          height: 100,
          overflow: "hidden",
          borderRadius: 12,
          marginBottom: 12,
        }}
      ></div>
      <div className="row">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                نام شما
              </label>
              <input
                type="title"
                className={`form-control card-header form-control${
                  errors.title ? " is-invalid" : ""
                }`}
                id="name"
                placeholder="نام شما"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p style={{ color: "red" }}>وارد کردن نام اجباری است</p>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                ایمیل
              </label>
              <input
                type="email"
                className={`form-control card-header form-control${
                  errors.email ? " is-invalid" : ""
                }`}
                id="email"
                placeholder="example@example.ir"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p style={{ color: "red" }}>وارد کردن ایمیل اجباری است</p>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <label htmlFor="message" className="form-label">
                پیام شما
              </label>
              <textarea
                className={`form-control card-header form-control${
                  errors.textarea ? " is-invalid" : ""
                }`}
                id="message"
                rows="3"
                {...register("textarea", { required: true })}
              />
              {errors.textarea && (
                <p style={{ color: "red" }}>کادر پیام نباید خالی باشد</p>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            ارسال پیام
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
