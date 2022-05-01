import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RemoveModal } from "../components/productlist/RemoveModal";

const data = [
  { name: "موبایل", category: "1" },
  { name: "کتاب", category: "2" },
  { name: "تیشرت", category: "3" },
];

const ProductsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [ProductID, setProductID] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            {products.length === 0 && (
              <p>
                محصولی موجود نمی‌باشد، برای افزودن محصول جدید روی "افزودن محصول"
                در منوی سمت راست کلیک نمایید!
              </p>
            )}
            {products.length > 0 && (
              <table className="table table-sm table-striped align-middle">
                <thead>
                  <tr>
                    <th scope="col">نام محصول</th>
                    <th scope="col">قیمت</th>
                    <th scope="col">دسته‌بندی</th>
                    <th scope="col">موجودی</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.data.title}>
                      <td>{product.data.title}</td>
                      <td>{product.data.price}</td>
                      <td>
                        {data.map((categoryes) => {
                          if (categoryes.category === product.data.category) {
                            return categoryes.name;
                          }
                        })}
                      </td>
                      <td>{product.data.stock}</td>
                      <td>
                        <div
                          className="btn-group btn-group-sm rounded"
                          role="group"
                        >
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              setIsOpen(true);
                              setProductID(product.id);
                            }}
                          >
                            حذف
                          </button>
                          <Link to={`/products/edit/${product.id}`}>
                          <button type="button" className="btn btn-info">
                            ویرایش
                          </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <RemoveModal
        setProducts={setProducts}
        propId={ProductID}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      />
    </>
  );
};

export default ProductsList;
