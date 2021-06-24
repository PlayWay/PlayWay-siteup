<template lang="pug">
    include ../../tools/mixins.pug

    +b.MAIN.main(
        v-on:mousemove="animationBubble"
        :style="{maxHeight: maxHeight + 'px'}"
        ref="main"
        :class="{'send': send}"
    )
        +e.container.container
            +e.wrapper
                +e.content
                    +e.H1.title Разрабатываем сайты, которые приносят
                        +e.line-container
                            +e.SPAN.text.text--orange(ref="title") прибыль
                            +e.DIV.line(:style="{width: line + 'px'}")
                    +e.feedback-call.form--label-bold
                        +e.wrap
                            +e.INPUT-COMPONENT.input(
                                :label="'Ваш номер телефона'"
                                :name="'phone'"
                                :error = "input.error"
                                @clearError = "clearError"
                                v-model="input.value"
                                :currentValue="input.value"
                                :type="'tel'"
                            )
                            +e.BUTTON.button--submit.button--white(
                                type="button"
                                v-on:click="sendForm"
                            )
                                span Обратный звонок
                        +e.wrap
                            +e.P.policy Нажимая кнопку отправить, вы соглашаетесь #[br] с политикой #[a(class="link link--dashed link--grey" href="/privacy" target="_blank") #[span обработки персональных данных]]
                    <!--+e.services-->
                        <!--+e.UL.list-->
                            <!--+e.LI.item Маркетинг-->
                            <!--+e.LI.item Дизайн-->
                            <!--+e.LI.item Разработка-->
                            <!--br-->
                            <!--+e.LI.item--margin Поддержка-->
                            <!--+e.LI.item E-commerce-->
                    +e.img.img__
                        +e.buble--one(ref="bubble1" :style="{transform: 'translate(' + transform.bubble1.x + 'px,' + transform.bubble1.y + 'px)'}")
                        +e.buble--two(ref="bubble2" :style="{transform: 'translate(' + transform.bubble2.x + 'px,' + transform.bubble2.y + 'px)'}")
                        +e.button(ref="button" :style="{transform: 'translate(' + transform.button.x + 'px,' + transform.button.y + 'px)'}")
                            +e.IMG.button-img(:class="{'active': button}" src="/public/media/images/button.png" v-on:click="openBrif")
                            +e.IMG.button-shadow(src="/public/media/images/button-shadow.png")
                        +e.notebook(ref="notebook" :style="{transform: 'translate(' + transform.notebook.x + 'px,' + transform.notebook.y + 'px)'}")
                            img(src="/public/media/images/notebook.png")
                    +e.info
                        p Посмотрите&nbsp;
                            +b.A.link--dashed(href="#projects" v-scroll-to="'#projects'")
                                span наши работы
                            |  или&nbsp;
                            +b.A.link--dashed(href="#form" v-scroll-to="'#form'")
                                span напишите нам
                +e.response(ref="response")
                    h1 Ваш запрос отправлен. Скоро мы свяжемся с вами!
                    p Вы можете ознакомиться с нашими работами:
                    div
</template>

<script>
    import Input from '@/components/blanks/Input.vue'

    import axios from 'axios'

    export default {
        props: ['animation'],
        data() {
            return {
                coordinates: {
                    bubble1: {
                        x: 0,
                        y: 0
                    },
                    bubble2: {
                        x: 0,
                        y: 0
                    },
                    button: {
                        x: 0,
                        y: 0
                    },
                    notebook: {
                        x: 0,
                        y: 0
                    },
                },
                transform: {
                    bubble1: {
                        x: null,
                        y: null
                    },
                    bubble2: {
                        x: null,
                        y: null
                    },
                    button: {
                        x: null,
                        y: null
                    },
                    notebook: {
                        x: null,
                        y: null
                    },
                },
                maxHeight: null,
                line: 0,
                button: false,
                change: {
                    oldValue: null,
                    newValue: null
                },
                input: {
                    error: false,
                    value: ''
                },
                flag: true,
                send: false
            }
        },
        created(){

        },
        destroyed(){
            window.removeEventListener('resize',this.changeLineWidth);
        },
        mounted(){
            setTimeout(() => {
                this.changeLineWidth();
            })
            window.addEventListener('resize',this.changeLineWidth);

            this.maxHeight = this.$refs.main.clientHeight;

            setTimeout(() => {
                this.coordinates.bubble1.x= this.$refs.bubble1.getBoundingClientRect().left + this.$refs.bubble1.getBoundingClientRect().width/2;
                this.coordinates.bubble1.y=this.$refs.bubble1.getBoundingClientRect().top + this.$refs.bubble1.getBoundingClientRect().height/2;
                this.coordinates.bubble2.x=this.$refs.bubble2.getBoundingClientRect().left + this.$refs.bubble2.getBoundingClientRect().width/2;
                this.coordinates.bubble2.y=this.$refs.bubble2.getBoundingClientRect().top + this.$refs.bubble2.getBoundingClientRect().height/2;

                this.coordinates.button.x=this.$refs.button.getBoundingClientRect().left + this.$refs.button.getBoundingClientRect().width/2;
                this.coordinates.button.y=this.$refs.button.getBoundingClientRect().top + this.$refs.button.getBoundingClientRect().height/2;
                this.coordinates.notebook.x=this.$refs.notebook.getBoundingClientRect().left + this.$refs.notebook.getBoundingClientRect().width/2;
                this.coordinates.notebook.y=this.$refs.notebook.getBoundingClientRect().top+ this.$refs.notebook.getBoundingClientRect().height/2;
            },1900)
        },
        methods: {
            animationBubble(e) {

                if (window.innerWidth >= 1200 && !this.animation.init) {
                    this.transform.bubble1.x = (this.coordinates.bubble1.x - e.clientX)*0.02;
                    this.transform.bubble1.y = (this.coordinates.bubble1.y - e.clientY)*0.03;

                    this.transform.bubble2.x = -(this.coordinates.bubble2.x - e.clientX)*0.02;
                    this.transform.bubble2.y = -(this.coordinates.bubble2.y - e.clientY)*0.03;

                    this.transform.notebook.x = (this.coordinates.notebook.x - e.clientX)*0.01;
                    this.transform.notebook.y = (this.coordinates.notebook.y - e.clientY)*0.01;

                    this.transform.button.x = (this.coordinates.button.x - e.clientX)*0.005;
                    this.transform.button.y = (this.coordinates.button.y - e.clientY)*0.005;
                }
            },
            changeLineWidth() {
                this.line = this.$refs.notebook.getBoundingClientRect().left + (this.$refs.notebook.getBoundingClientRect().width/2.15) - this.$refs.title.getBoundingClientRect().left - this.$refs.title.getBoundingClientRect().width;
//                console.log(this.$refs)
            },
            openBrif() {
                this.$emit('onOpenBrif',true);
            },
            clearError() {
                this.input.error = false;
            },
            sendForm() {
                if (this.input.value !== '') {
                    axios.post('/recall', {
                        phone: this.input.value
                    })
                        .then(response => {
                            this.send = true;
                            this.maxHeight = this.$refs.response.offsetTop + this.$refs.response.clientHeight;
                        })
                        .catch(error => {
//                    console.log(error);
                        });
                } else {
                    this.input.error = true;
                }
            }
        },
        components: {
            'input-component': Input
        }
    };
</script>
