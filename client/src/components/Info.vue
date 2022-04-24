<template>
  <div>
    <header class="info-title">
      <p style="margin-top: 3vh;">About Math Race</p>
    </header>

    <div style="width: 100vw; height: 8vh"></div>

    <p class="info-txt">
      Math Race is designed to be a mobile first 
      puzzle game experience on the web. 
      The core of the game is simple, players that 
      participate in a race go head 
      to head at attempting to solve increasingly difficult 
      math equations. Problems 
      range from 1st grade difficulty, and cap out at the 
      single-variable calculus level. 
      Each race is unique, as an algorithm 
      procedurally generates never seen before 
      questions for each round.
    </p>

    <footer>
      <p style="font-weight: bold">We Are Open Source, Check Us Out!</p>
      <b-button variant="dark" style="width: 70vw;" href="https://github.com/Yonava/MathRaceGame" target="_blank">
        <span style="margin-right: 3%;">Math Race on GitHub</span>
        <b-icon-github></b-icon-github>
      </b-button>
      
      <div class="x-large-buffer"></div>

      <p style="font-weight: bold; font-size: 14pt;">Created and Developed By:</p>
      <p>Joshua Burdick / Joshua-Burdick</p>
      <p>Yona Voss-Andreae / Yonava</p>

      <div class="large-buffer"></div>
      
      <p style="font-weight: bold; font-size: 14pt;">Special Thanks To:</p>
      <p>Jack Canducci / Raidienaty</p>
      <p>Thomas Eykamp / teykamp</p>
    </footer>
  </div>
</template>

<script>

export default {

}
</script>


<style scoped>

footer {
  margin: 5vh 0vh 5vh 0vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.info-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 22pt;
  border-bottom: 2px solid black;
  box-shadow: 0% 8px 4% black;
  position: fixed; 
  background-color: rgb(225, 225, 225); 
  width: 100vw; 
  height: 8vh;
}

p.info-txt {
  font-size: 14pt;
  margin: 2%;
}

</style>