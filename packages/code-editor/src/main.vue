<template>
    <div class="v-code_editor" @contextmenu.prevent="handleFormat"></div>
</template>

<script>
import jsBeautify from "js-beautify/js/lib/beautify";
import brace from "brace";
import "brace/ext/language_tools.js";
import "brace/mode/javascript";
import "brace/theme/monokai";
export default {
    name: "v-code-editor",
    data() {
        return {
            codeEditor: null,
            currentValue: ""
        };
    },
    props: {
        fontSize: {
            type: Number,
            default: 16
        },
        tabSize: {
            type: Number,
            default: 2
        },
        value: {
            type: String,
            default: ""
        },
        theme: {
            type: String,
            default: "monokai"
        },
        mode: {
            type: String,
            default: "javascript"
        },
        autoCompletion: {
            type: Boolean,
            default: false
        },
        staticWordCompleter: {
            type: Function
        },
        format: {
            type: Function
        }
    },
    methods: {
        async handleFormat() {
            let context = this.codeEditor.getValue();
            if (this.mode === "javascript") {
                context = jsBeautify.js_beautify(context, {
                    indent_size: this.tabSize
                });
            } else if (this.format) {
                context = await this.format();
            }
            (this.mode === "javascript" || this.format) &&
                this.setValue(context);
        },
        handleChange() {
            this.currentValue = this.codeEditor.getValue();
            this.$emit("input", this.currentValue);
        },
        setValue(value) {
            if (this.currentValue !== value && this.codeEditor) {
                this.codeEditor.setValue(value);
            }
        }
    },
    mounted() {
        this.codeEditor = brace.edit(this.$el);
        this.codeEditor.getSession().setMode(`ace/mode/${this.mode}`);
        this.codeEditor.setTheme(`ace/theme/${this.theme}`);

        this.codeEditor.setOption("tabSize", this.tabSize);
        this.codeEditor.setOption("fontSize", this.fontSize);
        this.codeEditor.$blockScrolling = Infinity;

        this.setValue(this.value);
        this.codeEditor.on("change", this.handleChange);
        if (this.autoCompletion) {
            brace.acequire("ace/ext/language_tools");
            if (staticWordCompleter) {
                var staticWordCompleter = {
                    getCompletions: this.getCompletions
                    // 实例
                    // getCompletions: (
                    //     editor,
                    //     session,
                    //     pos,
                    //     prefix,
                    //     callback
                    // ) => {
                    //     if (prefix.length === 0) {
                    //         callback(null, []);
                    //         return;
                    //     }
                    //     callback(null, [
                    //         {
                    //             name: "word", //显示的名称，‘奖金’
                    //             value: "word22", //插入的值，‘100’
                    //             score: 1000, //分数，越大的排在越上面
                    //             meta: "type" //描述，‘我的常量’
                    //         },

                    //         {
                    //             name: "word", //显示的名称，‘奖金’
                    //             value: "word32", //插入的值，‘100’
                    //             score: 1000, //分数，越大的排在越上面
                    //             meta: "type" //描述，‘我的常量’
                    //         }
                    //     ]);
                    // }
                };
                this.codeEditor.completers = [staticWordCompleter];
            }
            this.codeEditor.setOptions({
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true //只能补全
            });
        }
    },
    watch: {
        value: {
            handler(value) {
                this.setValue(value);
            }
        }
    }
};
</script>