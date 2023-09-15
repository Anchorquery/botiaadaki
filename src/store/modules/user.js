
import router from "../../router";
import { socket } from "@/socket";
// cofiguro axios

export default {
  state: {
    currentUser: localStorage.getItem("x") ? localStorage.getItem("x") : null,
    authorization: localStorage.getItem("authorization")
      ? localStorage.getItem("authorization")
      : null,

    loginError: null,
    processing: false,
    registerError: null,
    forgotMailSuccess: null,
    resetPasswordSuccess: null
  },
  getters: {
    currentUser: state => state.currentUser,
    delegacion: state => !state.currentUser.delegacion ? "solar" : state.currentUser.delegacion ,
    processing: state => state.processing,
    loginError: state => state.loginError,
    forgotMailSuccess: state => state.forgotMailSuccess,
    resetPasswordSuccess: state => state.resetPasswordSuccess,
    registerError: state => state.registerError,
    esMaster: state =>
      !state.currentUser
        ? false
        : state.currentUser.role.id === 1
          ? true
          : false,
    esDelegado: state =>
      !state.currentUser
        ? false
        : state.currentUser.role.id === 3
          ? true
          : false,
    esDistribuidor: state =>
      !state.currentUser
        ? false
        : state.currentUser.role.id === 4
          ? true
          : false,
    esDcoordinador: state =>
      !state.currentUser
        ? false
        : state.currentUser.role.id === 10
          ? true
          : false,
    esTecnico: state =>
      !state.currentUser
        ? false
        : state.currentUser.role.id === 5
          ? true
          : false,
    esSemi: state =>
      !state.currentUser
        ? false
        : state.currentUser.role.id === 9
          ? true
          : false,
    esAutoSat: state => state.currentUser.autosat,
    logueado: state => (state.currentUser ? true : false)
  },
  mutations: {
    /*PERSOLANIZACIONES*/
    setToken(state, payload) {
      state.authorization = payload;
    },
    setUser(state, payload) {
      state.currentUser = payload;
      state.processing = false;
      state.loginError = null;
    },
    /**/
    /* setUser(state, payload) {
       state.currentUser = payload
       state.processing = false
       state.loginError = null
     },*/
    setLogout(state) {
      state.currentUser = null;
      state.processing = false;
      state.loginError = null;
    },
    setProcessing(state, payload) {
      state.processing = payload;
      state.loginError = null;
      state.registerError = null;
    },
    setError(state, payload) {
      state.loginError = payload;
      state.currentUser = null;
      state.processing = false;
    },
    setForgotMailSuccess(state) {
      state.loginError = null;
      state.currentUser = null;
      state.processing = false;
      state.forgotMailSuccess = true;
    },
    setRegisterError(state, payload) {
      state.registerError = payload;
      state.processing = false;
    },
    setResetPasswordSuccess(state) {
      state.loginError = null;
      state.currentUser = null;
      state.processing = false;
      state.resetPasswordSuccess = true;
    },
    clearError(state) {
      state.loginError = null;
      state.registerError = null;
    }
  },
  actions: {

    clearCar({ commit }, input) {

      console.log('ejecutado')
      commit('clearCar', input, { root: true });       // Commit in this module

    },

    async login({ commit, dispatch, state }, payload) {
      try {
        commit("clearError");
        commit("setProcessing", true);

        console.log('payload',payload)

        let response = await axios.post("auth/local", {
          identifier: payload.email,
          password: payload.password
        }, { headers: { 'Content-Type': 'application/json' } });

        console.log('response',response)

        let data = response.data;


        dispatch("guardarToken", data.jwt);

        // le añado a data.user el rol para que no de error en el menu

        data.user = { ...data.user, role: {id:1} };

        dispatch("guardarUser", data.user);
        // añado el token al header de websocket llamado autorization

        socket.extraHeaders = {
          Authorization: `Bearer ${data.jwt}`
        };

        router.push({ name: "createHome" });
      } catch (err) {
        console.log(err)
console.log(err.response)
        if (err.response) {
          if (err.response.status == 500) {
            var e = err.response.data;
            //console.log('e',e)
            commit("setError", e);
            //this.messageError(e.message,e.error);

            return;
          } else {
            var e = err.response.data;
            //console.log('e',e)
            commit("setError", e);
            //this.messageError('Upps!',e);
            return;
          }
        } else if (err.request) {
          var e =
            "Tiempo de espera excedido o solicitud no enviada, intente nuevamente";
          commit("setError", e);
          //this.messageError(message,err);

          return;
        } else {
          //console.log('err',err)
          commit("setError", err);
          //this.messageError(message,err);
          return;
        }
      }
    },

    guardarToken({ commit }, payload) {
      try {
        commit("setToken", payload);
        localStorage.setItem("authorization", payload);
      } catch (error) {
        console.log("error", error);
      }
    },
    guardarUser({ commit }, payload) {
      try {
        commit("setUser", payload);
      } catch (error) {
        console.log("error", error);
      }
    },
    async autoLogin({ commit, dispatch, state }) {
      try {
        let { _t, i, m, a } = router.app._route.query;
        router.replace({ query: null });

        let header = { Authorization: `Bearer ${_t}` };
        let setting = { headers: header };

        const user = axios.get("/users/me", setting);

        if (m != "login") {
          var elemento = axios.get(`${m}/${i}`, setting);
        }

        if (a == "true" && m != "roturas" && m != "login") {
          const cerrar = axios.put(`${m}/${i}`, { state: false }, setting);

          var [userP, elementoP, cerrarP] = await Promise.all([
            user,
            elemento,
            cerrar
          ]);
        } else if (a == "true" && m == "roturas" && m != "login") {
          const cerrar = axios.put(`${m}/${i}`, { state: true }, setting);

          var [userP, elementoP, cerrarP] = await Promise.all([
            user,
            elemento,
            cerrar
          ]);
        } else if (m == "login") {
          var userP = await user;
        } else {
          var [userP, elementoP] = await Promise.all([user, elemento]);
        }

        dispatch("guardarToken", _t);
        dispatch("guardarUser", userP.data);

        if (m == "incidencias") {
          if (
            userP.data.role.id == 4 ||
            (userP.data.role.id == 1 && elementoP.data.creador.role == 4) ||
            (userP.data.role.id == 3 && elementoP.data.creador.role == 4) ||
            userP.data.role.id == 3
          ) {
            router.push({
              name: "distribuidores-detalle-incidencia",
              params: { id: i }
            });
            commit("setMenuSidebar", "distribuidores");
          } else if (userP.data.role.id == 5) {
            router.push({
              name: "tecnicos-detalle-incidencia",
              params: { id: i }
            });
            commit("setMenuSidebar", "tecnicos");
          } else {
            router.push({ name: "home" });
          }
        } else if (m == "roturas") {
          if (
            userP.data.role.id == 4 ||
            (userP.data.role.id == 1 && elementoP.data.creador.role == 4) ||
            (userP.data.role.id == 3 && elementoP.data.creador.role == 4) ||
            userP.data.role.id == 3
          ) {
            router.push({
              name: "distribuidores-detalle-rotura",
              params: { id: i }
            });
            commit("setMenuSidebar", "distribuidores");
          } else {
            router.push({ name: "home" });
          }
        } else if (m == "pedidos") {
          if (
            userP.data.role.id == 4 ||
            (userP.data.role.id == 1 && elementoP.data.creador.role == 4) ||
            (userP.data.role.id == 3 && elementoP.data.creador.role == 4) ||
            userP.data.role.id == 3
          ) {
            router.push({
              name: "distribuidores-detalle-pedidos",
              params: { id: i }
            });
            commit("setMenuSidebar", "distribuidores");
          } else {
            router.push({ name: "home" });
          }
        } else if (m == "puestas-en-marchas") {
          router.push({
            name: "tecnicos-detalle-puesta",
            params: { id: i }
          });
          commit("setMenuSidebar", "tecnicos");
        } else if (m == "login") {
          router.push({ name: "home" });
        }
      } catch (error) {
        console.log(error.error);
      }
    },


    signOut({ commit }) {
      commit("setToken", null);
      commit("setUser", null);
      commit("setLogout");
      
      //localStorage.removeItem("authorization");
      localStorage.clear();
      router.push({ name: "login" });
      this.state.cart.cart = [];
      //this.cart.commit('clearCar', []);
    },
    async forgotPassword({ commit }, payload) {
      try {
        commit("clearError");
        commit("setProcessing", true);
        await axios.post("/auth/forgot-password", { email: payload.email });

        commit("clearError");
        commit("setForgotMailSuccess");
      } catch (error) {
        console.log(error);
        console.log(error.response);
        var { data } = error.response;
        if (data) {
          data.message.forEach(err => {
            err.messages.forEach(x => {
              if (x.id == "Auth.form.error.user.not-exist") {
                commit(
                  "setError",
                  "El usuario no se encuentra registrado en la plataforma."
                );
              } else {
                commit("setError", x.message);
              }
            });
          });
        }

        setTimeout(() => {
          commit("clearError");
        }, 3000);
      }
    },
    async resetPassword({ commit }, payload) {
      try {
        commit("clearError");
        commit("setProcessing", true);
        await axios.post("/auth/reset-password", {
          code: payload.resetPasswordCode,
          password: payload.newPassword,
          passwordConfirmation: payload.confirmationPassword
        });

        commit("clearError");
        commit("setResetPasswordSuccess");
      } catch (error) {
        console.log(error);
        console.log(error.response);
        var { data } = error.response;
        if (data) {
          data.message.forEach(err => {
            err.messages.forEach(x => {
              if (x.id == "Auth.form.error.user.not-exist") {
                commit(
                  "setError",
                  "El usuario no se encuentra registrado en la plataforma."
                );
              } else {
                commit("setError", x.message);
              }
            });
          });
        }

        setTimeout(() => {
          commit("clearError");
        }, 3000);
      }
    }
  }
};
