<template>
  <nav class="navbar fixed-top bg-dark  navbar-dark">
    <div class="d-flex align-items-left navbar-left">
      <a
        href="#"
        class="menu-button d-none white d-md-block"
        @click.prevent.stop="
          changeSideMenuStatus({
            step: menuClickCount + 1,
            classNames: menuType,
            selectedMenuHasSubItems,
          })
        "
      >
        <menu-icon />
      </a>
      <a
        href="#"
        class="menu-button-mobile white d-xs-block d-sm-block d-md-none"
        @click.prevent.stop="changeSideMenuForMobile(menuType)"
      >
        <mobile-menu-icon />
      </a>
      <router-link class="navbar-logo" tag="a" to="/app">
      <span class="logo-single d-none d-xs-block"></span>
      <span class="logo-mobile  d-block d-xs-none"></span>
    </router-link>
    </div>

        <!--<router-link style="display: flex;
    align-items: center;" tag="a" :to="{name:'home'}"
          ><span class="logo-single"></span>
          <strong class="white border-left pl-4 text-big">Área de control</strong>
        </router-link>-->

    <div class="navbar-right">
      <div class="header-icons d-inline-block align-middle">
        <!--<div class="position-relative d-inline-block">
          <b-dropdown
            variant="empty"
            size="sm"
            right
            toggle-class="header-icon notificationButton"
            menu-class="position-absolute mt-3 notificationDropdown"
            no-caret
          >
            <template slot="button-content">
              <i class="simple-icon-bell" />
              <span class="count">3</span>
            </template>
            <vue-perfect-scrollbar :settings="{ suppressScrollX: true, wheelPropagation: false }">
              <div
                class="d-flex flex-row mb-3 pb-3 border-bottom"
                v-for="(n,index) in notifications"
                :key="index"
              >
                <router-link tag="a" to="/app/pages/product/details">
                  <img
                    :src="n.img"
                    :alt="n.name"
                    class="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
                  />
                </router-link>
                <div class="pl-3 pr-2">
                  <router-link tag="a" to="/app/pages/product/details">
                    <p class="font-weight-medium mb-1">{{n.name}}</p>
                    <p class="text-muted mb-0 text-small">{{n.date}}</p>
                  </router-link>
                </div>
              </div>
            </vue-perfect-scrollbar>
          </b-dropdown>
        </div>-->
      </div>
      <div class="user d-inline-block">
        <span class=" white mr-1 nombre-top">Bienvenido {{ currentUser.nombre }}</span>
  
        <div class="position-relative d-sm-inline-block">
          <div class="btn-group">
            <b-button
              variant="empty"
              class="header-icon btn-sm"
              @click="signOut"
            >
              <i class="simple-icon-logout white" />
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { MenuIcon, MobileMenuIcon } from "../../components/Svg";
import { searchPath, menuHiddenBreakpoint } from "../../constants/config";

export default {
  components: {
    "menu-icon": MenuIcon,
    "mobile-menu-icon": MobileMenuIcon,
  },
  data() {
    return {
      isMobileSearch: false,
      isSearchOver: false,

      menuHiddenBreakpoint,
    };
  },
  methods: {
    ...mapMutations(["changeSideMenuStatus", "changeSideMenuForMobile"]),
    ...mapActions(["signOut"]),

    handleDocumentforMobileSearch() {
      if (!this.isSearchOver) {
        this.isMobileSearch = false;
        this.searchKeyword = "";
      }
    },

    logout() {
      this.signOut().then(() => {
        this.$router.push("/user/login");
      });
    },

    toggleFullScreen() {
      const isInFullScreen = this.isInFullScreen();

      var docElm = document.documentElement;
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      this.fullScreen = !isInFullScreen;
    },

    isInFullScreen() {
      return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
          document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
          document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
      );
    },
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
      menuType: "getMenuType",
      menuClickCount: "getMenuClickCount",
      selectedMenuHasSubItems: "getSelectedMenuHasSubItems"
    }),
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentforMobileSearch);
  },
  created() {
    //const color = this.getThemeColor();
    //this.isDarkActive = color.indexOf("dark") > -1;
  },
  watch: {
    isMobileSearch(val) {
      if (val) {
        document.addEventListener("click", this.handleDocumentforMobileSearch);
      } else {
        document.removeEventListener(
          "click",
          this.handleDocumentforMobileSearch
        );
      }
    },
  },
};
</script>
<style >








@media all and (min-width: 768px) and (max-width: 1095px) {
  nav.navbar.fixed-top div.d-flex.navbar-left {
    flex-basis: 25%;
  }
  nav.navbar.fixed-top div.navbar-right {
    flex-basis: 30%;
  }
  .navbar .navbar-logo {
    width: 300px;

}
}
</style>


