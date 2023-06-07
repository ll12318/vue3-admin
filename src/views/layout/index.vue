<template>
  <el-container
    class="layout-container-demo"
    style="height: 100vh; background-color: var(--wk-bg)"
  >
    <Sidebar></Sidebar>

    <el-container class="container">
      <Header></Header>

      <Main></Main>
    </el-container>
  </el-container>
  <el-dialog
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    draggable
    width="30%"
    class="login_dialog"
    ><div style="display: flex">
      <el-input
        style="margin-right: 10px"
        @keyup.enter="handleLogin"
        v-model="code"
        placeholder="输入验证码登入"
      ></el-input>

      <img :src="imgUrl" />
    </div>
  </el-dialog>
  <SeachBar></SeachBar>
</template>

<script lang="ts" setup>
import Sidebar from "./components/sidebar.vue";
import Header from "./components/header.vue";
import Main from "./components/main.vue";
import { ref, watch } from "vue";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import { useUser } from "../../store/user";
import { ElNotification } from "element-plus";
import { login, getImgUrl, getServerInfo } from "../../api";
import SeachBar from "./components/seachBar.vue";

const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
const user = useUser();
const dialogVisible = ref(false);
const data = ref(Date.now());
const imgUrl = ref("");
const code = ref("");
watch(
  user,
  (newVal, oldVal) => {
    if (newVal && !newVal.token) {
      dialogVisible.value = true;
    } else {
      dialogVisible.value = false;
    }
  },
  { immediate: true }
);

const handleClose = (done: any) => {
  dialogVisible.value = false;
  done();
};
const handleLogin = () => {
  if (!code.value) {
    ElNotification({
      title: "输入验证码",
      type: "warning",
    });
    return;
  }
  login({
    username: "admin",
    password: "admin123",
    validateCode: code.value,
    rememberMe: false,
  }).then((res) => {
    if (res) {
      dialogVisible.value = false;
    }
  });
};

const getImg = async () => {
  const res = await getImgUrl();
  const url = window.URL.createObjectURL(res.data);
  imgUrl.value = url;
};
getImg();
</script>

<style lang="scss">
.layout-container-demo .el-header {
  position: relative;
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.layout-container-demo .container {
  display: flex;
  flex-direction: column;
}
.login_dialog {
  .el-dialog__header {
    padding: 0;
  }
}
</style>
