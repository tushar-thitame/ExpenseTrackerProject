import { useState } from "react";

export function TotalExpense({ expenses }) {
  const totalExpense = expenses.reduce((sum, exp) => {
    return sum + Number(exp.expenseAmount);
  }, 0);
  
  return (
    <>
      <div className="col-lg-2 mb-2 totalExpense text-center">
        totalExpense
        <div className=" fs-4 fw-bold text-center">{totalExpense}</div>
      </div>
    </>
  );
}
