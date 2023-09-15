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
            :title="usuario.nombre"
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
              <span v-if="usuario.role.id == '1'" style="color: black"
                >MASTER / SOLARTENIK</span
              >
              <span v-else-if="usuario.role.id == '3'" style="color: black"
                >SEMIMASTER</span
              >
              <span v-else-if="usuario.role.id == '4'" style="color: black"
                >DISTRIBUIDOR</span
              >
              <span v-else-if="usuario.role.id == '9'" style="color: black"
                >SEMI MASTER</span
              >
              <span v-else style="color: black">TÉNICO</span>
            </b-card-text>
            <b-card-text>
              Empresa:
              <span style="color: black">{{ usuario.empresa }}</span>
            </b-card-text>
            <b-card-text v-if="usuario.delegado">
              Delegado: <span style="color: black">{{ usuario.delegado }}</span>
            </b-card-text>
            <!-- <b-card-text>
              Provincia:
              <span style="color: black">{{ usuario.provincia }}</span> 
            </b-card-text>-->
            <b-card-text>
              Permisos:
              <span style="color: black">
                <ul id="example-2">
                  <li
                    style="text-transform: capitalize"
                    v-if="usuario.documentacion_comercial"
                  >
                    Documentación comercial
                  </li>
                  <li
                    style="text-transform: capitalize"
                    v-if="usuario.documentacion_tecnica"
                  >
                    Documentación técnica
                  </li>
                  <li style="text-transform: capitalize" v-if="usuario.pedidos">
                    Pedidos productos
                  </li>
                  <li
                    style="text-transform: capitalize"
                    v-if="usuario.pedidos_repuesto"
                  >
                    Pedidos repuestos
                  </li>
                  <li
                    style="text-transform: capitalize"
                    v-if="usuario.incidencias"
                  >
                    incidencias
                  </li>
                  <li style="text-transform: capitalize" v-if="usuario.roturas">
                    Roturas
                  </li>
                  <li
                    style="text-transform: capitalize"
                    v-if="usuario.puestas_en_marcha"
                  >
                    Puestas en marcha
                  </li>
                  <li style="text-transform: capitalize" v-if="usuario.stock">
                    Stock
                  </li>
                </ul>
              </span>
            </b-card-text>
          </b-card>
          <b-card
            title="Estado"
            img-top
            tag="article"
            style=""
            class="mb-2 card-sombra sidebar-menu"
          >
            <b-card-text v-if="!usuario.blocked"> ACTIVO </b-card-text>
            <b-card-text v-else> BLOQUEADO </b-card-text>
          </b-card>
        </div>
        <b-col class="col-md-9 col-sm-12">
          <b-form>
            <b-row>
              <b-col sm="6">
                <b-form-group label="Nombre" class="label-input-form mb-4">
                  <b-form-input
                    v-model="usuarioEdit.nombre"
																				readonly
                  />

                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group label="Apellidos" class="label-input-form mb-4">
                  <b-form-input
                    v-model="usuarioEdit.apellidos"
                    readonly
                  />

                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group label="Email" class="label-input-form mb-4">
                  <b-form-input
                    type="email"
                    required
                    v-model="usuarioEdit.email"
																				readonly
                  />
                </b-form-group>
              </b-col>

         
              <b-col sm="6">
                <b-form-group label="Empresa" class="label-input-form mb-4">
                  <b-form-input
                    type="text"
                    required
                    v-model="usuarioEdit.empresa"
																				readonly
																				

                  />


                </b-form-group>
              </b-col>

              <b-col sm="12">
                <b-form-group label="Comunidad Autónoma:" class="label-input-form mb-4">
                  <b-form-input
                    type="text"
                    v-model="usuarioEdit.zona"
                    readonly
                  />
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <b-form-group label="Dirección" class="label-input-form mb-4">
                  <b-form-input
                    type="text"
                    v-model="usuarioEdit.direccion"
                    readonly
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </body>

  <div v-else class="loading"></div>
</template>

<script>
import { apiUrl, timeoutDb } from "@/constants/config";
import Avatar from "vue-avatar";
import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapGetters } from "vuex";

export default {
  components: {
    Avatar,
    "v-select": vSelect
  },
  created() {
    this.id = this.$route.params.id;
    this.obtenerDatosUser();
  },


  data() {
    return {

      type: true,

      optionsPermisos: ["incidencias", "roturas", "pedidos", "documentacion"],
      isLoad: true,
      visible: true,
      idDelegado: "",
      id: "",
      apiUser: apiUrl + "user",
      usuario: {},
      usuarioEdit: {
        apellidos: "",
        nombre: "",
        email: "",
        direccion: "",
        password: "",
        empresa: "",
        delegadx: {},
        provincia: {},
        telefono: "",
        autosat: false,
        incidencias: false,
        roturas: false,
        pedidos: false,
        pedidos_repuesto: false,
        documentacion_tecnica: false,
        documentacion_comercial: false,
        stock: false,
        puestas_en_marcha: false,
        codigo_cliente:'',
        odigo_representante:'',
        zona:'',
        rol: {
          label: "",
          value: ""
        }
      },
      apiUpdate: apiUrl + "user/update",
      relistar: false,
      submitStatus: null,
      success: false,
      dismissSecs: 3,
      dismissCountDown: 0,
      error: false,
      message: [],
      delegados: [],
      provincias: [],
      enviarEmail:false
    };
  },
  methods: {
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
    getCurrentDelegado(data) {
      let { id, nombre, apellidos } = data;

      this.usuarioEdit.delegadx = {
        label: `${nombre} ${apellidos}`,
        value: id
      };
  
    },
    async obtenerDatosUser() {

      try {
      this.isLoad = false;
      let me = this;
      let header = {
        Authorization: `Bearer ${this.$store.state.user.authorization}`
      };
      let setting = { headers: header };
      let {data} = await axios.get(`/users/${this.$route.params.id}`, setting)

          this.usuario = data;
          this.usuarioEdit.nombre = data.nombre;
          this.usuarioEdit.email = data.email;
          this.usuarioEdit.password = data.password;
          this.usuarioEdit.apellidos = data.apellidos;
          this.usuarioEdit.direccion = data.direccion;
          this.usuarioEdit.state = data.blocked;
          this.usuarioEdit.empresa = data.empresa;
          this.usuarioEdit.zona = data.zona;
          this.usuarioEdit.codigo_representante = data.codigo_representante;
          this.usuarioEdit.codigo_cliente = data.codigo_cliente;
          console.log(data);
          if (data.delegado) {
            this.getCurrentDelegado(data.delegado);
            this.usuario.delegado = data.delegado.nombre
              ? `${data.delegado.nombre} ${data.delegado.apellidos}`
              : data.delegado;
          }
          this.usuarioEdit.autosat = data.autosat;
          if (data.province) {
            this.usuarioEdit.provincia = {
              label: data.province.nombre,
              value: data.province.id
            };
          } else {
            this.usuarioEdit.provincia = {
              label: "Alicante/Alacant",
              value: 2
            };
          }

          (this.usuarioEdit.incidencias = data.incidencias),
            (this.usuarioEdit.pedidos = data.pedidos),
            (this.usuarioEdit.pedidos_repuesto = data.pedidos_repuesto),
            (this.usuarioEdit.documentacion_tecnica =
              data.documentacion_tecnica),
            (this.usuarioEdit.documentacion_comercial =
              data.documentacion_comercial),
            (this.usuarioEdit.roturas = data.roturas),
            (this.usuarioEdit.stock = data.stock),
            (this.usuarioEdit.puestas_en_marcha = data.puestas_en_marcha),
            (this.usuarioEdit.telefono = data.telefono);


          this.isLoad = true;

          console.log(data)
      }catch(error) {
          
          console.log(error);
          // this.$router.push({ path: "/error" });
      };
    }
  },
  computed: {
    ...mapGetters(["esMaster", "esDelegado", "currentUser", "esSemi"]),
    mostrarNoAmin() {
      if (this.usuarioEdit.rol.value == 4 || this.usuarioEdit.rol.value == 5) {
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
