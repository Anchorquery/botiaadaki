<template>
  <div>
    <b-row class="app-row">
      <b-colxx xxs="3" class="chat-app">
        <conversation-detail
          v-if="isLoadConversations && otherUser != null"
          key="conversation"
          :current-user="currentUser"
          :other-user="otherUser"
          :messages="conversationMessages"
        />
        <div v-else class="loading" key="conversationLoading"></div>
      </b-colxx>
    </b-row>
    <b-row class="app-row">
      <b-colxx xxs="5" class="chat-app">
        <div
          class="chat-input-container d-flex justify-content-between align-items-center"
        >
          <b-form-textarea
            class="flex-grow-1"
            v-model="message"
            placeholder="Enter something..."
            rows="1"
            max-rows="6"
            @keyup.native.enter="sendMessage"
          ></b-form-textarea>
          <div>
            <b-button variant="outline-primary" class="icon-button large ml-1">
              <i class="simple-icon-paper-clip" />
            </b-button>
            <b-button
              variant="primary"
              class="icon-button large ml-1"
              @click="sendMessage"
            >
              <i class="simple-icon-arrow-right" />
            </b-button>
          </div>
        </div>
      </b-colxx>
    </b-row>

    <application-menu>
      <b-tabs
        no-fade
        class="pl-0 pr-0 h-100"
        content-class="chat-app-tab-content"
        nav-class="card-header-tabs ml-0 mr-0"
        v-model="tabIndex"
      >
        <b-tab
          title="$t('chat.messages')"
          active
          title-item-class="w-50 text-center"
          no-body
          class="chat-app-tab-pane"
        >
          <div class="pt-4 spaced-content pb-0 mt-2"></div>
          <conversation-list
            v-if="isLoadConversations"
            key="conversationList"
            :current-user="currentUser"
            :conversations="conversations"
            :contacts="contacts"
            @select-conversation="selectConversation"
          />
          <div v-else class="loading" key="conversationListLoading"></div>
        </b-tab>
        <b-tab
          title="$t('chat.contacts')"
          title-item-class="w-50 text-center"
          no-body
          class="chat-app-tab-pane"
        >
          <div class="pt-4 spaced-content pb-0 mt-2">
            <div class="form-group">
              <b-input
                type="text"
                class="rounded"
                placeholder="$t('menu.search')"
                v-model="searchKey"
              />
            </div>
          </div>
          <contact-list
            key="contactList"
            :data="contactsSearchResult"
            @select-contact="selectContact"
          />
        </b-tab>
      </b-tabs>
    </application-menu>
  </div>
</template>

<script>
import {
				mapGetters,

} from 'vuex'
import ApplicationMenu from '@/components/Common/ApplicationMenu'
import ContactList from '@/components/ChatApp/ContactList'
import ConversationList from '@/components/ChatApp/ConversationList'
import ConversationDetail from '@/components/ChatApp/ConversationDetail'

export default {
				components: {
								'application-menu': ApplicationMenu,
								'contact-list': ContactList,
								'conversation-list': ConversationList,
								'conversation-detail': ConversationDetail
				},
				data() {
								return {
									isLoadConversations: true,
									contactsSearchResult : [],
												tabIndex: 0,
												message: '',
												searchKey: '',
												isLoadCurrentConversation: false,
												otherUser: {
																id: 1,
																img: '/assets/img/profiles/l-1.jpg',
																title: 'Sarah Kortney',
																lastMessageTime: 'Tue',
																conversation: null,
																date: '12/12/2018'
												},
												conversationMessages: []
								}
				},
				computed: {
								...mapGetters(['currentUser'])
				},
				methods: {

								selectConversation(otherUser, messages) {

												this.conversationMessages = messages
								},
								selectContact(userId) {

												const conversation = this.conversations.find(x => x.users.includes(userId) && x.users.includes(this.currentUser.id))
												if (conversation) {
																console.log('change selected conversation')
																this.conversationMessages = conversation.messages
												} else {
																console.log('create new conversation')
																const date = new Date()
																this.conversations.splice(0, 0, {
																				users: [userId, this.currentUser.id],
																				messages: [],
																				lastMessageTime: date.getHours() + ':' + date.getMinutes()
																})
																this.conversationMessages = []
												}
												this.tabIndex = 0
												this.message = ''
												this.searchKey = ''
								},
								async sendMessage() {
		
									 if (this.message == "")  return;
											try {
													this.statusSend = true;
													let data = {
															sessionId: localStorage.getItem("sessionId") || null,
															message: this.message,
															language: this.selectedLanguage.name,
															tone: this.selectedTone.id,
															history: this.messages,
															type: type == 1 ? "chat" : "emberding",
													};

													this.messages.push({
															sender: "You",
															content: this.message,
															time: new Date().toLocaleTimeString(),
													});

													this.message = "";
													let response = await axios.post("/strapi-chat/chat", { data });

													localStorage.setItem("sessionId", response.data.data.sessionId);

													this.messages.push({
															sender: "Rytr",
															content:
																	type == 1 ? response.data.data.response : response.data.data.text,
															time: new Date().toLocaleTimeString(),
													});
													this.statusSend = false;

											} catch (error) {
													console.log(error);
													this.statusSend = false;
											}
									
					}

							
				},
				mounted() {
								document.body.classList.add("no-footer");
				},
				beforeDestroy() {
								document.body.classList.remove("no-footer");
				},
			/*	watch: {
								searchKey(val, oldVal) {
												this.searchContacts({
																userId: this.currentUser.id,
																searchKey: val
												})
								}
				}*/
}
</script>
