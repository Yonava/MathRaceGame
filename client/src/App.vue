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
      throughApp: false
    }
  }
}
</script>


<style>
/* GLOBAL DISPLAY */
body {
    -webkit-overflow-scrolling: touch; /* enables “momentum” (smooth) scrolling */
    user-select: none; /* disabled ability to highlight text & iconography */
    font-family: Arial, Helvetica, sans-serif;
    margin: 0px;
}
</style>
