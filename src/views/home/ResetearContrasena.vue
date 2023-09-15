<template>
  <div id="root">
    <div class="fixed-background"></div>
    <main>
      <div class="container">
        <b-row class="h-100">
          <b-colxx xxs="12" md="10" class=" my-auto">
            <b-card class="auth-card custom" no-body>
              <div class="position-relative image-side"></div>
              <div class="form-side">
                <router-link tag="a" to="/">
                  <span
                    class="mb-4"
                    style="font-family: Nunito, sans-serif; font-stretch: condensed; font-weight: 800; font-size: 19px; color: black;"
                    >Área privada</span
                  >
                </router-link>
                <notifications group="error" classes="vue-notification error" />
                <notifications group="success" classes="vue-notification success" />
                <h6 class="mb-4">Restablecer contraseña</h6>

                <b-form
                  @submit.prevent="formSubmit"
                  class="av-tooltip tooltip-label-bottom"
                >
                  <b-form-group
                    label="Nueva contraseña"
                    class="has-float-label mb-4"
                  >
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
                    />
                    <b-form-invalid-feedback v-if="!$v.form.password.required"
                      >Por favor, ingresa la nueva
                      contraseña.</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      v-else-if="
                        !$v.form.password.minLength ||
                          !$v.form.password.maxLength
                      "
                      >Tu contraseña debe tener entre 4 y 16
                      caracteres.</b-form-invalid-feedback
                    >
                  </b-form-group>
                  <b-form-group
                    label="Repita su nueva contraseña"
                    class="has-float-label mb-4"
                  >
                    <b-form-input
                      type="password"
                      v-model="$v.form.passwordAgain.$model"
                      :state="
                        $v.form.passwordAgain.$dirty
                          ? !$v.form.passwordAgain.$error
                          : null
                      "
                      @input="$v.form.passwordAgain.$reset()"
                      @blur="$v.form.passwordAgain.$touch()"
                    />
                    <b-form-invalid-feedback
                      v-if="!$v.form.passwordAgain.required"
                      >Por favor, ingresa tu contraseña
                      nuevamente.</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      v-else-if="!$v.form.passwordAgain.sameAsPassword"
                      >Las contraseñas no son iguales.</b-form-invalid-feedback
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
  email,
  sameAs
} = require("vuelidate/lib/validators");

export default {
  data() {
    return {
      form: {
        password: "",
        passwordAgain: ""
      }
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      password: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
      },
      passwordAgain: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  computed: {
    ...mapGetters([
      "currentUser",
      "processing",
      "loginError",
      "resetPasswordSuccess"
    ])
  },
  methods: {
    ...mapActions(["resetPassword"]),
    formSubmit() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.resetPassword({
          newPassword: this.form.password,
          confirmationPassword:this.form.passwordAgain,
          resetPasswordCode: this.$route.query.code
        });
      }
    }
  },
  watch: {
    loginError(val) {
      if (val != null) {
          this.$notify({
            group: "error",
            title: 'ERROR',
            text: val,
            duration: 5000,
          });
      }
    },
    resetPasswordSuccess(val) {
      if (val) {
          this.$notify({
            group: "success",
            title: "Contraseña reseteada exitosamente",
            text: "Será llevado al login.",
            duration: 5000
          });
        setTimeout( ()=> {
        
        this.$router.push({name:'login'});

        },3000)

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
