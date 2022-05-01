import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const AddProductForm = ({ id, mode, productEdit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (mode === "edit") {
      axios
        .put(`http://localhost:4000/products/${id}`, { data })
        .then((response) => response)
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:4000/products", { data })
        .then((response) => response)
        .catch((err) => console.log(err));
    }
  };

  if (mode === "edit") {
    setValue("title", productEdit.title);
    setValue("price", productEdit.price);
    setValue("stock", productEdit.stock);
    setValue("category", productEdit.category);
    setValue("description", productEdit.description);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="titleInput" className="form-label">
            عنوان
          </label>
          <input
            type="text"
            className={`form-control${errors.title ? " is-invalid" : ""}`}
            id="titleInput"
            placeholder="گوشی‌ موبایل"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <div className="invalid-feedback">وارد کردن عنوان اجباری است.</div>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="priceInput" className="form-label">
            قیمت
          </label>
          <input
            type="number"
            className={`form-control${errors.price ? " is-invalid" : ""}`}
            id="priceInput"
            placeholder="1000"
            {...register("price", {
              required: "وارد کردن قیمت الزامی است",
              min: { value: 1000, message: "حداقل قیمت باید ۱۰۰۰ باشد" },
            })}
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price.message}</div>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <label htmlFor="stockInput" className="form-label">
            موجودی
          </label>
          <input
            type="number"
            className={`form-control${errors.stock ? " is-invalid" : ""}`}
            id="stockInput"
            placeholder="1"
            {...register("stock", {
              required: "وارد کردن موجودی اجباری است",
              min: { value: 1, message: "تعداد موجودی باید حداقل ۱ باشد" },
            })}
          />
          {errors.stock && (
            <div className="invalid-feedback">{errors.stock.message}</div>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="categorySelect" className="form-label">
            دسته‌بندی
          </label>
          <select
            className="form-select"
            id="categorySelect"
            {...register("category", { required: true })}
          >
            <option disabled="disabled">...</option>
            <option value="1">موبایل</option>
            <option value="2">کفش</option>
            <option value="3">تیشرت</option>
          </select>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <label htmlFor="descriptionTextarea" className="form-label">
            توضیحات
          </label>
          <textarea
            className={`form-control${errors.description ? " is-invalid" : ""}`}
            id="descriptionTextarea"
            rows="3"
            {...register("description")}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-4 float-start">
        افزودن محصول
      </button>
    </form>
  );
};

export default AddProductForm;
