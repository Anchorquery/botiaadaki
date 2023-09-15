<template >
  <div
    :class="{'theme-colors':true, 'shown' : isOpen}"
    @mouseenter="isMenuOver=true"
    @mouseleave="isMenuOver=false"
    v-if='isActivate == true'
  >
    <div class="p-4" v-if="progress !=100">

      <b-progress :value="progress" :max="100"></b-progress>
    <p>{{ messageCron }}</p>


    </div>

    <div class="pb-0 pl-4 pt-4" v-else>


      <p> Todos los elementos fueron agregados a la base de datos </p>

    </div>
    <a href="#" class="theme-button" @click.prevent="toggle">
      <i class="simple-icon-magic-wand"></i>
    </a>
  </div>
</template>

<script>
import { socket } from "@/socket";
export default {
  data() {
    return {
      isActivate: true,
      idJobs :"",
      progress: 0,

      idGroup:"",
      isOpen: false,
      isMenuOver: false,
      messageCron: 'Esperando inicie proceso'

    };
  },

  methods: {


    addEvents() {
      document.addEventListener("click", this.handleDocumentClick);
      document.addEventListener("touchstart", this.handleDocumentClick);
    },
    removeEvents() {
      document.removeEventListener("click", this.handleDocumentClick);
      document.removeEventListener("touchstart", this.handleDocumentClick);
    },
    handleDocumentClick(e) {
      if (!this.isMenuOver) {
        this.toggle();
      }
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.addEvents();
      } else {
        this.removeEvents();
      }
    }
  },
  beforeDestroy() {
    this.removeEvents();
    // apago el socket

    socket.off("messageTaskSchedule")
  },
  mounted() {


      socket.on("messageTaskSchedule", data => {
        console.log(data);




        if(data.type == "progress"){
          this.progress = data.progress
        }

        if(data.type == "message"){
          this.messageCron = data.message
        }

        if(data.type == "end"){

          // espero 5 segundos antes de marcar como terminado


          this.$toast.fire({
          icon: "success",
          title: data.message,
          
        });



          /*setTimeout(() => {
            this.isActivate = false
          }, 5000);*/
          
        }

        
      });


    
  }
};
</script>
