<template lang="pug">
    include ../../tools/mixins.pug

    +b.input__(:class="{'isFocus': status,'error': error}")
        +e.label {{ label }}
        input(
            :type="type"
            v-on:focus="status = true"
            v-on:blur="onBlur"
            v-on:input="onInput"
            v-bind:value = "currentValue"
            )
</template>

<script>
    export default {
        props: ['name','type','currentValue','error','label'],
        data(){
            return {
                status: false
            }
        },
        methods: {
            onBlur(e) {
                if (e.target.value.length === 0) {
                    this.status = false
                }
            },
            onInput(e) {
                this.$emit('input',e.target.value);

                if (e.target.value.length > 0) {
                    this.$emit('clearError', {status:false,name: this.name});
                }
            }
        }
    }
</script>