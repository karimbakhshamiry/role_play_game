import { Character } from "/js/Character.js"
import { character } from "/js/data.js"

let monsterArray = ['orc', 'demon', 'goblin']
let isWaiting = false

function getNextMonster() {
    const newMonsterData = monsterArray.length > 0 ? monsterArray.shift() : {}
    return character[newMonsterData]
}

function endGame(){
    const endMessage = monster.health === 0 && wizard.health === 0 ? "No Victors - All Creatures are Dead"
    : wizard.health === 0 ? 'The Monsters are Victorious'
    : "The Wizard Wins"

    const endEmoji = wizard.health === 0 ? "☠️"
    : "🔮" 
    
    setTimeout(() => {
        document.body.innerHTML = `
        <div class="win-or-lose">
            <div class="container">
                <h1>Game Over</h1>
                <h4>${endEmoji}</h4>
                <h4>${endMessage}</h4>
            </div>
        </div>
        `
    }, 1000)

    console.log(wizard.health)
    console.log(monster.health)
    
}

function losingMark(elementId) {
    document.getElementById(elementId).children[0].style.background = '#d66336'
}

function attack(){
    if (!isWaiting) {
        // roll the dice
        wizard.setDiceHtml()
        monster.setDiceHtml()

        // attack and reduce live
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()

        if (wizard.dead & monster.dead) {
            // wizard and monster both lost simultaneously
            losingMark('hero')
            losingMark('monster')
            endGame()

        } else if (wizard.dead) {
            // wizard lost
            losingMark('hero')
            endGame()
        } else if(monster.dead){
            isWaiting = true
            // monster lost, and waiting for other monsters to appear
            losingMark('monster')

            // next monster appears if exists
            if (monsterArray.length > 0) {
                setTimeout(() => {
                    monster = new Character(getNextMonster())
                    render()  
                    
                    isWaiting = false
                }, 1000);

            } else {
                // the final monster lost
                losingMark('monster')
                endGame()
            }
        
        }
    }
}

document.getElementById('attack').addEventListener('click', attack)

function render(){
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

const wizard = new Character(character.hero)
let monster = new Character(getNextMonster())

render()