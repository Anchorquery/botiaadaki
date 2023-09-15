<template>
  <b-container>
    <b-row>
      <b-colxx xxs="12">
        <h1>Añadir nuevo usuario</h1>
        <div class="top-right-button-container"></div>
        <div class="separator mb-5" />
      </b-colxx>
    </b-row>
    <b-form>
      <b-row>
        <b-col sm="12">
          <b-alert
            :show="dismissCountDown"
            variant="success"
            @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged"
            v-if="success"
          >
            <p>Usuario creado sastifactoriamente.</p>
            <b-progress
              variant="success"
              :max="dismissSecs"
              :value="dismissCountDown"
              height="4px"
            ></b-progress>
          </b-alert>

          <notifications group="error" classes="vue-notification error" />
        </b-col>
        <!--   <b-col sm="6" v-if="esMaster || esSemi">
          <b-form-group label="Código cliente" class="label-input-form mb-4">
            <b-form-input
              type="text"
              required
              v-model="user.codigo_cliente"
              autocomplete="off"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6" v-if="esMaster || esSemi">
          <b-form-group
            label="Código representante"
            class="label-input-form mb-4"
          >
            <b-form-input
              type="text"
              required
              v-model="user.codigo_representante"
              autocomplete="off"
            />
          </b-form-group>
        </b-col> -->
        <b-col sm="6">
          <b-form-group label="Nombre *" class="label-input-form mb-4">
            <b-form-input
              v-model="$v.user.nombre.$model"
              :state="$v.user.nombre.$dirty ? !$v.user.nombre.$error : null"
              @input="$v.user.nombre.$reset()"
              @blur="$v.user.nombre.$touch()"
            />

            <b-form-invalid-feedback v-if="!$v.user.nombre.required"
              >Por favor, ingrese su nombre y apellido</b-form-invalid-feedback
            >
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="Apellidos" class="label-input-form mb-4">
            <b-form-input v-model="user.apellidos" />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="Email *" class="label-input-form mb-4">
            <b-form-input
              type="email"
              required
              v-model="$v.user.email.$model"
              :state="$v.user.email.$dirty ? !$v.user.email.$error : null"
              @input="$v.user.email.$reset()"
              @blur="$v.user.email.$touch()"
              autocomplete="chrome-off"
            />

            <b-form-invalid-feedback v-if="!$v.user.email.required"
              >Por favor, ingrese un email</b-form-invalid-feedback
            >
            <b-form-invalid-feedback v-else-if="!$v.user.email.email"
              >Por favor, ingrese un email válido</b-form-invalid-feedback
            >
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="Telefono *" class="label-input-form mb-4">
            <b-form-input
              type="text"
              required
              name="telefono"
              autocomplete="false"
              v-model="$v.user.telephone.$model"
              :state="
                $v.user.telephone.$dirty ? !$v.user.telephone.$error : null
              "
              @input="$v.user.telephone.$reset()"
              @blur="$v.user.telephone.$touch()"
            />
            <b-form-invalid-feedback v-if="!$v.user.telephone.required"
              >Por favor, ingrese un número telefonico
            </b-form-invalid-feedback>
            <b-form-invalid-feedback
              v-else-if="
                !$v.user.telephone.minLength || !$v.user.telephone.maxLength
              "
              >El número telefonico debe tener entre 6 y 15
              caracteres</b-form-invalid-feedback
            >
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-form-group
            label="Contraseña *"
            class="label-input-form mb-4 contraseña"
          >
            <b-form-input
              :type="type ? 'password' : 'text'"
              required
              v-model="$v.user.password.$model"
              :state="$v.user.password.$dirty ? !$v.user.password.$error : null"
              @input="$v.user.password.$reset()"
              @blur="$v.user.password.$touch()"
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
                ><i style="font-weight: 700" class="simple-icon-refresh"></i
              ></b-button>
            </b-input-group-append>
            <b-form-invalid-feedback v-if="!$v.user.password.required"
              >Por favor, ingrese la contraseña</b-form-invalid-feedback
            >
            <b-form-invalid-feedback
              v-else-if="
                !$v.user.password.minLength || !$v.user.password.maxLength
              "
              >La contraseña debe tener entre 8 y 25
              caracteres</b-form-invalid-feedback
            >
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="Provincia" class="label-input-form mb-4">
            <v-select :options="provincias" v-model="user.province" />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Comunidad Autónoma:"
            class="label-input-form mb-4"
          >
            <v-select :options="comunidades" v-model="user.zona" />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="CIF" class="label-input-form mb-4">
            <b-form-input type="text" v-model="user.cif" />
          </b-form-group>
        </b-col>
        <b-col sm="12">
          <b-form-group label="Dirección" class="label-input-form mb-4">
            <b-form-input type="text" v-model="user.direccion" />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group label="Empresa" class="label-input-form mb-4">
            <b-form-input type="text" v-model="user.empresa" />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            v-if="this.$store.state.user.currentUser.role.id === 1"
            label="Rol del usuario *"
            class="label-input-form mb-4"
          >
            <v-select
              :options="rolesMaster"
              required
              v-model="$v.user.rol.$model"
              @input="$v.user.rol.$reset()"
              @blur="$v.user.rol.$touch()"
            />

            <b-form-invalid-feedback v-if="!$v.user.rol.required"
              >Por favor, ingrese el user.rol del
              usuario</b-form-invalid-feedback
            >
          </b-form-group>
          <b-form-group
            v-else
            label="Rol del usuario *"
            class="label-input-form mb-4"
          >
            <v-select
              :options="rolesSemi"
              required
              v-model="$v.user.rol.$model"
              @input="$v.user.rol.$reset()"
              @blur="$v.user.rol.$touch()"
            />

            <b-form-invalid-feedback v-if="!$v.user.rol.required"
              >Por favor, ingrese el rol del usuario</b-form-invalid-feedback
            >
          </b-form-group>
        </b-col>
      </b-row>
      <b-row
        v-if="
          user.rol.value == 4 || user.rol.value == 3 || user.rol.value == 10
        "
      >
        <b-col sm="6" v-if="esMaster">
          <b-form-group label="Delegacion" class="label-input-form mb-4">
            <v-select
              :options="delegacion"
              v-model="user.delegacion"
              style="text-transform:capitalize"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row
        v-if="
          user.rol.value == 4 || user.rol.value == 5 || user.rol.value == 10
        "
      >
        <b-col sm="6" v-if="esMaster">
          <b-form-group label="Delegado *" class="label-input-form mb-4">
            <v-select
              :options="delegados"
              required
              v-model="$v.user.delegado.$model"
              @input="$v.user.delegado.$reset()"
              @blur="$v.user.delegado.$touch()"
            />
            <b-form-invalid-feedback v-if="!$v.user.delegado.required"
              >Por favor, ingrese el delegado</b-form-invalid-feedback
            >
          </b-form-group>
        </b-col>
        <b-col sm="6" v-if="user.rol.value == 4">
          <b-form-group label="Permisos" class="label-input-form mb-4">
            <b-form-checkbox
              class="custom-control-inline"
              switch
              v-model="user.incidencias"
              >Incidencias</b-form-checkbox
            >
            <b-form-checkbox
              class="custom-control-inline"
              switch
              v-model="user.pedidos"
              >Pedidos Productos</b-form-checkbox
            >
            <b-form-checkbox
              class="custom-control-inline"
              switch
              v-model="user.roturas"
              >Roturas</b-form-checkbox
            >
            <b-form-checkbox
              class="custom-control-inline"
              switch
              v-model="user.stock"
              >Stock</b-form-checkbox
            >
            <b-form-checkbox
              class="custom-control-inline"
              switch
              v-model="user.documentacion_comercial"
              >Documentación comercial</b-form-checkbox
            >
          </b-form-group>
        </b-col>
        <b-col sm="6" v-if="user.rol.value == 4 && !user.distribuidor_tienda">
          <b-form-group
            label="Distribuidor con autosat"
            class="label-input-form mb-4"
          >
            <b-form-checkbox
              @change.capture="cambios('autosat')"
              v-model="user.autosat"
              name="autosat"
              switch
            >
              <strong
                >Marque esta opción si el distribuidor cuenta con un Servicio
                Técnico propio</strong
              >
            </b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col sm="6" v-if="user.rol.value == 4">
          <b-form-group
            label="Distribuidor tienda"
            class="label-input-form mb-4"
          >
            <b-form-checkbox
              v-model="user.distribuidor_tienda"
              name="tienda"
              @change.capture="cambios('tienda')"
              switch
            >
              <strong
                >Marque esta opción si el distribuidor es un distribuidor tienda
                y posee un distribuidor coordinador</strong
              >
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- <b-row v-if="user.rol.value != 4 && user.rol.value != 1"> -->

      <b-row v-if="user.rol.value != 4 && user.rol.value != 10">
        <b-col v-if="user.rol" sm="6">
          <b-form-group label="Permisos" class="label-input-form mb-4">
            <b-form-checkbox
              class="custom-control-inline"
              switch
              v-model="user.incidencias"
              >Incidencias</b-form-checkbox
            >
            <b-form-checkbox
              v-if="user.rol.value != 5"
              class="custom-control-inline"
              switch
              v-model="user.pedidos"
              >Pedidos Productos</b-form-checkbox
            >
            <b-form-checkbox
              class="custom-control-inline"
              switch
              v-model="user.pedidos_repuesto"
              >Pedidos Repuestos
            </b-form-checkbox>
            <b-form-checkbox
              v-if="user.rol.value != 5"
              class="custom-control-inline"
              switch
              v-model="user.roturas"
              >Roturas</b-form-checkbox
            >
            <b-form-checkbox
              v-if="user.rol.value != 5"
              class="custom-control-inline"
              switch
              v-model="user.stock"
              >Stock</b-form-checkbox
            >
            <b-form-checkbox
              class="custom-control-inline"
              switch
              v-model="user.puestas_en_marcha"
              >Puestas en marcha</b-form-checkbox
            >
            <b-form-checkbox
              v-if="user.rol.value != 5"
              class="custom-control-inline"
              switch
              v-model="user.documentacion_comercial"
              >Documentación comercial</b-form-checkbox
            >
            <b-form-checkbox
              class="custom-control-inline"
              switch
              v-model="user.documentacion_tecnica"
              >Documentación técnica</b-form-checkbox
            >
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="user.rol.value == 10">
        <b-col v-if="user.rol" sm="6">
          <b-form-group label="Permisos" class="label-input-form mb-4">
            <b-form-checkbox
              class="custom-control-inline"
              switch
              v-model="user.incidencias"
              >Incidencias</b-form-checkbox
            >
            <b-form-checkbox
              v-if="user.rol.value != 5"
              class="custom-control-inline"
              switch
              v-model="user.pedidos"
              >Pedidos Productos</b-form-checkbox
            >
            <b-form-checkbox
              v-if="user.rol.value != 5"
              class="custom-control-inline"
              switch
              v-model="user.roturas"
              >Roturas</b-form-checkbox
            >
            <b-form-checkbox
              v-if="user.rol.value != 5"
              class="custom-control-inline"
              switch
              v-model="user.stock"
              >Stock</b-form-checkbox
            >
            <b-form-checkbox
              v-if="user.rol.value != 5"
              class="custom-control-inline"
              switch
              v-model="user.documentacion_comercial"
              >Documentación comercial</b-form-checkbox
            >
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="user.rol.value == 4 && user.distribuidor_tienda == true">
        <b-col sm="6" v-if="esMaster">
          <b-form-group
            label="Distribuidor coordinador *"
            class="label-input-form mb-4"
          >
            <v-select
              :options="distribuidores_coordinadores"
              v-model="user.distribuidor_coordinador"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="6">
          <b-form-group label="Envío de email" class="label-input-form mb-4">
            <b-form-checkbox
              class="custom-control-inline"
              switch
              v-model="enviarEmail"
              :disabled="$v.$invalid"
              >Enviar email de bienvenida</b-form-checkbox
            >
          </b-form-group>
        </b-col>
      </b-row>
      <b-button
        variant="primary"
        :disabled="$v.$invalid || submitStatus === 'PENDING' || success == true"
        @click="addnewUser()"
        class="mr-1"
        >Guardar</b-button
      >
    </b-form>
  </b-container>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import axios from "axios";
import { apiUrl, timeoutDb } from "@/constants/config";
import { mapGetters } from "vuex";
import generator from "generate-password";

const {
  required,
  maxLength,
  minLength,
  email
} = require("vuelidate/lib/validators");
export default {
  components: {
    "v-select": vSelect
  },

  data() {
    return {
      delegacion: ['solar','horus','klover','hase'],

      rolesMaster: [
        {
          label: "Solartenik",
          value: 1
        },
        {
          label: "Semi Master",
          value: 9
        },
        {
          label: "Delegado",
          value: 3
        },
        {
          label: "Distribuidor",
          value: 4
        },
        {
          label: "Distribuidor coordinador",
          value: 10
        },
        {
          label: "Técnico",
          value: 5
        }
      ],

      rolesSemi: [
        {
          label: "Distribuidor",
          value: 4
        },
        {
          label: "Distribuidor coordinador",
          value: 10
        },
        {
          label: "Técnico",
          value: 5
        }
      ],
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
      delegacionSelect: {},
      optionsPermisos: ["incidencias", "roturas", "pedidos", "documentacion"],
      type: true,
      user: {
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        rol: "",
        province: "",
        state: false,
        permisos: [],
        telephone: "",
        delegado: "",
        empresa: "",
        direccion: "",
        autosat: false,
        zona: "",
        incidencias: false,
        roturas: false,
        pedidos: false,
        pedidos_repuesto: false,
        documentacion_tecnica: false,
        documentacion_comercial: false,
        stock: false,
        puestas_en_marcha: false,
        codigo_cliente: "",
        codigo_representante: "",
        distribuidor_tienda: false,
        distribuidor_coordinador: null,
        cif: "",
        delegacion: "solar"
      },

      arrayPermisos: ["incidencias", "roturas", "pedidos", "documentacion"],
      relistar: false,
      submitStatus: null,
      success: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      error: false,
      message: [],
      delegados: [],
      distribuidores_coordinadores: [],
      provincias: [],
      enviarEmail: false
    };
  },

  validations() {
    if (this.user.rol.value === 1 || this.user.rol.value === 3) {
      return {
        user: {
          password: {
            required,
            maxLength: maxLength(25),
            minLength: minLength(8)
          },
          email: {
            required,
            email
          },
          nombre: {
            required
          },
          rol: {
            required
          },
          telephone: {
            required,
            maxLength: maxLength(15),
            minLength: minLength(6)
          }
        }
      };
    } else if (
      (this.user.rol.value === 4 && this.esMaster) ||
      (this.user.rol.value === 5 && this.esMaster) ||
      (this.user.rol.value === 10 && this.esMaster)
    ) {
      return {
        user: {
          password: {
            required,
            maxLength: maxLength(25),
            minLength: minLength(8)
          },
          rol: {
            required
          },
          email: {
            required,
            email
          },
          nombre: {
            required
          },
          telephone: {
            required,
            maxLength: maxLength(15),
            minLength: minLength(6)
          },
          delegado: {
            required
          }
        }
      };
    } else {
      return {
        user: {
          password: {
            required,
            maxLength: maxLength(25),
            minLength: minLength(8)
          },
          rol: {
            required
          },
          email: {
            required,
            email
          },
          nombre: {
            required
          },
          telephone: {
            required,
            maxLength: maxLength(15),
            minLength: minLength(6)
          }
        }
      };
    }
  },
  created() {
    this.getDelegados();
    this.getCoordinadores();
    this.getProvincias();
  },
  methods: {
    cambios(dato) {
      if (dato == "tienda") {
        this.user.autosat = false;
      } else if (dato == "autosat") {
        this.user.distribuidor_tienda = false;
        this.user.distribuidor_coordinador = null;
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    generatePassword() {
      this.user.password = generator.generate({
        length: 8,
        numbers: true
      });
    },
    getProvincias() {
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
    async getCoordinadores() {
      try {
        if (!this.esMaster || !this.esSemi) {
          return;
        }
        let header = {
          Authorization: `Bearer ${this.$store.state.user.authorization}`
        };

        let setting = {
          headers: header,
          timeout: timeoutDb
        };

        let { data } = await axios.get("users/coordinadores", setting);

        this.prepareCoordinadores(data);
      } catch (error) {
        console.log(error);
      }
    },
    prepareCoordinadores(data) {
      var dataArray = data;
      var coordinadores = [];
      dataArray.forEach(function(coordinador) {
        if (!coordinador.blocked) {
          var obj = {};
          obj["label"] = `${coordinador.nombre} ${coordinador.apellidos}`;
          obj["value"] = coordinador.id;
          coordinadores.push(obj);
        }
      });
      this.distribuidores_coordinadores = coordinadores;
    },
    getDelegados() {
      let me = this;
      if (!this.esMaster) {
        return;
      }
      let header = {
        Authorization: `Bearer ${this.$store.state.user.authorization}`
      };

      let setting = {
        headers: header,
        timeout: timeoutDb
      };

      axios
        .get(apiUrl + "users/delegados", setting)
        .then(response => {
          me.prepareDelegados(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    prepareDelegados(data) {
      var dataArray = data;
      var delegados = [];
      dataArray.forEach(function(delegado) {
        if (!delegado.blocked) {
          var obj = {};
          obj["label"] = `${delegado.nombre} ${delegado.apellidos}`;
          obj["value"] = delegado.id;
          obj["empresa"] = delegado.empresa;
          obj["codigo_cliente"] = delegado.codigo_cliente;
          delegados.push(obj);
        }
      });
      this.delegados = delegados;
    },
    async sendEmail(id, datos) {
      try {
        let header = {
          Authorization: `Bearer ${this.$store.state.user.authorization}`
        };
        let setting = { headers: header };

        let { data } = await axios.post(
          `/email/nuevo-usuario/`,
          { id: id, data: datos },
          setting
        );

        this.enviarEmail = false;
        this.$router.push({
          name: "usuario-exitoso",
          params: { id: data.id }
        });
      } catch (error) {
        console.log(error.response);
      }
    },
    generarCodigo() {
      return user.codigo_representante;
    },
    async addnewUser() {
      try {
        if (this.$v.$invalid) {
          this.submitStatus = "ERROR";
          return;
        } else {
          if (
            this.distribuidor_tienda &&
            !this.distribuidor_coordinador.value
          ) {
            return;
          }
          var apiAdd = `/users/`;

          this.submitStatus = "PENDING";

          //Código para guardar
          let header = {
            Authorization: `Bearer ${this.$store.state.user.authorization}`
          };
          let setting = { headers: header, timeout: timeoutDb };

          let { data } = await axios.post(
            apiAdd,
            {
              username: this.user.email,
              role: this.user.rol.value,
              nombre: this.user.nombre,
              apellidos: this.user.apellidos,
              email: this.user.email,
              delegacion: this.user.delegacion,
              password: this.user.password,
              province: this.user.province.value,
              delegado: this.user.delegado
                ? this.user.delegado.value
                : this.currentUser.id,
              telefono: this.user.telephone,
              empresa: this.user.delegado.empresa
                ? this.user.delegado.empresa
                : this.user.empresa,
              blocked: this.state,
              pedidos: this.user.pedidos ? this.user.pedidos : false,
              pedidos_repuesto: this.user.pedidos_repuesto
                ? this.user.pedidos_repuesto
                : false,
              documentacion_tecnica: this.user.documentacion_tecnica
                ? this.user.documentacion_tecnica
                : false,
              documentacion_comercial: this.user.documentacion_comercial
                ? this.user.documentacion_comercial
                : false,
              roturas: this.user.roturas ? this.user.roturas : false,
              incidencias: this.user.incidencias
                ? this.user.incidencias
                : false,
              stock: this.user.stock ? this.user.stock : false,
              puestas_en_marcha: this.user.puestas_en_marcha
                ? this.user.puestas_en_marcha
                : false,
              direccion: this.user.direccion,

              autosat: !this.user.distribuidor_tienda
                ? this.user.autosat
                : false,
              zona: this.user.zona.value,
              codigo_cliente: this.user.codigo_cliente,
              codigo_representante: this.user.codigo_representante,
              distribuidor_coordinador: this.user.distribuidor_tienda
                ? this.user.distribuidor_coordinador.value
                : null,
              distribuidor_tienda: this.user.distribuidor_tienda,
              cif: this.user.cif,
              userCreador: this.currentUser.id
            },
            setting
          );

          if (!this.enviarEmail) {
            this.$router.push({
              name: "detalleUsuario",
              params: { id: data.id }
            });
          } else {
            await this.sendEmail(data.id, this.user);
            this.$router.push({
              name: "detalleUsuario",
              params: { id: data.id }
            });
          }
        }
      } catch (err) {
        console.log(err.response);
        if (err.response) {
          let e = err.response.data.data[0].messages[0];
          if (err.response.status == 500) {
            this.messageError(e);

            return;
          } else {
            this.messageError(e);
            return;
          }
        } else if (err.request) {
          let e = {
            message: "Tiempo de espera excedido o solicitud no enviada",
            id: "ERROR CONEXION"
          };

          this.messageError(e);

          return;
        } else {
          let e = {
            message:
              "UPPS ha ocurrido un error. Revise la consola para mas datos.",
            id: "ERROR"
          };
          this.messageError(e);
          console.log(err);
          console.log(err.response);
          return;
        }
      }
    },
    messageError(e) {
      this.$notify({
        group: "error",
        title: e.id,
        text: e.message
      });
      this.submitStatus = null;
    },
    limpiar() {
      this.user.nombre = "";
      this.user.apellidos = "";
      this.user.email = "";
      this.user.password = "";
      this.user.rol = "";
      this.user.telephone = "";
      this.user.province = "";
      this.user.delegacion = "solar";
      this.user.delegado = "";
      this.user.empresa = "";
      this.user.cif = "";
      this.state = true;
      this.user.direccion = "";
      this.submitStatus = null;
      this.success = false;
      this.error = false;
      this.resetValidation();
      this.autosat = false;
    },
    resetValidation() {
      /*Validaciones*/
      this.$v.user.nombre.$reset();
      this.$v.user.email.$reset();
      this.$v.user.password.$reset();
      this.$v.user.telephone.$reset();
      this.$v.user.province.$reset();
      this.$v.user.rol.$reset();
      this.$v.user.empresa.$reset();
      if (this.user.rol.value == 5) {
        this.$v.user.delegado.$reset();
      }
    }
  },
  computed: {
    ...mapGetters(["esMaster", "esDelegado", "currentUser", "esSemi"]),
    availablePermisos() {
      return this.optionsPermisos.filter(
        opt => this.arrayPermisos.indexOf(opt) === -1
      );
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
<style>
.label-input-form {
  font-weight: 800;
}
</style>
