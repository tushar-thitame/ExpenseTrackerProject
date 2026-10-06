import { useEffect, useState } from "react";
export function AddExpense({ props }) {
  const [expenseName, setExpense] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [errors, setErrors] = useState({});

  const AddExpensebtn = () => {
    if (!Validation()) return;
    let expenseObj = {
      expenseName,
      date,
      category,
      expenseAmount,
    };
    props(expenseObj);
    //input reset
    setExpense("");
    setDate("");
    setCategory("");
    setExpenseAmount("");
    // close modal
    const modalElement = document.getElementById("staticBackdrop");
    const modal = window.bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  };
  useEffect(() => {
    const modal = document.getElementById("staticBackdrop");
    const resetForm = () => {
      setExpense("");
      setDate("");
      setCategory("");
      setExpenseAmount("");
    };
    modal.addEventListener("hidden.bs.modal", resetForm);
    return () => {
      modal.removeEventListener("hidden.bs.modal", resetForm);
    };
  }, []);
  // validation logic
  const Validation = () => {
    let err = {};
    if (!expenseName) err.expenseName = "Expense name is required";
    if (!date) err.date = "Date is required";
    if (!category) err.category = "Category is required";
    if (!expenseAmount || expenseAmount <= 0)
      err.expenseAmount = "Invalid amount";
    setErrors(err);
    return Object.keys(err).length === 0;
  };
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="true"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                ADD Expense
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
                    value={expenseName}
                    onChange={(e) => setExpense(e.target.value)}
                    className="form-control"
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
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control"
                    placeholder="Enter Date"
                  />
                  {errors.date && (
                    <h6 className="text-danger">{errors.date}</h6>
                  )}
                </div>
                <div className="col-lg-12">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    ;<option value="">Select Category</option>
                    <option value="Food Drink">Food Drink</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Travel">Travel</option>
                  </select>
                  {errors.category && (
                    <h6 className="text-danger">{errors.category}</h6>
                  )}
                </div>
                <div className="col-lg-12">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
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
                    onClick={AddExpensebtn}
                    className="col-lg-12 btn btn-primary"
                  >
                    + Add Expense
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
