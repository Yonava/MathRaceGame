export default function gameDataParser(gameData) {

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let readyPressed = 0;
  let avgTimeTaken = [];
  // easy, intermediate, hard
  let gameDifficulty = [0, 0, 0];
  let racesWon = 0;

  for (let i = 0; i < gameData.length; i++) {

    correctAnswers += gameData[i].correctAnswers.length;
    incorrectAnswers += gameData[i].incorrectAnswers;
    avgTimeTaken.push(() => gameData[i].correctAnswers.reduce((a, b) => a + b / gameData.correctAnswers.length));

    if (gameData[i].position == 1) racesWon++;
    if (gameData[i]?.readyPressed) readyPressed += gameData[i].readyPressed;

    switch (gameData[i].gameDifficulty) {
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

  avgTimeTaken = () => avgTimeTaken.reduce((a, b) => a + b / avgTimeTaken.length);

  return {
    correctAnswers,
    incorrectAnswers,
    readyPressed,
    avgTimeTaken,
    gameDifficulty,
    racesWon,
    racesCompleted: gameData.length
  }
}