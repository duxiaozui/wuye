<template>
    <div>
        <h2>Home</h2>
        <span>欢迎{{ username }}登录</span>
        <el-button type="primary" size="default" @click="logout">退出</el-button>

    </div>
</template>

<script>
// 导入api
import { logoutApi, getInfoApi } from '@/api/login'
export default {
    name: 'Home',

    data() {
        return {
            username: ''
        };
    },
    // 初始化方法(钩子函数)
    mounted() {
        this.getInfo();
    },

    methods: {
        // 编写方法==》退出方法
        async logout() {
            let res = await logoutApi();
            if (res.code == 200) {
                this.$message(res.msg);
                window.sessionStorage.clear();
                this.$router.push("/");
            }
        },
        // 编写方法==》获取用户信息
        async getInfo() {
            let res = await getInfoApi();
            if (res.code == 200) {
                this.username = res.data.username;
            }
        }
    },
};
</script>

<style lang="less" scoped></style>