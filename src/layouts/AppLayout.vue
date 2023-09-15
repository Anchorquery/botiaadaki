<template>
  <div id="app-container" :class="getMenuType">
    <topnav />
    <sidebar />
    <main>
      <div class="row">
        <div class="col-12">
          <div
            @click="goBack"
            style="font-size: 25px;cursor:pointer;max-width: 45px;margin-bottom:30px"
            class="glyph-icon iconsminds-arrow-left-in-circle"
          ></div>
        </div>
      </div>
      <div class="container-fluid">
        <slot></slot>
      </div>
    </main>
    <footer-component />
  </div>
</template>

<script>
import Sidebar from "../containers/navs/Sidebar";
import Topnav from "../containers/navs/Topnav";
import Footer from "../containers/navs/Footer";
import { mapGetters } from "vuex";

export default {
  components: {
    topnav: Topnav,
    sidebar: Sidebar,
    "footer-component": Footer
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters(["getMenuType"])
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    setTimeout(() => {
      document.body.classList.add("default-transition");
    }, 100);
  }
};
</script>
<style>
main {
  margin-top: 100px;
}
@media only screen and (min-width: 1600px) {
  main {
    margin-top: 120px;
  }
  .sub-hidden main,
  .menu-sub-hidden main,
  .menu-hidden main {
    margin-left: 225px;
  }
}
@media only screen and (min-width: 1440px) {
  main {
    margin-top: 120px;
  }
  .sub-hidden main,
  .menu-sub-hidden main,
  .menu-hidden main {
    margin-left: 225px;
  }
}
</style>
