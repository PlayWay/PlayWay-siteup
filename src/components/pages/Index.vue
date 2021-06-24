<template lang="pug">
    div(:class="{'hide-animation': animation.hide,'init-animation': animation.init}")
        header-component(@onOpenBrif="onToggleBrif" @changeLocation="changeLocation" :city="location")
        brif-component(:status="popup.status" @onCloseBrif="onToggleBrif")
        main-component(@onOpenBrif="onToggleBrif" :animation="animation.init")
        projects-component
        services-component
        order-component
        footer-component(@onOpenBrif="onToggleBrif" @changeLocation="changeLocation" :city="location")
</template>

<script>
  import Header from '@/components/blanks/Header.vue'
  import Main from '@/components/blanks/Main.vue'
  import Projects from '@/components/blanks/Projects.vue'
  import Services from '@/components/blanks/Services.vue'
  import Order from '@/components/blanks/Order.vue'
  import Footer from '@/components/blanks/Footer.vue'
  import Brif from '@/components/blanks/Brif.vue'

  export default {
    props:['status'],
    data() {
      return {
        popup: {
          status: false
        },
        animation: {
          hide: true,
          init: false
        },
        location: 1
      };
    },
    methods: {
      onToggleBrif(data) {
        this.popup.status = data;
      },
      changeLocation(data) {
        this.location = data;
        console.log(data)
      }
    },
    mounted() {
//            this.animation.hide = false;
      this.animation.init = true;

      setTimeout(() => {
        this.animation.init = false;
        this.animation.hide = false;
      },2500)
    },
    components: {
      'header-component': Header,
      'main-component': Main,
      'projects-component': Projects,
      'services-component': Services,
      'order-component': Order,
      'footer-component': Footer,
      'brif-component': Brif
    }
  };
</script>