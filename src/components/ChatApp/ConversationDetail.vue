<template>
  <div>
    <div class="d-flex flex-row chat-heading mb-2" >
      <div class="d-flex">

      </div>
      <div class="d-flex min-width-zero" style="align-items: baseline;">
        <b-button
          variant="outline-secondary"
          class="mr-4"
          @click="historyChatSwitch()"
        >

        <font-awesome-icon :icon="['fas', 'file-lines']" style="color: #867b75;"/>
        <span>Ver historial de chats</span>
        </b-button>


        <b-button
          variant="outline-secondary"
          class="mr-4"
          @click="nuevoChat()"
          
        >

        <font-awesome-icon :icon="['fas', 'file-lines']" style="color: #867b75;"/>

        <span>Generar nuevo chat</span>

        </b-button>
       
        

      </div>
    </div>
    <div class="separator mb-5" />
    <vue-perfect-scrollbar
      class="scroll"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      ref="chatArea"
    >
      <div v-for="(message, index) in messages" :key="`message${index}`">
        <b-card
          no-body
          :class="{
            'd-inline-block mb-3': true,
            'w-100': true,
            'white-box': message.sender === 'ia',
            'blue-box': message.sender === 'user'
          }"
        >
          <div class="position-absolute pt-1 pr-2 r-0">
            <span class="text-extra-small text-muted">{{ message.time }}</span>
          </div>
          <b-card-body>
            <div
              class="d-flex flex-row pb-1 w-100 div-user"
              v-if="message.sender === 'user'"
            >
              <img
                :alt="currentUser.title"
                :src="currentUser.img"
                class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                style="width: 15px; height: 15px;"
              />
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <p class="mb-0 truncate list-item-heading">
                      {{ currentUser.title }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row pb-1" v-else>
              <img
                :alt="otherUser.title"
                :src="otherUser.img"
                class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                style="width: 15px; height: 15px;"
              />
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <p class="mb-0 truncate list-item-heading">
                      {{ otherUser.title }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat-text-left">
              <vue-markdown  :source="message.content" :ref="message.uuid" :id="message.uuid" />
              <template v-if="message.sender == 'ia'" >
    <div class="">
      <span class="button-add-document" @click="addDocument(message.uuid)">+ copiar al documento</span>
    
    </div>
  </template>
            </div>
          </b-card-body>
        </b-card>
        <div class="clearfix" />
      </div>
      <div v-if="currentMessage">
        <b-card
          no-body
          :class="{
            'd-inline-block mb-3': true,
            'float-left': true
          }"
        >
          <div class="position-absolute pt-1 pr-2 r-0">
            <span class="text-extra-small text-muted"></span>
          </div>
          <b-card-body class="p-1">
            <div class="d-flex flex-row pb-1">
              <img
                :alt="otherUser.title"
                :src="otherUser.img"
                class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                style="width: 25px;height: 25px;"
              />
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <p class="mb-0 truncate list-item-heading">
                      {{ otherUser.title }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat-text-left">
              <vue-markdown  :source="currentMessage" />
             
            </div>
          </b-card-body>
        </b-card>
        <div class="clearfix" />
      </div>
      <div v-if="messages.length == 0 && !currentMessage">
        <div class="empty-div">
          <p>
            <svg viewBox="0 0 24 24" fill="#fff" width="1rem" height="1rem">
              <path d="M0 0h24v24H0V0z" fill="none"></path>
              <path
                d="M20 6h-1v8c0 .55-.45 1-1 1H6v1c0 1.1.9 2 2 2h10l4 4V8c0-1.1-.9-2-2-2zm-3 5V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13l4-4h9c1.1 0 2-.9 2-2z"
              ></path>
            </svg>
          </p>
          <p>Talk to Ia Bot  Adaki </p>
          <p>Empieza a conversar ahora!!</p>
        </div>
      </div>

      <div class="clearfix" />
    </vue-perfect-scrollbar>
  </div>
</template>
<script>
import VueMarkdown from "vue-markdown";
import { mapGetters } from "vuex";
export default {
  components: {
    "vue-markdown": VueMarkdown
  },
  data () {
    return {
      height: 0
    }
  },
  props: ["currentUser", "otherUser", "messages", "currentMessage"],
  methods: {
    scrollToEnd() {
      setTimeout(() => {
        const container = this.$refs.chatArea.$el;
        container.scrollTop = container.scrollHeight;
      }, 0);
    },
    historyChatSwitch() {

      this.$store.commit("setStateHistoryChat", !this.getStateHistoryChat);
    },
    nuevoChat() {

      // limpio el local storage

      localStorage.removeItem('currentChat');

      // reseteo las variables DEL chat ACTUAL

      this.$store.commit("setCurrentChat", false);

      
    },
    addDocument(uuid) {

      let message = this.messages.find(message => message.uuid == uuid);
      

      if (this.$route.path.includes('file')) {
        if(!message) return;
        this.$store.commit("setAddTextDocument", message.content);
        return;
      }else{

        // muestro un toat indicando que primero deber estar en un documento

        this.$toast.fire({
          icon: 'error',
          title: 'Primero debes estar en un documento'
        })

      }

      
      
    }


  },
  mounted() {

    this.scrollToEnd();
    this.height = window.innerHeight - 300;

    window.addEventListener('resize', () => {
      this.height = window.innerHeight - 300;
    });

    // añado la altura del chat

   this.$refs.chatArea.$el.style.height = this.height + 'px';
  },
  updated() {
    this.scrollToEnd();
  },
  computed:{
    ...mapGetters(["getStateHistoryChat"])
  },

};
</script>
<style>
.chat-heading {
  padding: 0 1rem;
}
.chat-text-left {
  padding: 0 1rem;
}
.empty-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.blue-box {
  background-color: #239bd352;
}


.button-add-document {
 /* background-color: #239bd3;
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;*/
  border: 1px solid #239bd3;
    padding: 3px;
    border-radius: 10px;
    cursor: pointer;
}
.button-add-document:hover {
  background-color: #239bd3;
  color: #fff;

}
</style>
