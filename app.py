from flask import Flask, render_template
from models import db, User, Expense
from config import Config


app = Flask(__name__, template_folder='UI', static_folder='assets')
app.config.from_object(Config)
db.init_app(app)

# this is the default route or landing page of finChartify
@app.route('/')
def index():
    return render_template('index.html')

# from here my app finChartify will start
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
