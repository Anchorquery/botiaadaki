import Vue from "vue";
import store from "./store";
import VueRouter from "vue-router";
/* 

  Administradores

*/

// Usuarios
import UserIndex from "./views/app/admin/users";
import User from "./views/app/admin/users/users";
import NewUser from "./views/app/admin/users/NewUser.vue";
import DetalleUsuario from "./views/app/admin/users/DetalleUsuario.vue";
import DetalleUsuarioOnlyRead from "./views/app/admin/users/DetalleUsuarioOnlyRead.vue";
import Setting from "./views/app/admin/settings";
import ExitoUser from "./views/app/admin/users/ExitoUsuario.vue";


// Chat

import Chat from "./views/app/admin/chat/Chat.vue";


// Documentacion

//import Documentacion from "./views/app/admin/documentacion/front/Temporada";

import DocuFrontFamilia from "./views/app/admin/documentacion/front/Familia"

import DocumentacionVisual from "./views/app/admin/documentacion/DocumentacionVisual.vue";

// NUEVA DOCUMENTACION
import DocuTemporadas from "./views/app/admin/documentacion/temporada/Temporadas";
import DocuTemporada from "./views/app/admin/documentacion/temporada/Temporada";
import DocuFamilias from "./views/app/admin/documentacion/familia/Familias";
import DocuFamilia from "./views/app/admin/documentacion/familia/Familia";
import DocuCategoria from "./views/app/admin/documentacion/categoria/Categoria";
import DocumentacionMaster from "./views/app/admin/documentacion";

import CategoriaFront from "./views/app/admin/documentacion/front/Categoria";

import Documentacion from "./views/app/admin/documentacion/front/";
import TemporadaFront from "./views/app/admin/documentacion/front/Temporada"

/*Front*/
import Login from "./views/home/Login.vue";

import Cargando from "./views/home/Cargando.vue";

import ContrasenaOlvidada from "./views/home/ContrasenaOlvidada.vue"

import ResetearContrasena from "./views/home/ResetearContrasena.vue"

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    if (err.name !== "NavigationDuplicated") throw err;
  });
};
const routes = [
  {
    path: "/app/home",
    component: () => import(/* webpackChunkName: "home" */ "./views/home"),
    name: "home",
    meta: {
      master: true,
      semi: true,
      distribuidor: true,
      tecnico: true,
      delegado: true,
      title: "Inicio | ChatBot"
    }
  },

  {
    path: "/app",
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: "/app/home",

    children: [

      {
        path:"create",
        name :"create",
        component: () => import(/* webpackChunkName: "create" */ "./views/app/admin/create"),
        meta:{
          master: true,
          delegado: true,
          title: "Crear | ChatBot"          
        },
        children:[
          { 
            name: 'createHome',
            path: '',
            components: {
              left : () => import(/* webpackChunkName: "create" */ "./views/app/admin/create/TabsNavigation.vue"),
              right: () => import(/* webpackChunkName: "create" */ "./views/app/admin/create/InfoData.vue"),
            },
          },
            { 
              name: 'file',
              path: 'file/:uuid',
              components: {
                left : () => import(/* webpackChunkName: "create" */ "./views/app/admin/create/TabsNavigation.vue"),
                right: () => import(/* webpackChunkName: "create" */ "./views/app/admin/create/file/File.vue"),
              },
            },
            { 
              name: 'folder',
              path: 'folder/:uuid',
              components: {
                left : () => import(/* webpackChunkName: "create" */ "./views/app/admin/create/TabsNavigation.vue"),
                right: () => import(/* webpackChunkName: "create" */ "./views/app/admin/create/InfoData.vue"),
              },
            },
          {
            path: "chat",
            name: "chat",
            component: Chat,
            meta: {
              master: true,
              semi: true,
              distribuidor: true,
              tecnico: true,
              delegado: true,
              title: "Chat | ChatBot"
            }
          },
        ]
      },

      {
        path:"documentacion",
        name:"documentacion",
        component:DocumentacionMaster,
        meta:{
          master: true,
          delegado: true,
          title: "Documentacion | ChatBot"          
        }

      },
      {
        path:"documentacion/temporadas",
        name:"documentacion-temporadas",
        component:DocuTemporadas,
        meta:{
          master: true,
          delegado: true,
          title: "Documentacion Temporadas | ChatBot"          
        }

      },
      {
        path:"documentacion/temporada/:id",
        name:"documentacion-temporada",
        component:DocuTemporada,
        meta:{
          master: true,
          delegado: true,
          title: "Documentacion Temporada | ChatBot"          
        }

      },
      {
        path:"documentacion/familias",
        name:"documentacion-familias",
        component:DocuFamilias,
        meta:{
          master: true,
          delegado: true,
          title: "Documentacion - Familias | ChatBot"          
        }

      },
      {
        path:"documentacion/familia/:id",
        name:"documentacion-familia",
        component:DocuFamilia,
        meta:{
          master: true,
          delegado: true,
          title: "Documentacion - Familia| ChatBot"          
        }

      },
      {
        path:"documentacion/categoria/:id",
        name:"documentacion-categoria",
        component:DocuCategoria,
        meta:{
          master: true,
          delegado: true,
          title: "Documentacion - Categoria | ChatBot"          
        }

      },
      {
        path: "usuarios",
        name: "usuarios",
        component: UserIndex,
        meta: {
          master: true,
          delegado: true,
          distribuidor:true,
          title: "Usuarios | ChatBot"
        }
      },
      {
        path: "usuarios/detalle/:id",
        name: "detalleUsuario",
        component: DetalleUsuario,
        meta: {
          master: true,
          delegado: true,
          
          title: "Detalle usuario | ChatBot"
        }
      },
      {
        path: "usuarios/detalle-usuario/:id",
        name: "detalleUsuarioOnlyRead",
        component: DetalleUsuarioOnlyRead,
        meta: {
          master: true,
          delegado: true,
          distribuidor:true,
          title: "Detalle usuario | ChatBot"
        }
      },
      {
        path: "usuarios/add",
        name: "NewUser",
        component: NewUser,
        meta: {
          master: true,
          delegado: true,
          title: "Nuevo Usuario | ChatBot"
        }
      },
      {
        path: "usuarios/distribuidores",
        name: "distribuidores-user",
        component: User,
        meta: {
          master: true,
          delegado: true,
          distribuidor:true,
          title: "Usuarios distribuidores | ChatBot"
        }
      },
      {
        path: "usuarios/master",
        name: "master-user",
        component: User,
        meta: {
          master: true,
          title: "Usuarios master | ChatBot"
        }
      },
      {
        path: "usuarios/tecnicos",
        name: "tecnicos-user",
        component: User,
        meta: {
          master: true,
          delegado: true,
          semi: true,
          title: "Usuarios tecnicos | ChatBot"
        }
      },
      {
        path: "usuarios/delegados",
        name: "delegados-user",
        component: User,
        meta: {
          master: true,
          title: "Usuarios delegados | ChatBot"
        }
      },
      {
        path: "usuarios/semimaster",
        name: "semimaster-user",
        component: User,
        meta: {
          master: true,
          title: "Usuarios delegados | ChatBot"
        }
      },
      {
        path: "usuarios/exito/:id",
        name: "usuario-exitoso",
        component: ExitoUser,
        meta: {
          delegado: true,
          master: true,
          title: "Usuario creado exitosamente | ChatBot"
        }
      },

      {
        path: "settings",
        name: "ajustes",
        component: Setting,
        meta: {
          master: true,
          semi: true,
          distribuidor: true,
          tecnico: true,
          delegado: true,
          title: "Ajustes | ChatBot"
        }
      }
    ]
  },
  {
    path: "/",
    name: "login",
    component: Login,
    meta: {
      free: true,
      title: "Iniciar Sesión | ChatBot"
    }
  },
  {
    path: "/loading",
    name: "cargando",
    component: Cargando,
    meta: {
      free: true,
      master: false,
      semi: false,
      distribuidor: false,
      tecnico: false,
      delegado: false,
      title: "Cargando... | ChatBot"
    }
  },
  {
    path: "/restablecer-contrasena",
    name: "contraseña-olvidada",
    component: ContrasenaOlvidada,
    meta: {
      free: true,
      title: "Restablecer contraseña | ChatBot"
    }
  },
  {
    path: "/resetear-contrasena",
    name: "resetear-contrasena",
    component: ResetearContrasena,
    meta: {
      free: true,
      title: "Resetear contraseña | ChatBot"
    }
  },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error"),
    meta: {
      free: true,
      title: "Upps! | ChatBot"
    }
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error"),
    meta: {
      free: true,

    }
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {

  document.title = to.meta.title || "EOOS";



  if (to.matched.some(record => record.meta.free)) {

    next();
  } else if (
    store.state.user.currentUser &&
    store.state.user.currentUser.role.id == "1"
  ) {
    if (to.matched.some(record => record.meta.master)) {
      next();
    }
  } else if (
    store.state.user.currentUser &&
    store.state.user.currentUser.role.id == "3"
  ) {
    if (to.matched.some(record => record.meta.delegado)) {
      next();
    }
  } else if (
    store.state.user.currentUser &&
    store.state.user.currentUser.role.id == "4" ||      store.state.user.currentUser &&
    store.state.user.currentUser.role.id == "10" 
  ) {
    if (to.matched.some(record => record.meta.distribuidor)) {
      next();
    }
  } else if (
    store.state.user.currentUser &&
    store.state.user.currentUser.role.id == "4" &&
    store.state.user.currentUser.autosat
  ) {
    if (to.matched.some(record => record.meta.autosat)) {
      next();
    }
  } else if (
    store.state.user.currentUser &&
    store.state.user.currentUser.role.id == "5"
  ) {
    if (to.matched.some(record => record.meta.tecnico)) {
      next();
    }
  } else if (
    store.state.user.currentUser &&
    store.state.user.currentUser.role.id == "9"
  ) {
    if (to.matched.some(record => record.meta.semi)) {
      next();
    }
  } else {
    
    next({ name: "login" });
  }
});
export default router;
