const form = document.getElementById("my-form");
const expList = document.querySelector(".expense-list");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

if (expenses.length > 0) {
  expenses.forEach((exp) => {
    const li = document.createElement("li");
    li.textContent = `${exp.expense} - ${exp.description} - ${exp.category}`;
    li.dataset.id = exp.id;

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    const edit = document.createElement("button");
    edit.textContent = "Edit";
    li.appendChild(edit);
    li.appendChild(btn);

    btn.addEventListener("click", function () {
      li.remove();
      let oldexpenses = JSON.parse(localStorage.getItem("expenses")) || [];
      let newexpen = [];
      for (let i = 0; i < oldexpenses.length; i++) {
        let e = oldexpenses[i];
        if (e.id === exp.id) {
          continue;
        }

        newexpen.push(e);
      }

      localStorage.setItem("expenses", JSON.stringify(newexpen));
      expenses = newexpen;
    });

    edit.addEventListener("click", function () {
      form.expense.value = exp.expense;
      form.description.value = exp.description;
      form.category.value = exp.category;

      li.remove();

      let editexpenses = JSON.parse(localStorage.getItem("expenses")) || [];
      let newexpen1 = [];
      for (let i = 0; i < editexpenses.length; i++) {
        let e = editexpenses[i];
        if (e.id === exp.id) {
          continue;
        }

        newexpen1.push(e);
      }

      localStorage.setItem("expenses", JSON.stringify(newexpen1));
      expenses = newexpen1;
    });

    expList.appendChild(li);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let expense = event.target.expense.value;
  let description = event.target.description.value;
  let category = event.target.category.value;

  const id = generateId();
  const expObj = { expense, description, category };

  expenses.push(expObj);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  const li = document.createElement("li");
  li.textContent = `${expense} - ${description} - ${category}`;
  li.dataset.id = id;

  const btn = document.createElement("button");
  btn.textContent = "Delete";

  const edit = document.createElement("button");
  edit.textContent = "Edit";
  li.appendChild(edit);
  li.appendChild(btn);

  btn.addEventListener("click", function (e) {
    li.remove();
    let oldexpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let newexpen = [];

    for (let i = 0; i < oldexpenses.length; i++) {
      let e = oldexpenses[i];

      if (e.id === id) {
        continue;
      }

      newexpen.push(e);
    }

    localStorage.setItem("expenses", JSON.stringify(newexpen));
  });

  edit.addEventListener("click", function () {
    form.expense.value = expense;
    form.description.value = description;
    form.category.value = category;        

    li.remove();

    let editexpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let newexpen2 = [];
    for (let i = 0; i < editexpenses.length; i++) {
      let e = editexpenses[i];
      if (e.id === id) {
        continue;
      }

      newexpen2.push(e);
    }

    localStorage.setItem("expenses", JSON.stringify(newexpen2));
    expenses = newexpen2;
  });

  expList.appendChild(li);

  form.reset();
});
