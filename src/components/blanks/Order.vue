<template lang="pug">
    include ../../tools/mixins.pug

    +b.order#form
        +e.container.container
            +e.FORM.form.form__.--label-bold(:class="{'send': sendOrder}")
                +e.H2.title--order.trigger(ref="trigger1" :class="{'animated': triggers.trigger1}") Расскажите о вашей задаче
                +e.body
                    +e.INPUT-COMPONENT.input--order.--half.--third.--name.trigger(
                        :label="'Ваше имя'"
                        :name="'name'"
                        :error = "inputs.name.error"
                        @clearError = "clearError"
                        v-model="inputs.name.value"
                        :currentValue="inputs.name.value"
                        :type="'text'"
                        ref="trigger2"
                        :class= "{'animated': triggers.trigger2}"
                        )
                    +e.INPUT-COMPONENT.input--order.--half.--third.--email.trigger(
                        :label="'E-mail'"
                        :name="'email'"
                        :error = "inputs.email.error"
                        @clearError = "clearError"
                        v-model="inputs.email.value"
                        :currentValue="inputs.email.value"
                        :type="'email'"
                        ref="trigger3"
                        :class= "{'animated': triggers.trigger3}"
                        )
                    +e.INPUT-COMPONENT.input--order.--third.trigger(
                        :label="'Телефон'"
                        :name="'phone'"
                        :error = "inputs.phone.error"
                        @clearError = "clearError"
                        v-model="inputs.phone.value"
                        :currentValue="inputs.phone.value"
                        :type="'tel'"
                        ref="trigger4"
                        :class= "{'animated': triggers.trigger4}"
                        )
                    +e.line--order
                        +e.TEXTAREA-COMPONENT.textarea.trigger(
                            :name="'Сообщение'"
                            v-model="inputs.message.value"
                            :simple="false"
                            @files="loadFiles"
                            ref="trigger5"
                            :class="{'animated': triggers.trigger5}"
                        )
                    +e.button-container
                        +e.BUTTON.button--submit.button--white.trigger(
                            type="button"
                            v-on:click="send"
                            ref="trigger6"
                            :class="{'animated': triggers.trigger6}"
                        ) Отправить
                        +e.P.info--policity.trigger(ref="trigger7" :class="{'animated': triggers.trigger7}") Нажимая кнопку отправить, вы соглашаетесь #[br] с политикой #[a(class="link link--dashed" href="/privacy" target="_blank") #[span обработки персональных данных]]
                +e.response--order.response__
                    +e.container--order
                        +e.wrapper--order
                            +e.H3.title Заявка отправлена
                            +e.P.text Совсем скоро мы свяжемся с вами.#[br] А пока можете посмотреть&nbsp;
                                +e.A.link.link--dashed(href="#projects" v-scroll-to="'#projects'" v-on:click="closePopupOnClick")
                                    span наши работы
                            +e.close--on-window.button--close(type="button" v-on:click="closePopupOnClick")
                        +e.close--on-popup.button--close(type="button" v-on:click="closePopupOnClick")
                +e.preloader
</template>

<script>
    import Input from '@/components/blanks/Input.vue'
    import Textarea from '@/components/blanks/Textarea.vue'

    import axios from 'axios'

    export default {
        props:['status'],
        data () {
            return {
                inputs: {
                    name: {
                        error: false,
                        value: ''
                    },
                    email: {
                        error: false,
                        value: ''
                    },
                    phone: {
                        error: false,
                        value: ''
                    },
                    message: {
                        error: false,
                        value: ''
                    },
                    files:[]
                },
                sendOrder: false,
                triggers: {
                    trigger1: false,
                    trigger2: false,
                    trigger3: false,
                    trigger4: false,
                    trigger5: false,
                    trigger6: false,
                    trigger7: false
                }
            }
        },
        methods: {
            clearError(data) {
                for (let key in this.inputs) {
                    if (key === data.name) {
                        this.inputs[key].error = data.status;
                    }
                }
            },

            formValidate() {
                let status = true;

                for (let key in this.inputs) {
                    if (!(key === 'files' || key === 'message')) {
                        if (this.inputs[key].value === '') {
                            this.inputs[key].error = true;
                            status = false;
                        } else {
                            this.inputs[key].error = false;
                        }
                    }
                }

                return status;
            },

            closePopupOnClick(){
                this.closePopup();
            },

            closePopupOnEsc(event) {
                event = event || window.event;
                let isEscape = false;
                if ("key" in event) {
                    isEscape = (event.key === "Escape" || event.key === "Esc");
                } else {
                    isEscape = (event.keyCode === 27);
                }
                if (isEscape) {
                    this.closePopup()
                }
            },

            closePopup(){
                this.sendOrder = false;
                scrollLock.show();
            },

            clickOnClose(e) {
                if(this.hasClass(e.target,'form__response--order')){
                    this.closePopup()
                }
            },

            hasClass(element, className) {
                var rx = new RegExp('(?:^| )' + className + '(?: |$)');
                return rx.test(element.className);
            },

            send() {
                if(this.formValidate()) {
                    let data = {
                        one: null,
                        two: [],
                        three: []
                    };

//                     let formData = new FormData();
//                     this.inputs.files.map((file,index) => {
//                         formData.append("file-" + index, file);
//                     });
//
//                     formData.append("name", this.inputs.name.value);
//                     formData.append("email", this.inputs.email.value);
//                     formData.append("phone", this.inputs.phone.value);
//                     formData.append("message", this.inputs.message.value);
//                     // formData.append("steps", data);
//
//                     axios.post('/order',formData, {
//                         headers: {
//                             'Content-Type': 'multipart/form-data'
//                         }
//                     })
//                         .then(response => {
//                             this.sendOrder = true;
//                         })
//                         .catch(error => {
// //                    console.error(error);
//                         });

                    axios.post('/order', {
                        name: this.inputs.name.value,
                        email: this.inputs.email.value,
                        phone: this.inputs.phone.value,
                        message: this.inputs.message.value,

                        steps: data
                    })
                        .then(response => {
                            this.sendOrder = true;
                        })
                        .catch(error => {
//                    console.error(error);
                        });
                }
            },

            onScroll() {

                for (let i = 1; i <= 7; i++) {

                    if (typeof this.$refs['trigger' + i].$el !== 'undefined') {
                        if (this.isElementInViewport(this.$refs['trigger' + i].$el)) {
                            this.triggers['trigger' + i] = true;
                        }
                    } else {
                        if (this.isElementInViewport(this.$refs['trigger' + i])) {
                            this.triggers['trigger' + i] = true;
                        }
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
            },

            loadFiles(data) {
                this.inputs.files = [];
                this.inputs.files = data.files;
            }
        },
        watch: {
            sendOrder: function (newValue,oldValue) {
                if (newValue) {
                    scrollLock.hide('form__response--order');
                    window.addEventListener('click', this.clickOnClose);
                    window.addEventListener('keydown',this.closePopupOnEsc);
                } else {
                    window.removeEventListener('keydown',this.closePopupOnEsc);
                    window.removeEventListener('click',this.clickOnClose);
                }
            }
        },
        components: {
            'input-component': Input,
            'textarea-component': Textarea
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
