<template>
  <div id="root">
    <div class="fixed-background"></div>
    <main>
      <div class="container">
        <b-row class="h-100">
          <b-colxx xxs="12" md="10" class=" my-auto">
            <b-card class="auth-card  custom" no-body>
              <div class="position-relative image-side"></div>
              <div class="form-side">
                <notifications group="error" classes="vue-notification error" />
                <notifications group="auth" classes="vue-notification succes" />
                <router-link tag="a" to="/">
                  <span
                    class="mb-4"
                    style="font-family: Nunito, sans-serif; font-stretch: condensed; font-weight: 800; font-size: 19px; color: black;"
                    >Área privada</span
                  >
                </router-link>
                <h6 class="mb-4 small">
                  Por favor, ingresa tu email para poder restablecer tu contraseña.
                </h6>
                <b-form
                  @submit.prevent="formSubmit"
                  class="av-tooltip tooltip-label-bottom"
                >
                  <b-form-group label="Email" class="has-float-label mb-4">
                    <b-form-input
                      type="text"
                      v-model="$v.form.email.$model"

                   :state="
                        $v.form.email.$dirty
                          ? !$v.form.email.$error
                          : null
                      "
                      @input="$v.form.email.$reset()"
                      @blur="$v.form.email.$touch()"
                    />
                    <b-form-invalid-feedback v-if="!$v.form.email.required"
                      >Por favor, ingrese un email válido.</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback v-else-if="!$v.form.email.email"
                      >Por favor, ingrese un email válido.</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      v-else-if="!$v.form.email.minLength"
                      >Ingrese un email con más de 4 caracteres.</b-form-invalid-feedback
                    >
                  </b-form-group>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <b-button
                      type="submit"
                      variant="primary"
                      size="lg"
                      :disabled="processing"
                      :class="{
                        'btn-multiple-state btn-shadow': true,
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
                      <span class="label text-white">Restablecer contraseña</span>
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
import { validationMixin } from "vuelidate";
const {
  required,
  maxLength,
  minLength,
  email
} = require("vuelidate/lib/validators");

export default {
  data() {
    return {
      form: {
        email: ""
      }
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      email: {
        required,
        email,
        minLength: minLength(4)
      }
    }
  },
  computed: {
    ...mapGetters(["processing", "loginError", "forgotMailSuccess"])
  },
  methods: {
    ...mapActions(["forgotPassword"]),
    formSubmit() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.forgotPassword({
          email: this.form.email
        });
      }
    }
  },
  watch: {
    loginError(val) {
      if (val != null) {
          this.$notify({
            group: "error",
            title: "Ha ocurrido un error",
            text: val,
            duration: 5000
          });
      }
    },
    forgotMailSuccess(val) {
      console.log(val)
   
          this.$notify({
            group: "auth",
            title: "Proceso exitoso",
            text: "Se ha enviado un email a su correo, para reiniciar su contraseña.",
            duration: 5000
          });
      
    }
  }
};
</script>
<style scoped>
.auth-card.custom .image-side {
  width: 55%;
}
.auth-card.custom .form-side {
  width: 60%;
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