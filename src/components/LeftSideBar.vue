<template>
    <div class="bg-slate-100" v-if="sideBarStatus">
        <div
            class="fixed top-[5.6rem] left-0 z-10 h-screen px-2 py-1 overflow-y-auto transition-transform bg-slate-100 w-72">
            <div class="h-full py-4 overflow-y-auto bg-slate-100">
                <ul>
                    <li class="flex items-center bg-sky-200 w-[50%] text-center gap-x-2 px-3 py-4 rounded-lg text-sm mb-5 hover:shadow-lg transition-shadow"
                        @click="newOpenMessage = !newOpenMessage">
                        <PencilIcon :size="25" />
                        <span>Compose</span>
                    </li>
                </ul>

                <ul v-for="(item, index) in leftBarMenu" :key="index"
                    class="text-center w-full mx-auto text-sm font-semibold">
                    <li class="flex justify-between py-2 pr-4 pl-4 w-full rounded-r-full cursor-pointer"
                        @click="handleIsClick(index)"
                        :class="item.isClick ? 'bg-blue-200' : 'hover:bg-gray-200 transition-colors'">
                        <div class="flex gap-x-5 ">
                            <component :is="item.icon" :size="17" />
                            <span>{{ item.name }}</span>
                        </div>
                        <p>{{ item.length }}</p>
                    </li>
                </ul>
            </div>
        </div>


        <div class="w-[37%] h-[73vh] shadow-xl bg-white fixed z-20 bottom-0 right-12 rounded-lg" v-if="newOpenMessage"
            id="popUp-messages">
            <div class="flex justify-between items-center bg-slate-100 text-sm px-3">
                <p>New Messages</p>
                <div class="flex w-20% items-center">
                    <IconComponent text="Minus" iconString="minus" :iconSize="17" @click="handleMinimize" id="minus" />
                    <IconComponent text="Full Screen" iconString="fullScreen" :iconSize="17" />
                    <IconComponent text="Save & Close" iconString="close" :iconSize="17" @click="saveNSlose" />
                </div>
            </div>
            <div class="border-b-2 border-gray-100 py-3 px-2">
                <input type="text" placeholder="Recipients" class="w-full border-none outline-none focus:ring-0 text-sm"
                    v-model="toEmail">
            </div>
            <div class="border-b-2 border-gray-100 py-3 px-2">
                <input type="text" placeholder="Subject" class="w-full border-none outline-none focus:ring-0 text-sm"
                    v-model="subject">
            </div>
            <div>
                <textarea id="textArea" class="w-full h-80 resize-none focus:ring-0 border-none outline-none py-3 px-2"
                    v-model="body"></textarea>
            </div>
            <div class="flex w-full px-3 justify-between items-center">
                <button class="bg-blue-600 rounded-full text-white w-20 py-2" @click="addData">
                    Send
                </button>

                <IconComponent :iconSize="17" iconString="trash" text="Discard Draft" @click="discardDraft" />
            </div>
        </div>
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
import router from "../router"
import { ref, reactive, inject, computed, shallowRef } from "vue"
import { useUserStore } from "../stores/userStore"

const UserStore = useUserStore()
const sideBarStatus = inject('sideBarStatus')
const newOpenMessage = ref(false)

const toEmail = ref('')
const subject = ref('')
const body = ref('')

let leftBarMenu = reactive(
    [
        {
            name: "Inbox",
            isClick: true,
            icon: shallowRef(InboxIcon),
            path: 'inbox',
            length: computed(() => UserStore.length)
        },
        {
            name: "Starred",
            isClick: false,
            icon: shallowRef(StarIcon),
            path: 'starred',
            length: 0
        },
        {
            name: "Snoozed",
            isClick: false,
            icon: shallowRef(ClockIcon),
            path: 'snoozed',
            length: 0
        },
        {
            name: "Sent",
            isClick: false,
            icon: shallowRef(SendIcon),
            path: "sent",
            length: 0
        },
        {
            name: "Drafts",
            isClick: false,
            icon: shallowRef(FileIcon),
            path: 'draft',
            length: 0
        },
    ]
)

const addData = () => {
    UserStore.sendEmail({
        toEmail: toEmail.value,
        subject: subject.value,
        body: body.value,
    })
    discardDraft()
}

const handleIsClick = (index) => {
    leftBarMenu.forEach((x) => {
        if (x !== leftBarMenu[index]) x.isClick = false
        else if (x === leftBarMenu[index]) x.isClick = true
    })
    router.push({ name: `${leftBarMenu[index].path}` })
}

const discardDraft = () => {
    toEmail.value = ''
    subject.value = ''
    body.value = ''
    newOpenMessage.value = false
}

const saveNSlose = () => {
    discardDraft()
}

const handleMinimize = (even) => {
    const clickedElement = even.target;
    const target = document.querySelector("#popUp-messages")
    const minusButton = document.querySelector("#minus")
    if (minusButton.contains(clickedElement) && target.classList.contains('bottom-0')) {
        target.className = target.className.replace('bottom-0', '-bottom-[30rem]')
    } else {
        target.className = target.className.replace('-bottom-[30rem]', 'bottom-0')
    }
}
</script>