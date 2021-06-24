<template lang="pug">
    include ../../tools/mixins.pug

    +b.FOOTER.footer
        +e.container.container
            +e.left
                +e.A.logo.trigger(href="#" ref="trigger1" :class="{'animated': triggers.trigger1}")
                    img(src="/public/media/images/logo.svg")
                +e.content
                    .trigger(ref="trigger2" :class="{'animated': triggers.trigger2}")
                        +e.cities
                            +e.BUTTON.button.button(type="button" :class="{'active':city === 1}" v-on:click="city = 1") Волгоград
                            +e.BUTTON.button.button(type="button" :class="{'active':city === 2}" v-on:click="city = 2") Москва
                        +e.A.link--phone.link--dashed(href="tel:79275218887" v-if="city === 1")
                            span +7 (927) 521-88-87
                        +e.A.link--phone.link--dashed(href="tel:79610639940" v-if="city === 2")
                            span +7 (961) 063-99-40
                        +e.A.link--email.link--dashed(href="mailto:hello@si.siteupers.ru")
                            span hello@siteupers.ru
                    +e.list.trigger(ref="trigger3" :class="{'animated': triggers.trigger3}")
                        +e.A.item.link--dashed(href="#projects" v-scroll-to="'#projects'")
                            span Работы
                        +e.A.item.link--dashed(href="#services" v-scroll-to="'#services'")
                            span Услуги
                        +e.BUTTON.item--button.button--dashed(type="button" v-on:click="openBrif")
                            span Заполнить бриф
            +e.right
                +e.info.trigger(ref="trigger4" :class="{'animated': triggers.trigger4}")
                    span Наши фичи
                    h3 Всегда делаем адаптивный дизайн
</template>

<script>
    export default {
        props:['city'],
        data () {
            return {
                triggers: {
                    trigger1: false,
                    trigger2: false,
                    trigger3: false,
                    trigger4: false
                }
            }
        },
        methods: {
            openBrif() {
                this.$emit('onOpenBrif',true)
            },

            onScroll() {
                for (let i = 1; i <= 4; i++) {
                    if (this.isElementInViewport(this.$refs['trigger' + i])) {
                        this.triggers['trigger' + i] = true;
                    }
                }
            },

            isElementInViewport(el) {
                let rect = el.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document. documentElement.clientWidth)
                );
            }
        },
        watch: {
            city: function (newValue,oldValue) {
                this.$emit('changeLocation', newValue);
            }
        },
        mounted() {
            this.onScroll();
            window.addEventListener('scroll',this.onScroll)
        },
        destroyed() {
            window.removeEventListener('scroll',this.onScroll)
        }
    }
</script>