import { useParams } from "react-router-dom";
import AddProductForm from "../components/product/AddProductForm";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";

const EditProduct = () => {
  const [productEdit, setProductEdit] = useState({
    title: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/products/${id}`)
      .then((production) => {
        productEdit.title  = production.data.data.title;
        productEdit.price = production.data.data.price;
        productEdit.stock = production.data.data.stock;
        productEdit.category = production.data.data.category;
        productEdit.description = production.data.data.description;

        setProductEdit({...productEdit})
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="card">
      <div className="card-header">ویرایش محصول {id}</div>
      <div className="card-body">
        <AddProductForm mode="edit" id={id} productEdit={productEdit} />
      </div>
    </div>
  );
};

export default EditProduct;
