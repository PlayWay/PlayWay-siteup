<template lang="pug">
    div
        content-component
</template>

<script>
    import Header from '@/components/blanks/Header.vue'
    import Footer from '@/components/blanks/Footer.vue'
    import Content from '@/components/pages/content/privacy/Content.vue';

    export default {
        data() {
            return {
                page: 'privacy'
            };
        },
        components: {
            'header-component': Header,
            'content-component': Content,
            'footer-component': Footer
        }
    }
</script>