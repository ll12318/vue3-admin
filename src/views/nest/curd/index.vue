<template>
  <div class="user_list">
    <!-- 搜索框 -->
    <el-row style="margin-bottom: 20px" gutter="20">
      <el-col :span="6">
        <el-input
          @keyup.enter.navite="handleUserList"
          v-model="keyword"
          placeholder="模糊搜索"
          ref="searchRef"
          autocomplete="on"
        >
          <!-- 搜索按钮 -->
          <template #append>
            <el-button
              @click="handleUserList"
              class="iconfont icon-code"
            ></el-button>
          </template>
        </el-input>
      </el-col>
      <!-- 添加按钮 -->
      <el-col :span="4">
        <el-button type="primary" size="mini" @click="addUser">添加</el-button>
      </el-col>
    </el-row>
    <!-- 用户列表 -->
    <el-table border :data="userList">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="name" prop="name"></el-table-column>
      <el-table-column label="desc" prop="desc"></el-table-column>
      <el-table-column label="jobid" prop="jobid"></el-table-column>
      <!-- 创建时间 -->
      <el-table-column label="create_time" prop="create_time">
        <template #default="scope">
          {{ formatDateTime(scope.row.create_time, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <!-- 更新时间 -->
      <el-table-column label="update_time" prop="update_time">
        <template #default="scope">
          {{ formatDateTime(scope.row.update_time, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="operation" fixed="right" width="200">
        <template #default="scope">
          <!-- 编辑按钮 -->
          <el-button type="primary" size="mini" @click="editUser(scope.row)"
            >编辑</el-button
          >
          <!-- 删除按钮 -->
          <el-button type="danger" size="mini" @click="delUser(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 添加/编辑用户对话框 -->
  <el-dialog v-model="dialogFormVisible" :title="dialogState ? '添加' : '编辑'">
    <el-form :model="form" style="padding: 0 30px">
      <!-- 用户名 -->
      <el-form-item label="name" :label-width="50">
        <el-input ref="nameRef" v-model="form.name" />
      </el-form-item>
      <!-- 描述 -->
      <el-form-item label="desc" :label-width="50">
        <el-input v-model="form.desc" autocomplete="off" />
      </el-form-item>
      <!-- 工作ID -->
      <el-form-item label="jobid" :label-width="50">
        <el-input
          @keyup.enter.navite="submitForm"
          v-model.number="form.jobid"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <!-- 对话框底部 -->
    <template #footer>
      <span
        class="dialog-footer"
        style="display: flex; justify-content: center"
      >
        <!-- 取消按钮 -->
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <!-- 提交按钮 -->
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

// 用户名输入框引用
const nameRef: any = ref();
// 搜索框引用
const searchRef: any = ref();
// 对话框状态（添加/编辑）
const dialogState: Ref<boolean> = ref(true);
// 对话框是否可见
const dialogFormVisible = ref(false);
// 表单数据
const form = ref<IUser>({
  name: "",
  desc: "",
  jobid: 0,
});
// 搜索关键字
const keyword = ref("");
// 用户列表
const userList = ref<IUser[]>([]);

// 获取用户列表
const handleUserList = async () => {
  const res = await getUserList({ keyword: keyword.value });
  userList.value = res.data.list;
};

// 添加用户
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

// 提交表单
const submitForm = async () => {
  try {
    if (dialogState.value) {
      // 添加用户
      await apiAddUser(form.value);
    } else {
      // 编辑用户
      await apiUpdateUser(form.value);
    }
    dialogFormVisible.value = false;
    notify("success", dialogState.value ? "添加成功" : "编辑成功");
    handleUserList();
  } catch (error) {
    notify("error", dialogState.value ? "添加失败" : "编辑失败");
  }
};

// 编辑用户
const editUser = (row: IUser) => {
  dialogFormVisible.value = true; // 显示对话框
  dialogState.value = false; // 关闭对话框状态
  form.value = Object.assign({}, row); // 复制行数据到表单
  setTimeout(() => {
    nameRef.value.focus(); // 将焦点设置为名称输入框
  }, 100);
};

// 通知
const notify = (type: string, message: string) => {
  ElNotification({
    message,
    type: type as any,
  });
};

// 删除用户
const delUser = async (row: IUser) => {
  try {
    await apiDelUser(row.id || 0);
    notify("success", "删除成功");
    handleUserList();
  } catch (error) {
    notify("error", "删除失败");
  }
};

// 获取用户列表
handleUserList();

// 页面加载完成后，自动聚焦到搜索框
onMounted(() => {
  searchRef.value.focus();
});
</script>

<style lang="scss" scoped>
.user_list {
  padding: 20px;
}
</style>
