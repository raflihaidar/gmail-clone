<template>
  <div :class="sideBarStatus ? 'ml-72' : 'ml-0'">
    <div class="w-full flex items-center justify-between">
      <div class="flex w-[65%]">
        <IconComponent iconString="checkbox" :iconSize="19" iconColor="#636363" hoverColor='hover:bg-gray-200' />
        <IconComponent iconString="refresh" :iconSize="19" iconColor="#636363" hoverColor='hover:bg-gray-200' />
        <IconComponent iconString="trash" :iconSize="19" iconColor="#636363" hoverColor='hover:bg-gray-200'
          @click="deleteEmailIsClicked" />
        <IconComponent iconString="more" :iconSize="19" iconColor="#636363" hoverColor='hover:bg-gray-200' />
      </div>
      <div :class="sideBarStatus ? 'pl-40' : 'pl-56'" class="flex items-center w-[35%] box-border mx-auto">
        <span class="text-sm text-gray-500 hover:bg-slate-200 p-2 rounded-lg">1 - 50 of 2,859</span>
        <IconComponent iconString="left" text="Newer" :iconSize="19" iconColor="#636363" hoverColor='hover:bg-gray-200' />
        <IconComponent iconString="right" text="Older" :iconSize="19" iconColor="#636363"
          hoverColor='hover:bg-gray-200' />
        <IconComponent iconString="pencil" text="input tools on/of" :iconSize="19" iconColor="#636363"
          hoverColor='hover:bg-gray-200' />
      </div>
    </div>

    <div class="p-auto border-b-2 border-gray-200" v-for="(item, index) in userStore.emails" :key="index">
      <div class="w-full h-auto flex items-center justify-between gap-x-2 text-sm hover:shadow-xl cursor-pointer"
        :class="[item.hasViewed ? 'bg-gray-100' : 'bg-white']" @click="handleToDetail($event, item.id)"
        @mouseover="setHover(index, true)" @mouseleave="setHover(index, false)">
        <div class="flex items-center w-[17%] mx-auto">
          <component :is="item.isClicked ? CheckListIcon : CheckboxIcon" @click="handleChecked(item.id)"
            class='checkButton ml-3' :size="19" />
          <IconComponent :iconSize="19" iconColor="#636363" hoverColor='hover:bg-gray-200' text="Not Starred"
            iconString="star" />
          <div :class="item.hasViewed ? 'font-normal' : 'font-bold'">{{ item.firstName }}</div>
        </div>
        <div class="flex items-center w-[60%] mx-auto">
          <span v-if="item.subject != ''" :class="item.hasViewed ? 'font-normal' : 'font-bold'">{{ item.subject }} </span>
          <span v-else :class="item.hasViewed ? 'font-normal' : 'font-bold'">(no subject)</span>
          <span class="mx-1">-</span>
          <span class="text-gray-500">{{ item.body }}</span>
        </div>
        <div class="flex items-center w-[25%] box-border mx-auto delete">
          <div v-if="hoverIndex === index" class="flex items-center" :class="sideBarStatus ? 'pl-16' : 'pl-28'">
            <IconComponent :iconSize="19" iconColor="#636363" hoverColor='hover:bg-gray-200' text="Archive"
              iconString="archive" />
            <IconComponent :iconSize="19" iconColor="#636363" hoverColor='hover:bg-gray-200' text="Delete"
              iconString="trash" @click="deleteDataMessages(item.id)" />
            <IconComponent :iconSize="19" iconColor="#636363" hoverColor='hover:bg-gray-200' text="Mark as Unread"
              iconString="email" />
            <IconComponent :iconSize="19" iconColor="#636363" hoverColor='hover:bg-gray-200' text="Snooze"
              iconString="clock" />
          </div>
          <div v-else :class="[sideBarStatus ? 'pl-40' : 'pl-56', item.hasViewed ? 'font-normal' : 'font-bold']"
            class="text-xs">{{ item.createdAt }}
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
import CheckListIcon from "vue-material-design-icons/CheckboxOutline.vue"
import CheckboxIcon from "vue-material-design-icons/CheckboxBlankOutline.vue"
import router from '../router';

const sideBarStatus = inject('sideBarStatus')
const hoverIndex = ref(false)
const userStore = useUserStore()
const isChecked = ref(false)

onMounted(() => {
  userStore.getEmailsByEmailAddress()
})

const deleteDataMessages = async (id) => {
  await userStore.deleteEmail(id)
}

const handleChecked = async (id) => {
  isChecked.value = !isChecked.value
  await userStore.checkedBox(id, isChecked.value)
}

const handleToDetail = (event, id) => {
  const deleteContainers = document.querySelectorAll('.delete');
  const checkbox = document.querySelectorAll('.checkButton')
  let isInsideDeleteContainer = false;
  let isInsideCheckBox = false;

  checkbox.forEach((item) => {
    if (item.contains(event.target)) {
      isInsideCheckBox = true
    }
  })

  deleteContainers.forEach((item) => {
    if (item.contains(event.target)) {
      isInsideDeleteContainer = true;
    }
  });
  if (!isInsideDeleteContainer && !isInsideCheckBox) {
    router.push({ path: '/email/message/' + id });
  }
};

const deleteEmailIsClicked = async () => {
  await userStore.deleteEmailFromCheckBox()
}

const setHover = (index, isHover) => {
  hoverIndex.value = isHover ? index : null;
}
</script>