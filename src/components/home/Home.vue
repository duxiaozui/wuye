<template>
    <el-container class="home-container">
        <el-header>
            <h2>阳光小区物业系统</h2>
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ trueName }}- - -{{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><span @click="logout">退出</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container>
            <!-- <el-aside width="200px">Aside</el-aside> -->
            <!-- <el-main background-color="#404147" text-color="#fff" active-text-color="#ffd04b" unique-opened>Main</el-main> -->
            <el-aside :width="isCollapse ? '64px' : '200px'">

                <div class="toggle-button" @click="toggleCollapse">|||</div>

                <!-- unique-opened==》》只打开一个菜单 -->
                <el-menu class="el-menu-vertical-demo" background-color="#202020" active-text-color="#ffd04b"
                    text-color="#fff" unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true">

                    <!-- 一级菜单 -->
                    <el-submenu index="1">
                        <!-- 一级菜单模板区 -->
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>首页</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/welcome">
                            <!-- 二级菜单模板区 -->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>欢迎页面</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                    <!-- 一级菜单 -->
                    <el-submenu index="2">
                        <!-- 一级菜单模板区 -->
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>用户管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/welcome">
                            <!-- 二级菜单模板区 -->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>欢迎页面</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/user/list">
                            <!-- 二级菜单模板区 -->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>用户管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/role/list">
                            <!-- 二级菜单模板区 -->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>角色管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/menu/list">
                            <!-- 二级菜单模板区 -->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>菜单管理</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                    <!-- 一级菜单 -->
                    <el-submenu index="3">
                        <!-- 一级菜单模板区 -->
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>房屋管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/build/list">
                            <!-- 二级菜单模板区 -->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>楼栋管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/unit/list">
                            <!-- 二级菜单模板区 -->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>单元管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/house/list">
                            <!-- 二级菜单模板区 -->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>房屋管理</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                    <!-- 一级菜单 -->
                    <el-submenu index="4">
                        <!-- 一级菜单模板区 -->
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>业主管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/liveUser/list">
                            <!-- 二级菜单模板区 -->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>业主管理</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                    <!-- 一级菜单 -->
                    <el-submenu index="5">
                        <!-- 一级菜单模板区 -->
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>收费管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/feePower/list">
                            <!-- 二级菜单模板区 -->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>电费管理</span>
                            </template>
                        </el-menu-item>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/feeWater/list">
                            <!-- 二级菜单模板区 -->
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>水费管理</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-aside>
            <!-- 用来展示内容 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 导入api
import { logoutApi, getInfoApi } from '@/api/login'
export default {
    name: 'Home',

    data() {
        return {
            trueName: '',
            username: '',
            isCollapse: false
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
                this.$message.success(res.msg);
                window.sessionStorage.clear();
                this.$router.push("/");
            }
        },
        // 编写方法==》获取用户信息
        async getInfo() {
            let res = await getInfoApi();
            if (res.code == 200) {
                this.username = res.data.username;
                this.trueName = res.data.trueName;
                // this.$message(res.data.trueName);
            }
        },

        toggleCollapse() {
            this.isCollapse = !this.isCollapse;
        }
    },
};
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;

    .el-header {
        // background-color: #373C41;
        background-image: linear-gradient(to right, #434343 0%, black 100%);

        h2 {
            color: #FFFFFF;
            font-size: 21px;
            font-family: '楷体';
            line-height: 60px;
            float: left;
        }

        .el-dropdown {
            float: right;
            margin-right: 70px;
            line-height: 60px;
            color: #FFFFFF;
        }
    }

    .el-aside {
        // background-color: #404147;
        background-image: linear-gradient(to right, #434343 0%, black 100%);

        .el-menu {
            border-right: none;
            // background-image: linear-gradient(to right, #434343 0%, black 100%);

        }

        // .el-menu-item {
        //     border-right: none;
        //     color: #000;
        //     // background-color: linear-gradient(to right, #434343 0%, black 100%);
        // }


        .toggle-button {
            background-color: #262626;
            // background-image: linear-gradient(to right, #434343 0%, black 100%);
            font-size: 10px;
            line-height: 24px;
            color: #fff;
            text-align: center;
            letter-spacing: 0.2em;
            cursor: pointer;
        }
    }

    .el-main {
        background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
    }


}

.el-submenu {
    text-align: left;
    // color: #000;
    // background-color: linear-gradient(to right, #434343 0%, black 100%);
}
</style>