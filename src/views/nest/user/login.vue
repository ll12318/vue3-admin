<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <h1 class="login-title">Login</h1>
      <el-form
        :model="formData"
        :rules="rules"
        ref="loginForm"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="Username" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="Please enter your username"
          ></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            type="password"
            v-model="formData.password"
            placeholder="Please enter your password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="loading"
            >Login</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ElNotification } from "element-plus";
import router from "../../../router";
import { LoginData, apiLogin } from "./api";
import { Ref, ref } from "vue";
import { useUser } from "../../../store/user";
const formData: Ref<LoginData> = ref({
  username: "",
  password: "",
});
const loginForm: any = ref(null);
const rules = ref({
  username: [
    { required: true, message: "Please enter your username", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please enter your password", trigger: "blur" },
  ],
});

const loading = ref(false);
const user = useUser();

const submitForm = async () => {
  await loginForm.value.validate();

  const res = await apiLogin(formData.value);
  if (res.code == 200) {
    router.push({ path: "/nest/user" });
    if (res.data) {
      localStorage.setItem("token", res.data.token as string);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      user.setUserInfo(res.data.user);
      ElNotification({
        message: "登入成功",
        type: "success",
      });
    }
  } else {
    ElNotification({
      message: res.msg,
      type: "error",
    });
  }
};
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login-card {
  width: 400px;
  border-radius: 10px;
  transition: box-shadow 0.3s ease-in-out;
}

.login-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  margin: 20px;
}
</style>
