<template>
  <div v-html="dom"></div>
</template>

<script setup lang="ts">
import {getServerInfo} from "../api";
import {onBeforeUnmount, ref} from "vue";
const dom = ref('')
const handleDom = () => {getServerInfo().then(res => {
    let url = res.data
    const regex = /href=\"([^\"]+)\"/g;
    url= url.replace(regex, (match:string, $1:string) => {
        return  `href='http://c.ll12138.icu:8181${$1}'`
    })
    dom.value = url
})}
handleDom()
const timer =  setInterval(handleDom, 10000)
onBeforeUnmount(() => {
    clearInterval(timer)
})
</script>

<style></style>
