<template>

    <!-- Info Page -->
    <div>
      <Info />
    </div>
</template>

<script>
import Info from '../components/Info.vue'

export default {
  data: () => {
    return {

    }
  },
  components: {
    Info
  },
  mounted() {
    
  },
  created() {

  },
  destroyed() {

  },
  methods: {
   
  },
  watch: {
  }

}
</script>

<style scoped>
div.view-container {
  padding: 2.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
/* NAVIGATION DISPLAY */
.icon {
    height: 5vh;
    width: 5.3vh;
    margin-bottom: 0px;
}
.nav-container {
    height: 5vh;
    width: 5vh;
    margin-top: .5vh;
    margin-right: 5vw;
    margin-left: 5vw;
    margin-bottom: 0px;
}
.bottom-container {
    margin-top: .5vh;
    width: 90vw;
    justify-content: center;
    display: flex;
    background-color: white;
}
.bottom {
    height: 7.75vh;
    background-color: white;
    position: fixed;
    bottom: 0;
    min-width: 100vw;
    border-top: 1px black solid;
    display: flex;
    justify-content: center;
}
</style>
