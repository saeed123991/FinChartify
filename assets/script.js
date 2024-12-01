document.addEventListener('DOMContentLoaded', () => {
 
    const addExpenseModal = document.getElementById('expense-modal');
    const expenseForm = document.getElementById('expense-form');
    const expenseDate = document.getElementById('expense-date');
    const expenseName = document.getElementById('expense-name');
    const expenseDescription = document.getElementById('expense-description');
    const expenseAmount = document.getElementById('expense-amount');
    const modalTitle = document.getElementById('modal-title');
    const submitBtn = document.getElementById('submit-btn');
    const closeBtn = document.querySelector('.close-btn');
    const chartBtn = document.createElement('button');
    const exportExcelBtn = document.querySelector('.export-logout .btn');
    const expenseTable = document.getElementById('expense-table').getElementsByTagName('tbody')[0];
    const searchInput = document.getElementById('search-input');
    const chartModal = document.getElementById('chart-modal');
    const chartCloseBtn = chartModal.querySelector('.chart-close-btn');
    const expenseChart = document.getElementById('expense-chart').getContext('2d');
    let chartInstance;
    let editingExpenseId = null;

    chartBtn.textContent = "Show Chart";
    chartBtn.className = "btn";
    chartBtn.style.display = 'none';
    searchInput.parentElement.appendChild(chartBtn);

    const fetchExpenses = async () => {
        const response = await fetch('/expenses', { method: 'GET' });
        const expenses = await response.json();
        return expenses;
    };
    const renderExpenses = (expenses) => {
        expenseTable.innerHTML = '';
        expenses.forEach(expense => {
            const row = expenseTable.insertRow();
            row.innerHTML = `
                <td>${expense.id}</td>
                <td>${expense.name}</td>
                <td>${expense.description}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="btn edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="btnDanger delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;
        });
        if (expenses.length > 0) {
            chartBtn.style.display = 'inline-block';
            exportExcelBtn.style.display = 'inline-block';
        } else {
            chartBtn.style.display = 'none';
            exportExcelBtn.style.display = 'none';
        }
    };


    (async () => {

       // async data
       
    })();

});
