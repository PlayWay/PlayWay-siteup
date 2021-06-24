<template lang="pug">
    include ../../tools/mixins.pug

    +b.textarea(:class="{'isFocus': status}")
        +e.label {{ name }}
        +e.wrapper
            textarea(
            @focus="status = true"
            @blur="onBlur"
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
            v-on:keydown="autoResize"
            :style="{height: areaHeight}"
            ref="textarea"
            )
            +e.button--attach.button(v-if="!simple")
                input(
                    type="file"
                    @change="change"
                    multiple
                )
                img(src="/public/media/images/clip.svg")
        +e.P.info--attach(v-if="!simple") Прикрепите необходимое кол-во файлов, если это требуется, но не более 50 Мб
        +e.file(v-if="!simple" :class="{'active': files.length}")
            template(v-for="(file,index) in files")
                +e.item
                    p {{ file.name }}
                    +e.BUTTON.remove.button(
                        v-on:click="removeFile(index)"
                        type="button"
                    )
</template>

<script>
    export default {
        props: ['name','simple','value'],
        data(){
            return {
                status: false,
                areaHeight: 'auto',
                files: []
            }
        },
        methods: {
            onBlur(e) {
                if (e.target.value.length === 0) {
                    this.status = false
                }
            },
            input(e) {
                this.$emit('input',e.target.value);
            },

            removeFile(index) {
                this.files.splice(index,1)
            },

            change(e) {
                let files = e.target.files;

                for(let i=0; i < files.length; i++) {
                    this.files.push(files[i]);
                }

                this.$emit('files',{files: this.files})
            },
            autoResize() {
                setTimeout( () => {
                    this.areaHeight = 'auto';
                })

                setTimeout( () => {
                    //don't jump
                    if ( this.$refs.textarea.scrollHeight - this.$refs.textarea.offsetHeight  > 1) {
                        this.areaHeight = this.$refs.textarea.scrollHeight + 'px';
                    } else {
                        this.areaHeight = 'auto';
                    }
                })
            }
        }
    }
</script>
