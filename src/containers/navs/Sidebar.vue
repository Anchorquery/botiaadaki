<template>
  <div class="sidebar" @click.stop="() => {}">
    <div class="main-menu">
      <vue-perfect-scrollbar
        class="scroll"
        :settings="{ suppressScrollX: true, wheelPropagation: false }"
      >
        <ul class="list-unstyled">
          <li class="link-sidebar" v-if="esMaster || esDelegado || esDcoordinador ">
            <router-link to="/app/usuarios">
              <p>Usuarios</p>
            </router-link>
          </li>
          <li class="link-sidebar" v-if="logueado">
            <router-link :to="{ name: 'chat' }">
              <p>Chat</p>
            </router-link>
          </li>
          <li class="link-sidebar" v-if="logueado">
            <router-link :to="{ name: 'clientes-data' }">
              <p>Clientes</p>
            </router-link>
          </li>


          <li class="link-sidebar" v-if="logueado">
            <router-link :to="{ name: 'documentacion-temporadas' }">
              <p>Doc. UPLOAD</p>
            </router-link>
          </li>


          <li class="link-sidebar" v-if="logueado">
            <router-link to="/app/settings">
              <p>Mi cuenta</p>
            </router-link>
          </li>
        </ul>
      </vue-perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  menuHiddenBreakpoint,
  subHiddenBreakpoint
} from "../../constants/config";
import menuItems from "../../constants/menu";

export default {
  data() {
    return {
      selectedParentMenu: "",
      menuItems,
      viewingParentMenu: ""
    };
  },
  mounted() {
    this.selectMenu();
    window.addEventListener("resize", this.handleWindowResize);
    document.addEventListener("click", this.handleDocumentClick);
    this.handleWindowResize();
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentClick);
    window.removeEventListener("resize", this.handleWindowResize);
  },

  methods: {
    ...mapMutations([
      "changeSideMenuStatus",
      "addMenuClassname",
      "changeSelectedMenuHasSubItems"
    ]),
    selectMenu() {
      const currentParentUrl = this.$route.path
        .split("/")
        .filter(x => x !== "")[1];
      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
      } else {
        this.selectedParentMenu = "dashboards";
      }
      this.isCurrentMenuHasSubItem();
    },
    isCurrentMenuHasSubItem() {
      const menuItem = this.menuItems.find(
        x => x.id === this.selectedParentMenu
      );
      const isCurrentMenuHasSubItem =
        menuItem && menuItem.subs && menuItem.subs.length > 0 ? true : false;
      if (isCurrentMenuHasSubItem != this.selectedMenuHasSubItems) {
        if (!isCurrentMenuHasSubItem) {
          this.changeSideMenuStatus({
            step: 0,
            classNames: this.menuType,
            selectedMenuHasSubItems: false
          });
        } else {
          this.changeSideMenuStatus({
            step: 0,
            classNames: this.menuType,
            selectedMenuHasSubItems: true
          });
        }
      }

      return isCurrentMenuHasSubItem;
    },

    changeSelectedParentHasNoSubmenu(parentMenu) {
      this.selectedParentMenu = parentMenu;
      this.viewingParentMenu = parentMenu;
      this.changeSelectedMenuHasSubItems(false);
      this.changeSideMenuStatus({
        step: 0,
        classNames: this.menuType,
        selectedMenuHasSubItems: false
      });
    },

    openSubMenu(e, menuItem) {
      const selectedParent = menuItem.id;
      const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
      this.changeSelectedMenuHasSubItems(hasSubMenu);
      if (!hasSubMenu) {
        this.viewingParentMenu = selectedParent;
        this.selectedParentMenu = selectedParent;
        this.toggle();
      } else {
        const currentClasses = this.menuType
          ? this.menuType.split(" ").filter(x => x !== "")
          : "";

        if (!currentClasses.includes("menu-mobile")) {
          if (
            currentClasses.includes("menu-sub-hidden") &&
            (this.menuClickCount === 2 || this.menuClickCount === 0)
          ) {
            this.changeSideMenuStatus({
              step: 3,
              classNames: this.menuType,
              selectedMenuHasSubItems: hasSubMenu
            });
          } else if (
            currentClasses.includes("menu-hidden") &&
            (this.menuClickCount === 1 || this.menuClickCount === 3)
          ) {
            this.changeSideMenuStatus({
              step: 2,
              classNames: this.menuType,
              selectedMenuHasSubItems: hasSubMenu
            });
          } else if (
            currentClasses.includes("menu-default") &&
            !currentClasses.includes("menu-sub-hidden") &&
            (this.menuClickCount === 1 || this.menuClickCount === 3)
          ) {
            this.changeSideMenuStatus({
              step: 0,
              classNames: this.menuType,
              selectedMenuHasSubItems: hasSubMenu
            });
          }
        } else {
          this.addMenuClassname({
            classname: "sub-show-temporary",
            currentClasses: this.menuType
          });
        }
        this.viewingParentMenu = selectedParent;
      }
    },
    handleDocumentClick(e) {
      this.viewingParentMenu = "";
      this.selectMenu();
      this.toggle();
    },
    toggle() {
      const currentClasses = this.menuType.split(" ").filter(x => x !== "");
      if (
        currentClasses.includes("menu-sub-hidden") &&
        this.menuClickCount === 3
      ) {
        this.changeSideMenuStatus({
          step: 2,
          classNames: this.menuType,
          selectedMenuHasSubItems: this.selectedMenuHasSubItems
        });
      } else if (
        currentClasses.includes("menu-hidden") ||
        currentClasses.includes("menu-mobile")
      ) {
        if (!(this.menuClickCount === 1 && !this.selectedMenuHasSubItems)) {
          this.changeSideMenuStatus({
            step: 0,
            classNames: this.menuType,
            selectedMenuHasSubItems: this.selectedMenuHasSubItems
          });
        }
      }
    },
    // Resize
    handleWindowResize(event) {
      if (event && !event.isTrusted) {
        return;
      }
      let nextClasses = this.getMenuClassesForResize(this.menuType);
      this.changeSideMenuStatus({
        step: 0,
        classNames: nextClasses.join(" "),
        selectedMenuHasSubItems: this.selectedMenuHasSubItems
      });
    },
    getMenuClassesForResize(classes) {
      let nextClasses = classes.split(" ").filter(x => x !== "");
      const windowWidth = window.innerWidth;

      if (windowWidth < menuHiddenBreakpoint) {
        nextClasses.push("menu-mobile");
      } else if (windowWidth < subHiddenBreakpoint) {
        nextClasses = nextClasses.filter(x => x !== "menu-mobile");
        if (
          nextClasses.includes("menu-default") &&
          !nextClasses.includes("menu-sub-hidden")
        ) {
          nextClasses.push("menu-sub-hidden");
        }
      } else {
        nextClasses = nextClasses.filter(x => x !== "menu-mobile");
        if (
          nextClasses.includes("menu-default") &&
          nextClasses.includes("menu-sub-hidden")
        ) {
          nextClasses = nextClasses.filter(x => x !== "menu-sub-hidden");
        }
      }
      return nextClasses;
    }
  },
  computed: {
    ...mapGetters({
      menuType: "getMenuType",
      menuClickCount: "getMenuClickCount",
      selectedMenuHasSubItems: "getSelectedMenuHasSubItems",
      esSemi: "esSemi",
      esMaster: "esMaster",
      esDcoordinador:"esDcoordinador"
    }),

    logueado() {
      return this.$store.state.user.currentUser;
    },
    esDelegado() {
      return (
        this.$store.state.user.currentUser &&
        this.$store.state.user.currentUser.role.id === 3
      );
    },
    esDistribuidor() {
      return (
        this.$store.state.user.currentUser &&
        this.$store.state.user.currentUser.role.id === 4
      );
    },
    esTecnico() {
      return (
        this.$store.state.user.currentUser &&
        this.$store.state.user.currentUser.role.id === 5
      );
    },
    user() {
      return this.$store.state.user.currentUser;
    },
    esAutoSat() {
      return (
        this.$store.state.user.currentUser &&
        this.$store.state.user.currentUser.role.id === 4 &&
        this.$store.state.user.currentUser.autosat
      );
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        const toParentUrl = to.path.split("/").filter(x => x !== "")[1];
        if (toParentUrl !== undefined || toParentUrl !== null) {
          this.selectedParentMenu = toParentUrl.toLowerCase();
        } else {
          this.selectedParentMenu = "dashboards";
        }
        this.selectMenu();
        this.toggle();
        this.changeSideMenuStatus({
          step: 0,
          classNames: this.menuType,
          selectedMenuHasSubItems: this.selectedMenuHasSubItems
        });

        window.scrollTo(0, top);
      }
    }
  }
};
</script>
<style scoped>
div.sidevar div.main-menu section.ps-container ul.list-unstyled li a.active {
  height: 45px;
}
div.sidevar div.main-menu section.ps-container ul.list-unstyled li a {
  margin-top: 40px;
  margin-bottom: 40px;
}

@media all and (max-width: 420px) {
  div.sidevar div.main-menu section.ps-container ul.list-unstyled li a {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
