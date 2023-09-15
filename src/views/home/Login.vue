<template>
  <div id="root">
    <div class="fixed-background"></div>
    <main>
      <div class="container">
        <b-row class="h-100">
          <b-colxx xxs="12" md="10" class="mx-auto my-auto">
            <b-card class="auth-card custom " no-body>
              <div
                class="position-relative image-side d-none d-lg-block d-md-block"
              ></div>
              <div class="form-side">
                <router-link tag="a" to="/">
                  <!--<span class="logo-single" />-->
                  <span
                    style="font-family: 'Nunito', sans-serif;
                    font-stretch: condensed;
                    font-weight: 800;
                    font-size: 19px;color:black;"
                    >Área privada</span
                  >
                </router-link>
                <notifications group="auth" classes="vue-notification error" />
                <b-form
                  @submit.prevent="formSubmit"
                  style="margin-top: 20px;"
                  class="av-tooltip tooltip-label-bottom"
                >
                  <b-form-group label="Email" class="has-float-label mb-4">
                    <b-form-input
                      type="text"
                      v-model="$v.form.email.$model"
                      :state="
                        $v.form.email.$dirty ? !$v.form.email.$error : null
                      "
                      @input="$v.form.email.$reset()"
                      @blur="$v.form.email.$touch()"
                      autocomplete="off"
                    />
                    <b-form-invalid-feedback v-if="!$v.form.email.required"
                      >Por favor, ingrese su correo</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback v-else-if="!$v.form.email.email"
                      >por favor, ingrese un correo
                      válido</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      v-else-if="!$v.form.email.minLength"
                      >Su correo debe tener más de 4
                      caracteres</b-form-invalid-feedback
                    >
                  </b-form-group>

                  <b-form-group label="Contraseña" class="has-float-label mb-2">
                    <b-form-input
                      type="password"
                      v-model="$v.form.password.$model"
                      :state="
                        $v.form.password.$dirty
                          ? !$v.form.password.$error
                          : null
                      "
                      @input="$v.form.password.$reset()"
                      @blur="$v.form.password.$touch()"
                      autocomplete="off"
                    />
                    <b-form-invalid-feedback v-if="!$v.form.password.required"
                      >Por favor, ingrese su contraseña</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      v-else-if="
                        !$v.form.password.minLength ||
                          !$v.form.password.maxLength
                      "
                      >Tu contraseña debe tener entre 4 y 16
                      caracteres</b-form-invalid-feedback
                    >
                  </b-form-group>
                  <router-link tag="a" :to="{ name: 'contraseña-olvidada' }">
                    <p class="small a">¿Ha olvidado su contraseña?</p>
                  </router-link>

                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <b-button
                      type="submit"
                      variant="primary"
                      size="lg"
                      :disabled="processing"
                      :class="{
                        'btn-multiple-state btn-shadow btn-block': true,
                        'show-spinner': processing,
                        'show-success': !processing && loginError === false,
                        'show-fail': !processing && loginError
                      }"
                    >
                      <span class="spinner d-inline-block">
                        <span class="bounce1"></span>
                        <span class="bounce2"></span>
                        <span class="bounce3"></span>
                      </span>
                      <span class="icon success">
                        <i class="simple-icon-check"></i>
                      </span>
                      <span class="icon fail">
                        <i class="simple-icon-exclamation"></i>
                      </span>
                      <span class="label" style="color: white;"
                        >Iniciar Sesión</span
                      >
                    </b-button>
                  </div>
                </b-form>
              </div>
            </b-card>
          </b-colxx>
        </b-row>
      </div>
    </main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const {
  required,
  maxLength,
  minLength,
  email
} = require("vuelidate/lib/validators");

export default {
  mounted() {
    if (this.$route.query._e == "unauthorized") {
      this.$notify({
        group: "auth",
        title: "Error de autentificación",
        text:
          "EL enlace utilizado se ha vencido, por favor inicia sesión con tus datos correspondientes.",
        duration: -1
      });
    } else if (this.$route.query._e == "error") {
      this.$notify({
        group: "auth",
        title: "Ha ocurrido un error",
        text: "Ingresa con tu correo y contraseña.",
        duration: -1
      });
    }

    document.body.classList.add("background");
  },
  beforeDestroy() {
    document.body.classList.remove("background");
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: false,
      showError: false
    };
  },
  validations: {
    form: {
      password: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
      },
      email: {
        required,
        email,
        minLength: minLength(4)
      }
    }
  },
  computed: {
    ...mapGetters(["processing", "loginError"])
  },
  methods: {
    ...mapActions(["login"]),
    formSubmit() {
 

      this.$v.form.$touch();
 
      if (this.$v.$invalid) {
        var error = {
          ok: false,
          e: "Por favor, verifica la información ingresada"
        };
        this.$store.commit("setError", error);

        return;
      } else {
      
        this.login({
          email: this.form.email,
          password: this.form.password
        });


      }
    }
  },
  watch: {
    loginError(val) {
  console.log(val)
      if (val != null) {
        
        if (val.data[0].messages[0].id == "Auth.form.error.invalid") {
          this.$notify({
            group: "auth",
            title: "Error de autentificación",
            text: "Correo o contraseña inválida",
            duration: 5000
          });
        } else {
          this.error = val.data[0].messages[0];
          this.$notify({
            group: "auth",
            title: this.error.id,
            text: this.error.message
          });
          
        }

        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 5000);
      }
    }
  }
};
</script>
<style scoped>
.auth-card.custom .image-side {
  width: 55%;
}
.auth-card.custom .form-side {
  width: 45%;
}
.logo-single {
  background: url(/assets/img/TuMenu/Logo-small.png) no-repeat;
}
.has-float-label legend {
  color: #a10c5e;
}

@media all and (max-width: 768px) {
  .auth-card.custom .image-side {
    width: 100%;
  }
  .auth-card.custom .form-side {
    width: 100%;
  }

  .hero-1,
  .hero-2,
  .hero-3 {
    padding: 8px;
    padding-bottom: 0;
    font-size: 85%;
    text-align: center;
  }
}
</style>
