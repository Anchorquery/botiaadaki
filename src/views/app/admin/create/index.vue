<template>
  <div>
    <application-menu float="left" position="left" width="30%" class="lg-30">
      
      <router-view name="left"></router-view>
      
    </application-menu>
    <application-menu float="right" position="right" width="70%" class="lg-70">
      
      <router-view name="right"></router-view>
      <cron-notification  />
      <history-chat-switch />
    </application-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ApplicationMenu from "@/components/Common/ApplicationMenu";
import ContactList from "@/components/ChatApp/ContactList";
import ConversationList from "@/components/ChatApp/ConversationList";
import ConversationDetail from "@/components/ChatApp/ConversationDetail";

import historyChatSwitch from "@/components/Common/HistoryChatsSwitch.vue";
import CronNotification from '@/components/Common/CronNotification.vue';




export default {
  components: {
    "application-menu": ApplicationMenu,
    "contact-list": ContactList,
    "conversation-list": ConversationList,
    "conversation-detail": ConversationDetail,
    "history-chat-switch": historyChatSwitch,
    "cron-notification":CronNotification
  },
  data() {
    return {
      copyDescription: "",
      isLoadConversations: true,
      contactsSearchResult: [],
      tabIndex: 0,
      statusSend: false,
      message: "",
      searchKey: "",
      arrayPrompts: [],
      prompt: null,
      selectedLanguage: "es",
      tones: [],
      selectedTone: null,
      temperatures: [],
      selectedTemperature: null,
      languages: [
        { text: "English", value: "en" },
        { text: "Spanish", value: "es" },
        { text: "Euskera", value: "eu" }
      ],
      isLoadCurrentConversation: false,
      otherUser: {
        id: 1,
        img: "/assets/img/profiles/l-1.jpg",
        title: "Sarah Kortney",
        lastMessageTime: "Tue",
        conversation: null,
        date: "12/12/2018"
      },
      error: false,
      conversationMessages: []
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },



};
</script>
<style>
.lg-70 {
  width: 69.99%;
}
.lg-30 {
  width: 29.99%;
}
</style>
