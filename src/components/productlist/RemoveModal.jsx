import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

const RemoveModal = ({ isOpen, onClose, onConfirm, propId, setProducts }) => {
  const modalObjectRef = useRef();
  const modalRef = useRef();

  const handleConfirm = (event) => {
    onConfirm?.(event);
    axios
      .delete(`http://localhost:4000/products/${propId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:4000/products")
      .then((result) => setProducts(result.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    modalObjectRef.current = new Modal(modalRef.current, {});

    onClose && modalRef.current.addEventListener("hidden.bs.modal", onClose);
  },[]);

  useEffect(() => {
    const modal = modalObjectRef.current;

    if (isOpen) {
      modal.show();
    } else {
      modal.hide();
    }
  }, [isOpen]);
  return (
    <form onSubmit={handleConfirm}>
    <div className="modal" tabIndex="-1" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">حذف کردن محصول</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>آیا از انجام این عمل مطمئن هستید!؟</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              بیخیال
            </button>
            <button
              type="submit"
              className="btn btn-danger"
            >
              تایید
            </button>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
};

RemoveModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
};

export { RemoveModal };
