<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      throughApp: false,
      inGame: false,
    }
  }
}
</script>


<style>
/* GLOBAL DISPLAY */
body {
    -webkit-overflow-scrolling: touch; /* enables “momentum” (smooth) scrolling */
    user-select: none; /* disabled ability to highlight text & iconography */
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin: 0px;
}
a {
  user-select: all;
}
button {
  margin: 2.5%;
  background-color: white;
  padding: 1%;
  font-weight: bold;
  border: 2px solid black;
  border-radius: 10px;
}
</style>
