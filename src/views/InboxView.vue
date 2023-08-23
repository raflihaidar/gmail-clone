<template>
  <div :class="sideBarStatus ? 'ml-72' : 'ml-0'">
    <div class="w-full flex items-center justify-between">
      <div class="flex w-[65%]">
        <IconComponent iconString="checkbox" text="Select" :size="19" />
        <IconComponent iconString="refresh" text="Refresh" :size="19" />
        <IconComponent iconString="more" text="More" :size="19" />
      </div>
      <div :class="sideBarStatus ? 'pl-40' : 'pl-56'" class="flex items-center w-[35%] box-border mx-auto">
        <span class="text-sm text-gray-500 hover:bg-slate-200 p-2 rounded-lg">1 - 50 of 2,859</span>
        <IconComponent iconString="left" text="Newer" :size="19" />
        <IconComponent iconString="right" text="Older" :size="19" />
        <IconComponent iconString="pencil" text="input tools on/of" :size="19" />
      </div>
    </div>

    <div class="p-auto border-b-2 border-gray-200" v-for="(item, index) in userStore.emails" :key="index">
      <div class="w-full h-auto flex items-center justify-between gap-x-2 text-sm hover:shadow-xl cursor-pointer"
        :class="item.hasViewed ? 'bg-blue-50' : 'bg-white'" @click="handleToDetail($event, item.id)"
        @mouseover="setHover(index, true)" @mouseleave="setHover(index, false)">
        <div class="flex items-center w-[17%] mx-auto">
          <IconComponent :size="19" text="Select" iconString="checkbox" />
          <IconComponent :size="19" text="Not Starred" iconString="star" />
          <div>{{ item.firstName }}</div>
        </div>
        <div class="flex items-center w-[60%] mx-auto">
          <span v-if="item.subject != ''">{{ item.subject }} </span>
          <span v-else>(no subject)</span>
          <span class="mx-1">-</span>
          <span class="text-gray-500">{{ item.body }}</span>
        </div>
        <div class="flex items-center w-[25%] box-border mx-auto delete">
          <div v-if="hoverIndex === index" class="flex items-center" :class="sideBarStatus ? 'pl-28' : 'pl-16'">
            <IconComponent :size="19" text="Archive" iconString="archive" />
            <IconComponent :size="19" text="Delete" iconString="trash" @click="deleteDataMessages(item.id)" />
            <IconComponent :size="19" text="Mark as Unread" iconString="email" />
            <IconComponent :size="19" text="Snooze" iconString="clock" />
          </div>
          <div v-else :class="sideBarStatus ? 'pl-56' : 'pl-40'">{{ item.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { inject, onMounted, ref } from 'vue';
import IconComponent from '../components/IconComponent.vue';
import { useUserStore } from '../stores/userStore';
import router from '../router';

const sideBarStatus = inject('sideBarStatus')
const hoverIndex = ref(false)
const userStore = useUserStore()

onMounted(() => {
  userStore.getEmailsByEmailAddress()
})

const deleteDataMessages = async (id) => {
  await userStore.deleteEmail(id)
}

const handleToDetail = (event, id) => {
  const deleteContainers = document.querySelectorAll('.delete');

  let isInsideDeleteContainer = false;

  deleteContainers.forEach((container) => {
    if (container.contains(event.target)) {
      isInsideDeleteContainer = true;
    }
  });

  if (!isInsideDeleteContainer) {
    router.push({ path: '/email/message/' + id });
  }
};

const setHover = (index, isHover) => {
  hoverIndex.value = isHover ? index : null;
}


</script>