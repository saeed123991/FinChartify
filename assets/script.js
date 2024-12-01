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


    (async () => {

       // async data
       
    })();

});
