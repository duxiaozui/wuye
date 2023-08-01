<template>
    <div>
        <div ref="vantaRef" style="width:100%;height:100vh"></div>
        <div class="my_title">Hello,嘟小嘴</div>
    </div>
</template>

<script>
import * as THREE from 'three'
import Net from 'vanta/src/vanta.net'
export default {
    name: "hello",
    data() {
        return {

        };
    },
    mounted() {
        this.vantaEffect = Net({
            el: this.$refs.vantaRef,
            THREE: THREE
        })

        VANTA.NET({
            el: this.$refs.vantaRef,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xdec790,
            backgroundColor: 0xc04393,
            spacing: 12.00
        })


    },
    beforeDestroy() {
        if (this.vantaEffect) {
            this.vantaEffect.destroy()
        }
    },
    methods: {

    },

};
</script>

<style>
.my_title {
    z-index: 999;
    position: fixed;
    top: 40%;
    left: 10%;
    color: aquamarine;
    font-size: 100px;
    font-weight: bolder;
}
</style>