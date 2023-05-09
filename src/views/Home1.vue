<template>
  <div><el-button type="primary">Primary213</el-button></div>
  <div v-html="dom"></div>
  <iframe :src="dom" frameborder="0" width="100%" height="100%"></iframe>

</template>

<script setup lang="ts">
import {getServerInfo} from "../api";
import {ref} from "vue";
const dom = ref('')
getServerInfo().then(res => {
    console.log(res)
    let url = res.data
    const regex = /href=\"([^\"]+)\"/g;
   url= url.replace(regex, (match:string, $1:string) => {
        return  `href='http://c.ll12138.icu:8181${$1}'`
    })

    console.log(url)
    dom.value = url
})
</script>

<style></style>
