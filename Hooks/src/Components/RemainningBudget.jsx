export function RemainningBudget({ remainBudget }) {
  //const remainBudget = totalExpense - setBudget;

  return (
    <>
      <div className="col-lg-2 remainingBudget text-center">
        remainingBudget
        <div
          className=" fs-4 fw-bold text-center"
          style={{ color: remainBudget < 0 ? "red" : "black" }}
        >
          {remainBudget}
        </div>
      </div>
    </>
  );
}
