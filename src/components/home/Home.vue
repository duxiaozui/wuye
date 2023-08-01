<template>
    <el-container class="home-container">
        <el-header>
            <h2>阳光小区物业系统</h2>
            <el-dropdown>
                <span class="el-dropdown-link">
                    昵称：{{ trueName }}----登录账户：{{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
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

                <!-- <div class="toggle-button" @click="toggleCollapse">|||</div> -->
                <div class="toggle-button" @click="toggleCollapse">-</div>

                <!-- unique-opened==》》只打开一个菜单 -->
                <el-menu class="el-menu-vertical-demo" background-color="#202020" active-text-color="#ffd04b"
                    text-color="#fff" unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true">

                    <el-submenu v-if="menuCodes.includes(firstMenu.menuCode)" :index="firstMenu.menuId + ''"
                        v-for="(firstMenu, index) in menuList">
                        <template slot="title">
                            <i :class="firstMenu.icon"></i>
                            <span>{{ firstMenu.moduleLabel }}</span>
                        </template>
                        <el-menu-item v-if="menuCodes.includes(secondMenu.menuCode)" :index="secondMenu.url"
                            v-for="(secondMenu, index) in firstMenu.children">
                            <template slot="title">
                                <i :class="secondMenu.icon"></i>
                                <span>{{ secondMenu.moduleLabel }}</span>
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
import { getMenuListApi } from '@/api/sys-menu'
export default {
    name: 'Home',

    data() {
        return {
            trueName: '',
            username: '',
            isCollapse: false,
            //菜单数据
            menuList: [],
            //权限码
            menuCodes: []
        };
    },
    // 初始化方法(钩子函数)
    mounted() {
        this.getInfo();
        this.loadMenuList();
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
                this.menuCodes = res.data.menus;
                // this.$message(res.data.trueName);
            }
        },

        toggleCollapse() {
            this.isCollapse = !this.isCollapse;
        },
        async loadMenuList() {
            let res = await getMenuListApi();
            if (res && res.code == 200) {
                this.menuList = res.data;
            }

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