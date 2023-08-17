<template>
    <div>
        <component v-if="icon" :is="icon" />
        <span v-else>Ikon tidak ditemukan</span>
    </div>
</template>

<script setup>
import { toRefs, defineProps, ref } from "vue"
import MenuIcon from "vue-material-design-icons/Menu.vue";
import SearchIcon from "vue-material-design-icons/Magnify.vue"
import HelpIcon from "vue-material-design-icons/HelpCircleOutline.vue"
import DotsIcon from "vue-material-design-icons/DotsGrid.vue"
import SettingIcon from 'vue-material-design-icons/CogOutline.vue'

const props = defineProps({
    iconString: String
})

const { iconString } = toRefs(props)

const iconMap = {
    menu: MenuIcon,
    search: SearchIcon,
    help: HelpIcon,
    dots: DotsIcon,
    settings: SettingIcon
}

let icon = ref(iconMap[iconString.value] || null)
</script>
