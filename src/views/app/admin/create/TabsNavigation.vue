<template>
  <div>
    <b-tabs
      no-fade
      class="pl-0 pr-0 h-100"
      content-class="chat-app-tab-content"
      nav-class="card-header-tabs ml-0 mr-0"
      v-model="tabIndex"
    >
      <b-tab
        title="Copywriter"
        active
        title-item-class="w-30 text-center"
        no-body
        class="chat-app-tab-pane"
      >
        <div class="pt-4 spaced-content pb-0 mt-2"></div>

        <b-row class="p-4">
          <b-colxx xxs="12" sm="6" md="6" lg="6">
            <b-form-group label="Idioma" label-for="language" class="mb-2">
              <b-form-select
                id="language"
                key="name"
                text="name"
                v-model="selectedLanguage"
                :options="languages"
                class="mb-2"
                :disabled="statusSend"
              />
            </b-form-group>
          </b-colxx>
          <b-colxx xxs="12" sm="6" md="6" lg="6">
            <b-form-group label="Tono" label-for="tone" class="mb-2">
              <b-form-select
                id="tone"
                v-model="selectedTone"
                value-field="title"
                text-field="title"
                :options="tones"
                class="mb-2"
                :disabled="statusSend"
              />
            </b-form-group>
          </b-colxx>
        </b-row>

        <b-row class="pl-4 pr-4">
          <b-colxx xxs="12" sm="12" md="12" lg="12">
            <b-form-group
              label="Casos de uso"
              label-for="casos_uso"
              class="mb-2"
            >
              <b-form-select
                id="casos_uso"
                value-field="uuid"
                text-field="title"
                key="uuid"
                text="name"
                v-model="prompt"
                :options="arrayPrompts"
                class="mb-2"
                :disabled="statusSend"
              />
            </b-form-group>
          </b-colxx>
        </b-row>

        <b-row class="pl-4 pr-4">
          <b-colxx xxs="12" sm="12" md="12" lg="12">
            <b-form-group
              label="Nivel de creatividad"
              label-for="nivel_creatividad"
              class="mb-2"
            >
              <b-form-select
                id="nivel_creatividad"
                value-field="uuid"
                text-field="title"
                key="uuid"
                text="title"
                v-model="selectedTemperature"
                :options="temperatures"
                class="mb-2"
                :disabled="statusSend"
              />
            </b-form-group>
          </b-colxx>
        </b-row>

        <b-row class="pl-4 pr-4">
          <b-colxx xxs="12" sm="12" md="12" lg="12">
            <b-form-group
              label="Descripción"
              label-for="description"
              class="mb-2"
            >
              <b-form-textarea
                id="description"
                v-model="copyDescription"
                :disabled="statusSend"
                rows="3"
              />
            </b-form-group>
          </b-colxx>
        </b-row>

        <b-row class="pl-4 pr-4 mt-3">
          <b-colxx xxs="12" sm="12" md="12" lg="12">
            <div style="text-align: center;">
              <b-button
                @click="initCopy()"
                variant="primary"
                size="lg"
                :disabled="statusSend"
                :class="{
                  'btn-multiple-state btn-shadow btn-block': true,
                  'show-spinner': statusSend,
                  'show-fail': !statusSend && error
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
                <span class="label" style="color: white;">Write to me</span>
              </b-button>
            </div>
          </b-colxx>
        </b-row>
      </b-tab>
      <b-tab
        title="Chat"
        title-item-class="w-30 text-center"
        no-body
        class="chat-app-tab-pane"
      >
        <div class="pt-4 spaced-content pb-0 mt-2"></div>
        <div v-if="!currentChat">
          <b-row class="p-4 pb-1">
            <div class="col">
              <b-button
          variant="outline-secondary"
          class="mr-4"
          @click="historyChatSwitch()"
        >

        <font-awesome-icon :icon="['fas', 'file-lines']" style="color: #867b75;"/>
        <span>Ver historial de chats</span>
        </b-button> 
            </div>
          </b-row>
          <b-row class="p-4">
            <b-colxx xxs="12" sm="6" md="6" lg="6">
              <b-form-group label="Idioma" label-for="language" class="mb-2">
                <b-form-select
                  id="language"
                  key="name"
                  text="name"
                  v-model="selectedLanguage"
                  :options="languages"
                  class="mb-2"
                  :disabled="statusSend"
                />
              </b-form-group>
            </b-colxx>
            <b-colxx xxs="12" sm="6" md="6" lg="6">
              <b-form-group label="Tono" label-for="tone" class="mb-2">
                <b-form-select
                  id="tone"
                  v-model="selectedTone"
                  value-field="title"
                  text-field="title"
                  :options="tones"
                  class="mb-2"
                  :disabled="statusSend"
                />
              </b-form-group>
            </b-colxx>
          </b-row>

          <b-row class="pl-4 pr-4">
            <b-colxx xxs="12" sm="12" md="12" lg="12">
              <b-form-group
                label="Casos de uso"
                label-for="casos_uso"
                class="mb-2"
              >
                <b-form-select
                  id="casos_uso"
                  value-field="uuid"
                  text-field="title"
                  key="uuid"
                  text="name"
                  v-model="prompt"
                  :options="arrayPrompts"
                  class="mb-2"
                  :disabled="statusSend"
                />
              </b-form-group>
            </b-colxx>
          </b-row>

          <b-row class="pl-4 pr-4">
            <b-colxx xxs="12" sm="12" md="12" lg="12">
              <b-form-group
                label="Nivel de creatividad"
                label-for="nivel_creatividad"
                class="mb-2"
              >
                <b-form-select
                  id="nivel_creatividad"
                  value-field="uuid"
                  text-field="title"
                  key="uuid"
                  text="title"
                  v-model="selectedTemperature"
                  :options="temperatures"
                  class="mb-2"
                  :disabled="statusSend"
                />
              </b-form-group>
            </b-colxx>
          </b-row>

          <b-row class="pl-4 pr-4" v-show="false">
            <b-colxx xxs="12" sm="12" md="12" lg="12">
              <b-form-group
                label="Descripción"
                label-for="description"
                class="mb-2"
              >
                <b-form-textarea
                  id="description"
                  v-model="copyDescription"
                  :disabled="statusSend"
                  rows="3"
                />
              </b-form-group>
            </b-colxx>
          </b-row>

          <b-row class="pl-4 pr-4 mt-3">
            <b-colxx xxs="12" sm="12" md="12" lg="12">
              <div style="text-align: center;">
                <b-button
                  @click="initChat()"
                  variant="primary"
                  size="lg"
                  :disabled="statusSend"
                  :class="{
                    'btn-multiple-state btn-shadow btn-block': true,
                    'show-spinner': statusSend,
                    'show-fail': !statusSend && error
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
                  <span class="label" style="color: white;">Write to me</span>
                </b-button>
              </div>
            </b-colxx>
          </b-row>
        </div>

        <div v-else>
          <conversation-detail
            key="conversation"
            :current-user="currentUser"
            :other-user="iaUser"
            :messages="listMessages"
            :currentMessage="currentMessage"
          />

          <div
            class="chat-input-container d-flex justify-content-between align-items-center"
          >
            <b-form-textarea
              class="flex-grow-1"
              v-model="message"
              placeholder="Introduce un mensaje"
              rows="1"
              max-rows="3"
              :disabled="loadingMessage"
            ></b-form-textarea>
            <div>
              <b-button
                variant="outline-primary"
                class="icon-button large ml-1"
                :disabled = true
              >
                <i class="simple-icon-paper-clip" />
              </b-button>
              <b-button
                variant="primary"
                class="icon-button large ml-1"
                @click="enviarMensaje()"
                :disabled="loadingMessage"
              >
                <i class="simple-icon-arrow-right" />
              </b-button>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab
        title="Incrustaciones"
        title-item-class="w-30 text-center"
        no-body
        class="chat-app-tab-pane"
      >
        <div class="pt-4 spaced-content pb-0 mt-2"></div>

        <b-row class="p-4">
          <b-colxx xxs="12" sm="6" md="6" lg="6">
            <b-form-group
              label="Tipo de incrustacion"
              label-for="tipo"
              class="mb-2"
            >
              <b-form-select
                id="tipo"
                v-model="selectIncrustadion"
                :options="tipoIncrustaciones"
                class="mb-2"
                :disabled="statusSend"
              />
            </b-form-group>
          </b-colxx>
          <b-colxx xxs="12" sm="6" md="6" lg="6">
            <b-form-group label="Cliente" label-for="cliente" class="mb-2">
              <b-form-select
                id="cliente"
                v-model="selectedClient"
                value-field="uuid"
                text-field="name"
                :options="clientes"
                class="mb-2"
                :disabled="statusSend"
              />
            </b-form-group>
          </b-colxx>
        </b-row>

        <b-row class="pl-4 pr-4 mt-0" v-if="selectIncrustadion == 'file'">
          <b-colxx xxs="12" sm="12" md="12" lg="12">
            <b-form-group label="Modo de subida">
              <b-form-radio
                v-model="modeUpload"
                name="some-radios"
                value="archivos"
                >Archivos</b-form-radio
              >
              <b-form-radio
                v-model="modeUpload"
                name="some-radios"
                value="directorios"
                disabled
                >Directorio</b-form-radio
              >
            </b-form-group>
            <b-form-group
              :label="modeUpload == 'archivos' ? 'Archivos' : 'Directorio'"
              label-for="archivo"
              class="mb-2"
            >
              <b-form-file
                id="archivo"
                :multiple="modeUpload == 'archivos' ? true : false"
                :directory="modeUpload == 'archivos' ? false : true"
                v-model="files"
                :state="Boolean(files.length)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                accept="application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/csv, text/plain"
                :disabled="statusSend"
              ></b-form-file>
              <b-button
                @click="subirArchivos()"
                variant="primary"
                size="lg"
                :disabled="statusSend"
                :class="{
                  'btn-multiple-state btn-shadow btn-block': true,
                  'show-spinner': statusSend,
                  'show-fail': !statusSend && error
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
                <span class="label" style="color: white;">Incrustar</span>
              </b-button>
            </b-form-group>

            <vue-perfect-scrollbar
              class="scroll"
              style="height: 200px;"
              :settings="{ suppressScrollX: true, wheelPropagation: false }"
              ref="fileArea"
              id="fileArea"
            >
              <p id="estadosubirarchivos"></p>
              <div class="table-responsive mt-3">
                <table
                  class="table table-striped table-bordered m-0"
                  id="tablesubirarchivos"
                >
                  <thead class="table-dark">
                    <tr>
                      <th></th>
                      <th>Archivo</th>
                      <th>Tamaño</th>

                      <th>Progreso</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(archivo, index) in files" :key="index">
                      <td>
                        <a href="#" @click.prevent="deleteFile(index)">
                          <i class="fas fa-trash-alt"></i>
                        </a>
                      </td>
                      <td>{{ archivo.name }}</td>
                      <td>{{ formatSize(archivo.size) }}</td>
                      <td>
                        <div class="progress" style="height: 20px;">
                          <div
                            class="progress-bar"
                            role="progressbar"
                            :aria-valuenow="getProgress(index)"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            :style="{
                              width: getProgress(index) + '%'
                            }"
                            :id="'progress-bar-' + index"
                          >
                            {{ getProgress(index) }}%
                          </div>
                        </div>
                        <!-- <a
                                                href="#"
                                                @click.prevent="
                                                    cancelUpload(index)
                                                "
                                            >
                                                Cancelar
                                            </a> -->
                      </td>
                    </tr>
                  </tbody>
                  <tfoot class="table-dark">
                    <tr>
                      <th></th>
                      <th>Archivo</th>

                      <th>Tamaño</th>
                      <th>Progreso</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </vue-perfect-scrollbar>
          </b-colxx>
        </b-row>
        <b-row class="pl-4 pr-4 mt-0" v-else>
            <b-colxx xxs="12" sm="12" md="12" lg="12">
              <b-form-group label="Modo de subida">
                <b-form-radio-group
                  id="radio-slots"
                  v-model="modeUrl"
                  name="url-radios"
                >
                  <b-form-radio value="individual">Url Individual</b-form-radio>
                  <b-form-radio value="sitemap">SiteMap</b-form-radio>
                  <b-form-radio value="txt">TXT</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
              <b-form-group
                label="Configuración"
                label-for="recursividad"
                class="mb-2  mt-2"
              >
                <b-button
                  @click="$bvModal.show('modalConfig')"
                  variant="primary"
                  size="lg"
                >
                  Abrir configuración
                </b-button>
              </b-form-group>

              <b-form-group
                :label="
                  modeUrl == 'individual'
                    ? 'URL'
                    : modeUrl == 'sitemap'
                    ? 'SITEMAP'
                    : 'TXT'
                "
                label-for="archivo"
                class="mb-2  mt-2"
              >
                <b-form-input
                  v-if="modeUrl == 'individual' || modeUrl == 'sitemap'"
                  class="mb-2"
                  id="type-ur`"
                  type="url"
                  v-model="url"
                ></b-form-input>
                <p v-if="modeUrl == 'txt'">
                  El archivo debe tener una url por linea
                </p>
                <b-form-file
                  class="mb-2"
                  v-if="modeUrl == 'txt'"
                  id="archivo"
                  :multiple="false"
                  :directory="false"
                  v-model="urlFile"
                  :state="Boolean(urlFile.length)"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  accept="text/plain"
                ></b-form-file>
                <br class="separator" style="height: 30px;" />

                <b-button
                  @click="subirUrl()"
                  variant="primary"
                  size="lg"
                  :disabled="statusSend"
                  :class="{
                    'btn-multiple-state btn-shadow btn-block': true,
                    'show-spinner': statusSend,
                    'show-fail': !statusSend && error
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
                  <span class="label" style="color: white;">Incrustar</span>
                </b-button>
              </b-form-group>
            </b-colxx>
        </b-row>
      </b-tab>
    </b-tabs>

    <b-modal
      id="modalConfig"
      title="Configuración"
      size="lg"
      hide-footer
      centered
    >
      <b-row class="p-4">
        <b-colxx xxs="12" sm="6" md="6" lg="6">
          <b-form-group label-for="recursividad" class="mb-2  mt-2">
            <b-form-checkbox
              id="recursive"
              v-model="isRecursivity"
              name="recursive"
              :disabled="modeUrl != 'individual'"
            >
              Activar recursividad *
            </b-form-checkbox>
            <b-form-checkbox
              id="summarize"
              v-model="isSummarize"
              name="summarize"
            >
              Resumir textos (La pagina se envia a open IA y se devuelve un
              resumen limpio de la web) *
            </b-form-checkbox>
            <b-form-checkbox
              id="cleanHtml"
              v-model="isCleanHtml"
              name="cleanHtml"
            >
              Limpiar de Html (Se limpia el html de la pagina) *
            </b-form-checkbox>
            <b-form-checkbox
              id="puppeteer"
              v-model="isPuppeteer"
              name="puppeteer"
            >
              Usar Puppeteer (Se usa puppeteer para rastrear webs que tienen
              mucho JavaScript) *
            </b-form-checkbox>
          </b-form-group>
        </b-colxx>
        <b-colxx xxs="12" sm="6" md="6" lg="6">
          <b-form-group
            label="Filtro de urls"
            label-for="recursividad"
            class="mb-2  mt-2"
          >
            <b-form-textarea
              id="textarea"
              v-model="urlFilter"
              placeholder="Ingesa una url por linea, puedes usar patrones de expresiones regulares para filtrar las urls"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-colxx>
        <p class="text-muted small">
          * Las opciones harán que el proceso sea más lento, incrementandolo por
          minutos de acuerdo a la cantidad de urls y tamaño de la página.
        </p>
      </b-row>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ApplicationMenu from "@/components/Common/ApplicationMenu";
import ConversationDetail from "@/components/ChatApp/ConversationDetail";
// importo los modelos

import { PaginationModel, PromptLiteModel, TemperatureModel } from "@/models";

// importo el socket
import { socket } from "@/socket";

export default {
  components: {
    "application-menu": ApplicationMenu,
    "conversation-detail": ConversationDetail
  },
  data() {
    return {
      pagination: new PaginationModel(),
      copyDescription: "",
      tabIndex: 0,
      iaUser: {
        id: 1,
        img: "/assets/img/mini-logo.png",
        title: "Ia Bot"
      },
      loadingMessage : false,
      urlFilter: "",
      isRecursivity: false,
      isSummarize: false,
      isCleanHtml: false,
      isPuppeteer: false,
      modeUpload: "archivos",
      url: "",
      urlFile: [],
      modeUrl: "individual",
      tipoIncrustaciones: ["url", "file"],
      selectIncrustadion: "file",
      height: 0,
      statusSend: false,
      message: "",
      files: [],
      currentMessage: "",
      listMessages: [],
      searchKey: "",
      arrayPrompts: [],
      prompt: null,
      selectedLanguage: "Spanish",
      tones: [],
      clientes: [],
      selectedClient: null,
      selectedTone: null,
      temperatures: [],
      selectedTemperature: null,
      currentChat: false,
      languages: [
        { text: "English", value: "English" },
        { text: "Spanish", value: "Spanish" },
        { text: "Euskera", value: "Euskera" }
      ],
      error: false
    };
  },
  computed: {
    ...mapGetters(["currentUser" , "getCurrentChat" , "getStateHistoryChat"])
  },
  methods: {
    async getPromps() {
      try {
        let type = "copy";
        if (this.tabIndex == 1) {
          type = "chat";
        }

        let { data } = await axios.get(`/prompts?_where[0][type][$eq]=${type}`);

        this.arrayPrompts = data.data.map(x => PromptLiteModel.fromJson(x));

        if (this.arrayPrompts.length > 0) {
          this.prompt = this.arrayPrompts[0].uuid;
        }

        this.pagination = PaginationModel.fromJson(data.meta);
      } catch (error) {
        console.log(error);
      }
    },
    async getTones() {
      try {
        let { data } = await axios.get("/tones");

        this.tones = data.data;

        if (this.tones.length > 0) {
          this.selectedTone = this.tones[0].title;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getTemperatures() {
      try {
        let { data } = await axios.get("/temperatures");

        this.temperatures = data.data.map(x => TemperatureModel.fromJson(x));

        if (this.temperatures.length > 0) {
          this.selectedTemperature = this.temperatures[0].uuid;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async initCopy() {
      this.error = false;
      try {
        if (this.prompt == null) {
          this.$bvToast.toast("Error", {
            title: "Selecciona un caso de uso",
            variant: "danger",
            solid: true
          });
          return;
        }

        if (this.selectedTone == null) {
          this.$bvToast.toast("Error", {
            title: "Selecciona un tono",
            variant: "danger",
            solid: true
          });
          return;
        }

        if (this.selectedTemperature == null) {
          this.$bvToast.toast("Error", {
            title: "Selecciona un nivel de creatividad",
            variant: "danger",
            solid: true
          });
          return;
        }

        if (this.copyDescription == "") {
          this.$bvToast.toast("Error", {
            title: "Escribe una descripción",
            variant: "danger",
            solid: true
          });
          return;
        }

        this.statusSend = true;
        let datos = {
          language: this.selectedLanguage,
          tone: this.selectedTone,
          type: "copy",
          prompt: this.prompt,
          temperature: this.selectedTemperature,
          description: this.copyDescription,
          variation: 1
        };

        let { data } = await axios.post("/copy", { data: datos });

    

        // hago un router push a la vista de copy

        this.$router.push({
          name: "file",
          params: { uuid: data.document }
        });

        this.statusSend = false;
      } catch (error) {
        console.log(error);
        this.statusSend = false;
        this.error = true;
      }
    },
    async initChat() {
      try {
        this.statusSend = true;
        let datos = {
          language: this.selectedLanguage,
          tone: this.selectedTone,
          type: "chat",
          prompt: this.prompt,
          temperature: this.selectedTemperature
        };

        // emito por el socket el evento configChat

        socket.emit("configChat", datos);
      } catch (error) {
        console.log(error);
        this.statusSend = false;
      }
    },
    async getChat() {
      try {
        if (this.currentChat == null) {
          return;
        }
        this.statusSend = true;
        let { data } = await axios.get(`/chats/${this.currentChat}`);
        this.statusSend = false;
        this.listMessages = data.messages;
 
      } catch (error) {
        this.statusSend = false;
        console.log(error);
        console.log(error.response);
      }
    },
    async enviarMensaje() {
      if (this.message == "") {
        this.$toast.fire ({
          icon: "error",
          title: "Mensaje vacio",
          text: "Escribe un mensaje, no puedes enviar mensajes vacios"
        });

        return;
      }

      if (this.currentChat == null) {
        this.$bvToast.toast("Error", {
          title: "Selecciona un chat",
          variant: "danger",
          solid: true
        });
        return;
      }

      // verifico el socket esta conectado

      if (socket.connected == false) {
        // muestro un error con toast

        this.$toast.fire ( {
          icon: "error",
          title: "No conectado al servidor",
          text: "No está conectado al servidor, espere un momento o recargue la página"
        });
      }

      try {
        this.statusSend = true;

        this.loadingMessage = true;

        socket.emit("message", {
          message: this.message,
          type: "chat",
          sala: this.currentChat
        });

        // añado el mensaje a la lista de mensajes

        this.listMessages.push({
          sender: "user",
          content: this.message,
          time: new Date().toLocaleTimeString()
        });

        this.message = "";

        this.statusSend = false;
      } catch (error) {}
    },
    async getClients() {
      try {
        let { data } = await axios.get(`/clients`);
        console.log(data);
        this.clientes = data.data;

        if (this.clientes.length > 0) {
          this.selectedClient = this.clientes[0].uuid;
        }
      } catch (error) {
        console.log(error);
      }
    },
    fileToBytes(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          const arrayBuffer = reader.result;
          const bytes = new Uint8Array(arrayBuffer);
          resolve(bytes);
        };

        reader.onerror = error => {
          reject(error);
        };

        reader.readAsArrayBuffer(file);
      });
    },
    async subirArchivos() {
      const files = this.files;

      if (files.length == 0) {
        alert("No hay archivos para subir");
        return;
      }

      const uploadPromises = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("client", this.selectedClient);
        formData.append("type", this.selectIncrustadion);
        formData.append("files", file);

        const uploadPromise = new Promise((resolve, reject) => {
          const cancelTokenSource = axios.CancelToken.source();
          axios
            .post("/document/uploadEmbadding", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: progressEvent => {
                const progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                // Actualizar el progreso de la barra
                let idprogress = "progress-bar-" + i;
                let progressbar = document.getElementById(idprogress);
                progressbar.style.width = progress + "%";
                progressbar.innerHTML = progress + "%";

                if (progress == 100) {
                  // muestro un modal con swall indicando que se esta incrustando el archivo

                  this.$swal.fire({
                    title: "Incrustando archivo",
                    html: "Espere mientras se incrusta el archivo",
                    timerProgressBar: true,
                    didOpen: () => {
                      this.$swal.showLoading();
                    },
                    willClose: () => {
                      this.$swal.hideLoading();
                    }
                  });
                }
              },
              cancelToken: cancelTokenSource.token
            })
            .then(response => {
              console.log(
                `El archivo ${file.name} se ha subido correctamente.`
              );

              this.$toast.fire({
                icon: "success",
                title: `El archivo ${file.name} se ha subido correctamente y ha sido incrustado.`
              });

              console.log(response.data);
              // Procesar la respuesta
              resolve(response.data);
            })
            .catch(error => {
              // Volver la barra de progreso a 0 y de color rojo
              let idprogress = "progress-bar-" + i;
              let progressbar = document.getElementById(idprogress);
              progressbar.style.width = "0%";
              progressbar.innerHTML = "0%";
              progressbar.classList.add("bg-danger");
              progressbar.classList.remove("bg-success");
              progressbar.innerHTML = "Error";
              console.error(`Error al subir el archivo ${file.name}.`);
              console.log(error);
              console.log(error.response);
              // Mostrar el modal o el toast con el error
              this.$bvToast.toast(`Error al subir el archivo ${file.name}.`, {
                title: "Error",
                variant: "danger",
                solid: true
              });
              // Manejar el error
              reject(error);
            })
            .finally(() => {
              // Limpiar el token de cancelación cuando la subida se completa o se produce un error
              cancelTokenSource.cancel();
            });
        });

        uploadPromises.push(uploadPromise);
      }

      try {
        await Promise.all(uploadPromises);

        // limpio la lista de archivos

        this.files = [];

        this.$toast.fire({
          icon: "success",
          title: `Los archivos se han subido correctamente y han sido incrustados.`
        });
      } catch (error) {
        console.error("Ocurrió un error al subir los archivos.", error);

        // muestro el modal  el toast con el error

        this.$bvToast.toast(error.response.data.message, {
          title: "Error",
          variant: "danger",
          solid: true
        });
      }
    },
    historyChatSwitch() {

      

this.$store.commit("setStateHistoryChat", !this.getStateHistoryChat);
},
    async subirUrl() {
      try {
        // obtengo los datos

        // muestro un modal con swall indicando que se esta incrustando el archivo

        this.$swal.fire({
          title: "Preparando proceso",
          html: "Espere mientras se configura el proceso",
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            this.$swal.showLoading();
          },
          willClose: () => {
            this.$swal.hideLoading();
          }
        });

        // creo el formdata

        let formData = new FormData();

        formData.append("client", this.selectedClient);
        formData.append("type", this.modeUrl);
        formData.append("url", this.url);
        formData.append("file", this.urlFile);
        formData.append("recursivity", this.isRecursivity);
        formData.append("summarize", this.isSummarize);
        formData.append("cleanHtml", this.isCleanHtml);
        formData.append("puppeteer", this.isPuppeteer);


        let { data } = await axios.post(
          "/document/uploadUrlEmbadding",
          formData
        );

        this.$swal.close();
        this.$toast.fire({
          icon: "success",
          title: `Los datos se han subido correctamente, se iniciara el proceso de incrustación`
        });
      } catch (error) {
        console.log(error);
        console.log(error.response);
        // cierrro el modal
        this.$swal.close();
        this.$toast.fire({
          icon: "error",
          title: `Error al subir la url`
        });
      }
    },
    async prepararArchivosDirectorio() {
      this.fileDirectorios = [];
      this.fileDirectoriosD = [];

      const files = this.files;

      if (files.length == 0) {
        alert("No hay archivos para subir");
        return;
      }
      this.fileDirectorios = files;

      for (let i = 0; i < files.length; i++) {
        const archivo = files[i];
        const path = archivo.webkitRelativePath;
        const pathArray = path.split("/");

        // Extraer el nombre de la carpeta del path
        const nombreCarpeta = pathArray.slice(0, -1).join("/");
        const directorio = {
          name: nombreCarpeta,
          size: archivo.size,
          progress: 0,
          filesCount: 1,
          estado: "En cola"
        };

        // Verificar si la carpeta ya existe en this.fileDirectoriosD
        const existe = this.fileDirectoriosD.find(
          archivo => archivo.name === nombreCarpeta
        );

        if (!existe) {
          // Si la carpeta no existe, agregarla al array
          this.fileDirectoriosD.push(directorio);
        } else {
          // Si la carpeta ya existe, actualizar los datos
          existe.size += archivo.size;
          existe.filesCount += 1;
        }
      }
    },
    async subirDirectorio() {
      const files = this.fileDirectorios;

      if (files.length == 0) {
        alert("No hay archivos para subir");
        return;
      }

      const uploadPromises = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const formData = new FormData();

        let ruta = this.folder + "/" + file.webkitRelativePath;

        formData.append("folder", ruta);
        formData.append("file", file);

        const uploadPromise = new Promise((resolve, reject) => {
          const cancelTokenSource = axios.CancelToken.source();

          axios
            .post("/document_manager/upload-directory", formData, {
              onUploadProgress: progressEvent => {
                const progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );

                // Actualizar el progreso de la barra
                let idprogress = "progress-bar-file-" + i;
                let progressbar = document.getElementById(idprogress);
                progressbar.style.width = progress + "%";
                progressbar.innerHTML = progress + "%";

                // console.log(
                //     `Progreso de subida del archivo ${file.name}: ${progress}%`
                // );
              },
              cancelToken: cancelTokenSource.token
            })
            .then(response => {
              // console.log(
              //     `El archivo ${file.name} se ha subido correctamente.`
              // );
              console.log(response.data);
              // Procesar la respuesta
              resolve(response.data);
            })
            .catch(error => {
              // Volver la barra de progreso a 0 y de color rojo
              let idprogress = "progress-bar-file-" + i;
              let progressbar = document.getElementById(idprogress);
              progressbar.style.width = "0%";
              progressbar.innerHTML = "0%";
              progressbar.classList.add("bg-danger");
              progressbar.classList.remove("bg-success");
              progressbar.innerHTML = "Error";
              console.error(`Error al subir el archivo ${file.name}.`);
              console.log(error);
              console.log(error.response);
              // Manejar el error
              reject(error);
            })
            .finally(() => {
              // Limpiar el token de cancelación cuando la subida se completa o se produce un error
              cancelTokenSource.cancel();
            });
        });

        uploadPromises.push(uploadPromise);
      }

      try {
        await Promise.all(uploadPromises);
        console.log("Todos los archivos se han subido correctamente.");

        // cierro el modal a los 3 segundos
        setTimeout(() => {
          $("#modaldirectorio").modal("hide");
          this.fileDirectorios = [];
        }, 3000);

        await this.getFiles();
      } catch (error) {
        console.error("Ocurrió un error al subir los archivos.", error);
        setTimeout(() => {
          $("#modaldirectorio").modal("hide");
          this.fileDirectorios = [];
        }, 3000);
        // limpio variables

        await this.getFiles();
      }
    },
    getProgress(index) {
      const archivo = this.files[index];
      if (archivo) {
        return archivo.progress || 0;
      }
      return 0;
    },

    deleteFile(index) {
      const dt = new DataTransfer();

      let files = this.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
      }

      if (dt.files.length == 0) {
        this.files = []; // Assign the updates list
      } else {
        this.files = dt.files; // Assign the updates list
      }

      // Assign the updates list
    },

    formatSize(size) {
      if (size >= 1073741824) {
        size = (size / 1073741824).toFixed(2) + " GB";
      } else if (size >= 1048576) {
        size = (size / 1048576).toFixed(2) + " MB";
      } else if (size >= 1024) {
        size = (size / 1024).toFixed(2) + " KB";
      } else if (size > 1) {
        size = size + " bytes";
      } else if (size == 1) {
        size = size + " byte";
      } else {
        size = "0 bytes";
      }

      return size;
    }
  },
  async mounted() {
    this.statusSend = true;
    this.currentChat = localStorage.getItem("currentChat") || null;
    await Promise.all([
      this.getTones(),
      this.getPromps(),
      this.getTemperatures()
    ]);
    this.statusSend = false;
    if (socket.connected == false) {

      if (socket.auth == null) {
        socket.auth = {
          token: localStorage.getItem("authorization")
        };
      }
      socket.connect();
    }
      socket.on("connect", () => {
        console.log("socket", "conectado");
      });

      socket.on("disconnect", () => {
        console.log("socket", "desconectado");
      });

      socket.on("connect_error", error => {
        console.log("socket", "error de conexion", error);
      });

      socket.on("configChatResponse", data => {
        let { uuid } = data;

        this.currentChat = uuid;
        // guardo en el localstorage el uuid del chat
        localStorage.setItem("currentChat", uuid);
        this.statusSend = false;
      });

      socket.on("error", data => {
        console.log(data);

        //muestro un toast con el error

        this.$bvToast.toast(data.message, {
          title: "Error",
          variant: "danger",
          solid: true
        });
      });

      socket.on("messageResponse", data => {
         
        

        this.currentMessage += data.message;
      });

      socket.on("messageTaskSchedule", data => {
        console.log(data);

        
      });

      socket.on("messageEnd", data => {
      

        data.message.generations.forEach(element => {
          // recorro element

          element.forEach(x => {
            // recorro x
            this.listMessages.push({
              sender: 'ia',
              content: x.text,
              time: new Date().toLocaleTimeString()
            });
          });
        });
        this.loadingMessage = false;
        this.currentMessage = "";
      });
  

    // clalculo la altura de la ventana
  },

  beforeDestroy() {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("connect_error");
    socket.off("configChatResponse");
    socket.off("error");
    socket.off("messageResponse");
    socket.off("messageEnd");
  },

  watch: {
    "socket.connected"(val, oldVal) {
      console.log("connected", val);
    },
    tabIndex(val, oldVal) {
      // si tab es 0  o uno entonces hago un get de los prompts

      if (val == 0 || val == 1) {
        this.getPromps();
        // mando un comit para cargar chats
        if( val == 1){
          this.$store.commit("setLoadChats", true);
        }
        
      }

      if (val == 2) {
        this.getClients();
      }
    },
    selectIncrustadion(val, oldVal) {
      if (val == "url") {
        let height = window.innerHeight;

        this.height = height - 300;

        // en el proximo tick le añado la altura al chat

        this.$nextTick(() => {
          let chat = document.getElementById("areaUrl");

          if (chat != null) {
            chat.style.height = this.height + "px";
          }
        });
      }
    },

    currentChat(val, oldVal) {
      if (val) {
        this.getChat();

        // le añado la altura al chat

        let chat = document.getElementById("chat");

        if (chat != null) {
          chat.style.height = this.height + "px";
        }
      }
    },
    getCurrentChat (val, oldVal) {

    
        this.currentChat = val;
 
      


    }
  }
};
</script>
