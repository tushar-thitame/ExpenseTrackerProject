import { useState } from "react";
export function EditExpense({ editData, setEditData, updateExpense }) {
  const [errors, setErrors] = useState({});
  //Validation Expense Edit
  const validation = () => {
    let err = {};
    if (!editData.expenseName) err.expenseName = "Expense name is required";
    if (!editData.date) err.date = "Enter Expense Date are Required";
    if (!editData.category) err.category = "Category is required";
    if (!editData.expenseAmount || editData.expenseAmount <= 0)
      err.expenseAmount = "Invalid Amount";
    setErrors(err);
    return !Object.keys(err).length;
  };
  return (
    <>
      <div
        className="modal fade"
        id="EditExpenseModal"
        data-bs-backdrop="true"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="EditExpenseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditExpenseModalLabel">
                Edit Expense
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12">
                  <label className="form-label">Expense Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.expenseName || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, expenseName: e.target.value })
                    }
                    placeholder="Enter Expense name"
                  />
                  {errors.expenseName && (
                    <h6 className="text-danger">{errors.expenseName}</h6>
                  )}
                </div>
                <div className="col-lg-12">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    value={editData.date || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, date: e.target.value })
                    }
                    className="form-control"
                    placeholder="Enter Date"
                  />
                  {errors.date && (
                    <h6 className="text-danger">{errors.date}</h6>
                  )}
                </div>
                <div className="col-lg-12">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    value={editData.category || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, category: e.target.value })
                    }
                    className="form-control"
                    placeholder="Enter Category name"
                  />
                  {errors.category && (
                    <h6 className="text-danger">{errors.category}</h6>
                  )}
                </div>
                <div className="col-lg-12">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    value={editData.expenseAmount || ""}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        expenseAmount: e.target.value,
                      })
                    }
                    className="form-control"
                    placeholder="Enter Amount name"
                  />
                  {errors.expenseAmount && (
                    <h6 className="text-danger">{errors.expenseAmount}</h6>
                  )}
                </div>
                <div className=" mt-2">
                  <button
                    type="button"
                    className="col-lg-12 btn btn-primary"
                    //data-bs-dismiss="modal"
                    onClick={() => {
                      if (validation()) {
                        updateExpense();
                        const modalElement =
                          document.getElementById("EditExpenseModal");
                        const modalInstance =
                          window.bootstrap.Modal.getInstance(modalElement);
                        modalInstance.hide();
                      }
                    }}
                  >
                    + Edit Expense
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
