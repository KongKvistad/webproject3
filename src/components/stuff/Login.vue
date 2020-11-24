<template>
  <div id="login">
    
    <section>
    
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">

        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome back</h1>
          <div>
            <label for="email1">Email</label><br>
            <input autofocus v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
          </div><br>
          <div>
            <label for="password1">Password</label><br>
            <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
          </div><br>

          <div class="extras">
            <button @click="login()" class="button">Log In</button>
          </div>
          
          <button @click="toggleForm()">Create account</button>
        </form>

        <form v-else @submit.prevent>
          <h1>Register</h1>
          <div>
            <label for="name">Full name</label><br>
            <input v-model.trim="signupForm.name" type="text" placeholder="John Johnsen" id="name" />
          </div><br>
          <div>
            <label for="email2">Email</label><br>
            <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />
          </div><br>
          <div>
            <label for="password2">Password</label><br>
            <input v-model.trim="signupForm.password" type="password" placeholder="Minimum 6 characters" id="password2" />
          </div><br>
          <div>
            <label for="repeatpass">Repeat password</label><br>
            <input v-model.trim="signupForm.repeatpass" type="password" placeholder="Repeat password" id="repeatpass" />
          </div><br>
          <button @click="toggleForm()">Back</button>
          <div class="extras">
            <button @click="signup()" class="button">Sign Up</button>
          </div>
        </form>

      </div>
    </section>
  </div>
</template>

<script>


export default {
  components: {
    
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        email: '',
        password: '',
        repeatpass: ''
      },
      showLoginForm: true,
      
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    
    login() {
       
        // dispatch only accepts two arguments: form of dispatch and payload
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password,
        cameFrom: this.$route.query.cameFrom,
      })
   
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        repeatpass: this.signupForm.repeatpass
      })
    }
  },
  mounted: function(){
      console.log(this.$route)
  }
}
</script>

<style scoped>

  input{
        width: 100%;
        height: 20px;
        padding: 20px;
        border: none;
        background-color: rgb(240, 240, 240);
        color: black;
    }

  button {
    background-color:rgb(78, 106, 133);
    color: white;
    padding: 10px;
    border-radius: .25rem;
  }
  h1 {
    margin: 10px 0 20px 0;
    font-family: "Open sans", sans-serif;
    font-weight: bold;
    color: #333333;
  }
  .extras {
    float: right;
  }
    #login {
    max-width: 100%;
    height: 100vh;
    background-attachment: fixed;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80");
  }
  section {
    width: 30%;
    float: right;
    padding: 20px;
    height: 100vh;
    background: rgb(255, 255, 255);
  }
</style>