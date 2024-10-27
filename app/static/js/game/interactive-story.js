$(document).ready(() => {
    let story_left = $('#story-left')
    let story_right = $('#story-right')
    let story_text = $('#story-text')
    let story_step = 0
    let story_prev = ''

    let editStory = (left_button_text, right_button_text, story) => {
        story_left.text(left_button_text)
        story_right.text(right_button_text)
        story_text.text(story)
    }

    story_right.addClass('d-none')
    story_text.text('Welcome to the Mystical Island of Secrets!')
    story_left.text('Start')


    story_left.on('click', () => {
        if (story_step == 0) {
            story_step++
            story_right.removeClass('d-none')
            editStory(
                'left',
                'right',
                'After your shipwreck, you stand at a crossroads. Do you venture left into the eerie forest or head right towards the rocky cliffs? (left/right):'
            )
        }
        else if (story_step == 1) {
            editStory(
                'music',
                'moonlight',
                'You cautiously step into the dense forest, where the trees whisper ancient secrets. The air is thick with mystery, and shadows dance around you.Deeper into the forest, you encounter a fork in the path. Do you follow the haunting sound of distant music, or the faint glow of moonlight through the trees? (music/moonlight): '
            )
            story_step++
            story_prev = 'l'
        }
        else if (story_step == 2 & story_prev == 'l') {
            editStory(
                '',
                '',
                'You follow the enchanting melody, only to discover it\'s a trap! Sirens lure you into a pit of darkness. GAME OVER!'
            )
            story_left.addClass('d-none')
            story_right.addClass('d-none')
        }
        else if (story_step == 2 & story_prev == 'r') {
            editStory(
                '',
                '',
                'The bridge creaks and sways, but you make it across, only to be caught in a deadly storm. The winds tear you from the cliffside. GAME OVER!'
            )
            story_left.addClass('d-none')
            story_right.addClass('d-none')
        }
    })


    story_right.on('click', () => {
        if (story_step == 1) {
            editStory(
                'Bridge',
                'Cave',
                "You scramble over the jagged cliffs, the ocean crashing far below. The wind howls in your ears as the path becomes more treacherous. Ahead, you see a rickety bridge swaying over the abyss. Do you risk crossing it or take a detour through the caves below? (bridge/cave): "
            )
            story_prev = 'r'
            story_step++
        } else if (story_step == 2 & story_prev == 'r') {
            editStory(
                '',
                '',
                'You venture into the caves and discover hidden gems along the walls. Deep within, you find the legendary treasure! YOU WIN!'
            )
            story_left.addClass('d-none')
            story_right.addClass('d-none')
        }
        else if (story_step == 2 & story_prev == 'l') {
            editStory(
                '',
                '',
                'The moonlight guides you safely to a clearing, where a treasure chest gleams under the stars. You\'ve found the treasure! YOU WIN!'
            )
            story_left.addClass('d-none')
            story_right.addClass('d-none')
        }
    })
})