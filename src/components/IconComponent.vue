<template>
    <div :class="display === '' ? 'hidden' : 'block'" class="cursor-pointer hover:bg-gray-200 rounded-full p-3"
        :data-tooltip-target="`tooltip-no-arrow-${iconString}`" :data-tooltip-placement="bottom">
        <component v-if="icon" :is="icon" :display="display" />
        <span v-else>Ikon tidak ditemukan</span>
        <div :id="`tooltip-no-arrow-${iconString}`" role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity delay-150 bg-gray-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-600">
            {{ text }}
        </div>
    </div>
</template>

<script setup>
import { toRefs, defineProps, ref } from "vue"
import MenuIcon from "vue-material-design-icons/Menu.vue";
import SearchIcon from "vue-material-design-icons/Magnify.vue"
import HelpIcon from "vue-material-design-icons/HelpCircleOutline.vue"
import DotsIcon from "vue-material-design-icons/DotsGrid.vue"
import SettingIcon from 'vue-material-design-icons/CogOutline.vue'
import CloseIcon from "vue-material-design-icons/Close.vue"

const props = defineProps({
    iconString: String,
    display: String,
    text: String
})

const { iconString, display, text } = toRefs(props)

const iconMap = {
    menu: MenuIcon,
    search: SearchIcon,
    help: HelpIcon,
    dots: DotsIcon,
    settings: SettingIcon,
    close: CloseIcon,
}

let icon = ref(iconMap[iconString.value] || null)
</script>
