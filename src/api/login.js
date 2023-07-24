import $http from '@/utils/http';
// 处理验证码请求
export async function captchaApi() {
    return await $http.post('captcha');
}
// 登录处理
export async function loginApi(params) {
    return await $http.post("login", params);
}
// 安全退出
export async function logoutApi() {
    return await $http.post("logout");
}
// 获取用户信息
export async function getInfoApi() {
    return await $http.get("getInfo");
}