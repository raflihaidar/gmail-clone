<template>
    <Navbar />
    <LeftSideBar />
    <router-view />
    <RightSideBar />
</template>

<script setup>
import Navbar from '../components/NavBar.vue';
import LeftSideBar from '../components/LeftSideBar.vue';
import RightSideBar from '../components/RightSideBar.vue'
import { provide, ref } from 'vue';
const sideBarStatus = ref(true)

provide('sideBarStatus', sideBarStatus)
</script>