document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    
    let totalBalance = 0;

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const expenseName = document.getElementById('expense-name').value;
        const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
        const expenseType = document.getElementById('expense-type').value;
        const expenseDate = document.getElementById('expense-date').value;

        const amount = expenseType === 'deposit' ? expenseAmount : -expenseAmount;
        
        addTransaction(expenseName, amount, expenseType, expenseDate);
        updateTotal(amount);
        expenseForm.reset();
    });

    function addTransaction(name, amount, type, date) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', type === 'deposit' ? 'deposit-item' : 'expense-item');

        listItem.innerHTML = `
            ${name} - $${Math.abs(amount).toFixed(2)} <small class="text-muted">(${date})</small>
            <button class="btn btn-danger btn-sm delete-btn"><i class="fa-solid fa-trash"></i></button>
        `;

        expenseList.appendChild(listItem);

        // Add delete functionality
        listItem.querySelector('.delete-btn').addEventListener('click', function() {
            expenseList.removeChild(listItem);
            updateTotal(-amount);
        });

        // Add fade-in effect
        listItem.style.opacity = 0;
        setTimeout(() => listItem.style.opacity = 1, 0);
    }

    function updateTotal(amount) {
        totalBalance += amount;
        totalAmount.textContent = totalBalance.toFixed(2);

        // Add shake effect for total amount update
        totalAmount.parentElement.classList.add('shake');
        setTimeout(() => totalAmount.parentElement.classList.remove('shake'), 500);
    }
});
