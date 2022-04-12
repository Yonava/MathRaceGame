export default function gameDataParser(gameData) {

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let readyPressed = 0;
  let timeTaken = 0;
  // easy, intermediate, hard
  let gameDifficulty = [0, 0, 0];
  let racesWon = 0;

  if (gameData.length === 0) return {
    correctAnswers,
    incorrectAnswers,
    readyPressed, 
    gameDifficulty,
    racesWon,
    timeTaken: 'N/A',
    racesCompleted: 0,
    accuracy: 'N/A'
  }

  for (let i = 0; i < gameData.length; i++) {

    correctAnswers += gameData[i].correctAnswers.length;
    incorrectAnswers += gameData[i].incorrectAnswers;
    for (let j = 0; j < gameData[i].correctAnswers.length; j++) {
      timeTaken += parseInt(gameData[i].correctAnswers[j]);
    }

    if (gameData[i].position == 1) racesWon++;
    if (gameData[i]?.readyPressed) readyPressed += gameData[i].readyPressed;

    switch (gameData[i].difficulty) {
      case 'Easy':
        gameDifficulty[0]++;
        break;
      case 'Intermediate':
        gameDifficulty[1]++;
        break;
      case 'Hard':
        gameDifficulty[2]++;
        break;
    }
  }

  console.log('racescompleted', gameData.length)

  return {
    correctAnswers,
    incorrectAnswers,
    readyPressed, 
    gameDifficulty,
    racesWon,
    timeTaken: `${((timeTaken / correctAnswers) / 1000).toFixed(2)} Seconds`,
    racesCompleted: gameData.length,
    accuracy: ((correctAnswers / (correctAnswers + incorrectAnswers)) * 100).toFixed(2)
  }
}