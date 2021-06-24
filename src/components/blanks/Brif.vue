<template lang="pug">
    include ../../tools/mixins.pug

    +b.brif(:class="{'show': status, 'animated': statusComplete,'send': form.send}")
        +e.container(
            :class="{'stage-0': form.currentStep === 0 && status,'stage-1': form.currentStep > 0, 'stage-response': form.send, 'stage-close': statusComplete}")
            +e.progress-bar(:style="{transform: 'scale(' + form.progressBar.scaleX + ',' + form.progressBar.scaleY + ')'}")
            +e.FORM(
                :class="{ 'active': form.currentStep > 0}"
                ref="form"
            ).form.form-brif__.sl--scrollable
                +e.body
                    +e.breadcrambs.breadcrambs__
                        +e.BUTTON.button--prev.button(
                            type="button"
                            :class="{'active': form.currentStep > 0}"
                            v-if="!isTablet"
                            v-on:click="onChangeStep('minus')")
                            img(src="/public/media/images/arrow-back.svg")
                        +e.item--first(:class="{'active': form.currentStep === 0, 'old': form.currentStep > 0}" v-if="isTablet") Продукт
                        +e.item--first(:class="{'active-mobile-first': form.currentStep === 0}" v-else) Выбор продукта
                        +e.item(v-if="isTablet"
                                :class="{'active': form.currentStep === 1,'old': form.currentStep > 1}"
                                ) Задача
                        +e.item(
                            v-else
                            :class="{'active': form.currentStep === 1,'old': form.currentStep > 1,'position--mobile': form.currentStep > 0 }"
                            ) Задача ({{ form.currentStep+1 }}/{{briefLength(products[form.currentValue])}})
                        +e.item(v-if="isTablet"
                            :class="{'active': form.currentStep === 2,'old': form.currentStep > 2}"
                            ) Спецификация
                        +e.item(
                            v-else
                            :class="{'active': form.currentStep === 2,'old': form.currentStep > 2,'position--mobile': form.currentStep > 0 }"
                            ) Спецификация ({{ form.currentStep+1 }}/{{briefLength(products[form.currentValue])}})
                        +e.item(v-if="isTablet"
                            :class="{'active': form.currentStep === 3,'old': form.currentStep > 3}"
                            ) Контактные данные
                        +e.item(
                            v-else
                            :class="{'active': form.currentStep === 3,'old': form.currentStep > 3 && isTablet,'position--mobile': form.currentStep > 0 }"
                            ) Контактные данные ({{ briefLength(products[form.currentValue])}}/{{briefLength(products[form.currentValue])}})
                    +e.steps-list(ref="list" v-bind:style="{minHeight: listHeight + 'px'}")
                        +e.step--static.--one.step__(:class="{'active': form.currentStep === 0 }" ref="step0")
                            +e.H2.title Какой продукт вас интересует?
                            +e.list
                                +e.checkbox(:class="{'active': form.steps.one === 0 }" v-on:click="chooseOption(0,0)")
                                    span Сайт или портал
                                +e.checkbox(:class="{'active': form.steps.one === 1 }" v-on:click="chooseOption(1,0)")
                                    span Реклама в интернете
                                +e.checkbox(:class="{'active': form.steps.one === 2 }" v-on:click="chooseOption(2,0)")
                                    span Брендинг и UX/UI-дизайн
                                +e.checkbox(:class="{'active': form.steps.one === 3 }" v-on:click="chooseOption(3,0)")
                                    span E-commerce
                                +e.checkbox(:class="{'active': form.steps.one === 4 }" v-on:click="chooseOption(4,0)")
                                    span Поддержка проектов
                        +e.step--absolute.step__(:class="{'active': form.currentStep === 1}" ref="step1")
                            +e.H2.title(v-html="products[form.currentValue].stepOne.text")
                            +e.list
                                +e.checkbox(
                                    v-for="(product,index) in products[form.currentValue].stepOne.steps"
                                    :class="{'active': inArray(form.steps.two,index) }"
                                    v-on:click="chooseOption(index,1)"
                                )
                                    span {{ product.name }}
                            +e.TEXTAREA-COMPONENT.textarea--dark-border(
                                :simple="true"
                                :name="'Для чего нужен сайт?'"
                                :class="{'active': form.inputs.variant.stepTwo.status}"
                                v-model="form.inputs.variant.stepTwo.value"
                                )
                        +e.step--absolute.step__(
                            v-if="products[form.currentValue].stepTwo.steps.length > 0"
                            :class="{'active': form.currentStep === 2 }"
                            ref="step2")
                            +e.H2.title(v-html="products[form.currentValue].stepTwo.text")
                            +e.list
                                +e.checkbox(
                                    v-for="(product,index) in products[form.currentValue].stepTwo.steps"
                                    :class="{'active': inArray(form.steps.three,index) }"
                                    v-on:click="chooseOption(index,2)"
                                )
                                    span {{ product.name }}
                                    +e.tooltip.tooltip__(v-if="product.name === 'Диджитал-интерактив'")
                                        +e.BUTTON.toggle.button(type="button")
                                        +e.content
                                            p Создание цифровой маркетинговой экосистемы продукта, бренда или услуги для достижения целей компании
                            +e.TEXTAREA-COMPONENT.textarea--dark-border(
                                :simple="true"
                                :name="'Опишите функционал'"
                                :class="{'active': form.inputs.variant.stepThree.status}"
                                v-model="form.inputs.variant.stepThree.value"
                            )
                        +e.step--absolute.--form.step__(:class="{'active': form.currentStep === 3 }" ref="step3")
                            +e.form.form__.--label-bold-mobile
                                +e.body
                                    +e.H2.title--brif(v-if="isTablet") Контактные данные
                                    +e.title--brif(v-else)
                                        h2 Почти готово!
                                        p Подготовим смету и план, а после свяжемся с вами
                                    +e.INPUT-COMPONENT.input--dark-border.--width100(
                                        :label="'Ваше имя'"
                                        :name="'name'"
                                        :error = "form.inputs.name.error"
                                        @clearError = "clearError"
                                        v-model="form.inputs.name.value"
                                        :currentValue="form.inputs.name.value"
                                        :type="'text'")
                                    +e.INPUT-COMPONENT.input--dark-border.--width50(
                                        :label="'E-mail'"
                                        :name="'email'"
                                        :error = "form.inputs.email.error"
                                        @clearError = "clearError"
                                        v-model="form.inputs.email.value"
                                        :currentValue="form.inputs.email.value"
                                        :type="'email'")
                                    +e.INPUT-COMPONENT.input--dark-border.--width50(
                                        :label="'Телефон'"
                                        :name="'phone'"
                                        :error = "form.inputs.phone.error"
                                        @clearError = "clearError"
                                        v-model="form.inputs.phone.value"
                                        :currentValue="form.inputs.phone.value"
                                        :type="'tel'")
                                    +e.line--width100
                                        +e.TEXTAREA-COMPONENT.textarea--dark-border(
                                            :name="'Сообщение'"
                                            v-model="form.inputs.message.value"
                                            :simple="false"
                                            )
                    +e.button-container--navigation(
                        :class="{'stage-1': form.currentStep > 0 , 'stage-3': form.currentStep === 3}"
                        )
                        +e.BUTTON.button--prev.button--transparent.--rectangle(
                            type="button"
                            v-if="isTablet"
                            :class="{'active': form.currentStep > 0}"
                            v-on:click="onChangeStep('minus')") Назад
                        +e.BUTTON.button--next.button--orange.--rectangle(type="button" v-on:click="onChangeStep('plus')" :class="{'active': form.currentStep <= 2}") Далее
                        +e.button-container--submit(:class="{'active': form.currentStep === 3}")
                            +e.BUTTON.button--submit.button--orange.--rectangle(type="button" v-on:click="send") Отправить
                            +e.P.info--policity Нажимая кнопку отправить, вы соглашаетесь с политикой #[a(class="link link--dashed" href="/privacy" target="_blank") #[span обработки персональных данных]]
            +e.response--brief.response__
                +e.container
                    +e.wrapper--brief
                        +e.H3.title Бриф отправлен
                        +e.P.text Совсем скоро мы свяжемся с вами.#[br] А пока можете посмотреть&nbsp;
                            +e.A.link.link--dashed(href="#projects" v-scroll-to="'#projects'" v-on:click="closePopupOnClick")
                                span наши работы
                +e.close--brief.button--close(type="button" v-on:click="closePopupOnClick")
            +e.preloader
            +e.BUTTON.close.button--close(type="button" v-on:click="closePopupOnClick")
</template>

<script>
    import Input from '@/components/blanks/Input.vue'
    import Textarea from '@/components/blanks/Textarea.vue'
    import animateScrollTo from 'animated-scroll-to'

    import axios from 'axios'

    export default {
        props:['status'],
        data(){
            return {
                form: {
                    step:  {
                        value: 0
                    },
                    steps: {
                        one: null,
                        two: [],
                        three: []
                    },
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
                            value: ''
                        },
                        variant: {
                            stepTwo: {
                                status: false,
                                value: ''
                            },
                            stepThree: {
                                status: false,
                                value: ''
                            }
                        },
                        files:[]
                    },
                    currentValue: 0,
                    currentStep: 0,
                    progressBar: {
                        scaleX: 0.25,
                        scaleY: 1
                    },
                    send: false,
                    responseHeight: '100%'
                },
                products: [
                    {
                        stepOne: {
                           text: 'Выберите, для чего нужен <span>сайт или портал</span>',
                           steps: [
                               {
                                   name: 'Продавать в интернете'
                               },
                               {
                                   name: 'Презентация компании'
                               },
                               {
                                   name: 'Увеличить интерес к продукту'
                               },
                               {
                                   name: 'Коммерческий сервис'
                               },
                               {
                                   name: 'Информационный каталог'
                               },
                               {
                                   name: 'Ваш вариант'
                               }
                           ]
                        },
                        stepTwo: {
                            text: 'Какой функционал вы предполагаете на сайте?',
                            steps: [
                                {
                                    name: 'Калькулятор услуг или продуктов'
                                },
                                {
                                    name: 'Поиск по сайту'
                                },
                                {
                                    name: 'Интеграция с 1С'
                                },
                                {
                                    name: 'Возможность оплаты онлайн'
                                },
                                {
                                    name: 'Управление контентом'
                                },
                                {
                                    name: 'Перенос данных со старого сайта'
                                },
                                {
                                    name: 'Интеграция сторонних API'
                                },
                                {
                                    name: 'Личный кабинет'
                                },
                                {
                                    name: 'Мальтиязычность'
                                },
                                {
                                    name: 'Диджитал-интерактив'
                                },
                                {
                                    name: 'Ваш вариант'
                                }
                            ]
                        }
                    },
                    {
                        stepOne: {
                            text: 'Какой тип продукта рекламируем?',
                            steps: [
                                {
                                    name: 'Социальные сети'
                                },
                                {
                                    name: 'Сайт'
                                },
                                {
                                    name: 'Товар или услуга'
                                },
                                {
                                    name: 'Медийную личность'
                                },
                                {
                                    name: 'Акция'
                                },
                                {
                                    name: 'Бренд'
                                },
                                {
                                    "name": 'Ваш вариант'
                                }
                            ]
                        },
                        stepTwo: {
                            text: 'Какие медиа-ресурсы задействованы на текущий момент?',
                            steps: [
                                {
                                    name: 'SMM'
                                },
                                {
                                    name: 'Контекстная реклама'
                                },
                                {
                                    name: 'SEO-продвижение'
                                },
                                {
                                    name: 'Таргетинг'
                                },
                                {
                                    name: 'Наружная реклама'
                                },
                                {
                                    name: 'Теле- или радио- реклама'
                                },
                                {
                                    name: 'Прочее'
                                },
                                {
                                    "name": 'Ваш вариант'
                                }
                            ]
                        }
                    },
                    {
                        stepOne: {
                            text: 'Выберите тип услуги, которая вас интересует',
                            steps: [
                                {
                                    name: 'UX/UI-дизайн сайта или приложения'
                                },
                                {
                                    name: 'Создание логотипа и айдентики'
                                },
                                {
                                    name: 'Дизайн продукта'
                                },
                                {
                                    name: 'Полиграфический дизайн'
                                },
                                {
                                    name: 'Аудит UX/UI'
                                },
                                {
                                    name: 'Ваш вариант'
                                }
                            ]
                        },
                        stepTwo: {
                            text: '',
                            steps: []
                        }
                    },
                    {
                        stepOne: {
                            text: 'Какой продукт e-commerce вас интересует?',
                            steps: [
                                {
                                    name: 'Создание интернет-магазина'
                                },
                                {
                                    name: 'Защита информации'
                                },
                                {
                                    name: 'Построение онлайн-продаж'
                                },
                                {
                                    name: 'Продвижение в коммерческих площадках'
                                },
                                {
                                    name: 'Онлайн-сервис'
                                },
                                {
                                    name: 'Ваш вариант'
                                }
                            ]
                        },
                        stepTwo: {
                            text: '',
                            steps: []
                        }
                    },
                    {
                        stepOne: {
                            text: 'Выберите, какой вид работ вас интересует',
                            steps: [
                                {
                                    name: 'Обновление и поддержание сайта'
                                },
                                {
                                    name: 'Консультирование по разработке'
                                },
                                {
                                    name: 'Внедрение CRM-систем'
                                },
                                {
                                    name: 'SEO-продвижение'
                                },
                                {
                                    name: 'Онлайн-сервис'
                                },
                                {
                                    name: 'Ваш вариант'
                                }
                            ]
                        },
                        stepTwo: {
                            text: '',
                            steps: []
                        }
                    },
                ],
                listHeight: null,
                product: '',
                statusComplete: false,
                isTablet: false
            }
        },
        methods: {
            inArray(array,needle) {
                let status = false;
                array.map((item) => {
                    if(item === needle) {
                        status = true;
                    }
                });
                return status;
            },

            briefLength(arr) {
                if (arr.stepTwo.steps.length === 0) {
                    return Object.keys(arr).length +1;
                } else {
                    return Object.keys(arr).length +2;
                }
            },

            chooseOption(value,step) {

                switch(step) {
                    case 0:
                        this.form.currentValue = value;
                        if(this.form.steps.one !== value) {
                            this.form.steps.two = [];
                            this.form.steps.three = [];
                        }
                        this.form.steps.one = value;
                        break;
                    case 1:
                        if(!this.inArray(this.form.steps.two,value)) {
                            this.form.steps.two.push(value);
                            if (value === (this.products[this.form.currentValue].stepOne.steps.length - 1)) {
                                this.form.inputs.variant.stepTwo.status = true;

                            }

                        } else {
                            if (value === (this.products[this.form.currentValue].stepOne.steps.length - 1)) {
                                this.form.inputs.variant.stepTwo.status = false;
                            }

                            this.form.steps.two.splice(this.form.steps.two.indexOf(value),1);
                        }
                        break;
                    case 2:
                        if(!this.inArray(this.form.steps.three,value)) {
                            this.form.steps.three.push(value);
                            if (value === (this.products[this.form.currentValue].stepTwo.steps.length - 1)) {
                                this.form.inputs.variant.stepThree.status = true;
                            }

                        } else {
                            if (value === (this.products[this.form.currentValue].stepTwo.steps.length - 1)) {
                                this.form.inputs.variant.stepThree.status = false;
                            }

                            this.form.steps.three.splice(this.form.steps.three.indexOf(value),1);
                        }
                        break;
                }
            },

            clearError(data) {
                for (let key in this.form.inputs) {
                    if (key === data.name) {
                        this.form.inputs[key].error = data.status;
                    }
                }
            },

            formValidate() {
                let status = true;

                for (let key in this.form.inputs) {
                    if (!(key === 'files' || key === 'message')) {
                        if (this.form.inputs[key].value === '') {
                            this.form.inputs[key].error = true;
                            status = false;
                        } else {
                            this.form.inputs[key].error = false;
                        }
                    }
                }

                return status;
            },

            send() {
                if(this.formValidate()) {
                    let data = {
                        one: null,
                        two: [],
                        three: []
                    };

                    switch (this.form.steps.one) {
                        case 0:
                            data.one = 'Сайт или портал';
                            break;
                        case 1:
                            data.one = 'Реклама в интернете';
                            break;
                        case 2:
                            data.one = 'Брендинг и UX/UI-дизайн';
                            break;
                        case 3:
                            data.one = 'E-commerce';
                            break;
                        case 4:
                            data.one = 'Поддержка проектов';
                            break;
                    }

                    this.products[this.form.currentValue].stepOne.steps.map((product,index) => {
                        if( this.form.steps.two.includes(index) ) {
                            if (product.name !== 'Ваш вариант') {
                                data.two.push(product.name)
                            }
                        }
                    });

                    this.form.steps.two.map((item) => {
                        if (typeof item === 'string') {
                            data.two.push('Выбор пользователя: ' + item);
                        }
                    });

                    this.products[this.form.currentValue].stepTwo.steps.map((product,index) => {
                        if( this.form.steps.three.includes(index) ) {
                            if (product.name !== 'Ваш вариант') {
                                data.three.push(product.name)
                            }
                        }
                    });

                    this.form.steps.three.map((item) => {
                        if (typeof item === 'string') {
                            data.three.push('Выбор пользователя: ' + item);
                        }
                    });

                    axios.post('/order', {
                        name: this.form.inputs.name.value,
                        email: this.form.inputs.email.value,
                        phone: this.form.inputs.phone.value,
                        message: this.form.inputs.message.value,

                        steps: data
                    })
                        .then(response => {
                            this.form.send = true;
                        })
                        .catch(error => {
//                    console.error(error);
                        });
                }
            },

            onChangeStep(value) {
                if(this.products[this.form.currentValue].stepTwo.steps.length === 0 && (this.form.currentStep === 1 && value === 'plus')) {
                    this.form.currentStep++;
                }

                if(this.products[this.form.currentValue].stepTwo.steps.length === 0 && (this.form.currentStep === 3 && value === 'minus')) {
                    this.form.currentStep--;
                }

                if (value === 'plus') {
                    this.form.currentStep++;
                    this.listHeight = this.$refs['step' + this.form.currentStep].offsetHeight;

                    if (this.form.currentStep === 1) {

                    }

                    if (this.form.currentStep === 2) {

                        if (this.form.inputs.variant.stepTwo.status) {
                            this.form.steps.two.push(this.form.inputs.variant.stepTwo.value);
                        }
                    }

                    if (this.form.currentStep === 3) {

                        if (this.form.inputs.variant.stepThree.status) {
                            this.form.steps.three.push(this.form.inputs.variant.stepThree.value);
                        }

                    }

                } else {
                    this.form.currentStep--;
                    this.listHeight = this.$refs['step' + (this.form.currentStep)].offsetHeight;

                    if (this.form.currentStep === 0) {
                        this.form.steps.one = null;
                    }

                    if (this.form.currentStep === 1) {
                        this.form.steps.two = [];
                        this.form.inputs.variant.stepTwo.value = '';
                        this.form.inputs.variant.stepTwo.status = false;
                    }

                    if (this.form.currentStep === 2) {
                        this.form.steps.three = [];
                        this.form.inputs.variant.stepThree.value = '';
                        this.form.inputs.variant.stepThree.status = false;
                    }
                }

                //ProgressBar

                if (this.form.currentStep === 0) {
                    this.form.progressBar.scaleX = 0.25;
                    this.form.progressBar.scaleY = 1;
                }

                if (this.briefLength(this.products[this.form.currentValue]) === 4) {
                    if (this.form.currentStep === 1) {
                        this.form.progressBar.scaleX = 0.5;
                    }

                    if (this.form.currentStep === 2) {
                        this.form.progressBar.scaleX = 0.75;
                    }
                }

                if (this.briefLength(this.products[this.form.currentValue]) === 3) {

                    if (this.form.currentStep === 1) {
                        this.form.progressBar.scaleX = 0.66666;
                    }
                }

                if (this.form.currentStep === 3) {
                    this.form.progressBar.scaleX = 0.93;
                }

                if (window.innerWidth < 768) {
                    animateScrollTo(0, {
                        element: this.$refs.form
                    });
                }
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
                this.statusComplete = true;
                // setTimeout( () => {
                    this.$emit('onCloseBrif',false);
                    this.form.send = false;
                // },300);

                // setTimeout( () => {
                    this.form.steps.one = null;
                    this.form.steps.two = [];
                    this.form.steps.three = [];

                    this.statusComplete = false;
                    this.form.currentStep = 0;

                    this.form.progressBar.scaleX = 0.25;
                    this.form.progressBar.scaleY = 1;

                    this.form.inputs.name.error = false;
                    this.form.inputs.name.value = '';
                    this.form.inputs.email.error = false;
                    this.form.inputs.email.value = '';
                    this.form.inputs.phone.error = false;
                    this.form.inputs.phone.value = '';
                    this.form.inputs.message.value = '';

                    this.form.inputs.variant.stepTwo.value = '';
                    this.form.inputs.variant.stepTwo.status = false;
                    this.form.inputs.variant.stepThree.value = '';
                    this.form.inputs.variant.stepThree.status = false;
                // },301);

                scrollLock.show();
            },

            clickOnClose(e) {
                if(this.hasClass(e.target,'show')){
                    this.closePopup()
                }
            },

            hasClass(element, className) {
                var rx = new RegExp('(?:^| )' + className + '(?: |$)');
                return rx.test(element.className);
            },

            onSizeTablet() {
                if (typeof window !== 'undefined') {
                    if (window.innerWidth >= 768) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },
        watch: {
            status: function (newValue,oldValue) {
                if (newValue) {
                    scrollLock.hide('brif');
                    this.listHeight = this.$refs['step0'].offsetHeight;
                    window.addEventListener('click', this.clickOnClose);
                    window.addEventListener('keydown',this.closePopupOnEsc);
                } else {
                    scrollLock.show('brif');
                    window.removeEventListener('keydown',this.closePopupOnEsc);
                    window.removeEventListener('click',this.clickOnClose);
                }
            },
            'form.send': function (newValue,oldValue) {
                if (newValue) {
//                    this.form.responseHeight = this.$refs.list.scrollHeight + 'px';

                    scrollLock.hide();
                    setTimeout(() => {
                        this.form.progressBar.scaleY = 0;
                    },600)
                }
            }
        },
        mounted: function () {
            this.listHeight = this.$refs['step' + this.form.currentStep].offsetHeight;
            this.isTablet = this.onSizeTablet();
            window.addEventListener('resize', this.onSizeTablet);
        },
        destroyed: function () {
            window.removeEventListener('resize', this.onSizeTablet);
        },
        components: {
            'input-component': Input,
            'textarea-component': Textarea
        }
    }
</script>

