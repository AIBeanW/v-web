<template>
    <div v-if="value" class="v-dialogue">
        <div :style="{width: `${width}px`}" class="v-dialogue-main">
            <div class="v-dialogue-header">
                {{title}}
                <i @click="close" class="iconfont icon-guanbi"></i>
            </div>
            <div class="v-dialogue-content">
                <slot />
            </div>
            <div class="v-dialogue_button clearfix">
                <button class="v-button v-button-close" @click="close">{{cancelText}}</button>
                <button class="v-button v-button-primary" @click="handleClose">{{confirmText}}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "v-dialogue",
    methods: {
        handleConfirm() {
            if (this.confirm() !== false) {
                this.close();
            }
        },
        handleClose() {
            this.close();
            this.$emit("input", false);
        }
    },
    props: {
        value: [String, Number, Boolean],
        confirm: {
            type: Function,
            default: () => {
                return () => {};
            }
        },
        close: {
            type: Function,
            default: () => {
                return () => {};
            }
        },
        title: {
            type: String,
            default: "提示"
        },
        width: {
            type: Number,
            default: 500
        },
        confirmText: {
            type: String,
            default: "确定"
        },
        cancelText: {
            type: String,
            default: "取消"
        },
    },
    watch:{
        value(){
            console.log(this.value)
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../../src/styles/index.scss';
.v-dialogue {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    .v-dialogue-main {
        position: absolute;
        width: 500px;
        padding: 10px;
        background-color: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 4px;
        .v-dialogue-header {
            position: relative;
            font-size: 18px;
            text-align: left;
            color: #303133;
            .icon-guanbi {
                position: absolute;
                top: 0;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .v-dialogue-content{
            padding: 10px;
        }
        .v-dialogue_button {
            text-align: right;
            .v-button-close{
                border: 0;
                &:hover{
                    background-color: transparent;
                }
            }
        }
    }
}
</style>