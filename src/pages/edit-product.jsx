import { useParams } from "react-router-dom";
import AddProductForm from "../components/product/AddProductForm";

const product = {
  title: "",
  price: "",
  category: "",
  stock: "",
  description: "",
};

const EditProduct = () => {
  const { productId } = useParams();
  return (
    <div className="card">
      <div className="card-header">ویرایش محصول {productId}</div>
      <div className="card-body">
        <AddProductForm {...product} />
      </div>
    </div>
  );
};

export default EditProduct;
