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

    const updateChart = (expenses) => {
        const labels = expenses.map(e => e.name);
        const data = expenses.map(e => e.amount);
        if (chartInstance) {
            chartInstance.destroy();
        }
        chartInstance = new Chart(expenseChart, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Expenses',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                },
            },
        });
    };

    chartBtn.onclick = async () => {
        const expenses = await fetchExpenses();
        updateChart(expenses);
        chartModal.style.display = 'block';
    };

    chartCloseBtn.onclick = () => {
        chartModal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === chartModal) {
            chartModal.style.display = 'none';
        }
        if (event.target === addExpenseModal) {
            addExpenseModal.style.display = 'none';
        }
    };

    expenseTable.addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const expenseId = e.target.dataset.id;
            const expenses = await fetchExpenses();
            const expense = expenses.find(exp => exp.id == expenseId);
            if (expense) {
                editingExpenseId = expenseId;
                expenseName.value = expense.name;
                expenseDescription.value = expense.description;
                expenseAmount.value = expense.amount;
                expenseDate.value = expense.date;
                modalTitle.innerText = "Update Expense";
                submitBtn.innerText = "Update Expense";
                addExpenseModal.style.display = 'block';
            }
        }

        if (e.target.classList.contains('delete-btn')) {
            const expenseId = e.target.dataset.id;
            const isConfirmed = confirm("Are you sure you want to delete this expense?");
            if (isConfirmed) {
                const response = await fetch(`/expenses/${expenseId}`, { method: 'DELETE' });
                if (response.ok) {
                    const updatedExpenses = await fetchExpenses();
                    renderExpenses(updatedExpenses);
                    updateChart(updatedExpenses);
                }
            }
        }
    });

    document.querySelector('#logout-btn').onclick = (event) => {
        event.preventDefault();
        const logoutUrl = event.target.getAttribute('data-logout-url');
        const isConfirmed = confirm("Are you sure you want to log out?");
        if (isConfirmed) {
            window.location.href = logoutUrl;
        }
    };

    (async () => {

        const expenses = await fetchExpenses();
        renderExpenses(expenses);
        updateChart(expenses);
       
    })();

});
