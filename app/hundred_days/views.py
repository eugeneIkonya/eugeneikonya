from flask import render_template, Blueprint, jsonify, request

hundred_days = Blueprint('hundred_days',__name__)

@hundred_days.route('/100-days-of-code')
def week_one():
    return render_template('hundred_days/week1.html')


@hundred_days.route('/calculate-bill', methods=['POST'])
def calculate_bill():
    data = request.get_json()
    bill = data['bill']
    tip = data['tip']
    people = data['people']
    total_per_person = round((bill * (100 + tip) / 100) / people, 2)
    print(total_per_person)
    return jsonify({'total': total_per_person})