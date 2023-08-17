<template>
    <div class="flex w-full border-2 justify-between items-center px-4 py-2">
        <div class="flex items-center gap-x-2 w-[20%]">
            <IconComponent iconString="menu" />
            <div class="cursor-pointer">
                <img src="../../public/img/GmailLogo.png" alt="Gmail logo" class="w-[50%]">
            </div>
        </div>

        <div class="flex items-center w-[50%] bg-slate-200 rounded-full py-3 px-3"
            :class="search ? 'shadow-lg bg-slate-100' : null" @click="handleClickSearch">
            <IconComponent iconString="search" />
            <input type="text" class="outline-none border-none w-full">
        </div>

        <div class="flex justify-end w-[30%] gap-x-7">
            <IconComponent iconString="help" />
            <IconComponent iconString="settings" />
            <IconComponent iconString="dots" />
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import IconComponent from './IconComponent.vue';

const search = ref(false)

const handleClickSearch = () => {
    search.value = !search.value;
}
</script>