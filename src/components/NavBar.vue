<template>
    <div class="flex w-full border-2 justify-between items-center px-4 py-4 bg-slate-100">
        <div class="flex items-center gap-x-2 w-[20%]">
            <div data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example"
                @click="OpenSideBar" v-show="sideBarStatus" data-drawer-backdrop="false">
                <IconComponent iconString="menu" text="Menu Utama" />
            </div>
            <div data-drawer-target="drawer-example" data-drawer-hide="drawer-example" aria-controls="drawer-example"
                @click="OpenSideBar" v-show="!sideBarStatus" data-drawer-backdrop="false">
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

        <div class="flex justify-end w-[30%] gap-x-7">
            <IconComponent iconString="help" text="Help" />
            <IconComponent iconString="settings" text="Settings" />
            <IconComponent iconString="dots" text="Google Aplications" />
        </div>
    </div>
</template>


<script setup>
import { ref, watchEffect } from 'vue';
import IconComponent from './IconComponent.vue';

const search = ref(false)
const searchInput = ref("");
const sideBarStatus = ref(true);

const OpenSideBar = () => {
    sideBarStatus.value = !sideBarStatus.value
}

const handleClickSearch = () => {
    search.value = true;
}

const handleDeleteInput = () => {
    searchInput.value = ''
}

const handleClickOutside = (event) => { //fungsi dijalankan setiap nilai search bernilai benar
    const clickedElement = event.target;
    const searchContainer = document.querySelector('.search-container'); // Change this selector to match your actual search container

    if (!searchContainer.contains(clickedElement)) {
        search.value = false;
    }
};

watchEffect(() => {
    if (search.value) {
        document.addEventListener('click', handleClickOutside);
    } else {
        document.removeEventListener('click', handleClickOutside);
    }
});


</script>