// Generate a random choice for the computer
function getComputerChoice() {
	let computerChoice = Math.floor(Math.random() * 3);
	if (computerChoice === 0) {
		return 'rock';
	} else if (computerChoice === 1) {
		return 'paper';
	} else if (computerChoice === 2) {
		return 'scissors';
	}
}

let humanScore = 0;
let computerScore = 0;

// Get DOM elements
const roundResult = document.getElementById('roundResult');
const humanScoreDisplay = document.getElementById('humanScore');
const computerScoreDisplay = document.getElementById('computerScore');
const winnerDisplay = document.getElementById('winner');
const playAgainButton = document.getElementById('playAgain');
const computerChoiceDisplay = document.getElementById('computerChoiceDisplay');

// Defines the game logic
function playRound(humanChoice, computerChoice) {
	// Highlight choices
	document.querySelectorAll('.choice').forEach((button) => {
		button.classList.remove('selected');
	});
	document
		.querySelector(`.choice[data-choice="${humanChoice}"]`)
		.classList.add('selected');

	// Add thinking animation to computer's choice
	const computerChoices = ['rock', 'paper', 'scissors'];
	let thinkingAnimation;
	let i = 0;
	thinkingAnimation = setInterval(() => {
		computerChoiceDisplay.innerHTML = `<span class="emoji">${getEmoji(computerChoices[i % 3])}</span>`;
		i++;
	}, 100);

	setTimeout(() => {
		clearInterval(thinkingAnimation);
		computerChoiceDisplay.innerHTML = `<span class="emoji">${getEmoji(computerChoice)}</span>`;

		// Use a mapping object to determine the winner
		const outcomes = {
			rock: {
				rock: "It's a tie!",
				paper: 'You lose! Paper beats Rock',
				scissors: 'You win! Rock beats Scissors',
			},
			paper: {
				rock: 'You win! Paper beats Rock',
				paper: "It's a tie!",
				scissors: 'You lose! Scissors beats Paper',
			},
			scissors: {
				rock: 'You lose! Rock beats Scissors',
				paper: 'You win! Scissors beats Paper',
				scissors: "It's a tie!",
			},
		};

		const result = outcomes[humanChoice][computerChoice];
		if (result.includes('win')) humanScore++;
		if (result.includes('lose')) computerScore++;

		roundResult.textContent = result;
		updateScore();

		// Show computer's choice after animation
		document.querySelector('.computer-choice').classList.add('show');
	}, 500); // Adjust delay to match thinking animation
}

function updateScore() {
	humanScoreDisplay.textContent = humanScore;
	computerScoreDisplay.textContent = computerScore;

	if (humanScore === 5 || computerScore === 5) {
		const winner =
			humanScore === 5
				? 'You win the game!'
				: 'The Computer wins the game!';
		winnerDisplay.textContent = winner;
		// Disable buttons after game end
		document
			.querySelectorAll('.choice')
			.forEach((button) => (button.disabled = true));
		playAgainButton.style.display = 'block';
	}
}

function resetGame() {
	humanScore = 0;
	computerScore = 0;
	humanScoreDisplay.textContent = humanScore;
	computerScoreDisplay.textContent = computerScore;
	roundResult.textContent = '';
	winnerDisplay.textContent = '';
	document.querySelectorAll('.choice').forEach((button) => {
		button.disabled = false;
		button.classList.remove('selected');
	});
	playAgainButton.style.display = 'none';
	computerChoiceDisplay.innerHTML = '<span class="emoji">?</span>';

	// Hide computer's choice on reset
	document.querySelector('.computer-choice').classList.remove('show');
}

// Add click event listeners to buttons
document.querySelectorAll('.choice').forEach((button) => {
	button.addEventListener('click', () => {
		const humanChoice = button.dataset.choice;
		const computerChoice = getComputerChoice();
		playRound(humanChoice, computerChoice);
	});
});

playAgainButton.addEventListener('click', resetGame);

function getEmoji(choice) {
	switch (choice) {
		case 'rock':
			return '✊';
		case 'paper':
			return '✋';
		case 'scissors':
			return '✌️';
		default:
			return '?';
	}
}
