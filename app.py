from flask import Flask, render_template, request, redirect, url_for, session, jsonify, make_response
from datetime import datetime
from io import BytesIO
import pandas as pd
from models import db, User, Expense
from config import Config

app = Flask(__name__, template_folder='UI', static_folder='assets')
app.config.from_object(Config)
db.init_app(app)

# Route for Index
@app.route('/')
def index():
    return render_template('index.html')

# Login Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username, password=password).first()
        if user:
            session['user_id'] = user.id
            return redirect(url_for('dashboard'))
        return "Invalid Credentials", 401
    return render_template('login.html')

# Register Route
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if User.query.filter_by(username=username).first():
            return "Username already exists", 400
        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register.html')

# Dashboard Route
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('dashboard.html')

# Expenses Management Route
@app.route('/expenses', methods=['GET', 'POST'])
@app.route('/expenses/<int:id>', methods=['PUT', 'DELETE'])
def manage_expenses(id=None):
    if 'user_id' not in session:
        return redirect(url_for('login'))

    user_id = session['user_id']

    if request.method == 'POST':  # Add new expense
        data = request.json
        new_expense = Expense(
            user_id=user_id,
            name=data['name'],
            description=data['description'],
            amount=data['amount'],
            date=datetime.strptime(data['date'], '%Y-%m-%d')
        )
        db.session.add(new_expense)
        db.session.commit()
        return jsonify({'message': 'Expense added successfully'}), 201

    elif request.method == 'GET':  # Fetch all expenses for the logged-in user
        expenses = Expense.query.filter_by(user_id=user_id).all()
        return jsonify([{
            'id': exp.id,
            'name': exp.name,
            'description': exp.description,
            'amount': exp.amount,
            'date': exp.date.strftime('%Y-%m-%d')
        } for exp in expenses])

    elif request.method == 'PUT':  # Update an expense
        if id is not None:
            data = request.json
            expense = Expense.query.get(id)
            if expense and expense.user_id == user_id:
                expense.name = data['name']
                expense.description = data['description']
                expense.amount = data['amount']
                expense.date = datetime.strptime(data['date'], '%Y-%m-%d')
                db.session.commit()
                return jsonify({'message': 'Expense updated successfully'}), 200
            return jsonify({'message': 'Expense not found'}), 404

    elif request.method == 'DELETE':  # Delete an expense
        if id is not None:
            expense = Expense.query.get(id)
            if expense and expense.user_id == user_id:
                db.session.delete(expense)
                db.session.commit()
                return jsonify({'message': 'Expense deleted successfully'}), 200
            return jsonify({'message': 'Expense not found'}), 404

# Export Expenses to Excel Route
@app.route('/export', methods=['GET'])
def export_expenses():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    user_id = session['user_id']
    expenses = Expense.query.filter_by(user_id=user_id).all()

    df = pd.DataFrame([{
        'Name': exp.name,
        'Description': exp.description,
        'Amount €': exp.amount,
        'Date': exp.date.strftime('%Y-%m-%d')
    } for exp in expenses])

    output = BytesIO()
    with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
        df.to_excel(writer, index=False, sheet_name='Expenses')
        writer._save()

    output.seek(0)
    return make_response(
        output.read(),
        200,
        {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename=expenses.xlsx'
        }
    )

# Logout Route
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return render_template('index.html')

# Run the app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
