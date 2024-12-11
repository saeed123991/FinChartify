
# **FinChartify** 📊💰  
Effortlessly manage your personal expenses with **FinChartify**, your ultimate expense tracking and reporting tool! This lightweight and user-friendly application enables you to take control of your finances with ease, offering features like expense CRUD operations, visual bar charts, PDF export, and more!

---

## 🌟 **Features**
### **🚀 Core Functionalities**
- **Landing Page**:
  - A sleek introduction to FinChartify with login, signup, and an info modal.
- **User Management**:
  - **🔑 Login** and **📝 Register** seamlessly to access your personalized dashboard.
- **Expense Management**:
  - Add, edit, and delete expenses with a convenient modal interface.
  - Search expenses dynamically and sort them for better organization.
- **Data Visualization**:
  - Get insights with a **bar chart** representing your expenses.
- **Excel Export**:
  - Save a professional report of your expenses as an Excel File.
- **Session Management**:
  - **🔒 Logout** securely to protect your data.

---

## 💻 **Tech Stack**
- **Backend**: Flask (Python) 🐍
- **Frontend**: HTML5, CSS3, JavaScript 🎨
- **Database**: SQLite 🗄️
- **Chart Library**: [Chart.js](https://www.chartjs.org/) 📈

---

## 🛠️ **Setup Instructions**
### **1. Prerequisites**
- Python (3.8 or higher)
- pip (Python package manager)
- A modern web browser

### **2. Clone the Repository**
```bash
git clone https://github.com/yourusername/finchartify.git
cd finchartify
```

### **3. Create the Virtual Environment (Optional)**
```bash
python -m venv venv
```

### **4. Activate the Virtual Environment (Optional)**

  - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

### **5. Install Dependencies**
```bash
pip install -r requirements.txt
```

### **6. Run the Application**
```bash
python app.py
```
- The app will be accessible at `http://127.0.0.1:5000`.

---

## 🔎 **Usage Guide**
### **1. Register and Login**
- Navigate to the homepage.
- Click **Register** to create an account.
- Use your credentials to log in.

### **2. Add an Expense**
- Go to your dashboard and click **Add Expense**.
- Enter the name, description, amount, and select a valid date.
- Save the expense, which will be displayed in the table and updated in the chart.

### **3. Manage Expenses**
- **Search**: Use the search bar to filter expenses by name or description.
- **Edit**: Update any expense with the edit button.
- **Delete**: Remove an expense using the delete button.

### **4. Generate Reports**
- Click **Export Excel** to download a CSV file having details of your expenses.
- 
### **5. Bar Charts**
- Click **Show Chart** to display your expenses in charts having details of your expenses graphically.

### **6. Logout**
- Ensure your data's security by logging out after use.

---

## 📸 **Screenshots**
### Landing Page

![Landing Page](https://github.com/user-attachments/assets/03643885-5018-4a66-9eed-a950074eae52)

### Dashboard

![Dashboard](https://github.com/user-attachments/assets/8341e7b8-08c2-40f4-8215-3b26e43006c3)

### Bar Chart

![Chart Modal](https://github.com/user-attachments/assets/3422642f-e02b-483a-8c22-5859543ba74f)


---
## 🧩 **Folder Structure**
```
FinChartify/
│
├── instance/              # datebase folder
│   ├── expenses.db        # database file
├── assets/                # Static files
│   ├── styles.css         # Stylesheet
│   └── script.js          # JavaScript file
├── UI/                    # HTML files
│   ├── base.html          # Base template
│   ├── index.html         # Landing page
│   ├── login.html         # Login page
│   ├── register.html      # Registration page
│   ├── dashboard.html     # Dashboard for expense management
├── app.py                 # Main Flask application
├── config.py              # configrations file
├── models.py              # datebase models
├── requirements.txt       # Dependencies
└── README.md              # Project documentation
```

---

## 🚀 **Future Enhancements**
- **Recurring Expense Tracking**: Set up recurring expenses for better automation.
- **Category Management**: Categorize expenses for deeper insights.
- **Enhanced Reporting**: Include additional charts like pie charts or line graphs.
- **Mobile Responsiveness**: Optimize the UI for mobile devices.

---

## 🤝 **Contributing**
We welcome contributions to enhance **FinChartify**! Here’s how you can help:
1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request for review.

---

## 📄 **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 📬 **Contact**
Feel free to reach out for queries or suggestions:
- **Email**: saeedanwargee794@gmail.com
- **GitHub**: [Saeed](https://github.com/saeed123991/)

---

## 🎉 **Acknowledgments**
Special thanks to the amazing open-source libraries and tools:
- [Flask](https://flask.palletsprojects.com/)
- [SQLite](https://sqlite.org/)
- [Chart.js](https://www.chartjs.org/)

---

Let’s take control of your finances with **FinChartify**! 🌟
