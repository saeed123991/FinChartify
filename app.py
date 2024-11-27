from flask import Flask, render_template, request, redirect, url_for, session
from models import db, User, Expense
from config import Config


app = Flask(__name__, template_folder='UI', static_folder='assets')
app.config.from_object(Config)
db.init_app(app)

# this is the default route or landing page of finChartify
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

# from here my app finChartify will start
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
