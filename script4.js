
  const MAX = 10;
  let randomNumber = rand();
  let numGuess = 0;
  let prevGuess = [];
  let gameOver = false;

  const guessField  = document.getElementById('guessField');
  const submitBtn   = document.getElementById('submitBtn');
  const remaining   = document.getElementById('remaining');
  const totalGuesses= document.getElementById('totalGuesses');
  const messageBox  = document.getElementById('messageBox');
  const guessPills  = document.getElementById('guessPills');
  const newGameBtn  = document.getElementById('newGameBtn');
  const attemptDots = document.getElementById('attemptDots');
  const gameWrap    = document.getElementById('gameWrap');

  function rand() { return Math.floor(Math.random() * 100) + 1; }

  // Build dots
  function buildDots() {
    attemptDots.innerHTML = '';
    for (let i = 0; i < MAX; i++) {
      const d = document.createElement('div');
      d.className = 'dot';
      d.id = `dot-${i}`;
      attemptDots.appendChild(d);
    }
  }
  buildDots();

  function setDot(index, type) {
    const d = document.getElementById(`dot-${index}`);
    if (d) { d.className = `dot ${type}`; }
  }

  submitBtn.addEventListener('click', handleSubmit);
  guessField.addEventListener('keydown', e => { if (e.key === 'Enter') handleSubmit(); });

  function handleSubmit() {
    if (gameOver) return;
    const guess = parseInt(guessField.value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setMessage('⚠️ Enter a valid number between 1 and 100.', 'info');
      guessField.focus();
      return;
    }
    processGuess(guess);
  }

  function processGuess(guess) {
    numGuess++;
    prevGuess.push(guess);
    guessField.value = '';

    totalGuesses.textContent = numGuess;
    remaining.textContent = Math.max(0, MAX - numGuess);

    // Mark dot
    const dotType = numGuess === MAX ? 'last' : 'used';
    setDot(numGuess - 1, dotType);

    // Pills
    updatePills();

    if (guess === randomNumber) {
      setMessage(`🎉 Correct! The number was <strong>${randomNumber}</strong>. You got it in ${numGuess} guess${numGuess>1?'es':''}!`, 'win');
      gameWrap.classList.add('win-flash');
      setTimeout(()=>gameWrap.classList.remove('win-flash'), 500);
      endGame();
    } else if (numGuess >= MAX) {
      setMessage(`😞 Game Over! The number was <strong>${randomNumber}</strong>.`, 'gameover');
      endGame();
    } else if (guess < randomNumber) {
      setMessage(`📈 Too low! Try a higher number.`, 'low');
    } else {
      setMessage(`📉 Too high! Try a lower number.`, 'high');
    }

    guessField.focus();
  }

  function updatePills() {
    guessPills.innerHTML = '';
    if (prevGuess.length === 0) {
      guessPills.innerHTML = '<span style="color:var(--muted);font-size:13px">None yet</span>';
      return;
    }
    prevGuess.forEach(n => {
      const pill = document.createElement('span');
      pill.className = 'pill';
      pill.textContent = n;
      guessPills.appendChild(pill);
    });
  }

  function setMessage(msg, type) {
    messageBox.innerHTML = msg;
    messageBox.className = `message-box ${type}`;
  }

  function endGame() {
    gameOver = true;
    guessField.disabled = true;
    submitBtn.disabled = true;
    newGameBtn.classList.add('visible');
  }

  newGameBtn.addEventListener('click', resetGame);

  function resetGame() {
    randomNumber = rand();
    numGuess = 0;
    prevGuess = [];
    gameOver = false;

    remaining.textContent = MAX;
    totalGuesses.textContent = 0;
    guessField.disabled = false;
    submitBtn.disabled = false;
    guessField.value = '';
    newGameBtn.classList.remove('visible');
    setMessage('Make your first guess above! 🎯', '');
    updatePills();
    buildDots();
    guessField.focus();
  }
