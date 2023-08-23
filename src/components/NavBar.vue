<template>
    <div class="flex w-full border-2 justify-between items-center px-4 py-4 bg-slate-100" id="UserComponent">
        <div class="flex items-center gap-x-2 w-[20%]">
            <div @click="OpenSideBar">
                <IconComponent iconString="menu" text="Menu Utama" />
            </div>
            <div class="cursor-pointer">
                <img src="../../public/img/GmailLogo.png" alt="Gmail logo" class="w-[50%]">
            </div>
        </div>

        <div class="flex items-center w-[50%] bg-slate-200 rounded-full py-1 px-3 search-container gap-x-2"
            :class="search ? 'shadow-lg bg-white' : null" @click="handleClickSearch">
            <IconComponent iconString="search" text="Search" />
            <input type="text" class="outline-none border-none w-full focus:ring-0 bg-inherit" placeholder="Telusuri Email"
                v-model="searchInput">
            <IconComponent iconString="close" :display="searchInput" @click="handleDeleteInput" text="Close" />
        </div>

        <div class="flex justify-end items-center w-[30%] gap-x-7">
            <IconComponent iconString="help" text="Help" />
            <IconComponent iconString="settings" text="Settings" />
            <IconComponent iconString="dots" text="Google Aplications" />
            <div class="bg-slate-200 rounded-full  w-11 h-11 cursor-pointer" @click="handleUserProfieModal">
                <img :src="userStore.picture" :alt="userStore.firstName + 'img'" class="rounded-full w-full h-full">
            </div>
        </div>


        <div class="bg-slate-100 w-[35%] py-5 mx-auto text-center fixed top-20 right-1 z-30 rounded-xl custom-shadow"
            v-if="userProfileModal">
            <div class="flex justify-center items-center">
                <span class="text-sm text-center w-[93%] pl-5 mx-auto border-box">{{ userStore.email }}</span>
                <span class="w-[7%] mx-auto">
                    <IconComponent iconString="close" :size="19" @click="handleUserProfieModal" />
                </span>
            </div>
            <div class="grid items-center justify-center gap-y-5">
                <span class="w-[30%] mx-auto cursor-pointer">
                    <img :src="userStore.picture" :alt="userStore.firstName + 'img'" class="rounded-full">
                </span>
                <span class="text-xl">
                    Hi, {{ userStore.firstName }}
                </span>
                <button class="w-[100%] border py-1 px-2 rounded-full focus:shadow-inner shadow text-blue-500 text-lg"
                    @click="handleSignOut">
                    Sign Out of Gmail
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, watchEffect, inject } from 'vue';
import IconComponent from './IconComponent.vue';
import { useUserStore } from '../stores/userStore'
import router from '../router';

const search = ref(false)
const searchInput = ref("");
const sideBarStatus = inject('sideBarStatus');
const userProfileModal = ref(false)
const userStore = useUserStore()

const OpenSideBar = () => {
    sideBarStatus.value = !sideBarStatus.value
}

const handleClickSearch = () => {
    search.value = true;
}

const handleDeleteInput = () => {
    searchInput.value = ''
}

const handleUserProfieModal = () => {
    userProfileModal.value = !userProfileModal.value
}

const handleClickOutside = (event) => { //fungsi dijalankan setiap nilai search bernilai benar
    const clickedElement = event.target;
    const searchContainer = document.querySelector('.search-container'); // Change this selector to match your actual search container

    if (!searchContainer.contains(clickedElement)) {
        search.value = false;
    }
};

const handleSignOut = () => {
    userStore.clearUser()
    setTimeout(() => router.push({ name: 'login' }), 200)
}

watchEffect(() => {
    if (search.value) {
        document.addEventListener('click', handleClickOutside);
    } else {
        document.removeEventListener('click', handleClickOutside);
    }
});
</script>

<style lang="scss">
#UserComponent {
    .custom-shadow {
        box-shadow: -1px 1px 6px -2px rgba(36, 36, 36, 0.58);
        -webkit-box-shadow: -1px 1px 6px -2px rgba(36, 36, 36, 0.58);
        -moz-box-shadow: -1px 1px 6px -2px rgba(36, 36, 36, 0.58);
    }
}
</style>