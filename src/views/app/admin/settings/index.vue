<template>
  <body id="TuCarta" v-if="isLoad">
    <b-container class="main container-restaurante">
      <b-row>
        <b-col sm="12">
          <b-alert
            :show="dismissCountDown"
            variant="success"
            @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged"
            v-if="success"
          >
            <p>Usuario actualizado sastifactoriamente.</p>
            <b-progress
              variant="success"
              :max="dismissSecs"
              :value="dismissCountDown"
              height="4px"
            ></b-progress>
          </b-alert>

          <b-alert
            :show="dismissCountDown"
            variant="danger"
            @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged"
            v-if="error.length > 0"
          >
            <p>{{ error }}</p>
            <b-progress
              variant="danger"
              :max="dismissSecs"
              :value="dismissCountDown"
              height="4px"
            ></b-progress>
          </b-alert>
        </b-col>
      </b-row>
      <b-row>
        <div class="col-md-3 col-sm-12">
          <div style="display: flex; justify-content: space-around">
            <avatar
              :size="150"
              :username="usuario.nombre + ' ' + usuario.apellidos"
            ></avatar>
          </div>
          <b-card
            :title="usuario.nombre + ' ' + usuario.apellidos"
            img-top
            tag="article"
            style=""
            class="mb-2 card-sombra sidebar-menu"
          >
            <b-card-text>
              Email:
              <span style="color: black">{{ usuario.email }}</span>
            </b-card-text>
            <b-card-text>
              Teléfono:
              <span style="color: black">{{ usuario.telefono }}</span>
            </b-card-text>
            <b-card-text>
              Rol:
              <span style="color: black" v-if="usuario.role.id == 1"
                >MASTER</span
              >
              <span style="color: black" v-else-if="usuario.role.id == 3"
                >DELEGADO</span
              >
              <span style="color: black" v-else-if="usuario.role.id == 4"
                >DISTRIBUIDOR</span
              >
              <span style="color: black" v-else-if="usuario.role.id == 5"
                >TÉCNICO</span
              >
              <span style="color: black" v-else-if="usuario.role.id == 9"
                >SEMI MASTER</span
              >
            </b-card-text>
            <b-card-text v-if="usuario.zona">
              Comunidad Autónoma:
              <span style="color: black">{{ usuario.zona }}</span>
            </b-card-text>
          </b-card>
        </div>
        <b-col class="col-md-9 col-sm-12">
          <b-form>
            <b-row>
              <b-col sm="6">
                <b-form-group label="Nombre*" class="label-input-form mb-4">
                  <b-form-input
                    v-model="$v.usuarioEdit.nombre.$model"
                    :state="
                      $v.usuarioEdit.nombre.$dirty
                        ? !$v.usuarioEdit.nombre.$error
                        : null
                    "
                    @input="$v.usuarioEdit.nombre.$reset()"
                    @blur="$v.usuarioEdit.nombre.$touch()"
                    autocomplete="off"
                  />

                  <b-form-invalid-feedback
                    v-if="!$v.usuarioEdit.nombre.required"
                    >Por favor, ingrese su nombre y
                    apellido</b-form-invalid-feedback
                  >

                  <b-form-invalid-feedback
                    v-else-if="!$v.usuarioEdit.nombre.minLength"
                    >Su nombre debe tener más de 4
                    caracteres</b-form-invalid-feedback
                  >
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group label="Apellidos" class="label-input-form mb-4">
                  <b-form-input
                    v-model="usuarioEdit.apellidos"
                    autocomplete="off"
                  />
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group label="Email*" class="label-input-form mb-4">
                  <b-form-input
                    type="email"
                    required
                    v-model="$v.usuarioEdit.email.$model"
                    :state="
                      $v.usuarioEdit.email.$dirty
                        ? !$v.usuarioEdit.email.$error
                        : null
                    "
                    @input="$v.usuarioEdit.email.$reset()"
                    @blur="$v.usuarioEdit.email.$touch()"
                    autocomplete="off"
                  />

                  <b-form-invalid-feedback v-if="!$v.usuarioEdit.email.required"
                    >Por favor, ingrese un email</b-form-invalid-feedback
                  >
                  <b-form-invalid-feedback
                    v-else-if="!$v.usuarioEdit.email.email"
                    >Por favor, ingrese un email válido</b-form-invalid-feedback
                  >
                  <b-form-invalid-feedback
                    v-else-if="!$v.usuarioEdit.email.minLength"
                    >El email debe tener más de 4
                    caráteres</b-form-invalid-feedback
                  >
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group
                  label="Contraseña*"
                  class="label-input-form mb-4 contraseña"
                >
                  <b-form-input
                    :type="type ? 'password' : 'text'"
                    required
                    v-model="$v.usuarioEdit.password.$model"
                    :state="
                      $v.usuarioEdit.password.$dirty
                        ? !$v.usuarioEdit.password.$error
                        : null
                    "
                    @input="$v.usuarioEdit.password.$reset()"
                    @blur="$v.usuarioEdit.password.$touch()"
                    autocomplete="off"
                  />
                  <b-input-group-append>
                    <b-button
                      style="border-right: 2px solid white;"
                      variant="primary"
                      @click="type = !type"
                      ><i style="font-weight: 700" class="simple-icon-eye"></i
                    ></b-button>
                  </b-input-group-append>
                  <b-input-group-append>
                    <b-button variant="primary" @click="generatePassword()"
                      ><i
                        style="font-weight: 700"
                        class="simple-icon-refresh"
                      ></i
                    ></b-button>
                  </b-input-group-append>

                  <b-form-invalid-feedback
                    v-if="
                      !$v.usuarioEdit.password.minLength ||
                        !$v.usuarioEdit.password.maxLength
                    "
                    >La contraseña debe tener entre 8 y 25
                    caracteres</b-form-invalid-feedback
                  >
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <b-form-group label="Telefono*" class="label-input-form mb-4">
                  <b-form-input
                    type="text"
                    required
                    v-model="$v.usuarioEdit.telefono.$model"
                    :state="
                      $v.usuarioEdit.telefono.$dirty
                        ? !$v.usuarioEdit.telefono.$error
                        : null
                    "
                    @input="$v.usuarioEdit.telefono.$reset()"
                    @blur="$v.usuarioEdit.telefono.$touch()"
                    autocomplete="off"
                  />
                  <b-form-invalid-feedback
                    v-if="!$v.usuarioEdit.telefono.required"
                    >Por favor, ingrese un número telefonico
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback
                    v-else-if="
                      !$v.usuarioEdit.telefono.minLength ||
                        !$v.usuarioEdit.telefono.maxLength
                    "
                    >La contraseña debe tener entre 6 y 15
                    caracteres</b-form-invalid-feedback
                  >
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group label="Provincia *" class="label-input-form mb-4">
                  <v-select
                    :options="provincias"
                    required
                    v-model="$v.usuarioEdit.provincia.$model"
                    :state="
                      $v.usuarioEdit.provincia.$dirty
                        ? !$v.usuarioEdit.provincia.$error
                        : null
                    "
                    @input="$v.usuarioEdit.provincia.$reset()"
                    @blur="$v.usuarioEdit.provincia.$touch()"
                    autocomplete="off"
                  />
                </b-form-group>
                <b-form-invalid-feedback
                  v-if="!$v.usuarioEdit.provincia.required"
                  >Por favor, ingrese la provincia donde se ubica su
                  negocio</b-form-invalid-feedback
                >

                <b-form-invalid-feedback
                  v-else-if="
                    !$v.usuarioEdit.provincia.minLength ||
                      !$v.usuarioEdit.provincia.maxLength
                  "
                  >Su provincia debe tener entre 1 a 30 caracteres
                </b-form-invalid-feedback>
              </b-col>
              <b-col sm="6">
                <b-form-group label="Empresa" class="label-input-form mb-4">
                  <b-form-input
                    type="text"
                    required
                    v-model="usuarioEdit.empresa"
                    autocomplete="off"
                  />
                </b-form-group>
              </b-col>
              <b-col sm="6" v-if="!esDistribuidor || !esTecnico">
                <b-form-group label="Comunidad Autónoma" class="label-input-form mb-4">
<v-select :options="comunidades" v-model="usuarioEdit.zona" />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12"><h4>Datos de envío</h4></b-col>
              <b-col md="6">
                <b-form-group class="label-input-form ">
                  <b-form-input
                    v-model="datosEnvios.nombre"
                    placeholder="Nombre"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group class="label-input-form ">
                  <b-form-input
                    v-model="datosEnvios.apellidos"
                    placeholder="Empresa"
                  />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group class="label-input-form ">
                  <b-form-input
                    v-model="datosEnvios.direccion"
                    placeholder="Direccion"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group class="label-input-form ">
                  <b-form-input
                    v-model="datosEnvios.numero_interior"
                    required
                    placeholder="numero interior, departamento, etc .OPCIONAL"
                  />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group class="label-input-form ">
                  <b-form-input
                    v-model="datosEnvios.ciudad"
                    placeholder="Ciudad"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group class="label-input-form ">
                  <b-form-input
                    v-model="datosEnvios.pais"
                    placeholder="País"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group class="label-input-form ">
                  <b-form-input
                    v-model="datosEnvios.provincia"
                    placeholder="Provincia"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group class="label-input-form ">
                  <b-form-input
                    v-model="datosEnvios.codigo_postal"
                    placeholder="Codigo Postal"
                    required
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-button
              variant="primary"
              :disabled="
                $v.$invalid || submitStatus === 'PENDING' || success == true
              "
              @click="updateUser() + updateMeta()"
              class="mr-1"
              >Guardar</b-button
            >
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </body>

  <div v-else class="loading"></div>
</template>

<script>
import {mapGetters} from 'vuex';
import { apiUrl, url, timeoutDb } from "@/constants/config";
import Avatar from "vue-avatar";
import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import generator from "generate-password";

const {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} = require("vuelidate/lib/validators");
export default {
  components: {
    Avatar,
    "v-select": vSelect
  },
  created() {
    this.getMetaUser();
    this.obtenerDatosUser();
    this.getProvincias();
  },

  validations() {
    if (this.usuario.role.id === 1 || this.usuario.role.id === 3) {
      return {
        usuarioEdit: {
          password: {
            maxLength: maxLength(25),
            minLength: minLength(8)
          },
          email: {
            required,
            email,
            minLength: minLength(4)
          },
          nombre: {
            required,

            minLength: minLength(4)
          },
          telefono: {
            required,
            maxLength: maxLength(15),
            minLength: minLength(6)
          },
          provincia: {
            required,
            maxLength: maxLength(30),
            minLength: minLength(1)
          }
        }
      };
    } else {
      return {
        usuarioEdit: {
          password: {
            maxLength: maxLength(25),
            minLength: minLength(8)
          },
          email: {
            required,
            email,
            minLength: minLength(4)
          },
          nombre: {
            required,

            minLength: minLength(4)
          },
          apellidos: {
            required,

            minLength: minLength(4)
          },
          provincia: {
            required,
            maxLength: maxLength(30),
            minLength: minLength(1)
          },
          telefono: {
            required,
            maxLength: maxLength(15),
            minLength: minLength(6)
          }
        }
      };
    }
  },
  data() {
    return {
      isLoad: true,
      visible: true,
      id: "",
      usuario: {},
            comunidades: [
        {
          label: "ANDALUCÍA",
          value: "ANDALUCIA"
        },
        {
          label: "ARAGÓN",
          value: "ARAGON"
        },
        {
          label: "ASTURIAS",
          value: "ASTURIAS"
        },
        {
          label: "BALEARES",
          value: "BALEARES"
        },
        {
          label: "CANARIAS",
          value: "CANARIAS"
        },
        {
          label: "CANTABRIA",
          value: "CANTABRIA"
        },
        {
          label: "CASTILLA Y LEÓN",
          value: "CASTILLA Y LEON"
        },
        {
          label: "CASTILLA LA MANCHA",
          value: "CASTILLA LA MANCHA"
        },
        {
          label: "CATALUÑA",
          value: "CATALUÑA"
        },
        {
          label: "COMUNIDAD VALENCIANA",
          value: "COMUNIDAD VALENCIANA"
        },
        {
          label: "EXTREMADURA",
          value: "EXTREMADURA"
        },
        {
          label: "GALICIA",
          value: "GALICIA"
        },
        {
          label: "MADRID",
          value: "MADRID"
        },
        {
          label: "MURCIA",
          value: "MURCIA"
        },
        {
          label: "NAVARRA",
          value: "NAVARRA"
        },
        {
          label: "PAIS VASCO",
          value: "PAIS VASCO"
        },
        {
          label: "LA RIOJA",
          value: "LA RIOJA"
        },
        {
          label: "CEUTA",
          value: "CEUTA"
        },
        {
          label: "MELILLA",
          value: "MELILLA"
        }
      ],
      usuarioEdit: {
        nombre: "",
        email: "",
        password: "",
        zona: "",
        provincia: {},
        telefono: "",
        apellidos: "",
        empresa: ""
      },
      datosEnvios: {
        nombre: "",
        direccion: "",
        numero_interior: "",
        provincia: "",
        ciudad: "",
        pais: "",
        codigo_postal: "",
        apellidos: ""
      },
      type: true,
      metaUser: [],
      relistar: false,
      submitStatus: null,
      success: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      error: false,
      message: [],
      provincias: []
    };
  },
  methods: {
    generatePassword() {
      this.usuarioEdit.password = generator.generate({
        length: 8,
        numbers: true
      });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    updateUser() {
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        return;
      } else {
        this.submitStatus = "PENDING";

        //Código para guardar
        let header = {
          Authorization: `Bearer ${this.$store.state.user.authorization}`
        };
        let setting = { headers: header, timeout: timeoutDb };

        axios
          .put(
            `${apiUrl}users/${this.usuario.id}`,
            {
              nombre: this.usuarioEdit.nombre,
              apellidos: this.usuarioEdit.apellidos,
              email: this.usuarioEdit.email,
              password: this.usuarioEdit.password,
              province: this.usuarioEdit.provincia.value,
              telefono: this.usuarioEdit.telefono,
              zona: this.usuarioEdit.zona.value,
              empresa: this.usuarioEdit.empresa
            },
            setting
          )
          .then(response => {
            this.submitStatus === "OK";
            this.success = true;
            setTimeout(() => {
              this.submitStatus = null;
              this.success = false;
              this.obtenerDatosUser();
              //this.getDelegados();
            }, 3000);
          })

          .catch(err => {
            //console.log(err.response)
            if (err.response) {
              if (err.response.status == 500) {
                var e = err.response.data;
                this.messageError(e.message, e.error);

                return;
              } else {
                var e = err.response;
                this.messageError("Upps!", e);
                return;
              }
            } else if (err.request) {
              var message = "Tiempo de espera excedido o solicitud no enviada";
              this.messageError(message, err);

              return;
            } else {
              this.messageError(message, err);
              return;
            }
          });
      }
    },
    async updateMeta() {
      try {
        let header = {
          Authorization: `Bearer ${this.$store.state.user.authorization}`
        };
        let setting = { headers: header, timeout: timeoutDb };

        if (this.metaUser.length > 0) {
          var { data } = await axios.put(
            `${apiUrl}meta-users/${this.metaUser[0].id}`,
            this.datosEnvios,
            setting
          );
          console.log(data);
        } else {
          let datos = this.datosEnvios;

          datos["user"] = this.$store.state.user.currentUser.id;

          var { data } = await axios.post(
            `${apiUrl}meta-users`,
            datos,
            setting
          );
          console.log(data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getMetaUser() {
      try {
        let header = {
          Authorization: `Bearer ${this.$store.state.user.authorization}`
        };
        let setting = { headers: header, timeout: timeoutDb };

        let { data } = await axios.get(`${apiUrl}meta-users/me`, setting);

        this.metaUser = data;
        if (!data) {
          return;
        }
        console.log("datos", data);
        this.datosEnvios.nombre = data[0].nombre;
        this.datosEnvios.apellidos = data[0].apellidos;
        this.datosEnvios.ciudad = data[0].ciudad;
        this.datosEnvios.provincia = data[0].provincia;
        this.datosEnvios.pais = data[0].pais;
        this.datosEnvios.codigo_postal = data[0].codigo_postal;
        this.datosEnvios.direccion = data[0].direccion;
        this.datosEnvios.numero_interior = data[0].numero_interior;
      } catch (e) {
        console.log(e);
      }
    },
    getProvincias() {
      let me = this;
      let header = {
        Authorization: `Bearer ${this.$store.state.user.authorization}`
      };

      let setting = {
        headers: header,
        timeout: timeoutDb
      };
      axios
        .get(apiUrl + "provincias", setting)
        .then(response => {
          let data = response.data;

          this.provincias = data.map(provincia => {
            return {
              label: provincia.nombre,
              value: provincia.id
            };
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    obtenerDatosUser() {
      this.isLoad = false;
      let header = {
        Authorization: `Bearer ${this.$store.state.user.authorization}`
      };
      let setting = { headers: header, timeout: timeoutDb };

      axios
        .get(`${apiUrl}users/me`, setting)

        .then(response => {
          //Menú
          const data = response.data;

          this.usuario = data;
          this.usuarioEdit.nombre = data.nombre;
          this.usuarioEdit.apellidos = data.apellidos;
          this.usuarioEdit.email = data.email;
          this.usuarioEdit.password = data.password;
          this.usuarioEdit.zona = data.zona;
          this.usuarioEdit.empresa = data.empresa;
          if (data.province) {
            this.buscarProvincia(data.province);
          } else {
            this.usuarioEdit.provincia = {
              label: "Alicante/Alacant",
              value: 2
            };
          }

          this.usuarioEdit.telefono = data.telefono;
          this.isLoad = true;
        })
        .catch(error => {
          console.log(error);
          this.$router.push({ path: "/error" });
        });
    },
    async buscarProvincia(id) {
      try {
        let { data } = await axios.get(`${apiUrl}provincias/${id}`);

        this.usuarioEdit.provincia = {
          label: data.nombre,
          value: data.id
        };

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    hideModal(refnombre) {
      this.$refs[refname].hide();
    },
    messageError(message, err) {
      this.error = message;

      if (err) {
        this.error += `\n\r${err}`;
      }

      setTimeout(() => {
        this.submitStatus = null;
        this.error = false;
      }, 3000);

      return this.error;
    }
  },
  computed: {
    ...mapGetters({
      menu: "getMenuSidebar",
      esMaster: "esMaster",
      esDelegado: "esDelegado",
      esTecnico: "esTecnico",
      esDistribuidor: "esDistribuidor"
    }),
    mostrarNoAmin() {
      if (
        this.usuarioEdit.rol.value == "DISTRIBUIDOR" ||
        this.usuarioEdit.rol.value == "TECNICO"
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    success() {
      if (this.success) {
        this.showAlert();
      }
    },
    error() {
      if (!this.success && this.error.length > 0) {
        this.showAlert();
      }
    }
  }
};
</script>
<style scoped>
.btn-add {
  padding: 1px 15px;
  color: white !important;
  font-size: 1em !important;
  font-weight: 500;
  margin-left: 10px;
}
p.estado-pedido {
  position: relative;
}
p.estado-pedido button {
  position: absolute;
  right: 0;
  margin-top: -3px;
}
div.cantidad > .b-form-spinbutton > button {
  background: #d1d1d1 0% 0% no-repeat padding-box;
  border: 0.5px solid #707070;
  border-radius: 3px 0px 0px 3px;
  opacity: 1;

  padding: 0 2px;
  font-size: 9px;
}
div.cantidad > .b-form-spinbutton.form-control output > bdi {
  display: block;
  min-width: 1.25em;
  height: 1.5em;
}
div.cantidad > .b-form-spinbutton.form-control {
  height: 30px;
}
ul.dish-alergenos {
  list-style: none;
  display: inline-block;
  padding: 0;
}
ul.dish-alergenos > li {
  display: inline-block;
}
ul.dish-alergenos > li > img {
  width: 35px;
  vertical-align: middle;
  max-width: 100%;
  height: auto;
}
</style>
