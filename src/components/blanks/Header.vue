<template lang="pug">
    include ../../tools/mixins.pug

    +b.HEADER.header
        +e.container.container
            +e.A.logo(href="#")
                img(src="/public/media/images/logo.svg")
            +e.NAV.nav.nav__
                +e.list
                    +e.A.item.link(href="#projects" v-scroll-to="'#projects'")
                        span Работы
                    +e.A.item.link(href="#services" v-scroll-to="'#services'")
                        span Услуги
                    +e.BUTTON.item.button--dashed(type="button" v-on:click="openBrif")
                        span Заполнить бриф
            +e.contact
                +e.cities-list(:class="{'active': citiesList}")
                    span(v-on:click="city = 1") Волгоград
                    span(v-on:click="city = 2") Москва
                +e.wrapper--relative(:class="{'active': city === 1}")
                    +e.BUTTON.city.button--dashed(type="button" v-on:click="citiesList = !citiesList") Волгоград
                    +e.A.phone.link--dashed(href="tel:79275218887")
                        span +7 (927) 521-88-87
                +e.wrapper--absolute(:class="{'active': city === 2}")
                    +e.BUTTON.city.button--dashed(type="button" v-on:click="citiesList = !citiesList" ) Москва
                    +e.A.phone.link--dashed(href="tel:79610639940")
                        span +7 (961) 063-99-40
</template>

<script>

    export default {
        props:['city'],
        data () {
            return {
                brif: false,
                citiesList: false
            }
        },
        methods: {
            openBrif() {
                this.$emit('onOpenBrif',true)
            },
            closeList(e) {
                if (!(this.hasClass(e.target,'active'))) {
                    this.citiesList = false;
                }
            },
            hasClass(element, className) {
                let rx = new RegExp('(?:^| )' + className + '(?: |$)');
                return rx.test(element.className);
            }
        },
        watch: {
            citiesList: function (newValue,oldValue) {
                if (newValue) {
                    window.addEventListener('click', this.closeList);
                } else {
                    window.removeEventListener('click', this.closeList);
                }
            },
            city: function (newValue,oldValue) {
                if (newValue) {
                    this.$emit('changeLocation',this.city);
                }
            }
        },
        mounted() {

        }
    }
</script>