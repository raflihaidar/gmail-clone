<template>
  <div classs="w-[95%]" :class="sideBarStatus ? 'ml-80' : 'ml-2'">

    <!-- NAVBAR -->
    <div class=" flex items-center justify-between w-full mb-5" id="nav-icon">
      <span class="flex items-center w-[65%]">
        <router-link to="/email/">
          <IconComponent iconString="back" text="Back to sent email" :size="19" iconColor="#636363"
            hoverColor='hover:bg-gray-200' />
        </router-link>
        <IconComponent iconString="archive" text="Archive" :iconSize="19" iconColor="#636363"
          hoverColor='hover:bg-gray-200' />
        <IconComponent iconString="trash" text="Delete" :iconSize="19" iconColor="#636363" hoverColor='hover:bg-gray-200'
          @click="deleteDataMessages" />
        <IconComponent iconString="clock" text="Snoozed" :iconSize="19" iconColor="#636363"
          hoverColor='hover:bg-gray-200' />
        <IconComponent iconString="more" text="More" :iconSize="19" iconColor="#636363" hoverColor='hover:bg-gray-200' />
      </span>
      <span class="flex items-center w-[35%] mx-auto" :class="sideBarStatus ? 'pl-56' : 'pl-80'">
        <IconComponent iconString="left" text="Newer" :iconSize="19" iconColor="#636363" hoverColor='hover:bg-gray-200' />
        <IconComponent iconString="right" text="Older" :iconSize="19" iconColor="#636363"
          hoverColor='hover:bg-gray-200' />
        <IconComponent iconString="pencil" text="input tools on/of" :iconSize="19" iconColor="#636363"
          hoverColor='hover:bg-gray-200' />
      </span>
    </div>

    <!-- BODY -->
    <div>
      <div class="w-[93%] mx-auto mb-5 text-xl text-black" id="subject">
        <p v-if="email.subject !== ''">{{ email.subject }}</p>
        <span v-else>(no subject)</span>
      </div>

      <div class="flex gap-x-2 mb-5 w-[90%] justify-between items-center" id="content">
        <div class="bg-slate-200 rounded-full w-14 h-12" id="img-profile">
        </div>
        <div class="w-full" id="left-content">
          <span class="font-semibold mr-2">{{ email.firstName }}</span>
          <span class="text-xs text-gray-400">{{ email.fromEmail }}</span>
          <div class="text-xs">
            <p>To : {{ email.toEmail }}</p>
            <div class="my-3 w-full">{{ email.body }}</div>
          </div>
        </div>
        <span class="text-xs w-40" :class="sideBarStatus ? 'pr-0' : 'pr-10'" id="right-content">{{
          email.createdAt
        }}</span>
      </div>

      <div class="flex gap-x-4 w-[93%] mx-auto modal" id="botton" v-if="Modal === 'button'">
        <button
          class="flex items-center gap-x-1 py-2 justify-center border border-black w-28 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          @click="Modal = 'replyModal'">
          <component :is="ReplyIcon" :size="19" />
          Reply
        </button>
        <button
          class="flex items-center gap-x-1 py-2 justify-center border border-black w-28 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          @click="Modal = 'forwardModal'">
          <component :is="ForwardIcon" :size="19" />
          Forward
        </button>
      </div>

      <div class="w-[90%] modal flex gap-x-2" v-else-if="Modal === 'replyModal'">
        <div class="bg-slate-200 rounded-full w-14 h-12">
        </div>
        <div class="w-full hover:shadow-lg border pt-5 rounded-xl">
          <div>
            <IconComponent iconString="reply" :iconSize="19" />
          </div>
          <textarea id="textArea" class="w-full h-40 resize-none focus:ring-0 border-none overflow-hidden"></textarea>
          <div class="flex w-full p-3 justify-between items-center border shadow-lg">
            <button class="bg-blue-600 rounded-full text-white w-20 py-2">
              Send
            </button>
            <IconComponent :iconSize="17" iconString="trash" text="Discard Draft" @click="discardDraft" />
          </div>
        </div>
      </div>

      <div class="w-[90%] modal flex gap-x-2" v-else>
        <div class="bg-slate-200 rounded-full w-14 h-12">
        </div>
        <div class="w-full hover:shadow-lg border pt-5 rounded-xl">
          <textarea id="textArea" class="w-full h-40 resize-none focus:ring-0 border-none overflow-hidden"></textarea>
          <div class="flex w-full p-3 justify-between items-center border shadow-lg">
            <button class="bg-blue-600 rounded-full text-white w-20 py-2">
              Send
            </button>
            <IconComponent :iconSize="17" iconString="trash" text="Discard Draft" @click="discardDraft" />
          </div>
        </div>
      </div>
      <!-- BODY -->
    </div>



  </div>
</template>

<script setup>

import { useRoute } from 'vue-router'
import { inject, onMounted, ref } from 'vue';
import ReplyIcon from "vue-material-design-icons/ArrowLeftTop.vue"
import ForwardIcon from "vue-material-design-icons/ArrowRightTop.vue"
import IconComponent from '../components/IconComponent.vue';
import { useUserStore } from '../stores/userStore';
import router from '../router';

const userStore = useUserStore()
const route = useRoute();
const sideBarStatus = inject("sideBarStatus", ref(false))
const Modal = ref("button");

const email = ref({})

const deleteDataMessages = async () => {
  await userStore.deleteEmail(route.params.id)
  router.push({ name: 'inbox' })
}

const discardDraft = () => {
  Modal.value = 'button'
}

onMounted(async () => {
  const res = await userStore.getEmailById(route.params.id)
  await userStore.emailHasBeenViewed(res.id)
  email.value = {
    id: res.id,
    body: res.body,
    createdAt: res.createdAt,
    firstName: res.firstName,
    fromEmail: res.fromEmail,
    lastName: res.lastName,
    subject: res.subject,
    hasViewed: res.hasViewed,
    toEmail: res.toEmail
  }
})
</script>