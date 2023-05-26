<template>
  <div>
    <el-row style="margin: 10px">
      <el-col :span="8">
        <el-input
          v-model.trim="searchText"
          @keyup="getUserList"
          placeholder="请输入关键字进行搜索"
          style="margin-bottom: 10px"
        ></el-input
      ></el-col>

      <el-col :span="4">
        <el-button type="primary" @click="handleDialog('add')">添加</el-button>
      </el-col>
    </el-row>
    <el-table :data="userList" border style="margin: 10px">
      <el-table-column label="account_name" prop="account_name">
        <template #default="{ row }">
          <div v-html="row.account_name"></div>
        </template>
      </el-table-column>
      <el-table-column label="mobile" prop="mobile">
        <template #default="{ row }">
          <div v-html="row.mobile"></div>
        </template>
      </el-table-column>
      <el-table-column label="role" prop="role">
        <template #default="{ row }">
          <span>{{ row.role == "1" ? "管理员" : "普通用户" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="user_status" prop="user_status">
        <template #default="{ row }">
          <el-switch
            v-model="row.user_status"
            active-value="1"
            inactive-value="0"
            :disabled="true"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="update_time" prop="update_time">
        <template #default="{ row }">
          {{ timeFormat(row.update_time, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="operating">
        <template #default="{ row }">
          <el-button type="primary" @click="handleDialog('edit', row)"
            >编辑</el-button
          >
          <el-button
            :disabled="row.account_name == 'admin'"
            type="danger"
            @click="handleDel(row.user_id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageData.page"
      v-model:page-size="pageData.page_size"
      :page-sizes="[5, 10, 20, 40]"
      :small="false"
      :disabled="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <add-or-edit
      :getUserList="getUserList"
      :dialogOpt="dialogOpt"
      :dialogProps="dialogProps"
    />
  </div>
</template>
<script lang="ts" setup>
import { apiDeleteUser, apiGetUserList } from "./api";
import { ref, Ref, computed } from "vue";
import { UserListRes } from "./api";
import dayjs from "dayjs";
import { debounce } from "lodash";
import AddOrEdit from "./addOrEdit.vue";
import { ElNotification } from "element-plus";
import { useUser } from "../../../store/user";

const userList: Ref<UserListRes[]> = ref([]);
const searchText = ref("");
const pageData = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const dialogProps = ref({
  account_name: "",
  mobile: "",
  role: "",
  user_status: "",
  password: "",
  repassword: "",
  real_name: "",
});
// 获取所有用户列表

const dialogOpt = ref({
  visible: false,
  title: "添加",
  width: "30%",
});

const userInfo = useUser();
console.log(userInfo.userInfo);

const getUserList = debounce(async () => {
  const res = await apiGetUserList(
    searchText.value,
    pageData.value.page,
    pageData.value.page_size
  );
  if (res.code !== 200) {
    ElNotification({
      message: res.msg,
      type: "error",
    });
    return;
  }
  if (Array.isArray(res.data.list)) {
    userList.value = filteredUserList(res.data.list);
    pageData.value.total = res.data.total;
  } else {
    userList.value = [];
  }
}, 500);

const timeFormat = (time: string, timeType: string) => {
  return dayjs(time).format(timeType);
};

// 计算属性，根据搜索框中的关键字进行模糊搜索
const filteredUserList = (list: UserListRes[]) => {
  if (!searchText.value) {
    return list;
  }
  const keyword = searchText.value.toLowerCase();
  return list
    .map((user) => {
      const account_name = user.account_name
        .toLowerCase()
        .replace(keyword, `<span style="color:red">${keyword}</span>`);
      const real_name = user.real_name
        .toLowerCase()
        .replace(keyword, `<span style="color:red">${keyword}</span>`);
      const mobile = user.mobile
        .toLowerCase()
        .replace(keyword, `<span style="color:red">${keyword}</span>`);

      return {
        ...user,
        account_name,
        real_name,
        mobile,
      };
    })
    .filter((user) => {
      return (
        user.account_name.includes('<span style="color:red">') ||
        user.real_name.includes('<span style="color:red">') ||
        user.mobile.includes('<span style="color:red">') ||
        user.role.includes('<span style="color:red">') ||
        user.user_status.includes('<span style="color:red">')
      );
    });
};

// 分页
const handleSizeChange = (val: number) => {
  pageData.value.page_size = val;
  getUserList();
};
const handleCurrentChange = (val: number) => {
  pageData.value.page = val;
  getUserList();
};

// 添加或编辑用户
const handleDialog = (type: string, row?: any) => {
  dialogOpt.value.visible = true;
  if (row) {
    dialogProps.value = row;
    dialogProps.value.repassword = "";
    dialogProps.value.password = "";
    dialogOpt.value.title = "编辑";
  } else {
    dialogProps.value = {
      account_name: "",
      repassword: "",
      password: "",
      mobile: "",
      role: "",
      user_status: "",
      real_name: "",
    };
    dialogOpt.value.title = "添加";
  }
};

// 删除用户
const handleDel = async (user_id: number) => {
  await apiDeleteUser(user_id);
  getUserList();
  ElNotification({
    message: "删除成功",
    type: "success",
  });
};

getUserList();
</script>
