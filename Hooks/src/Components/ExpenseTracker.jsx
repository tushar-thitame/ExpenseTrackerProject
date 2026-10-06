import { useEffect, useState } from "react";
import "./ExpenseTracker.css";
import { AddExpense } from "./AddExpense";
import { AddBudget } from "./AddBudget";
import { EditExpense } from "./EditExpense";
import Swal from "sweetalert2";
import { PieArcLabel } from "./PieChart";
import { BarChart } from "./PieChart";
import { TotalExpense } from "./TotalExpense";
import { RemainningBudget } from "./RemainningBudget";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
export function ExpenseTracker() {
  const [addBudget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  // fetch expenses from backend
  const fetchExpenses = () => {
    axios
      .get("/api/expenses")
      .then((res) => setExpenses(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  const props = (expense) => {
    axios
      .post("/api/add-expense", {
        expenseName: expense.expenseName,
        expenseAmount: expense.expenseAmount,
        category: expense.category,
        date: expense.date,
      })
      .then(() => fetchExpenses())
      .catch((err) => console.log(err));
  };
  //edit expense
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const updateExpense = () => {
    const updateExpenses = [...expenses];
    updateExpenses[editIndex] = editData;
    setExpenses(updateExpenses);
  };

  // delete record
  const deleteExpenses = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this expense?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/delete-expense/${id}`).then(() => fetchExpenses());
      }
    });
  };
  //remainBudget
  const totalExpense = expenses.reduce((sum, exp) => {
    return sum + (Number(exp.expenseAmount) || 0);
  }, 0);

  const remainBudget = (Number(addBudget) || 0) - totalExpense;
  console.log(remainBudget, typeof remainBudget);
  //search filter
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Expense");
  const filterExpense = expenses.filter((exp) => {
    const matchSearch = exp.expenseName
      ?.toLowerCase()
      .includes(search.toLowerCase());
    // category filter
    const matchCategory =
      filterCategory === "All Expense" || exp.category === filterCategory;

    return matchSearch && matchCategory;
  });

  return (
    <>
      <AddExpense props={props} />
      <AddBudget setBudget={setBudget} />
      <EditExpense
        editData={editData}
        setEditData={setEditData}
        updateExpense={updateExpense}
      />
      <h3>Hello , Tushar Thitame</h3>
      <div className="container">
        <div className="row row-class">
          <div className="col-lg-2 mb-2 totalBudget text-center">
            total Budget
            <div className=" fs-4 fw-bold text-center">{addBudget}</div>
          </div>
          {/* <div className="col-lg-2 totalExpense text-center">
            totalExpense
            <div className=" fs-4 fw-bold text-center">{totalExpense}</div>
          </div> */}
          <TotalExpense expenses={expenses}></TotalExpense>
          {/* <div className="col-lg-2 remainingBudget text-center">
            remainingBudget
            <div className=" fs-4 fw-bold text-center">{remainBudget}</div>
          </div> */}
          <RemainningBudget remainBudget={remainBudget} />
        </div>
        <div className="row mt-2">
          <div className="col-lg-12">
            <div className="btn-align d-flex flex-column flex-md-row flex-wrap gap-4 align-items-md-center">
              <input
                type="text"
                placeholder="Search"
                className="search-input w-auto"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className={`px-2 py-2 rounded-pill ${filterCategory === "All Expense" ? "activeBtn" : " "}`}
                onClick={() => setFilterCategory("All Expense")}
              >
                <i className="fa-solid fa-list me-2"></i>
                All Expense
              </button>

              <button
                className={`px-2 py-2 rounded-pill Search ${filterCategory === "Food Drink" ? "activeBtn" : ""}`}
                onClick={() => setFilterCategory("Food Drink")}
              >
                <i className="fa-solid fa-utensils me-2"></i>
                Food Drink
              </button>

              <button
                className={`px-2 py-2 rounded-pill Search ${filterCategory === "Groceries" ? "activeBtn" : ""}`}
                onClick={() => setFilterCategory("Groceries")}
              >
                <i className="fa-solid fa-cart-shopping me-2"></i>
                Groceries
              </button>

              <button
                className={`px-2 py-2 rounded-pill Search ${filterCategory === "Travel" ? "activeBtn" : ""}`}
                onClick={() => setFilterCategory("Travel")}
              >
                <i className="fa-solid fa-plane me-2"></i>
                Travel
              </button>

              <button
                className={`px-2 py-2 rounded-pill Search ${filterCategory === "Health" ? "activeBtn" : ""}`}
                onClick={() => setFilterCategory("Health")}
              >
                <i className="fa-solid fa-heart-pulse me-2"></i>
                Health
              </button>
              <button
                type="button"
                className=" rounded-3 Addbudget  btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#AddBudgetModal"
              >
                + Addbudget
              </button>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                className="rounded-3 Expense btn btn-primary"
              >
                + Add Expense
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6 fw-bold mt-3 mb-2 text-center">
            Expense Chart
            <PieArcLabel expenses={expenses} />
          </div>
          <div className="col-12 col-lg-6 fw-bold mt-3 text-center">
            Expense Tracker
            <BarChart expenses={expenses} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="table-responsive-md">
              <div className="rounded-3  border">
                <table className="table table-bordered table-sm text-center fs-9">
                  <thead>
                    <tr>
                      <th>Sr.</th>
                      <th>Expense</th>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {expenses.map((exp, index) => ( */}
                    {/* after filter added */}
                    {filterExpense.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No Data Found
                        </td>
                      </tr>
                    ) : (
                      filterExpense.map((exp, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{exp.expenseName}</td>
                          <td>{exp.date}</td>
                          <td>{exp.category}</td>
                          <td>{exp.expenseAmount}</td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#EditExpenseModal"
                              onClick={() => {
                                setEditIndex(index);
                                setEditData(exp);
                              }}
                            >
                              Edit
                            </button>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => deleteExpenses(exp.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
