export default class GameDataTracker {

  static readyPressed(gameDataObj) {

    if (gameDataObj?.readyPressed) {
      gameDataObj.readyPressed++;
    } else {
      gameDataObj.readyPressed = 1;
    }

    return gameDataObj;
  }

  static questionAnsweredCorrectly(gameDataObj, timeTaken) {

    if (gameDataObj?.correctAnswers) {
      gameDataObj.correctAnswers.push(timeTaken);
    } else {
      gameDataObj.correctAnswers = [timeTaken];
    }

    return gameDataObj;
  }

  static questionAnsweredIncorrectly(gameDataObj) {

    if (gameDataObj?.incorrectAnswers) {
      gameDataObj.incorrectAnswers++;
    } else {
      gameDataObj.incorrectAnswers = 1;
    }

    return gameDataObj;
  }

  static trashTalked(gameDataObj) {

    if (gameDataObj?.trashTalked) {
      gameDataObj.trashTalked++;
    } else {
      gameDataObj.trashTalked = 1;
    }

    return gameDataObj;
  }

  static encouragements(gameDataObj) {

    if (gameDataObj?.encouragements) {
      gameDataObj.encouragements++;
    } else {
      gameDataObj.encouragements = 1;
    }

    return gameDataObj;
  }
}

/* 

gamedataobj template

{
  correctAnswers: [Array of Time Taken],
  incorrectAnswers: Number,
  readyPressed: Number,
  trashTalked: Number,
  encouragements: Number
}

*/