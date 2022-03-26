<template>

    <!-- Join Room -->
    <div class="join-room-container">

      <b-button pill style="width: 35vw;" variant="outline-danger" v-on:click="$parent.switchView('', false)">
        <div>
          <span>Back</span>
          <b-icon-chevron-left style="position: absolute; right: 90%; margin-top: 0.5vh;"></b-icon-chevron-left>
        </div>
      </b-button>

      <div class="large-buffer"></div>

      <p style="font-size: 15pt; font-weight: bold;">Enter a 4 Digit Room ID</p>

      <b-input-group prepend="Room ID" class="mt-3">
        <b-form-input v-model="roomidInput" type="number"></b-form-input>
        <b-input-group-append>
          <b-button :variant="roomidInput.length === 4 ? 'success':'danger'"></b-button>
        </b-input-group-append>
      </b-input-group>

      <br>
        
      <b-button :disabled="!(roomidInput.length === 4)" v-on:click="$router.push(`/go/${roomidInput}`)" variant="success">Go!</b-button>
  
      <!-- Allows Transition To Render Properly -->
      <p style="opacity:0">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, iste, fugit tempora aliquam nisi inventore vero officia voluptate consequatur earum nesciunt rerum blanditiis perferendis molestiae, 
        reprehenderit fugiat delectus quod tempore soluta quo? Modi officiis architecto harum aut enim eaque doloremque ipsum tenetur quidem et corporis quos quas ex error dolor quisquam esse, officia maiores asperiores earum! Rem perferendis, 
        dolore iste qui architecto cum facilis tempora vitae minima, numquam quisquam ullam dignissimos mollitia a 
        culpa ipsum cupiditate maxime, unde quis reprehenderit molestias fugit ad magnam. Molestias quod accusantium consequuntur enim! Veritatis ducimus in vel cumque eligendi officiis aspernatur doloremque voluptatem molestias.
      </p>

    </div>

</template>

<script>

export default {
  data: () => {
    return {
      roomidInput: '',
    }
  }
}
</script>

<style scoped>
.join-room-container {
  background-color: rgb(255, 255, 255); 
  height: 100vh;
  width: 100vw;
  padding: 2.5%;
  display: flex;
  flex-direction: column;
}

/* gets rid of up and down arrows in input */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
