<template>
    <div class="w-full h-14 border-b-2 flex items-center justify-between gap-x-2 ">
        <div class="flex items-center  w-[30%]">
            <IconComponent :size="19" text="Select" iconString="checkbox" />
            <IconComponent :size="19" text="Not Starred" iconString="star" />
            <div>To : Rafli Haidar</div>
        </div>
        <div class="flex items-center  w-[45%]">
            <div class="p-3">Halo ini dari sent page</div>
        </div>
        <div class="flex items-center w-[25%]" :class="sideBarStatus ? '-mr-56' : '-mr-40'">
            <!-- <IconComponent :size="19" text="Archive" iconString="archive" />
            <IconComponent :size="19" text="Delete" iconString="trash" />
            <IconComponent :size="19" text="Mark as Unread" iconString="email" />
            <IconComponent :size="19" text="Snooze" iconString="clock" /> -->
            <div>Auf 17</div>
        </div>
    </div>
</template>


<script setup>
import { toRefs } from 'vue';
import IconComponent from './IconComponent.vue';

const props = defineProps({
    sideBarStatus: Boolean
})

const { sideBarStatus } = toRefs(props)
</script>