from flask import Blueprint, render_template, jsonify, request
import random
from app.game.hangman_files import word_list, logo, stages

game = Blueprint('game',__name__, url_prefix='/game')

@game.route('/hangman')
def hangman():
    return render_template('game/hangman.html')
@game.route('/load-hangman')
def load_hangman():
    chosen_word = random.choice(word_list)
    return jsonify({'logo': logo, 'stages': stages, 'chosen_word': chosen_word})


@game.route('/rock-paper-scissors-game')
def rps():
    return render_template('/game/rps.html')

@game.route('/rock-paper-scissors', methods = ['POST'])
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
            text = "You Loose Computer chose Scissors"
        elif computer == 'rock':
            text = "You win! Paper beats Rock"
        else:
            text = "Draw computer chose Paper"

    if selection == 'scissors':
        if computer == 'paper':
            text = "You Win Computer chose Paper"
        elif computer == 'rock':
            text = "You Lose! Rock Beats Scissors"
        else:
            text = "Draw computer chose Scissors"

    return jsonify({'text': text})

@game.route('/interactive-story')
def interactive_story():
    return render_template('/game/interactive_story.html')