/** * Plantilla categoría del admin. * Muestra todos los archivos pertenecientes
a una categoría. */
<template>
  <b-container>
    <b-row class="mb-1">
      <b-col md="12">
        <template>
          <list-page-heading
            :title="'Categoría ' + categoria.nombre"
            agregar="Archivo"
            editar="Categoría"
            :changeOrderBy="changeOrderBy"
            :changePageSize="changePageSize"
            :sort="sort"
            :searchChange="searchChange"
            :from="from"
            :to="to"
            :total="total"
            :perPage="perPage"
          ></list-page-heading>
        </template>
      </b-col>
    </b-row>
    <b-row v-if="items.length == 0">
      <b-col md="12">
        <b-alert show variant="danger">No hay items registrados </b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-4" v-if="isLoad">
      <b-col md="3" v-for="(x, i) in items" :key="i" class="mb-4">
        <div
          class="wrapper-item"
          v-if="x.archivo"
          @click="seleccionItem(x, true)"
        >
          <div class="pdf-wrapper" v-if="x.archivo.mime == 'application/pdf'">
            <!--  <pdf
              :src="!x.archivo ? '' : `${url2 + x.archivo.url}`"
              style="width:150px;margin:auto;"
            ></pdf>-->
            <b-img
              src="/assets/img/Front/pdf_icon.png"
              style="width:150px;margin:auto;"
              fluid
              alt="Responsive image"
              class="image"
            ></b-img>
          </div>
          <div
            class="pdf-wrapper images clearfix"
            v-if="
              x.archivo.mime == 'image/jpeg' || x.archivo.mime == 'image/png'
            "
          >
            <b-img
              :src="x.archivo ? `${url2 + x.archivo.url}` : ''"
              style="width:150px;margin:auto;"
              fluid
              alt="Responsive image"
              class="image"
            ></b-img>
          </div>
          <div
            class="pdf-wrapper images clearfix"
            v-if="
              x.archivo.mime == 'application/x-zip-compressed' ||
                x.archivo.mime == 'zip' ||
                x.archivo.mime == 'application/octet-stream' ||
                x.archivo.mime == 'application/zip' ||
                x.archivo.mime == 'application/x-zip' ||
                x.archivo.mime == 'application/x-zip-compressed'
            "
          >
            <b-img
              src="/assets/img/Front/carperta-comprimida.png"
              style="width:150px;margin:auto;"
              fluid
              alt="Responsive image"
              class="image"
            ></b-img>
          </div>
          <div
            class="pdf-wrapper images clearfix"
            v-if="
              x.archivo.mime == 'video/mp4' ||
                x.archivo.mime == 'video/quicktime'
            "
          >
            <b-img
              src="/assets/img/Front/video.png"
              style="width:150px;margin:auto;"
              fluid
              alt="Responsive image"
              class="image"
            ></b-img>
          </div>
          <div class="info-pdf text-center">
            <p class="h5 bold">
              {{ x.titulo }}
            </p>
            <p class="h6">Año: {{ x.ano }}</p>
          </div>
        </div>
        <div class="wrapper-item" v-else @click="seleccionItem(x, false)">
          <div class="pdf-wrapper">
            <!--<pdf
              :src="!x.archivo ? '' : `${url2 + x.archivo.url}`"
              style="width:150px;margin:auto;"
            ></pdf>-->
            <b-img
              src="/assets/img/Front/failure.png"
              style="width:150px;margin:auto;"
              fluid
              alt="Responsive image"
              class="image"
            ></b-img>
          </div>
          <div class="info-pdf text-center">
            <p class="h5 bold text-danger small">Sin archivo</p>
            <p class="h5 bold">
              {{ x.titulo }}
            </p>
          </div>
        </div>
        <div v-if="esMaster" style="text-align: center;" class="botonera mt-4">
          <b-button size="sm" @click="itemDelete(x)" variant="danger"
            >Borrar</b-button
          ><b-button @click="itemEdit(x)" size="sm">Editar</b-button>
        </div>
      </b-col>
    </b-row>
    <template>
      <list-page-listing
        :items="items"
        :lastPage="lastPage"
        :perPage="perPage"
        :page="page"
        :changePage="changePage"
        @emitRemove="categoriaRemove = $event"
      ></list-page-listing>
    </template>
    <!-- crear -->
    <template>
      <b-modal ref="modal-add" id="modal-add" centered title="Crear archivo">
        <b-form>
          <b-container>
            <b-row>
              <b-col md="6">
                <b-form-group label="Titulo *" class="label-input-form mb-4">
                  <b-form-input type="text" v-model="x.titulo" required />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Año *" class="label-input-form mb-4">
                  <b-form-input type="text" v-model.trim="x.ano" required />
                </b-form-group>
              </b-col>
              <!-- <b-col md="12">
                <b-form-group label="Permisos">
                  <b-form-checkbox switch size="sm" v-model="x.tecnico"
                    >Técnicos</b-form-checkbox
                  >
                  <b-form-checkbox switch size="sm" v-model="x.distribuidor"
                    >Distribuidor</b-form-checkbox
                  >
                </b-form-group>
              </b-col>-->
              <b-col md="12">
                <b-form-group label="Descripción" class="label-input-form mb-4">
                  <b-form-textarea
                    id="textarea"
                    v-model="x.descripcion"
                    placeholder="Descripción del archivo"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="12" class="mb-4">
                <div>
                  <file-pond
                    name="files"
                    ref="archivos"
                    :files="archivos"
                    @initfile="initArchivo"
                    v-bind:allow-multiple="false"
                    :accepted-file-types="[
                      'image/png',
                      'image/jpeg',
                      'video/mp4',
                      'application/pdf',
                      'video/quicktime',
                      'application/x-zip-compressed',
                      'zip',
                      'application/octet-stream',
                      'application/zip',
                      'application/x-zip',
                      'application/x-zip-compressed'
                    ]"
                    :server="server"
                    instantUpload="false"
                    allowProcess="false"
                    allowRevert="false"
                    credits="false"
                    labelIdle='Arrastra el archivo que quieres subir o <span style="cursor:pointer">picha aquí</span>'
                  />
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
        <template #modal-footer="{ hide }">
          <b-button
            size="sm"
            class="btn btn-danger"
            variant="danger"
            @click="limpiar() + hide('forget')"
          >
            Cancelar
          </b-button>
          <b-button
            :disabled="!file || !x.titulo || !x.ano"
            size="sm"
            btn
            btn-primary
            variant="primary"
            @click="crearItem()"
          >
            Crear Archivo
          </b-button>
        </template>
      </b-modal>
    </template>
    <!-- editar Arvhico -->
    <template>
      <b-modal
        ref="modal-edit-archivo"
        id="modal-edit-archivo"
        centered
        title="Editar archivo"
      >
        <b-form>
          <b-container>
            <b-row>
              <b-col md="6">
                <b-form-group label="Titulo *" class="label-input-form mb-4">
                  <b-form-input
                    type="text"
                    v-model="editItem.titulo"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Año *" class="label-input-form mb-4">
                  <b-form-input type="text" v-model="editItem.ano" required />
                </b-form-group>
              </b-col>
              <!--    <b-col md="12">
                <b-form-group label="Permisos">
                  <b-form-checkbox switch size="sm" v-model="editItem.tecnico"
                    >Técnicos</b-form-checkbox
                  >
                  <b-form-checkbox switch size="sm" v-model="editItem.distribuidor"
                    >Distribuidor</b-form-checkbox
                  >
                </b-form-group>
              </b-col>-->
              <b-col md="12">
                <b-form-group label="Descripción" class="label-input-form mb-4">
                  <b-form-textarea
                    id="textarea"
                    v-model="editItem.descripcion"
                    placeholder="Descripción del archivo"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>

              <b-col md="12" class="mb-4">
                <div>
                  <file-pond
                    name="files"
                    ref="archivosEdit"
                    :files="archivosEdit"
                    @initfile="initEdit"
                    v-bind:allow-multiple="false"
                    :accepted-file-types="[
                      'image/png',
                      'image/jpeg',
                      'video/mp4',
                      'video/quicktime',
                      'application/pdf',
                      'application/x-zip-compressed',
                      'zip',
                      'application/octet-stream',
                      'application/zip',
                      'application/x-zip',
                      'application/x-zip-compressed'
                    ]"
                    :server="server"
                    instantUpload="false"
                    allowProcess="false"
                    allowRevert="false"
                    credits="false"
                    labelIdle='Arrastra el archivo que quieres subir o <span style="cursor:pointer">picha aquí</span>'
                  />
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
        <template #modal-footer="{ hide }">
          <b-button
            size="sm"
            class="btn btn-danger"
            variant="danger"
            @click="hide('forget') + limpiar()"
          >
            Cancelar
          </b-button>
          <b-button
            size="sm"
            btn
            btn-primary
            variant="primary"
            @click="editarItem()"
          >
            Editar Archivo
          </b-button>
        </template>
      </b-modal>
    </template>
    <!-- EDITAR CATEGORIA -->
    <template>
      <b-modal
        ref="modal-edit"
        id="modal-edit"
        centered
        title="Editar categoría"
      >
        <b-form>
          <b-container>
            <b-row>
              <b-col md="12">
                <b-form-group label="Nombre *" class="label-input-form mb-4">
                  <b-form-input
                    type="text"
                    v-model.trim="categoria.nombre"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Estado *" class="label-input-form mb-4">
                  <b-form-checkbox
                    v-model="categoria.status"
                    name="check-button"
                    switch
                  >
                    <b>( {{ categoria.status ? "Activo" : "No activo" }})</b>
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Orden *" class="label-input-form mb-4">
                  <b-form-input
                    type="number"
                    v-model.trim="categoria.orden"
                    min="0"
                    max="99"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Descripción" class="label-input-form mb-4">
                  <b-form-textarea
                    id="textarea"
                    v-model.trim="categoria.descripcion"
                    placeholder="Descripción de la categoria"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Permisos">
                  <b-form-checkbox switch size="sm" v-model="categoria.tecnico"
                    >Técnicos</b-form-checkbox
                  >
                  <b-form-checkbox
                    switch
                    size="sm"
                    v-model="categoria.distribuidor"
                    >Distribuidor</b-form-checkbox
                  >
                </b-form-group>
              </b-col>
              <b-col md="12" class="mb-4">
                <div>
                  <file-pond
                    name="files"
                    ref="miniaturaCategoria"
                    :files="miniatura"
                    v-model="miniaturaAux"
                    v-bind:allow-multiple="false"
                    :accepted-file-types="['image/png', 'image/jpeg']"
                    :server="server_2"
                    instantUpload="false"
                    allowProcess="false"
                    allowRevert="false"
                    credits="false"
                    labelIdle='Arrastra el archivo que quieres subir o <span style="cursor:pointer">picha aquí</span>'
                  />
                  <div class="text-center">
                    <!-- <b-button @click="cargarGaleria()"> Cargar Imagenes </b-button>-->
                    <b-img
                      thumbnail
                      fluid
                      :src="
                        !categoria.miniatura
                          ? '/assets/img/Front/categoria-placeholder.png'
                          : url2 + categoria.miniatura.url
                      "
                      :title="
                        !categoria.miniatura
                          ? 'placeholder'
                          : categoria.miniatura.name
                      "
                    ></b-img>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
        <template #modal-footer="{ hide }">
          <b-button
            size="sm"
            class="btn btn-secondary-outline"
            variant="danger"
            @click="limpiar() + hide('forget')"
          >
            Cancelar
          </b-button>
          <b-button
            :disabled="!archivos || !categoria.nombre"
            size="sm"
            btn
            btn-primary
            variant="primary"
            @click="editarCat()"
          >
            Editar Categoría
          </b-button>
        </template>
      </b-modal>
    </template>
    <!--Ver y editar-->
    <template>
      <b-modal
        no-close-on-esc
        no-close-on-backdrop
        ref="modal-x"
        id="modal-x"
        size="xl"
        centered
      >
        <template #modal-header>
          <!-- Emulate built in modal header close button action -->
          <h5 class="h5">
            <strong>Titulo: </strong> {{ itemSeleccionado.titulo }}
          </h5>
          <h5 class="h5">
            <strong>Fecha: </strong> {{ itemSeleccionado.ano }}
          </h5>
        </template>
        <b-form>
          <b-container>
            <b-row>
              <b-col md="5">
                <div class="d-flex" style="justify-content: space-between; ">
                  <p class="h6">Paginas: {{ pagePdf }}/{{ numPages }}</p>
                  <input
                    v-model.number="pagePdf"
                    type="number"
                    style="width: 5em"
                    min="1"
                    :max="numPages"
                  />
                </div>
                <pdf
                  ref="pdfImprimir"
                  v-if="show"
                  :src="
                    !itemSeleccionado ? '' : url2 + itemSeleccionado.archivo.url
                  "
                  :page="pagePdf"
                  @progress="loadedRatio = $event"
                  @num-pages="numPages = $event"
                  @link-clicked="pagePdf = $event"
                  style="border: 1px solid red"
                ></pdf>
              </b-col>
              <b-col md="7">
                <div class="text-center">
                  <h3 class="h3 mb-4">Datos del archivo</h3>
                  <div class="text-left">
                    <p class="h5 sub-title">
                      <span class="strong">Titulo:</span>
                      {{ itemSeleccionado.titulo }}
                    </p>
                    <p class=" h5 sub-title">
                      <span class="  strong">Año del archivo:</span>
                      {{ itemSeleccionado.ano }}
                    </p>

                    <div class="mt-4 mb-4">
                      <p class="h5">Descripcion:</p>
                      <p class="h6">
                        {{ itemSeleccionado.descripcion }}
                      </p>
                    </div>
                    <div class="botonera">
                      <a
                        style="margin-left: 0px;"
                        target="_blank"
                        v-if="show"
                        class="btn btn-secondary"
                        :href="
                          !itemSeleccionado
                            ? ''
                            : url2 + itemSeleccionado.archivo.url
                        "
                        :download="
                          itemSeleccionado.titulo + itemSeleccionado.archivo.ext
                        "
                        >Descargar</a
                      >

                      <b-button
                        variant="primary"
                        @click="$refs.pdfImprimir.print()"
                      >
                        Imprimir</b-button
                      >
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
        <template #modal-footer="{  }">
          <b-button
            size="sm"
            class="btn btn-danger"
            variant="secondary"
            @click="reset()"
          >
            Cancelar
          </b-button>
        </template>
      </b-modal>
    </template>
    <template>
      <b-modal
        no-close-on-esc
        no-close-on-backdrop
        ref="modal-image"
        id="modal-image"
        size="xl"
        centered
      >
        <template #modal-header>
          <!-- Emulate built in modal header close button action -->
          <h5 class="h5">
            <strong>Titulo: </strong> {{ itemSeleccionado.titulo }}
          </h5>
          <h5 class="h5">
            <strong>Fecha: </strong> {{ itemSeleccionado.ano }}
          </h5>
        </template>
        <b-form
          v-if="
            itemSeleccionado.archivo
              ? itemSeleccionado.archivo.mime != 'video/mp4' &&
                itemSeleccionado.archivo.mime != 'video/quicktime'
              : ''
          "
        >
          <b-container
            v-if="
              itemSeleccionado.archivo.mime == 'image/jpeg' ||
                itemSeleccionado.archivo.mime == 'image/png'
            "
          >
            <b-row>
              <b-col md="5">
                <div class="pdf-wrapper images clearfix" v-viewer="options">
                  <img
                    :src="
                      itemSeleccionado.archivo
                        ? `${url2 + itemSeleccionado.archivo.url}`
                        : ''
                    "
                    :data-source="
                      itemSeleccionado.archivo
                        ? `${url2 + itemSeleccionado.archivo.url}`
                        : ''
                    "
                    class="image"
                    :key="
                      itemSeleccionado.archivo
                        ? `${url2 + itemSeleccionado.archivo.url}`
                        : ''
                    "
                    :alt="
                      itemSeleccionado.archivo
                        ? itemSeleccionado.archivo.url.split('?image=').pop()
                        : ''
                    "
                    style="width:150px;margin:auto;"
                  />
                </div>
              </b-col>
              <b-col md="7">
                <div class="text-center">
                  <h3 class="h3 mb-4">Datos del archivo</h3>
                  <div class="text-left">
                    <p class="h5 sub-title">
                      <span class="strong">Titulo:</span>
                      {{ itemSeleccionado.titulo }}
                    </p>
                    <p class=" h5 sub-title">
                      <span class="  strong">Año del archivo:</span>
                      {{ itemSeleccionado.ano }}
                    </p>

                    <div class="mt-4 mb-4">
                      <p class="h5">Descripcion:</p>
                      <p class="h6">
                        {{ itemSeleccionado.descripcion }}
                      </p>
                    </div>
                    <div class="botonera">
                      <a
                        style="margin-left: 0px;"
                        target="_blank"
                        v-if="mostrarImagen"
                        class="btn btn-secondary"
                        :href="
                          !itemSeleccionado
                            ? ''
                            : url2 + itemSeleccionado.archivo.url
                        "
                        :download="
                          itemSeleccionado.titulo + itemSeleccionado.archivo.ext
                        "
                        >Descargar</a
                      >

                      <!-- <b-button
                        variant="primary"
                        @click="$refs.pdfImprimir.print()"
                      >
                        Imprimir</b-button
                      >-->
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
        <b-form
          v-if="
            itemSeleccionado.archivo
              ? itemSeleccionado.archivo.mime != 'video/mp4' &&
                itemSeleccionado.archivo.mime != 'video/quicktime'
              : ''
          "
        >
          <b-container
            v-if="
              itemSeleccionado.archivo.mime == 'application/x-zip-compressed' ||
                itemSeleccionado.archivo.mime == 'zip' ||
                itemSeleccionado.archivo.mime == 'application/octet-stream' ||
                itemSeleccionado.archivo.mime == 'application/zip' ||
                itemSeleccionado.archivo.mime == 'application/x-zip' ||
                itemSeleccionado.archivo.mime == 'application/x-zip-compressed'
            "
          >
            <b-row>
              <b-col md="5">
                <div class="pdf-wrapper images clearfix">
                  <img src="/assets/img/Front/carperta-comprimida.png" />
                </div>
              </b-col>
              <b-col md="7">
                <div class="text-center">
                  <h3 class="h3 mb-4">Datos del archivo</h3>
                  <div class="text-left">
                    <p class="h5 sub-title">
                      <span class="strong">Titulo:</span>
                      {{ itemSeleccionado.titulo }}
                    </p>
                    <p class=" h5 sub-title">
                      <span class="  strong">Año del archivo:</span>
                      {{ itemSeleccionado.ano }}
                    </p>

                    <div class="mt-4 mb-4">
                      <p class="h5">Descripcion:</p>
                      <p class="h6">
                        {{ itemSeleccionado.descripcion }}
                      </p>
                    </div>
                    <div class="botonera">
                      <a
                        style="margin-left: 0px;"
                        target="_blank"
                        v-if="mostrarImagen"
                        class="btn btn-secondary"
                        :href="
                          !itemSeleccionado
                            ? ''
                            : url2 + itemSeleccionado.archivo.url
                        "
                        :download="
                          itemSeleccionado.titulo + itemSeleccionado.archivo.ext
                        "
                        >Descargar</a
                      >

                      <!-- <b-button
                        variant="primary"
                        @click="$refs.pdfImprimir.print()"
                      >
                        Imprimir</b-button
                      >-->
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
        <b-form v-else>
          <b-container>
            <b-row>
              <b-col md="5">
                <div class="pdf-wrapper images clearfix">
                  <img src="/assets/img/Front/video.png" />
                </div>
              </b-col>
              <b-col md="7">
                <div class="text-center">
                  <h3 class="h3 mb-4">Datos del archivo</h3>
                  <div class="text-left">
                    <p class="h5 sub-title">
                      <span class="strong">Titulo:</span>
                      {{ itemSeleccionado.titulo }}
                    </p>
                    <p class=" h5 sub-title">
                      <span class="  strong">Año del archivo:</span>
                      {{ itemSeleccionado.ano }}
                    </p>

                    <div class="mt-4 mb-4">
                      <p class="h5">Descripcion:</p>
                      <p class="h6">
                        {{ itemSeleccionado.descripcion }}
                      </p>
                    </div>
                    <div class="botonera">
                      <a
                        style="margin-left: 0px;"
                        target="_blank"
                        v-if="mostrarImagen"
                        class="btn btn-secondary"
                        :href="
                          !itemSeleccionado
                            ? ''
                            : url2 + itemSeleccionado.archivo.url
                        "
                        :download="
                          itemSeleccionado.titulo + itemSeleccionado.archivo.ext
                        "
                        >Descargar</a
                      >

                      <!-- <b-button
                        variant="primary"
                        @click="$refs.pdfImprimir.print()"
                      >
                        Imprimir</b-button
                      >-->
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
        <template #modal-footer="{  }">
          <b-button
            size="sm"
            class="btn btn-danger"
            variant="secondary"
            @click="reset()"
          >
            Cancelar
          </b-button>
        </template>
      </b-modal>
    </template>
    <!-- Borrar -->
    <template>
      <b-modal
        id="modal-delete"
        ref="modal-delete"
        title="Eliminacion de archivo"
      >
        <b-alert show variant="danger"
          >¿Estás seguro que desea eliminar el archivo?
        </b-alert>
        <template slot="modal-footer">
          <b-button
            variant="danger"
            @click="hideModal('modal-delete') + deleteItem()"
            class="mr-1"
            >Eliminar</b-button
          >
          <b-button
            variant="primary"
            @click="hideModal('modal-delete') + limpiar()"
            >Cancelar</b-button
          >
        </template>
      </b-modal>
    </template>
  </b-container>
</template>
<script>
import vueFilePond, { setOptions } from "vue-filepond";
import { mapGetters } from "vuex";
import pdf from "vue-pdf";
import "viewerjs/dist/viewer.css";
import { url } from "@/constants/config";
import qs from "qs";
// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import ListPageHeading from "../ListPageHeadig";
import ListPageListing from "./Paginacion";
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);
export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing,
    "file-upload": FilePond,
    pdf
  },
  data() {
    return {
      mostrarImagen: false,
      isLoad: false,
      idC: "",
      options: {
        toolbar: true,
        url: "data-source"
      },
      archivosEdit: [],
      editItem: {
        titulo: "",
        descripcion: "",
        ano: "",
        archivo: ""
      },
      miniatura: "",
      apiBase: `${url}/archivos`,
      show: false,
      archivos: [],
      loadedRatio: 0,
      file: false,
      items: [],
      sort: {
        column: "titulo",
        label: "Titulo"
      },
      x: {
        titulo: "",
        descripcion: "",
        ano: "",
        tecnico: true,
        distribuidor: true
      },
      categoria: {
        id: "",
        nombre: "",
        familia: "",
        orden: 0,
        status: true,
        tecnico: true,
        distribuidor: true,
        descripcion: "",
        miniatura: ""
      },
      miniaturaAux: "",
      delItem: "",
      pagePdf: 1,
      numPages: 0,
      itemSeleccionado: [],
      idItem: "",
      page: 1,
      perPage: 25,
      search: "",
      total: 0,
      currentPage: 0,
      pageCount: 0,
      server: {
        url: `${axios.defaults.baseURL}/upload/`,
        revert: null,
        process: {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.authorization}`
          },
          ondata: fd => {
            fd.append("refId", this.idItem);
            fd.append("ref", "archivo");
            fd.append("field", "archivo");
            return fd;
          }
        }
      },
      server_2: {
        url: `${axios.defaults.baseURL}/upload/`,
        revert: null,
        process: {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.authorization}`
          },
          ondata: fd => {
            fd.append("refId", this.idC);
            fd.append("ref", "categoria");
            fd.append("field", "miniatura");
            return fd;
          }
        }
      }
    };
  },
  created() {
    this.idC = this.$route.params.id;
    this.loadItem();
    this.getItems();
    this.countItems();
  },

  methods: {
    async countItems() {
      try {
        const query = qs.stringify({
          _where: [{ categoria: this.idC }, { titulo_contains: this.search }]
        });
        let { data } = await axios.get(`archivos/count?${query}`);
        this.total = data;
      } catch (e) {
        console.log(e);
      }
    },
    async cargarGaleria() {
      try {
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };

        const query = qs.stringify({
          _where: { _or: [{ mime: "image/png" }, { mime: "image/jpeg" }] }
        });

        let { data } = await axios.get(`upload/files?${query}`, setting);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    },
    async editarMT() {
      try {
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };

        if (!this.categoria.miniatura) {
          await this.$refs.miniaturaCategoria.processFiles();
        } else {
          let promesa1 = this.$refs.miniaturaCategoria.processFiles();

          let promesa2 = axios.delete(
            `upload/files/${this.categoria.miniatura.id}`,
            setting
          );

          let response = await Promise.all([promesa1, promesa2]);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async loadItem() {
      try {
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        let { data } = await axios.get(`categorias/${this.idC}`, setting);
        this.categoria["id"] = data.id;
        this.categoria["nombre"] = data.nombre;
        //this.categoria["temporada"] = data.temporada.id;
        this.categoria["tecnico"] = data.tecnico;
        this.categoria["distribuidor"] = data.distribuidor;
        this.categoria["familia"] = data.familia.id;
        this.categoria["miniatura"] = data.miniatura;
        this.categoria["descripcion"] = data.descripcion;
        this.categoria["orden"] = data.orden;
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    },
    async editarCat() {
      try {
        let x = this.categoria;
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };

        let { data } = await axios.put(
          `/categorias/${x.id}`,
          {
            nombre: x.nombre,
            descripcion: x.descripcion,
            orden: x.orden,
            status: x.status,
            tecnico: x.tecnico,
            distribuidor: x.distribuidor
          },
          setting
        );
        if (this.miniaturaAux.length > 0) {
          await this.editarMT();
        }
        this.hideModal("modal-edit");
        this.loadItem();
        this.limpiar();
      } catch (e) {
        console.log(e);
      }
    },
    async editarItem() {
      try {
        let x = this.editItem;
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };

        let { data } = await axios.put(
          `/archivos/${x.id}`,
          { ano: x.ano, titulo: x.titulo, descripcion: x.descripcion },
          setting
        );

        if (this.file) {
          this.idItem = x.id;

          this.auxliarEdit(x);
        } else {
          this.hideModal("modal-edit-archivo");
          this.getItems();
          this.limpiar();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async auxliarEdit(x) {
      try {
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        let promesa1 = this.$refs.archivosEdit.processFiles();

        let promesa2 = axios.delete(`upload/files/${x.archivo.id}`, setting);

        let response = await Promise.all([promesa1, promesa2]);

        console.log(response);
        this.hideModal("modal-edit-archivo");
        this.getItems();
        this.limpiar();
      } catch (e) {
        console.log(e);
      }
    },
    itemEdit(x) {
      console.log(x);
      this.x = x;
      this.editItem.titulo = x.titulo;
      this.editItem.descripcion = x.descripcion;
      this.editItem.ano = x.ano;
      this.editItem.id = x.id;
      this.editItem.permiso = x.permiso;
      this.editItem.archivo = x.archivo;
      this.$refs["modal-edit-archivo"].show();
    },
    itemDelete(x) {
      this.delItem = x;

      this.$refs["modal-delete"].show();
    },
    async deleteItem() {
      try {
        let x = this.delItem;
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        let promesa1 = axios.delete(`archivos/${x.id}`, setting);

        let promesa2 = axios.delete(`upload/files/${x.archivo.id}`, setting);

        let response = await Promise.all([promesa1, promesa2]);

        this.getItems();
      } catch (e) {
        console.log(e);
      }
    },
    reset() {
      this.itemSeleccionado = "";
      this.pagePdf = 1;
      this.numPages = 0;
      this.show = false;
      this.mostrarImagen = false;
      this.$refs["modal-x"].hide();
      this.$refs["modal-image"].hide();
    },

    seleccionItem(x, estado) {
      if (!estado) {
        return;
      }
      console.log("item seleccionado", x);
      if (x.archivo.mime == "application/pdf") {
        this.itemSeleccionado = x;
        this.show = true;
        this.$refs["modal-x"].show();
      } else if (
        x.archivo.mime == "image/jpeg" ||
        x.archivo.mime == "image/png" ||
        x.archivo.mime == "video/mp4" ||
        x.archivo.mime == "video/quicktime"
      ) {
        this.itemSeleccionado = x;
        this.mostrarImagen = true;
        this.$refs["modal-image"].show();
      } else if (
        x.archivo.mime == "application/x-zip-compressed" ||
        x.archivo.mime == "zip" ||
        x.archivo.mime == "application/octet-stream" ||
        x.archivo.mime == "application/zip" ||
        x.archivo.mime == "application/x-zip" ||
        x.archivo.mime == "application/x-zip-compressed"
      ) {
        this.itemSeleccionado = x;
        this.mostrarImagen = true;
        this.$refs["modal-image"].show();
      }
    },
    initArchivo(x) {
      this.file = true;
      console.log(x);
    },
    initEdit(x) {
      this.file = true;
      console.log(x);
    },
    async crearItem() {
      try {
        if (!this.x.titulo) {
          return;
        }

        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        this.x["familia"] = this.categoria.familia;
        this.x["categoria"] = this.categoria.id;
        let { data } = await axios.post("/archivos", this.x, setting);

        this.idItem = data.id;

        this.subirArchivo();
      } catch (error) {
        console.log(error.response);
      }
    },
    async subirArchivo() {
      try {
        let archivo = await this.$refs.archivos.processFiles();

        this.$refs["modal-add"].hide();
        this.getItems();
        this.limpiar();
      } catch (error) {
        console.log(error);
      }
    },
    limpiar() {
      this.x.titulo = "";
      this.x.descripcion = "";
      this.x.ano = "";
      this.x = {};
      this.file = false;
      this.delItem = "";
      this.editItem = {};
    },
    hideModal(refname) {
      this.$refs[refname].hide();
    },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    searchChange(val) {
      this.search = val;
      this.page = 1;
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },

    changePage(pageNum) {
      this.page = pageNum;
    },
    changePageSize(perPage) {
      this.page = 1;
      this.perPage = perPage;
    },
    async getItems() {
      try {
        this.isLoad = false;
        let header = {
          Authorization: `Bearer ${this.token}`
        };
        let setting = { headers: header };
        let { data } = await axios.get(`${this.apiUrl}`, setting);

        this.items = data;
        this.isLoad = true;
      } catch (e) {
        console.log(e.response);
      }
    }
  },
  computed: {
    ...mapGetters([
      "esMaster",
      "esDelegado",
      "esSemi",
      "esDistribuidor",
      "esTecnico",
      "logueado",
      "getMenuSidebar",
      "esAutoSat"
    ]),
    url2() {
      return url;
    },
    lastPage() {
      return Math.ceil(this.total / this.perPage);
    },
    start() {
      let inicio = +this.page === 1 ? 0 : (+this.page - 1) * this.perPage;
      return inicio;
    },
    nameCreador() {
      return this.$store.state.user.currentUser.nombre;
    },
    email() {
      return this.$store.state.user.currentUser.email;
    },
    id() {
      return this.$store.state.user.currentUser.id;
    },
    delegado() {
      return this.$store.state.user.currentUser.delegado;
    },
    token() {
      return this.$store.state.user.authorization;
    },
    apiUrl() {
      const query = qs.stringify({
        _where: [{ categoria: this.idC }, { titulo_contains: this.search }]
      });

      return `archivos?_limit=${this.perPage}&_start=${this.start}&${query}`;
    },
    to() {
      let suma =
        this.from + this.perPage <= this.total
          ? this.from + this.perPage
          : this.total;
      return suma;
    },
    from() {
      return (this.page - 1) * this.perPage;
    }
  },
  watch: {
    search() {
      this.page = 1;
    },
    apiUrl() {
      this.getItems();
    }
  }
};
</script>
