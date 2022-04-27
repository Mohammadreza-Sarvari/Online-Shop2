import React from 'react'
import AddProductForm from '../components/product/AddProductForm'

const AddProduct = () => {
  return (
    <>
      <div className="card bg-gradient-success text-white">
        <div className="card-header">افزودن محصول</div>
        <div className="card-body">
          <AddProductForm />
        </div>
      </div>
    </>
  )
}

export default AddProduct
