<template>
    <div class="bg-slate-100">
        <aside id="sidebar"
            class="fixed top-[5.6rem] left-0 z-10 h-screen px-2 py-1 overflow-y-auto transition-transform -translate-x-full bg-slate-100 w-72"
            tabindex="-1" aria-labelledby="sidebar">
            <div class="h-full py-4 overflow-y-auto bg-slate-100">
                <ul>
                    <li class="flex items-center bg-sky-200 w-[50%] text-center gap-x-2 px-3 py-4 rounded-lg text-sm"
                        @click="newOpenMessage = !newOpenMessage">
                        <PencilIcon :size="25" />
                        <span>Compose</span>
                    </li>
                </ul>

                <ul class="mt-5 text-center w-full mx-auto text-sm font-semibold">
                    <li class="flex justify-between py-2 pr-4 pl-4 w-full bg-blue-200 rounded-r-full">
                        <div class="flex gap-x-5 ">
                            <InboxIcon :size="17" />
                            <span>Inbox</span>
                        </div>
                        <p>26</p>
                    </li>
                    <li class="flex justify-between py-2 pr-4 pl-4 w-full">
                        <div class="flex gap-x-5">
                            <StarIcon :size="17" />
                            <span>Starred</span>
                        </div>
                    </li>
                    <li class="flex justify-between py-2 pr-4 pl-4 w-full">
                        <div class="flex gap-x-5">
                            <ClockIcon :size="17" />
                            <span>Snoozed</span>
                        </div>
                    </li>
                    <li class="flex justify-between py-2 pr-4 pl-4 w-full">
                        <div class="flex gap-x-5">
                            <SendIcon :size="17" />
                            <span>Sent</span>
                        </div>
                    </li>
                    <li class="flex justify-between py-2 pr-4 pl-4 w-full">
                        <div class="flex gap-x-5">
                            <FileIcon :size="17" />
                            <span>Drafts</span>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>


        <div class="w-[37%] h-[73vh] shadow-xl bg-white fixed z-20 bottom-0 right-12 rounded-lg" v-if="newOpenMessage">
            <div class="flex justify-between items-center bg-slate-100 text-sm px-3">
                <p>New Messages</p>
                <div class="flex w-20% items-center">
                    <IconComponent text="Minus" iconString="minus" size="17" />
                    <IconComponent text="Full Screen" iconString="fullScreen" size="17" />
                    <IconComponent text="Save & Close" iconString="close" size="17"
                        @click="newOpenMessage = !newOpenMessage" />
                </div>
            </div>
            <div class="border-b-2 border-gray-100 py-1">
                <input type="text" placeholder="Recipients" class="w-full border-none outline-none focus:ring-0 text-sm">
            </div>
            <div class="border-b-2 border-gray-100 py-1">
                <input type="text" placeholder="Subject" class="w-full border-none outline-none focus:ring-0 text-sm">
            </div>
            <div>
                <textarea id="textArea" class="w-full h-80 resize-none focus:ring-0"></textarea>
            </div>
            <div class="flex w-full px-3 justify-between items-center">
                <button class="bg-blue-600 rounded-full text-white w-20 py-2">
                    Send
                </button>

                <IconComponent size="17" iconString="trash" text="Delete" />
            </div>
        </div>
    </div>

    <div :class="sideBarstatus ? 'ml-0' : 'ml-72'" class="p-3 bg-slate-200">
        <SentPage :sideBarStatus="sideBarstatus" />
    </div>
</template>

<script setup>
import PencilIcon from "vue-material-design-icons/PencilOutline.vue"
import InboxIcon from "vue-material-design-icons/Inbox.vue"
import StarIcon from "vue-material-design-icons/StarOutline.vue"
import ClockIcon from "vue-material-design-icons/ClockOutline.vue"
import SendIcon from "vue-material-design-icons/SendOutline.vue"
import FileIcon from "vue-material-design-icons/FileOutline.vue"
import IconComponent from "./IconComponent.vue"
import SentPage from "./SentPage.vue"
import { ref, inject } from "vue"

const sideBarstatus = inject('sideBarstatus', ref(false))

const newOpenMessage = ref(false)
</script>


<style></style>