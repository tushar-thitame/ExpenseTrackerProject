import { use, useState } from "react";

export function AddBudget(props) {
  const [amount, setAmount] = useState(0);
  const [validation, setValidation] = useState();
  const handleBudgetBtn = () => {
    if (!amount || Number(amount) <= 0) {
      setValidation(true);
      return;
    }
    setValidation(false);
    props.setBudget(Number(amount));
  };
  return (
    <>
      <div
        className="modal fade"
        id="AddBudgetModal"
        data-bs-backdrop="true"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="AddBudgetModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="AddBudgetModalLabel">
                ADD Budget
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
                  <label className="form-label">Amount</label>
                  <input
                    type="Number"
                    className={`form-control ${validation ? "is-invalid" : ""}`}
                    placeholder="Enter Amount"
                    min="1"
                    step="1"
                    required
                    onChange={(e) => {
                      setAmount(e.target.value);
                      validation(true);
                    }}
                  />
                  <div className="invalid-feedback">
                    Amount must be greater than 0.
                  </div>
                </div>

                <div className=" mt-2">
                  <button
                    type="submit"
                    className="col-lg-12 btn btn-primary"
                    data-bs-dismiss={!setValidation ? "modal" : ""}
                    onClick={handleBudgetBtn}
                  >
                    + Add Budget
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
