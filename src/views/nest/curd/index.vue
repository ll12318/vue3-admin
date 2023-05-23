<template>
  <div class="user_list">
    <el-row style="margin-bottom: 20px" gutter="20">
      <el-col :span="6">
        <el-input
          @keyup.enter.navite="handleUserList"
          v-model="keyword"
          placeholder="模糊搜索"
          ref="searchRef"
          autocomplete="on"
        >
          <template #append>
            <el-button
              @click="handleUserList"
              class="iconfont icon-code"
            ></el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="mini" @click="addUser">添加</el-button>
      </el-col>
    </el-row>
    <el-table border :data="userList">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="name" prop="name"></el-table-column>
      <el-table-column label="desc" prop="desc"></el-table-column>
      <el-table-column label="jobid" prop="jobid"></el-table-column>
      <el-table-column label="create_time" prop="create_time">
        <template #default="scope">
          {{ formatDateTime(scope.row.create_time, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="update_time" prop="update_time">
        <template #default="scope">
          {{ formatDateTime(scope.row.update_time, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="operation" fixed="right" width="200">
        <template #default="scope">
          <el-button type="primary" size="mini" @click="editUser(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="delUser(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogFormVisible" :title="dialogState ? '添加' : '编辑'">
    <el-form :model="form" style="padding: 0 30px">
      <el-form-item label="name" :label-width="50">
        <el-input ref="nameRef" v-model="form.name" />
      </el-form-item>
      <el-form-item label="desc" :label-width="50">
        <el-input v-model="form.desc" autocomplete="off" />
      </el-form-item>
      <el-form-item label="jobid" :label-width="50">
        <el-input
          @keyup.enter.navite="submitForm"
          v-model.number="form.jobid"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span
        class="dialog-footer"
        style="display: flex; justify-content: center"
      >
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm"> submit </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup name="curd">
import { formatDateTime } from "../../../utils/index";
import {
  getUserList,
  IUser,
  addUser as apiAddUser,
  delUser as apiDelUser,
  updateUser as apiUpdateUser,
} from "../api/index";
import { Ref, nextTick, ref, onMounted } from "vue";
import { ElNotification } from "element-plus";
// User list
const nameRef: any = ref();
const searchRef: any = ref();
const dialogState: Ref<boolean> = ref(true);
onMounted(() => {
  searchRef.value.focus();
});
const dialogFormVisible = ref(false);
const form = ref<IUser>({
  name: "",
  desc: "",
  jobid: 0,
});
// Search keyword
const keyword = ref("");
// User list
const userList = ref<IUser[]>([]);
// Get user list
const handleUserList = async () => {
  const res = await getUserList({ keyword: keyword.value });
  userList.value = res.data.list;
};
// Add user
const addUser = async () => {
  dialogFormVisible.value = true;
  //打开弹窗后，自动聚焦
  dialogState.value = true;
  setTimeout(() => {
    nameRef.value.focus();
  }, 100);

  form.value = {
    name: "",
    desc: "",
    jobid: 0,
  };
};

const submitForm = async () => {
  try {
    if (dialogState.value) {
      await apiAddUser(form.value);
    } else {
      await apiUpdateUser(form.value);
    }
    dialogFormVisible.value = false;
    notify("success", dialogState.value ? "添加成功" : "编辑成功");
    handleUserList();
  } catch (error) {
    notify("error", dialogState.value ? "添加失败" : "编辑失败");
  }
};
// Edit user
const editUser = (row: IUser) => {
  dialogFormVisible.value = true;
  dialogState.value = false;
  form.value = Object.assign({}, row);
  setTimeout(() => {
    nameRef.value.focus();
  }, 100);
};
// Delete user
const delUser = async (row: IUser) => {
  try {
    await apiDelUser(row.id as number);
    notify("success", "删除成功");
    handleUserList();
  } catch (error) {
    notify("error", "删除失败");
  }
};

const notify = (type: string, message: string) => {
  ElNotification({
    message,
    type: type as any,
  });
};
// Get user list
handleUserList();
</script>
<style lang="scss" scoped>
.user_list {
  padding: 20px;
}
</style>
