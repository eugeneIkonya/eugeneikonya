from flask import render_template, Blueprint, jsonify, request
from app.hundred_days.hangman_words import word_list
from app.hundred_days.hangman_art import stages,logo
import random

hundred_days = Blueprint('hundred_days',__name__)

@hundred_days.route('/100-days-week-one')
def week_one():
    return render_template('hundred_days/week1.html')

@hundred_days.route('/100-days-week-two')
def week_two():
    return render_template('hundred_days/week2.html')

@hundred_days.route('/load-hangman',methods=['GET'])
def load_hangman():
    chosen_word = random.choice(word_list)
    return jsonify({'logo':logo,'stages':stages,'chosen_word':chosen_word})


@hundred_days.route('/calculate-bill',methods=['POST'])
def calculate_bill():
    data = request.get_json()
    
    bill = data['bill']
    tip = data['tip']
    people = data['people']

    total =  round((bill * (100 + tip)/100)/people,2)

    return jsonify({
        'amount' : total
    })

@hundred_days.route('/rock-paper-scissors', methods=['POST'])
def rock_paper_scissors():
    data = request.get_json()

    selection = data['selection']
    options = ['rock', 'paper', 'scissors']

    computer = random.choice(options)

    if selection == 'rock':
        if computer == 'paper':
            text = "You Loose Computer chose Paper"
        elif computer == 'scissors':
            text = "You win! Rock Beats Scissors"
        else:
            text = "Draw computer chose rock"

    if selection == 'paper':
        if computer == 'scissors':
            text= "You Loose Computer chose Scissors"
        elif computer == 'rock':
            text= "You win! Paper beats Rock"
        else:
            text= "Draw computer chose Paper"

    if selection == 'scissors':
        if computer == 'paper':
            text="You Win Computer chose Paper"
        elif computer == 'rock':
            text="You Lose! Rock Beats Scissors"
        else:
            text="Draw computer chose Scissors"
    
    return jsonify({'text': text})

@hundred_days.route('/generate-password', methods =['POST'])
def generate_password():
    letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+']

    data = request.get_json()

    nr_letters = int(data['letters'])
    nr_numbers = int(data['numbers'])
    nr_symbols = int(data['symbols'])

    pass_letters = random.choices(letters, k=nr_letters)
    pass_symbols = random.choices(symbols, k=nr_symbols)
    pass_numbers = random.choices(numbers, k=nr_numbers)

    pass_list = pass_letters+pass_symbols+pass_numbers
    random.shuffle(pass_list)
    password = ''.join(pass_list)

    return jsonify({'password':password})

