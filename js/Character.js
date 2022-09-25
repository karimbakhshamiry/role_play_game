import { getDiceRollArray,  getDicePlaceholderHtml} from "/js/util.js";

function Character(data) {
    Object.assign(this, data)
    this.diceHtml = getDicePlaceholderHtml(this.diceCount)
    this.dead = false

    this.setDiceHtml = function () {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map(function (diceValue) {
            return `<div class="dice">${diceValue}</div>`;
        }).join('');
    };

    this.takeDamage = function(diceScoreArray){
        const totalDamage = diceScoreArray.reduce((sum, current) => {return sum + current})
        this.health -= totalDamage
        if (this.health <= 0) {
            this.health = 0
            this.dead = true
        }

    }

    this.getCharacterHtml = function () {
        const {name, img, health, diceHtml} = this
        const characterHtml = `
        <div class="character-card">
            <h4>${name}</h4>
            <div class="image-container">
                <img src="${img}" alt="wizard">
            </div>
            <p id="health">health: <b>${health}</b></p>
            <div class="dice-container">
                ${diceHtml}
            </div>
        </div>
        `;

        return characterHtml;
    };
}

export {Character}
