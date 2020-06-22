<template>
    <div class="editor">
        {{value}}
        <textarea v-model="value"></textarea>
        <v-code-editor v-model="value" :autoCompletion="true" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: ''
        };
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.editor {
    width: 100vw;
    height: 500px;
}
</style>