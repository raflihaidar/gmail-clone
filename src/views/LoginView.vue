<template>
  <div id="LoginView" class="grid h-screen place-items-center">
    <div class="text-center">
      <img width="279" src="../../public/img/GmailLogin.png" alt="google logo" class="text-center">
      <div class="flex justify-center">
        <GoogleLogin :callback="callback" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/userStore"
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()

const callback = async (response) => {
  await userStore.getUserDetailsFromGoogle(response)
  setTimeout(() => { router.push('/email') }, 250)
}
</script>