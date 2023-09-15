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
              Creado por:
              <span style="color: black;font-weight: 800;" v-if="usuario.userCreador">{{ usuario.userCreador.nombre }} {{ usuario.userCreador.apellidos }}</span>
              <span v-else style="color: black;font-weight: 800;" >ADMINISTRADOR</span>
            </b-card-text> 
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
                <b-form-group label="Email" class="label-input-form mb-4">
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
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group
                  v-if="this.$store.state.user.currentUser.role.id === 1"
                  label="Rol del usuario"
                  class="label-input-form mb-4"
                >
                  <v-select
                    :options="rolesMaster"
                    required
                    v-model="$v.usuarioEdit.rol.$model"
                    @input="$v.usuarioEdit.rol.$reset()"
                    @blur="$v.usuarioEdit.rol.$touch()"
                    autocomplete="off"
                  />

                  <b-form-invalid-feedback v-if="!$v.usuarioEdit.rol.required"
                    >Por favor, ingrese el usuarioEdit.rol del
                    usuario</b-form-invalid-feedback
                  >
                </b-form-group>
                <b-form-group
                  v-else
                  label="Rol del usuario"
                  class="label-input-form mb-4"
                >
                  <v-select
                    :options="rolesSemi"
                    required
                    v-model="$v.usuarioEdit.rol.$model"
                    @input="$v.usuarioEdit.rol.$reset()"
                    @blur="$v.usuarioEdit.rol.$touch()"
                    autocomplete="off"
                  />

                  <b-form-invalid-feedback v-if="!$v.usuarioEdit.rol.required"
                    >Por favor, ingrese el rol del
                    usuario</b-form-invalid-feedback
                  >
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <b-form-group label="Telefono" class="label-input-form mb-4">
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
                    >El numero telefonico debe tener más de 4
                    caracteres</b-form-invalid-feedback
                  >
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group
                  label="Contraseña"
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
              <b-col sm="4">
                <b-form-group label="Provincia" class="label-input-form mb-4">
                  <v-select
                    :options="provincias"
                    required
                    v-model="usuarioEdit.provincia"
                    autocomplete="off"
                  />
                </b-form-group>
              </b-col>
              <!--  <b-col sm="6">
                <b-form-group label="Provincia" class="label-input-form mb-4">
                  <b-form-input
                    type="text"
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
                </b-form-group>
              </b-col> -->
              <b-col sm="4">
                <b-form-group label="Empresa" class="label-input-form mb-4">
                  <b-form-input
                    type="text"
                    required
                    v-model="usuarioEdit.empresa"
                    autocomplete="off"
                  />
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="CIF" class="label-input-form mb-4">
                  <b-form-input
                    type="text"
                    required
                    v-model="usuarioEdit.cif"
                    autocomplete="off"
                  />
                </b-form-group>
              </b-col>
              <b-col sm="6" v-if="esMaster || esSemi">
                <b-form-group
                  label="Código cliente"
                  class="label-input-form mb-4"
                >
                  <b-form-input
                    type="text"
                    required
                    v-model="usuarioEdit.codigo_cliente"
                    autocomplete="off"
                  />
                </b-form-group>
              </b-col>
              <b-col sm="6" v-if="esMaster || esSemi">
                <b-form-group
                  label="Código representante"
                  class="label-input-form mb-4"
                >
                  <b-form-checkbox
                    v-model="input_select"
                    name="check-button"
                    switch
                    style="position: absolute;top: -29px;left: 170px;"
                  >
                    Otro
                  </b-form-checkbox>
                  <v-select
                    v-if="!input_select"
                    :options="prepararRepresentantes()"
                    required
                    @input="representanteSeleccionado()"
                    v-model="usuarioEdit.codigo_representante"
                    autocomplete="off"
                  />
                  <b-form-input
                    v-else
                    type="text"
                    required
                    v-model="usuarioEdit.codigo_representante_real"
                    autocomplete="off"
                  />
                </b-form-group>
              </b-col>

              <b-col sm="12">
                <b-form-group
                  label="Comunidad Autónoma:"
                  class="label-input-form mb-4"
                >
                  <v-select
                    :options="comunidades"
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
                    autocomplete="off"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row
        v-if="
          usuarioEdit.rol.value == 4 || usuarioEdit.rol.value == 3 || usuarioEdit.rol.value == 10
        "
      >
        <b-col sm="6" v-if="esMaster">
          <b-form-group label="Delegacion" class="label-input-form mb-4">
            <v-select
              :options="delegacion"
              v-model="usuarioEdit.delegacion"
              style="text-transform:capitalize"
            />
          </b-form-group>
        </b-col>
      </b-row>
            <b-row v-if="usuarioEdit.rol.value == 4">
              <b-col sm="6" v-if="esMaster">
                <b-form-group label="Delegado *" class="label-input-form mb-4">
                  <v-select
                    :options="delegados"
                    required
                    v-model="$v.usuarioEdit.delegadx.$model"
                    @input="$v.usuarioEdit.delegadx.$reset()"
                    @blur="$v.usuarioEdit.delegadx.$touch()"
                    autocomplete="off"
                  />
                  <b-form-invalid-feedback
                    v-if="!$v.usuarioEdit.delegadx.required"
                    >Por favor, ingrese el delegado</b-form-invalid-feedback
                  >
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group label="Permisos" class="label-input-form mb-4">
                  <b-form-checkbox
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.incidencias"
                    >Incidencias</b-form-checkbox
                  >
                  <b-form-checkbox
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.pedidos"
                    >Pedidos Productos</b-form-checkbox
                  >
                  <b-form-checkbox
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.roturas"
                    >Roturas</b-form-checkbox
                  >
                  <b-form-checkbox
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.stock"
                    >Stock</b-form-checkbox
                  >
                  <b-form-checkbox
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.documentacion_comercial"
                    >Documentación comercial</b-form-checkbox
                  >
                </b-form-group>
              </b-col>

              <b-col
                sm="6"
                v-if="
                  usuarioEdit.rol.value == 4 && !usuarioEdit.distribuidor_tienda
                "
              >
                <b-form-group
                  label="Distribuidor con autosat"
                  class="label-input-form mb-4"
                >
                  <b-form-checkbox
                    @change.capture="cambios('autosat')"
                    v-model="usuarioEdit.autosat"
                    name="autosat"
                    switch
                  >
                    <strong
                      >Marque esta opción si el distribuidor cuenta con un
                      Servicio Técnico propio</strong
                    >
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              <b-col sm="6" v-if="usuarioEdit.rol.value == 4">
                <b-form-group
                  label="Distribuidor tienda"
                  class="label-input-form mb-4"
                >
                  <b-form-checkbox
                    v-model="usuarioEdit.distribuidor_tienda"
                    name="tienda"
                    @change.capture="cambios('tienda')"
                    switch
                  >
                    <strong
                      >Marque esta opción si el distribuidor es un distribuidor
                      tienda y posee un distribuidor coordinador</strong
                    >
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row
              v-if="usuarioEdit.rol.value != 4 && usuarioEdit.rol.value != 10"
            >
              <b-col sm="6" v-if="esMaster && usuarioEdit.rol.value == 5">
                <b-form-group label="Delegado *" class="label-input-form mb-4">
                  <v-select
                    :options="delegados"
                    required
                    v-model="usuarioEdit.delegadx"
                    autocomplete="off"
                  />
                </b-form-group>
              </b-col>
              <b-col v-if="usuarioEdit.rol" sm="12">
                <b-form-group label="Permisos" class="label-input-form mb-4">
                  <b-form-checkbox
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.incidencias"
                    >Incidencias</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-if="usuarioEdit.rol.value != 5"
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.pedidos"
                    >Pedidos Productos</b-form-checkbox
                  >
                  <b-form-checkbox
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.pedidos_repuesto"
                    >Pedidos Repuestos
                  </b-form-checkbox>
                  <b-form-checkbox
                    v-if="usuarioEdit.rol.value != 5"
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.roturas"
                    >Roturas</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-if="usuarioEdit.rol.value != 5"
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.stock"
                    >Stock</b-form-checkbox
                  >
                  <b-form-checkbox
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.puestas_en_marcha"
                    >Puestas en marcha</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-if="usuarioEdit.rol.value != 5"
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.documentacion_comercial"
                    >Documentación comercial</b-form-checkbox
                  >
                  <b-form-checkbox
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.documentacion_tecnica"
                    >Documentación técnica</b-form-checkbox
                  >
                </b-form-group>
              </b-col>
            </b-row>

            <b-row v-if="usuarioEdit.rol.value == 10">
              <b-col v-if="esMaster || esSemi" sm="12">
                <b-form-group label="Permisos" class="label-input-form mb-4">
                  <b-form-checkbox
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.incidencias"
                    >Incidencias</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-if="usuarioEdit.rol.value != 5"
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.pedidos"
                    >Pedidos Productos</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-if="usuarioEdit.rol.value != 5"
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.roturas"
                    >Roturas</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-if="usuarioEdit.rol.value != 5"
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.stock"
                    >Stock</b-form-checkbox
                  >
                  <b-form-checkbox
                    v-if="usuarioEdit.rol.value != 5"
                    class="custom-control-inline"
                    switch
                    v-model="usuarioEdit.documentacion_comercial"
                    >Documentación comercial</b-form-checkbox
                  >
                </b-form-group>
              </b-col>
            </b-row>
            <b-row
              v-if="
                usuarioEdit.rol.value == 4 &&
                  usuarioEdit.distribuidor_tienda == true
              "
            >
              <b-col sm="6" v-if="esMaster || esSemi">
                <b-form-group
                  label="Distribuidor coordinador *"
                  class="label-input-form mb-4"
                >
                  <v-select
                    :options="distribuidores_coordinadores"
                    v-model="usuarioEdit.distribuidor_coordinador"
                  />
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
                    placeholder="Apellidos"
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
            <b-row>
              <b-col sm="6">
                <b-form-group
                  label="Envío de email"
                  class="label-input-form mb-4"
                >
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
              :disabled="
                $v.$invalid || submitStatus === 'PENDING' || success == true
              "
              @click="updateUser()"
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
import { apiUrl, timeoutDb } from "@/constants/config";
import Avatar from "vue-avatar";
import qs from "qs";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
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
    Avatar,
    "v-select": vSelect
  },
  created() {
    this.id = this.$route.params.id;
    this.obtenerDatosUser();
    this.getDelegados();
    this.getProvincias();
    this.getCoordinadores();
    this.getMetaUser();
    this.getRepresentantes();
  },

  validations() {
    if (
      this.usuarioEdit.rol.value === 1 ||
      this.usuarioEdit.rol.value === 3 ||
      this.usuarioEdit.rol.value === 5
    ) {
      return {
        usuarioEdit: {
          password: {
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
          telefono: {
            required,
            maxLength: maxLength(15),
            minLength: minLength(6)
          }
        }
      };
    } else if (this.usuarioEdit.rol.value === 4 && this.esMaster) {
      return {
        usuarioEdit: {
          password: {
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
          telefono: {
            required,
            maxLength: maxLength(15),
            minLength: minLength(6)
          },
          delegadx: {
            required
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
      delegacion: ['solar','horus','klover','hase'],
      input_select: false,
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
      type: true,
      distribuidores_coordinadores: [],
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
        codigo_cliente: "",
        codigo_representante: "",
        cif: "",
        zona: "",
        rol: {
          label: "",
          value: ""
        },
        distribuidor_tienda: false,
        distribuidor_coordinador: null,
        codigo_representante_real:'',
        delegacion:'solar',
        userCreador: "",
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
      enviarEmail: false,
      metaUser: [],
      representantes: []
    };
  },
  methods: {
    prepararRepresentantes() {
      return this.representantes;
    },
    cambios(dato) {
      if (dato == "tienda") {
        this.usuarioEdit.autosat = false;
      } else if (dato == "autosat") {
        this.usuarioEdit.distribuidor_tienda = false;
        this.usuarioEdit.distribuidor_coordinador = null;
      }
    },
    async updateMeta() {
      try {
        let header = {
          Authorization: `Bearer ${this.$store.state.user.authorization}`
        };
        let setting = { headers: header, timeout: timeoutDb };

        if (this.metaUser) {
          var { data } = await axios.put(
            `/meta-users/${this.metaUser.id}`,
            this.datosEnvios,
            setting
          );
        } else {
          let datos = this.datosEnvios;

          datos["user"] = this.$route.params.id;

          var { data } = await axios.post(`/meta-users`, datos, setting);
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

        let { data } = await axios.get(
          `meta-users?_where[user]=${this.$route.params.id}`,
          setting
        );

        this.metaUser = data[0];
        data = data[0];
        if (!data) {
          return;
        }

        this.datosEnvios.nombre = data.nombre;
        this.datosEnvios.apellidos = data.apellidos;
        this.datosEnvios.ciudad = data.ciudad;
        this.datosEnvios.provincia = data.provincia;
        this.datosEnvios.pais = data.pais;
        this.datosEnvios.codigo_postal = data.codigo_postal;
        this.datosEnvios.direccion = data.direccion;
        this.datosEnvios.numero_interior = data.numero_interior;
      } catch (e) {
        console.log(e);
      }
    },
    async getCoordinadores() {
      try {
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
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    getCurrentDelegado(data) {
      let { id, nombre, apellidos, codigo_cliente } = data;

      this.usuarioEdit.delegadx = {
        label: `${nombre} ${apellidos} (${codigo_cliente})`,
        value: id
      };
    },
    getDelegados() {
      if (!this.esMaster && !this.esSemi) {
        return;
      }
      let header = {
        Authorization: `Bearer ${this.$store.state.user.authorization}`
      };
      let setting = { headers: header, timeout: timeoutDb };
      axios
        .get(apiUrl + "users/delegados", setting)
        .then(response => {
          this.prepareDelegados(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getRepresentantes() {
      if (!this.esMaster && !this.esSemi) {
        return;
      }

      try {
        let header = {
          Authorization: `Bearer ${this.$store.state.user.authorization}`
        };
        let setting = { headers: header, timeout: timeoutDb };
        let query = qs.stringify({
          _where: [
            {
              _or: [ { role: 3 }]
            }
          ]
        });

        let { data } = await axios.get(`users?${query}&_sort=nombre`, setting);

        // preparar

        var dataArray = data;
        var representantes = [];
        var codigo = this.usuarioEdit.codigo_representante_real;
        var representantx = '';
        dataArray.forEach(function(representante) {
          if (!representante.blocked) {

            var obj = {};
            obj[
              "label"
            ] = `${representante.nombre} ${representante.apellidos} (${representante.codigo_cliente}) | ${representante.role.name}`;
            obj["value"] = representante.id;
            obj["empresa"] = representante.empresa;
            obj["codigo_cliente"] = representante.codigo_cliente;
            representantes.push(obj);
            if(representante.codigo_cliente == codigo){


              representantx = `${representante.nombre} ${representante.apellidos} (${representante.codigo_cliente}) | ${representante.role.name}`;


            }
          }
        });
        this.usuarioEdit.codigo_representante = representantx;
        this.representantes = representantes;
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser() {
      try {
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

          let { data } = await axios.put(
            `/users/${this.usuario.id}`,
            {
              role: this.usuarioEdit.rol.value,
              nombre: this.usuarioEdit.nombre,
              email: this.usuarioEdit.email,
              apellidos: this.usuarioEdit.apellidos,
              telefono: this.usuarioEdit.telefono,
              password: this.usuarioEdit.password,
              province: this.usuarioEdit.provincia.value,
              delegacion:this.usuarioEdit.delegacion,

              delegado: this.usuarioEdit.delegadx.value,
              telefono: this.usuarioEdit.telefono,
              empresa: this.usuarioEdit.empresa,
              direccion: this.usuarioEdit.direccion,
              blocked: this.state,
              autosat: this.usuarioEdit.autosat,
              pedidos: this.usuarioEdit.pedidos
                ? this.usuarioEdit.pedidos
                : false,
              pedidos_repuesto: this.usuarioEdit.pedidos_repuesto
                ? this.usuarioEdit.pedidos_repuesto
                : false,
              documentacion_tecnica: this.usuarioEdit.documentacion_tecnica,
              documentacion_comercial: this.usuarioEdit.documentacion_comercial,
              roturas: this.usuarioEdit.roturas,
              incidencias: this.usuarioEdit.incidencias,
              stock: this.usuarioEdit.stock,
              puestas_en_marcha: this.usuarioEdit.puestas_en_marcha,
              zona: this.usuarioEdit.zona.value,
              codigo_cliente: this.usuarioEdit.codigo_cliente,
              codigo_representante: this.usuarioEdit.codigo_representante_real,
              cif: this.usuarioEdit.cif,
              distribuidor_coordinador: this.usuarioEdit
                .distribuidor_coordinador
                ? this.usuarioEdit.distribuidor_coordinador.value
                : null,
              distribuidor_tienda: this.usuarioEdit.distribuidor_tienda
            },
            setting
          );

          await this.updateMeta();

          this.submitStatus === "OK";
          this.success = true;
          setTimeout(() => {
            this.submitStatus = null;
            this.success = false;

            Promise.all([
              this.obtenerDatosUser(),
              this.getDelegados(),
              this.getCoordinadores(),
              this.getRepresentantes(),
              this.sendEmail()
            ]);
          }, 3000);
        }
      } catch (err) {
        console.log(err.response.data);
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
      }
    },
    async sendEmail() {
      try {
        if (!this.enviarEmail) {
          return;
        }
        let header = {
          Authorization: `Bearer ${this.$store.state.user.authorization}`
        };
        let setting = { headers: header };

        let { data } = await axios.post(
          `/email/nuevo-usuario/`,
          { id: this.usuario.id, data: this.usuarioEdit },
          setting
        );

        this.enviarEmail = false;
      } catch (error) {
        console.log(error.response);
      }
    },
    representanteSeleccionado() {
      //this.usuarioEdit.codigo_representante = `${this.usuarioEdit.delegadx.label}`;
if(!this.usuarioEdit.codigo_representante){
  return
}
      this.usuarioEdit.codigo_representante_real = this.usuarioEdit.codigo_representante.codigo_cliente;
    },
    prepareDelegados(data) {
      var dataArray = data;
      var delegados = [];
      dataArray.forEach(function(delegado) {
        if (!delegado.blocked) {
          var obj = {};
          obj[
            "label"
          ] = `${delegado.nombre} ${delegado.apellidos} (${delegado.codigo_cliente})`;
          obj["value"] = delegado.id;
          obj["empresa"] = delegado.empresa;
          obj["codigo_cliente"] = delegado.codigo_cliente;
          delegados.push(obj);
        }
      });
      this.delegados = delegados;
    },
    generatePassword() {
      this.usuarioEdit.password = generator.generate({
        length: 8,
        numbers: true
      });
    },
    async obtenerDatosUser() {
      try {
        this.isLoad = false;
        let me = this;
        let header = {
          Authorization: `Bearer ${this.$store.state.user.authorization}`
        };
        let setting = { headers: header };
        let { data } = await axios.get(
          `/users/${this.$route.params.id}`,
          setting
        );

        this.usuario = data;
        this.usuarioEdit.nombre = data.nombre;
        this.usuarioEdit.email = data.email;
        this.usuarioEdit.delegacion = data.delegacion;
        this.usuarioEdit.password = data.password;
        this.usuarioEdit.apellidos = data.apellidos;
        this.usuarioEdit.direccion = data.direccion;
        this.prepareRol(data.role);
        this.usuarioEdit.state = data.blocked;
        this.usuarioEdit.empresa = data.empresa;
        this.usuarioEdit.zona = data.zona;
        this.usuarioEdit.codigo_representante = data.codigo_representante;
        this.usuarioEdit.codigo_representante_real = data.codigo_representante;
        this.usuarioEdit.cif = data.cif;
        this.usuarioEdit.codigo_cliente = data.codigo_cliente;
        this.usuarioEdit.distribuidor_tienda = data.distribuidor_tienda;
        this.usuarioEdit.distribuidor_coordinador =
          data.distribuidor_coordinador;

        this.usuarioEdit.userCreador = data.userCreador;

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
          (this.usuarioEdit.documentacion_tecnica = data.documentacion_tecnica),
          (this.usuarioEdit.documentacion_comercial =
            data.documentacion_comercial),
          (this.usuarioEdit.roturas = data.roturas),
          (this.usuarioEdit.stock = data.stock),
          (this.usuarioEdit.puestas_en_marcha = data.puestas_en_marcha),
          (this.usuarioEdit.telefono = data.telefono);

        this.prepararPermisos();
        this.isLoad = true;
      } catch (error) {
        console.log(error);
        // this.$router.push({ path: "/error" });
      }
    },

    hideModal(refname) {
      this.$refs[refname].hide();
    },
    prepareRol(data) {
      var rolValue = data.id;
      var rolActual = [];

      var obj = {};
      if (rolValue == 1) {
        obj["label"] = "Silnature";
      } else if (rolValue == 3) {
        obj["label"] = "Delegado";
      } else if (rolValue == 5) {
        obj["label"] = "Técnico";
      } else if (rolValue == 4) {
        obj["label"] = "Distribuidor";
      } else if (rolValue == 9) {
        obj["label"] = "Semi Master";
      } else if (rolValue == 10) {
        obj["label"] = "Distribuidor coordinador";
      }
      obj["value"] = rolValue;
      rolActual.push(obj);

      this.usuarioEdit.rol = rolActual[0];
    },
    prepararPermisos() {
      //Permita mostrar el label del permisos y ser más amigable de cara al usuario
      var permisxs = this.usuarioEdit.permisos;

      var permisos = [];
      for (let x in permisxs) {
        if (permisxs[x] == true) {
          permisos.push(x);
        }
      }
      this.usuarioEdit.permisos = permisos;
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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    });
  },
  computed: {
    ...mapGetters(["esMaster", "esDelegado", "currentUser", "esSemi"]),
    mostrarNoAmin() {
      if (this.usuarioEdit.rol.value == 4 || this.usuarioEdit.rol.value == 5) {
        return true;
      } else {
        return false;
      }
    },

    availablePermisos() {
      return this.optionsPermisos.filter(
        opt => this.usuarioEdit.permisos.indexOf(opt) === -1
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
.contraseña legend.bv-no-focus-ring.col-form-label div {
  display: flex;
  align-items: flex-start;
}
</style>
