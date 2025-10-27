const form = document.getElementById("my-form");
const expList = document.querySelector(".parent-list");
let editId = null;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let expense = event.target.expense.value;
  let description = event.target.description.value;
  let category = event.target.category.value;  

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];    

  
  if(editId !== null){
    for(let i = 0; i < expenses.length; i++){
      if(expenses[i].id === editId){
        expenses[i].expense = expense;
        expenses[i].description = description;
        expenses[i].category = category; 
      }
    }
    editId = null; 
  } else {
    const id = Date.now();
    const expObj = {expense, description, category, id}; 
    expenses.push(expObj); 
  }

  localStorage.setItem("expenses", JSON.stringify(expenses));    

  form.reset(); 

  let drawList = JSON.parse(localStorage.getItem("expenses")) || [];

  expList.innerHTML = "";
  for(let i = 0; i < drawList.length; i++){
    let item = drawList[i];
    const li = document.createElement("li");
    li.textContent = `${item.expense} - ${item.description} - ${item.category}`;
    li.className = "child-list";
    const edit = document.createElement("button");
    edit.textContent = "Edit";
    const del = document.createElement("button");
    del.textContent = "Delete";

    //delete event---->>>>
    del.addEventListener("click", function(){
        let oldlist = JSON.parse(localStorage.getItem("expenses")) || [];
        let newList = [];
        for(let i = 0; i < oldlist.length; i++){
            let toDelete = oldlist[i];
            if(toDelete.id === item.id){
                continue;
            }
            newList.push(toDelete); 
        }

        localStorage.setItem("expenses", JSON.stringify(newList));
        li.remove(); 
        expenses = newList; 
    })

    // edit event---->>>>
    edit.addEventListener("click", function(){
      form.expense.value = item.expense;
      form.description.value = item.description;
      form.category.value = item.category; 
      editId = item.id; 
    })



    li.appendChild(edit); 
    li.appendChild(del);
    expList.appendChild(li); 
  }






});