<template>
  <div>
    <b-navbar type="light" variant="light" class="_navigation nav-items">
      <b-navbar-nav class="_left">
        <b-nav-item  @click="GoPop()" >
          <b-button variant="primary" class="button-text" style="padding: 0;">
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
      <b-form-input
        class="ml-2 w-100 light-input"
        type="text"
        v-model="title"
        @blur="saveTitle"
      ></b-form-input>
      <b-navbar-nav class="_right">
        <b-nav-item>
          <b-button variant="primary" class="button-text">
            <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      nameFolder: "",
      nameDocument: "",
      nameState: null,
      submittedNames: [],
      currentParh: "",
      currentFolder: "",
      title: "asdasd",
      id: null
    };
  },
  mounted() {
    this.title = this.getFileName;

    this.id = this.$route.params.uuid;
  },
  methods: {
    GoPop() {
      // voy atras
      this.$router.go(-1);
    },
    async saveTitle() {
      try {
        // seteo en el store el nombre del archivo
        this.$store.commit("setFileName", this.title);
        await axios.put(`/document-files/${this.id}`, {
          data: {
            title: this.title
          }
        });
 
      } catch (error) {
        console.log(error);

        console.log(error.response);
      }
    }
  },
  computed: {
    ...mapGetters(["getFileName"])
  },
  watch: {
    getFileName() {
      this.title = this.getFileName;
    }
  }
};
</script>
<style scoped>
.nav-items {
  height: 30px;
  padding: 20px;
  margin-top: 5px;
}
.button-text {
  background: transparent !important;
  color: black;
}

.light-input.form-control {
  border: unset !important;
}
.light-input.form-control:focus {
  border-color: rgba(0, 0, 0, 0.6) !important;
  border: 1px solid rgba(0, 0, 0, 0.6) !important ;
  box-shadow: none !important;
  border-width: 0 0 2px 0 !important;
}

.light-input.form-control {
  font-size: 1.2rem !important;
  font-weight: 600 !important;
  background: #f8f9fa !important;
}
</style>
