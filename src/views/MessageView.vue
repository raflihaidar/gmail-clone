<template>
  <div classs="w-[95%]" :class="sideBarStatus ? 'ml-2' : 'ml-80'">
    <div class="flex items-center justify-between w-full mb-5" id="nav-icon">
      <span class="flex items-center w-[65%]">
        <router-link to="/email/sent">
          <IconComponent iconString="back" text="Back to sent email" :size="19" />
        </router-link>
        <IconComponent iconString="archive" text="Archive" :size="19" />
        <IconComponent iconString="trash" text="Delete" :size="19" @click="deleteDataMessages" />
        <IconComponent iconString="clock" text="Snoozed" :size="19" />
        <IconComponent iconString="more" text="More" :size="19" />
      </span>
      <span class="flex items-center w-[35%] mx-auto" :class="sideBarStatus ? 'pl-80' : 'pl-56'">
        <IconComponent iconString="left" text="Newer" :size="19" />
        <IconComponent iconString="right" text="Older" :size="19" />
        <IconComponent iconString="pencil" text="input tools on/of" :size="19" />
      </span>
    </div>

    <div class="w-[93%] mx-auto mb-5 text-xl text-black" id="subject">
      <p v-if="singleData.subject !== ''">{{ singleData.subject }}</p>
      <span v-else>(no subject)</span>
    </div>

    <div class="flex gap-x-2 mb-5 w-[90%] justify-between items-center" id="content">
      <div class="bg-slate-200 rounded-full w-14 h-12" id="img-profile">
      </div>
      <div class="w-full" id="left-content">
        <span class="font-semibold">{{ singleData.name }}</span>
        <span class="text-xs text-gray-400">rafli.haidar30@gmail.com</span>
        <div class="text-xs">
          <p>To : {{ singleData.to }}</p>
          <div class="my-3 w-full">{{ singleData.content }}</div>
        </div>
      </div>
      <span class="text-xs text-gray-400 font-bold" :class="sideBarStatus ? 'pr-0' : 'pr-10'" id="right-content">{{
        singleData.month }} {{ singleData.date
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
          <IconComponent iconString="reply" :size="19" />
        </div>
        <textarea id="textArea" class="w-full h-40 resize-none focus:ring-0 border-none overflow-hidden"></textarea>
        <div class="flex w-full p-3 justify-between items-center border shadow-lg">
          <button class="bg-blue-600 rounded-full text-white w-20 py-2">
            Send
          </button>
          <IconComponent :size="17" iconString="trash" text="Discard Draft" @click="discardDraft" />
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
          <IconComponent :size="17" iconString="trash" text="Discard Draft" @click="discardDraft" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import { inject, onMounted, ref } from 'vue';
import ReplyIcon from "vue-material-design-icons/ArrowLeftTop.vue"
import ForwardIcon from "vue-material-design-icons/ArrowRightTop.vue"
import IconComponent from '../components/IconComponent.vue';
import router from '../router';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore()
const { singleData } = storeToRefs(userStore)
const route = useRoute();
const sideBarStatus = inject("sideBarstatus", ref(false))
const Modal = ref("button");

// const deleteDataMessages = () => {
//   store.deleteData(route.params.id)
//   router.push({ name: 'sent' })
// }

const discardDraft = () => {
  Modal.value = 'button'
}

// onMounted(async () => {
//   await store.getDataDetail(route.params.id)
// })
</script>