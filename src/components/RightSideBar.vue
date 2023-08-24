<template>
    <aside class="fixed top-[5.6rem] right-0 z-0 h-screen bg-slate-100 px-3 py-2 w-12">
        <ul class="w-full">
            <li class="w-[100%] mb-10 ml-1">
                <img src="../../public/img/GoogleCalendar.png" alt="gmail calender" class="w-full h-full">
            </li>
            <li class="w-[100%] mb-10 ml-1">
                <img src="../../public/img/GoogleKeep.png" alt="gmail keep" class="w-full h-full">
            </li>
            <li class="w-[100%] mb-10 ml-1">
                <img src="../../public/img/GoogleTasks.png" alt="gmail tasks" class="w-full h-full">
            </li>
            <li class="w-[100%] mb-10 ml-1">
                <img src="../../public/img/GoogleContacts.png" alt="gmail contact" class="w-full h-full">
            </li>
            <li class="w-[100%] mb-10 ml-1">
                <PlusIcon />
            </li>
        </ul>
    </aside>
</template>


<script setup>
import PlusIcon from "vue-material-design-icons/Plus.vue"
</script>