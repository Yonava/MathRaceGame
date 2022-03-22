<template>

    <!-- Join Room -->
    <div>

      <b-button variant="outline-danger" v-on:click="$parent.switchView('', false)">Back</b-button>

      <h3>Enter a 4 Digit Room ID</h3>

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
