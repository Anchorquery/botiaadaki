<template>
  <div>
    <div class="page-header pr-0">
      <h2>
        <a href="/dashboard"><i class="fas fa-tachometer-alt"></i></a>
      </h2>
      <ol class="breadcrumbs">
        <li class="active"><span>Gestor de documentos </span></li>
      </ol>
      <div class="right-wrapper pull-right">
        <a
          href="#"
          data-target="#modalcarpeta"
          data-toggle="modal"
          class="btn btn-custom btn-sm  mt-2 mr-2"
          ><i class="fas fa-folder-plus"></i>
        </a>
        <a
          href="#"
          data-target="#modaldirectorio"
          data-toggle="modal"
          class="btn btn-custom btn-sm  mt-2 mr-2"
          ><i class="fas fa-folder"></i
        ></a>
        <a
          href="#"
          data-target="#modalarchivos"
          data-toggle="modal"
          class="btn btn-custom btn-sm  mt-2 mr-2"
          ><i class="fas fa-upload"></i
        ></a>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="row gutters">
          <div class="col-md-5 col-lg-3 bg-white border-right">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                v-model="searchDirectory"
                placeholder="Buscar directorio"
                @change="searchDirectorio()"
                id="txtsearchfolder"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-primary"
                  type="button"
                  id="btnsearchfolder"
                  @click="searchDirectorio()"
                >
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div>
              <!-- <button @click="addNode">Add Node</button> -->
              <vue-tree-list
                @click="changeRoute"
                :model="tree"
                default-tree-node-name="New Folder"
                default-leaf-node-name="new leaf"
                v-bind:default-expanded="true"
              >
                <template v-slot:leafNameDisplay="slotProps">
                  <span style="margin-left: 5px;">
                    {{ slotProps.model.name }}
                    <!-- <span class="muted"
                                            >#{{ slotProps.model.id }}</span
                                        > -->
                  </span>
                </template>
                <span class="icon" slot="addTreeNodeIcon"
                  ><i class="fas fa-folder-plus"></i></span
                ><br />
                <span class="icon" slot="editNodeIcon"
                  ><i class="fas fa-edit"></i> </span
                ><br />
                <span class="icon" slot="delNodeIcon">
                  <i class="fas fa-trash"></i> </span
                ><br />

                <span class="icon" slot="treeNodeIcon">
                  <i class="fas fa-folder"></i>
                </span>
              </vue-tree-list>
            </div>
          </div>
          <div class="col-md-7 col-lg-9 bg-white">
            <div class="card">
              <div class="card-body pt-0">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Buscar archivos"
                    v-model="search"
                    id="txtsearchfile"
                    @change="getFiles(true)"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-primary"
                      type="button"
                      id="btnsearchfile"
                      @click="getFiles(true)"
                    >
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="row"></div>
            <div class="row" v-if="files.length > 0 && loaded">
              <div
                class="col-md-3 col-lg-3 col-sm-4 col-xs-6"
                v-for="file in files"
                :key="file.id"
              >
                <div class="card">
                  <div class="card-body">
                    <div class="text-center">
                      <a
                        href="#"
                        @click.prevent="onClick(file, true)"
                        v-html="builderTemplate(file)"
                      ></a>
                    </div>
                    <div class="text-center">
                      {{ file.name }}
                    </div>

                    <div class="botonera">
                      <a
                        href="#"
                        class="primary"
                        @click.prevent="viewFile(file)"
                        ><i class="fas fa-eye"></i
                      ></a>
                      <a
                        v-if="file.ext == 'dir'"
                        href="#"
                        style="display: none;"
                        class="success"
                        ><i class="fas fa-edit"></i
                      ></a>
                      <a
                        v-else
                        href="#"
                        @click.prevent="descargarArchivo(file)"
                        class="success"
                        ><i class="fas fa-download"></i
                      ></a>
                      <a
                        href="#"
                        @click.prevent="deleteFiles(file)"
                        class="danger"
                        ><i class="fas fa-trash"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-else-if="!loaded">
              <div class="col-md-12 col-lg-12 col-sm-12">
                <div class="card">
                  <div class="card-body">
                    <div class="text-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-else>
              <div class="col-md-12 col-lg-12 col-sm-12">
                <div class="card">
                  <div class="card-body">
                    <div class="text-center">
                      <h1>No hay archivos</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade centered" id="modalarchivos">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Subir archivos</h4>
            <button
              type="button"
              class="close"
              @click="archivos = []"
              data-dismiss="modal"
            >
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                name="filesubirarchivos[]"
                @change.capture="prepararArchivos($event)"
                multiple
                id="filesubirarchivos"
                accept="text/plain,text/richtext,application/msword,application/vnd.ms-powerpoint,application/vnd.ms-write,application/vnd.ms-excel, application/vnd.ms-access,application/vnd.ms-project,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-word.document.macroEnabled.12, application/vnd.openxmlformats-officedocument.wordprocessingml.template, application/vnd.ms-word.template.macroEnabled.12, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel.sheet.macroEnabled.12,application/vnd.ms-excel.sheet.binary.macroEnabled.12,application/vnd.openxmlformats-officedocument.spreadsheetml.template,application/vnd.ms-excel.template.macroEnabled.12,application/vnd.ms-excel.addin.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint.presentation.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.ms-powerpoint.slideshow.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.template,application/vnd.ms-powerpoint.template.macroEnabled.12,application/vnd.ms-powerpoint.addin.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.slide, application/vnd.ms-powerpoint.slide.macroEnabled.12, application/onenote,application/wordperfect,application/vnd.oasis.opendocument.text,application/vnd.oasis.opendocument.presentation, application/vnd.oasis.opendocument.spreadsheet, application/vnd.oasis.opendocument.graphics,application/vnd.oasis.opendocument.chart,application/vnd.oasis.opendocument.database,application/vnd.oasis.opendocument.formula,application/pdf"
              /><br />
              <label
                class="custom-file-label custom-file-label-primary"
                for="filesubirarchivos"
                >Seleccionar archivos</label
              >
            </div>
            <br />

            <button
              type="button"
              class="btn btn-primary btn-block"
              id="btnsubirarchivos"
              @click="subirArchivos()"
            >
              Subir archivo(s)
            </button>
            <p id="estadosubirarchivos"></p>
            <h5>Archivos</h5>
            <div class="table-responsive">
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
                  <tr v-for="(archivo, index) in archivos" :key="index">
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
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modaldirectorio">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Subir directorio</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                multiple
                name="filedirectorios[]"
                @change.capture="prepararArchivosDirectorio($event)"
                id="filedirectorios"
                accept="text/plain,text/richtext,application/msword,application/vnd.ms-powerpoint,application/vnd.ms-write,application/vnd.ms-excel, application/vnd.ms-access,application/vnd.ms-project,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-word.document.macroEnabled.12, application/vnd.openxmlformats-officedocument.wordprocessingml.template, application/vnd.ms-word.template.macroEnabled.12, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel.sheet.macroEnabled.12,application/vnd.ms-excel.sheet.binary.macroEnabled.12,application/vnd.openxmlformats-officedocument.spreadsheetml.template,application/vnd.ms-excel.template.macroEnabled.12,application/vnd.ms-excel.addin.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint.presentation.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.ms-powerpoint.slideshow.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.template,application/vnd.ms-powerpoint.template.macroEnabled.12,application/vnd.ms-powerpoint.addin.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.slide, application/vnd.ms-powerpoint.slide.macroEnabled.12, application/onenote,application/wordperfect,application/vnd.oasis.opendocument.text,application/vnd.oasis.opendocument.presentation, application/vnd.oasis.opendocument.spreadsheet, application/vnd.oasis.opendocument.graphics,application/vnd.oasis.opendocument.chart,application/vnd.oasis.opendocument.database,application/vnd.oasis.opendocument.formula,application/pdf"
                directory=""
                webkitdirectory=""
                mozdirectory=""
              />
              <label
                class="custom-file-label custom-file-label-primary"
                for="filedirectorios"
                >Seleccionar carpeta</label
              >
            </div>
            <br />

            <button
              style="margin-top: 10px;"
              type="button"
              class="btn btn-primary btn-block"
              id="btnsubirdirectorio"
              @click="subirDirectorio()"
            >
              Subir directorio
            </button>
            <p id="estadosubirdirectorio"></p>
            <h5>Directorios</h5>
            <div class="table-responsive">
              <table
                class="table table-striped table-bordered"
                id="tablesubirdirectorioa"
              >
                <thead class="table-dark">
                  <tr>
                    <th>Directorio</th>
                    <th>Archivos</th>
                    <th>Peso</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(directorio, index) in fileDirectoriosD"
                    :key="'filedirec-' + index"
                  >
                    <td>{{ directorio.name }}</td>
                    <td>{{ directorio.filesCount }}</td>
                    <td>
                      {{ formatSize(directorio.size) }}
                    </td>
                  </tr>
                </tbody>
                <tfoot class="table-dark">
                  <tr>
                    <th>Directorio</th>
                    <th>Archivos</th>
                    <th>Peso</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <h5>Archivos</h5>
            <div class="table-responsive">
              <table
                class="table table-striped table-bordered"
                id="tablesubirdirectoriob"
              >
                <thead class="table-dark">
                  <tr>
                    <th>Archivo</th>
                    <th>Tamaño</th>
                    <th>Progreso</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(fileDirector, index) in fileDirectorios"
                    :key="'filedirec-' + index"
                  >
                    <td>{{ fileDirector.name }}</td>
                    <td>
                      {{ formatSize(fileDirector.size) }}
                    </td>
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
                          :id="'progress-bar-file-' + index"
                        >
                          {{ getProgress(index) }}%
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot class="table-dark">
                  <tr>
                    <th>Archivo</th>
                    <th>Tamaño</th>
                    <th>Progreso</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modalcarpeta">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Crear carpeta</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="form-group">
              <label for="city" class=" form-control-label"
                >Nombre de carpeta</label
              ><input
                type="text"
                id="txtnombrecarpeta"
                class="form-control"
                v-model="nombreCarpeta"
              />
            </div>
            <br />
            <button
              type="button"
              class="btn btn-primary btn-block"
              id="btncrearcarpeta"
              @click="createFolder()"
            >
              Crear carpeta
            </button>
            <p id="estadocarpeta"></p>
          </div>

          <!-- Modal footer -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueTreeList, Tree } from "vue-tree-list";
//import { deletable } from "../../../mixins/deletable";
export default {
  //mixins: [deletable],
  components: {
    VueTreeList
  },
  /*props: [
        "type-user",
        "init-files",
        "init-folders",
        "init-folder",
        "init-tree"
    ],*/
  data() {
    return {
      files: [],
      folders: [],
      folder: "/",
      user: "",
      archivos: [],
      tree: new Tree({}),
      loaded: false,
      search: "",
      nombreCarpeta: "",
      fileDirectorios: [],
      fileDirectoriosD: [],
      searchDirectory: ""
    };
  },

  async created() {
    /* this.files = this.initFiles ? this.initFiles : [];
        this.folders = this.initFolders ? this.initFolders : [];
        this.folder = this.initFolder ? this.initFolder : "/";
        this.user = this.typeUser ? this.typeUser : "";
        this.tree = new Tree(this.initTree ? this.initTree : {});*/
    await this.getFiles();

    window.addEventListener("popstate", async () => {
      await this.getFiles();
    });
  },

  methods: {
    async createFolder() {
      if (this.nombreCarpeta == "") {
        this.$message.error("Debe ingresar un nombre para la carpeta");
        return;
      }

      // funcion para crear carpeta

      try {
        let { data } = await axios.post("/document_manager/create-folder", {
          folder: this.folder,
          name: this.nombreCarpeta
        });

        if (data.success) {
          this.$message.success(data.message);
        } else {
          this.$message.error(data.message);
        }
        this.nombreCarpeta = "";
      } catch (error) {
        if (error.response && error.response.status === 500) {
          this.$message.error("Error al intentar crear	la carpeta");
        } else {
          console.log(error);
          console.log(error.response.data.message);
        }
        this.nombreCarpeta = "";
      }

      // cierro modal programaticamente sin Jquery usando referencia al modal

      $("#modalcarpeta").modal("hide");

      await this.getFiles();
    },
    builderTemplate(file, tipo = "icon") {
      let icon = "";
      let enlace = "";
      if (file.ext == "dir") {
        icon = `<i class="fas fa-folder" style="font-size: 5em;" ></i>`;
      } else if (file.ext == "pdf") {
        icon = `<i class="fas fa-file-pdf" style="font-size: 5em;" ></i>`;
      } else if (file.ext == "mp4") {
        icon = `<i class="fas fa-file-video" style="font-size: 5em;" ></i>`;
      } else if (file.ext == "mp3") {
        icon = `<i class="fas fa-file-audio" style="font-size: 5em;" ></i>`;
      } else if (
        file.ext == "png" ||
        file.ext == "jpg" ||
        file.ext == "jpeg" ||
        file.ext == "gif"
      ) {
        icon = `<i class="fas fa-file-image" style="font-size: 5em;" ></i>`;
      } else if (file.ext == "txt") {
        icon = `<i class="fas fa-file-alt" style="font-size: 5em;" ></i>`;
      } else if (file.ext == "json") {
        icon = `<i class="fas fa-file-code" style="font-size: 5em;" ></i>`;
      } else if (
        file.ext == "zip" ||
        file.ext == "rar" ||
        file.ext == "tar" ||
        file.ext == "gz"
      ) {
        icon = `<i class="fas fa-file-archive" style="font-size: 5em;" ></i>`;
      } else {
        icon = `<i class="fas fa-file" style="font-size: 5em;" ></i>`;
      }

      if (file.ext == "dir") {
        enlace = `<a href="#" :@click.prevent="() => onClick(file, true)">${icon}</a>`;
      } else {
        enlace = `<a href="/document_manager/download-file?file=${file.path}">${icon}</a>`;
      }

      if (tipo == "icon") {
        return icon;
      } else {
        return enlace;
      }
    },
    findFolderPath(tree, folderId) {
      let node = this.findNodeById(tree, folderId);

      if (!node) {
        return null; // El nodo con el ID proporcionado no existe en el árbol
      }

      let path = [];
      while (node) {
        path.unshift(node.name);
        node = node.parent;
      }

      return path.join("/");
    },

    findNodeById(node, folderId) {
      if (node.id === folderId) {
        return node;
      }

      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          const foundNode = findNodeById(child, folderId);
          if (foundNode) {
            return foundNode;
          }
        }
      }

      return null;
    },
    prepararArchivos(event) {
      // limpio los archivos
      this.archivos = [];

      this.archivos = event.target.files;

      console.log(this.archivos);
    },

    prepararArchivosDirectorio(event) {
      this.fileDirectorios = [];
      this.fileDirectoriosD = [];

      const archivos = event.target.files;
      this.fileDirectorios = archivos;

      for (let i = 0; i < archivos.length; i++) {
        const archivo = archivos[i];
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
    async subirArchivos() {
      const files = this.archivos;

      if (files.length == 0) {
        alert("No hay archivos para subir");
        return;
      }

      const uploadPromises = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", this.folder);

        const uploadPromise = new Promise((resolve, reject) => {
          const cancelTokenSource = axios.CancelToken.source();

          axios
            .post("/document_manager/upload-files", formData, {
              onUploadProgress: progressEvent => {
                const progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );

                // Actualizar el progreso de la barra
                let idprogress = "progress-bar-" + i;
                let progressbar = document.getElementById(idprogress);
                progressbar.style.width = progress + "%";
                progressbar.innerHTML = progress + "%";

                console.log(
                  `Progreso de subida del archivo ${file.name}: ${progress}%`
                );
              },
              cancelToken: cancelTokenSource.token
            })
            .then(response => {
              console.log(
                `El archivo ${file.name} se ha subido correctamente.`
              );
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
          $("#modalarchivos").modal("hide");
          this.archivos = [];
        }, 3000);

        await this.getFiles();
      } catch (error) {
        console.error("Ocurrió un error al subir los archivos.", error);

        setTimeout(() => {
          $("#modalarchivos").modal("hide");
          this.archivos = [];
        }, 3000);

        // limpio variables

        await this.getFiles();
      }
    },
    getProgress(index) {
      const archivo = this.archivos[index];
      if (archivo) {
        return archivo.progress || 0;
      }
      return 0;
    },

    deleteFile(index) {
      const dt = new DataTransfer();

      let files = this.archivos;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
      }

      if (dt.files.length == 0) {
        this.archivos = []; // Assign the updates list
      } else {
        this.archivos = dt.files; // Assign the updates list
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
    },

    async getFiles(preservar = false) {
      try {
        this.loaded = false;
        // tomo parametros de la url para saber que carpeta esta seleccionada

        let url = new URL(window.location.href);

        let folder = url.searchParams.get("folder");
        if (folder) {
          this.folder = folder;
        } else {
          this.folder = "/";
        }

        if (!preservar) {
          this.search = "";
        }

        let { data } = await axios.get(
          "/document_manager/get-files?folder=" +
            this.folder +
            "&search=" +
            this.search
        );

        this.files = data.data.files;

        this.folders = data.data.folders;
        this.tree = new Tree(data.data.tree ? data.data.tree : {});
        this.loaded = true;
      } catch (error) {
        console.log(error);
        console.log(error.response);
        this.loaded = true;
        alert("Error al obtener los archivos");
      }
    },
    async searchDirectorio() {
      try {
        let { data } = await axios.get(
          "/document_manager/search-folder?folder=" + this.searchDirectory
        );

        this.tree = new Tree(data.tree ? data.tree : {});
      } catch (error) {
        console.log(error);
        this.searchDirectory = "";
      }
    },
    async deleteFiles(file) {
      if (file.ext == "dir") {
        await this.destroy(
          `/document_manager/delete-file?file=${file.path}&tipo=directorio`
        );
      } else {
        await this.destroy(
          `/document_manager/delete-file?file=${file.path}&tipo=archivo`
        );
      }

      await this.getFiles();
    },
    async destroy(url) {
      try {
        await this.$confirm("¿Desea eliminar el registro?", "Eliminar", {
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
          type: "warning"
        });

        const response = await this.$http.get(`${url}`);
        const data = response.data;

        if (data.success) {
          this.$message.success(data.message);
        } else {
          this.$message.error(data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          this.$message.error("Error al intentar eliminar");
        } else {
          console.log(error.response.data.message);
        }
      }
    },
    async descargarArchivo(file) {
      try {
        const response = await axios.get("/document_manager/download-file", {
          params: { file: file.path },
          responseType: "blob"
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Eliminar el objeto URL creado para liberar recursos
        window.URL.revokeObjectURL(url);

        console.log("Archivo descargado correctamente");
      } catch (error) {
        console.error("Error al descargar el archivo:", error);
      }
    },
    async viewFile(file) {
      if (file.ext == "dir") {
        this.folder = file.path;

        // agrego parametro url para que sepa que carpeta esta seleccionada ?folder=this.folder

        window.history.pushState(
          "",
          "",
          "/document_manager?folder=" + this.folder
        );

        await this.getFiles();

        return;
      } else {
        // son archivos y los abro en otro link

        window.open("/document_manager/view-file?file=" + file.path, "_blank");
      }

      console.log(file);
    },
    async changeRoute(params) {
      this.folder = this.findFolderPath(params, params.id);
      if (this.folder == "root/Principal") {
        this.folder = "";
      } else {
        this.folder = this.folder.replace("root/Principal/", "");
      }

      // agrego parametro url para que sepa que carpeta esta seleccionada ?folder=this.folder

      window.history.pushState(
        "",
        "",
        "/document_manager?folder=" + this.folder
      );

      await this.getFiles();
    },
    async onClick(params, bandera = false) {
      if (params.ext == "dir") {
        if (!bandera) {
          this.folder = this.findFolderPath(params, params.id);
          if (this.folder == "root/Principal") {
            this.folder = "";
          } else {
            this.folder = this.folder.replace("root/Principal/", "");
          }
        } else {
          this.folder = params.path;
        }
        // agrego parametro url para que sepa que carpeta esta seleccionada ?folder=this.folder

        window.history.pushState(
          "",
          "",
          "/document_manager?folder=" + this.folder
        );

        await this.getFiles();
      } else {
        this.descargarArchivo(params);
      }
    }
  }
};
</script>
<style>
.icon:hover {
  cursor: pointer;
}
.muted {
  color: gray;
  font-size: 80%;
}
.botonera {
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
}
.vtl-node-main {
  cursor: pointer;
}
</style>
