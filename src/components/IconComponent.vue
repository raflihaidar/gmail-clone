<template>
    <div :class="display === '' ? 'hidden' : 'block'" class="cursor-pointer hover:bg-gray-200 rounded-full p-3"
        :data-tooltip-target="`tooltip-no-arrow-${iconString}`" :data-tooltip-placement="bottom">
        <component v-if="icon" :is="icon" :display="display" :size="size" />
        <span v-else>Ikon tidak ditemukan</span>
        <div :id="`tooltip-no-arrow-${iconString}`" role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity delay-150 bg-gray-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-600">
            {{ text }}
        </div>
    </div>
</template>

<script setup>
import { toRefs, defineProps, ref, shallowRef } from "vue"
import MenuIcon from "vue-material-design-icons/Menu.vue";
import SearchIcon from "vue-material-design-icons/Magnify.vue"
import HelpIcon from "vue-material-design-icons/HelpCircleOutline.vue"
import DotsIcon from "vue-material-design-icons/DotsGrid.vue"
import SettingIcon from 'vue-material-design-icons/CogOutline.vue'
import CloseIcon from "vue-material-design-icons/Close.vue"
import FullScreenIcon from "vue-material-design-icons/ArrowCollapse.vue"
import MinusIcon from "vue-material-design-icons/Minus.vue"
import TrashIcon from "vue-material-design-icons/TrashCanOutline.vue"
import CheckboxIcon from "vue-material-design-icons/CheckboxBlankOutline.vue"
import StarOutline from "vue-material-design-icons/StarOutline.vue";
import ArchiveIcon from "vue-material-design-icons/ArchiveArrowDownOutline.vue"
import EmailIcon from "vue-material-design-icons/EmailOutline.vue"
import ClockIcon from "vue-material-design-icons/ClockOutline.vue"
import RefreshIcon from "vue-material-design-icons/Refresh.vue"
import MoreIcon from "vue-material-design-icons/DotsVertical.vue"
import RightArrow from "vue-material-design-icons/ChevronRight.vue"
import LeftArrow from "vue-material-design-icons/ChevronLeft.vue"
import PencilIcon from "vue-material-design-icons/PencilOutline.vue"
import BackIcon from "vue-material-design-icons/ArrowLeft.vue"
import ReplyIcon from "vue-material-design-icons/ArrowLeftTop.vue"
import ForwardIcon from "vue-material-design-icons/ArrowRightTop.vue"

const props = defineProps({
    iconString: String,
    display: String,
    text: String,
    size: String
})

const { iconString, display, text, size } = toRefs(props)

const iconMap = {
    menu: shallowRef(MenuIcon),
    search: shallowRef(SearchIcon),
    help: shallowRef(HelpIcon),
    dots: shallowRef(DotsIcon),
    settings: shallowRef(SettingIcon),
    close: shallowRef(CloseIcon),
    fullScreen: shallowRef(FullScreenIcon),
    minus: shallowRef(MinusIcon),
    trash: shallowRef(TrashIcon),
    checkbox: shallowRef(CheckboxIcon),
    star: shallowRef(StarOutline),
    archive: shallowRef(ArchiveIcon),
    email: shallowRef(EmailIcon),
    clock: shallowRef(ClockIcon),
    refresh: shallowRef(RefreshIcon),
    more: shallowRef(MoreIcon),
    right: shallowRef(RightArrow),
    left: shallowRef(LeftArrow),
    pencil: shallowRef(PencilIcon),
    back: shallowRef(BackIcon),
    reply: shallowRef(ReplyIcon),
    forward: shallowRef(ForwardIcon),
}

let icon = ref(iconMap[iconString.value] || null)
</script>
