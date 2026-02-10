
const expenseForm = document.getElementById("expenseForm")
const expenseName = document.getElementById("expenseName")
const expenseDesc = document.getElementById("expenseDesc");
const expenseCategory = document.getElementById("expenseCategory");
const expenseAmount = document.getElementById("expenseAmount")
const expenseList = document.getElementById("expenseList")

expenseForm.addEventListener("submit", function(event){
    event.preventDefault();

    const name =expenseName.value.trim();
    const desc = expenseDesc.value.trim();
  const category = expenseCategory.value;
    const amount = expenseAmount.value.trim()

    if(!name  || !amount|| !desc || !category){
        return;
    }

    const li = document.createElement("li")

    li.className="list-group-item d-flex justify-content-between align-items-center"

    li.innerHTML =`
     <span>
      ${amount} - <strong>${category}</strong> - ${desc}
    </span>
    <div>
      <button class="btn btn-sm btn-warning me-2 edit-btn">Edit Expense</button>
      <button class="btn btn-sm btn-danger delete-btn">Delete</button>
    </div>
  `;

          li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
  });
         li.querySelector(".edit-btn").addEventListener("click", () => {
    expenseName.value = name;
    expenseDesc.value = desc;
    expenseCategory.value = category;
    expenseAmount.value = amount;
    li.remove();
  });
        expenseList.appendChild(li)
        expenseForm.reset();

      
})