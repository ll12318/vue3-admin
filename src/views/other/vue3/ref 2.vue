<template>
  <div class="vue3_ref">
    <el-input placeholder="" ref="nameRef"></el-input>
  </div>
</template>

<script lang="ts" setup name="ref">
import { ref, onMounted } from "vue";
const nameRef: any = ref();
onMounted(() => {
  nameRef.value.focus();
});
</script>
