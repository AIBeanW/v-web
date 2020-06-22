import CodeEditor from './src/main.vue';

CodeEditor.install = function (Vue) {
    Vue.component(CodeEditor.name, CodeEditor);
};

export default CodeEditor;
