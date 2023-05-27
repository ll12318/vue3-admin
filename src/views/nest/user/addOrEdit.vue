<template>
  <el-dialog
    v-model="dialogOpt.visible"
    :title="dialogOpt.title"
    :width="dialogOpt.width"
    :before-close="handleClose"
  >
    <div>
      <el-form :model="formData" label-width="100">
        <el-form-item label="AName">
          <el-input v-model="formData.account_name" />
        </el-form-item>
        <el-form-item label="Repassword">
          <el-input v-model="formData.repassword" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="formData.password" />
        </el-form-item>
        <el-form-item label="Mobile">
          <el-input v-model.number="formData.mobile" />
        </el-form-item>
        <el-form-item label="Role">
          <el-select v-model="formData.role">
            <el-option label="管理员" value="1" />
            <el-option label="普通用户" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="UStatus">
          <el-switch
            v-model="formData.user_status"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="RName">
          <el-input v-model="formData.real_name" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose(false)">Cancel</el-button>
        <el-button type="primary" @click="submit"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, watch, ref, Ref } from "vue";
import { apiAddUser, apiUpdateUser } from "./api";
import { ElNotification } from "element-plus";
const props = defineProps({
  dialogOpt: {
    type: Object,
    default: () => {
      return {
        visible: false,
        title: "",
        width: "",
      };
    },
  },
  dialogProps: {
    type: Object,
    default: () => {
      return {
        account_name: "",
        mobile: "",
        role: "",
        password: "",
        user_status: "",
        repassword: "",
        real_name: "",
      };
    },
  },
  getUserList: {
    type: Function,
    default: () => {},
  },
});
interface IFormData {
  account_name?: string;
  mobile?: string;
  role?: string;
  user_status?: string;
  password?: string;
  real_name?: string;
  repassword?: string;
  [key: string]: any; // allow any other optional fields
}
const formData: Ref<IFormData> = ref({
  account_name: "",
  mobile: "",
  role: "",
  password: "",
  user_status: "",
  repassword: "",
  real_name: "",
});

watch(
  () => props.dialogProps,
  (val) => {
    if (val) {
      formData.value = Object.assign({}, val);
      console.log(formData.value);
    }
  }
);

const handleClose = (done: any) => {
  if (done) done();
  else {
    props.dialogOpt.visible = false;
  }
};

const submit = async () => {
  if (props.dialogOpt.title === "添加") {
    const res = await apiAddUser(formData.value);
    if (res.code == 500) {
      ElNotification({
        message: res.msg,
        type: "error",
      });
      return;
    }
    ElNotification({
      message: "添加成功",
      type: "success",
    });
  } else {
    await apiUpdateUser(props.dialogProps.user_id, formData.value);
    ElNotification({
      message: "修改成功",
      type: "success",
    });
  }
  props.getUserList();
  props.dialogOpt.visible = false;
};
</script>
