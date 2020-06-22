// TODO: 引入不好  晚点单独打包文件
import '@/styles/index.scss';

import CodeEditor from './code-editor';

const components = [
    CodeEditor
];

const install = function (Vue) {
    if (install.installed) return;
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    CodeEditor
};