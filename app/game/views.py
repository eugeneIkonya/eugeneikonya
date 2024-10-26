from flask import Blueprint, render_template, jsonify
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


@game.route('/rock-paper-scissors')
def rps():
    return render_template('/game/rps.html')

@game.route('/interactive-story')
def interactive_story():
    return render_template('/game/interactive_story.html')