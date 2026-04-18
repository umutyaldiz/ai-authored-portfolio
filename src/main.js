// Game logic for the Dev Skill Simulator
const skills = ['javascript', 'react'];
let gameState = JSON.parse(localStorage.getItem('dev-sim-state')) || {
    javascript: { level: 1, xp: 0 },
    react: { level: 1, xp: 0 }
};

function updateUI() {
    skills.forEach(skill => {
        const row = document.querySelector(`.skill-row[data-skill="${skill}"]`);
        if (!row) return;
        row.querySelector('.level').textContent = gameState[skill].level;
        row.querySelector('.progress-bar').style.width = gameState[skill].xp + '%';
    });
}

document.querySelectorAll('.upgrade-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const skill = btn.closest('.skill-row').dataset.skill;
        gameState[skill].xp += 10;
        if (gameState[skill].xp >= 100) {
            gameState[skill].xp = 0;
            gameState[skill].level++;
            btn.closest('.skill-row').classList.add('level-up-anim');
            setTimeout(() => btn.closest('.skill-row').classList.remove('level-up-anim'), 500);
        }
        localStorage.setItem('dev-sim-state', JSON.stringify(gameState));
        updateUI();
    });
});

const resetBtn = document.getElementById('reset-game');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        gameState = { 
            javascript: { level: 1, xp: 0 }, 
            react: { level: 1, xp: 0 } 
        };
        localStorage.setItem('dev-sim-state', JSON.stringify(gameState));
        updateUI();
    });
}

updateUI();