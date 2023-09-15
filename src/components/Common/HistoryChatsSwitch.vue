<template >
  <div
    :class="{'theme-colors':true, 'history-chat':true,  'shown' : isOpen}"
  >

  <b-container>

    <b-row>

      <b-col cols="12" class="text-center">
        <h3>Historial de chats</h3>
      </b-col>
      <vue-perfect-scrollbar
              class="scroll"
              style="height: 400px;"
              :settings="{ suppressScrollX: true, wheelPropagation: false }"
              ref="historyChatArea"
              id="historyChatAre"
              v-if="items.length>0"

            >
      <div >


        <ul>
          <li v-for="item in items" :key="item.uuid">
            <b-button
              variant="outline-secondary"
              class="mr-4"
              @click="historyChatSwitch(item.uuid)"
            >
              <font-awesome-icon :icon="['fas', 'file-lines']" style="color: #867b75;"/>
            </b-button>
            <span>{{item.lastMessage.content}}</span>
            <span>{{item.lastMessage.datetime}}</span>
          </li>
        </ul>


      </div>
      </vue-perfect-scrollbar>
      <div v-else>
        <b-col cols="12" class="text-center">
          <h3>No hay chats</h3>
        </b-col>

      </div>

    </b-row>

  </b-container>





  </div>
</template>

<script>
import { socket } from "@/socket";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isActivate: true,
      idGroup:"",
      isOpen: false,
      items : [],

    };
  },

  methods: {

   async getChats() {
        try {
            
          let { data } = await axios.get(
            `/chats`
          );

          this.items = data.data


        } catch (error) {
           console.log(error);
           this.$toast.fire({
          icon: "error",
          title: "No se pudo obtener los chats",
           });
        }
    },

    handleDocumentClick(e) {
      if (!this.isMenuOver) {
        this.toggle();
      }
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
    historyChatSwitch(idGroup) {
      
      this.$store.commit("setCurrentChat", idGroup);

      // guardo en el local storage el chat actual

      localStorage.setItem('currentChat', idGroup);
    },
  },
  watch: {

    getStateHistoryChat (val) {
        console.log("abrete");
      this.toggle(); 
    },
    getCurrentChat (val) {
      this.getChats();
    },
    getLoadChats (val) {
      if(val){
        this.getChats();
        // luego de cargar lo vuelvo a false
        this.$store.commit("setLoadChats", false);
      }
      
    }
  },
  beforeDestroy() {

 

    socket.off("messageTaskSchedule")
  },
  mounted() {
    this.getChats();

  },
  computed: {
    ...mapGetters(["getStateHistoryChat", "getCurrentChat" , "getLoadChats"])
  }
};
</script>
