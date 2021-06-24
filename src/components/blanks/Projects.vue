<template lang="pug">
    include ../../tools/mixins.pug

    +b.projects#projects
        +e.wrapper(:class="{'active': list}")
            +e.A.item.trigger-img(
                v-for="item,index in items" :class="[item.modificator,{'show': casesStatus['case' + index].status, 'animated': casesStatus['case' + index].animated}]"
                ref="case"
                :href="item.link || null"
                :target="item.link !== '' ? '_blank' : null"
            )
                +e.DIV.content
                    +e.H2.title(:class="item.classTitle") {{ item.title }}
                    span {{ item.subTitle }}
                +e.DIV.img
                    img(:src="casesStatus['case' + index].src")
        +e.BUTTON.button.button(:class="{'active': !list}" type="button" v-on:click="list = true") Показать ещё
        +e.info
            h2.trigger Работаем с NDA-проектами, #[br]не боимся сложных задач #[br]и любим погружаться в продукт
            +e.block
                span.trigger 34
                p.trigger проекта
            +e.block
                span.trigger 6
                p.trigger лет опыта
</template>

<script>
    import {scrollOnViewport} from '../../mixins/scrollOnViewport'

    export default {
        mixins: [scrollOnViewport],
        data () {
            return {
                list: false,
                items:[
                    {
                        title: 'турист.рф',
                        subTitle: 'Разработка портала гостиничного бронирования турист.рф',
                        img: "/public/media/images/projects/tourist.jpg",
                        link: "https://xn--h1apebdc.xn--p1ai/",
                        classTitle: "projects__title--site",
                        modificator: "projects__item--turist",
                        ref: "case1"
                    },
                    {
                        title: 'gruzmotor.ru',
                        subTitle: 'Создание бренда грузового такси «Мотор» и сайта с онлайн-калькулятором',
                        img: "/public/media/images/projects/motor.jpg",
                        link: "http://gruzmotor.ru",
                        classTitle: "projects__title--site",
                        modificator: "projects__item--gruzmotor",
                        ref: "case5"
                    },
                    {
                        title: 'biopack.pro',
                        subTitle: 'Создание мультиязычного портала с разделением по двум направлениям',
                        img: "/public/media/images/projects/biopack.jpg",
                        link: "http://www.biopack.pro/",
                        classTitle: "projects__title--site",
                        modificator: "projects__item--biopack",
                        ref: "case3"
                    },
                    {
                        title: 'psb-sa.ru',
                        subTitle: 'Проведение промо-акции от Промсвязьбанка для открытия специальных счетов',
                        img: "/public/media/images/projects/PSB.jpg",
                        link: "http://psb-sa.ru",
                        classTitle: "projects__title--site",
                        modificator: "projects__item--psb",
                        ref: "case4"
                    },
                    {
                        title: 'евроком.рф',
                        subTitle: 'Создание фирменной айдентики компании «Евроком», сайта и сервиса для тестирования сотрудников',
                        img: "/public/media/images/projects/evrokom.jpg",
                        link: "http://xn--b1afqiibl.xn--p1ai/",
                        classTitle: "projects__title--site",
                        modificator: "projects__item--eurokom",
                        ref: "case2"
                    },
                    {
                        title: 'sprayer',
                        subTitle: 'Разработка логотипа и линейки продукции для аэрозольной краски',
                        img: "/public/media/images/projects/sprayer.jpg",
                        link: "",
                        classTitle: "",
                        modificator: "projects__item--sprayer",
                        ref: "case6"
                    },
                    {
                        title: 'rombico.ru',
                        subTitle: 'Разрабокта логотипа и сайта для ремонтно-строительной компании «Ромбико»',
                        img: "/public/media/images/projects/rombico.jpg",
                        link: "http://rombico.ru",
                        classTitle: "projects__title--site",
                        modificator: "projects__item--rombico",
                        ref: "case7"
                    },
                    {
                        title: 'greenline77.ru',
                        subTitle: 'Разработка бренда промышленного комплекса переработки орехов, сайта и сопутствующих продуктов ',
                        img: "/public/media/images/projects/GreenLine.jpg",
                        link: "http://greenline77.ru",
                        classTitle: "projects__title--site",
                        modificator: "projects__item--greenline",
                        ref: "case8"
                    },
                    {
                        title: 'tropic-sun.ru',
                        subTitle: 'Создание сайта для салона красоты',
                        img: "/public/media/images/projects/tropicsun.jpg",
                        link: "http://tropic-sun.ru",
                        classTitle: "projects__title--site",
                        modificator: "projects__item--tropic",
                        ref: "case9"
                    },
                    {
                        title: 'Буханка Бар',
                        subTitle: 'Разработка логотипа и фирменного стиля для бара на Таганке',
                        img: "/public/media/images/projects/buhanka.jpg",
                        link: "",
                        classTitle: "",
                        modificator: "projects__item--buhanka",
                        ref: "case10"
                    },
                    {
                        title: 'Макрос-М',
                        subTitle: 'Разработка логотипа и фирменного стиля для поставщика химической продукции',
                        img: "/public/media/images/projects/makros.jpg",
                        link: "",
                        classTitle: "",
                        modificator: "projects__item--makros",
                        ref: "case11"
                    },
                    {
                        title: 'new.telemaxima.ru',
                        subTitle: 'Проведение промо-акции от Телемаксимы для привлечения новых клиентов на франшизу',
                        img: "/public/media/images/projects/maxima.jpg",
                        link: "http://new.telemaxima.ru",
                        classTitle: "projects__title--site",
                        modificator: "projects__item--telemaxima",
                        ref: "case12"
                    }
                ],
                casesStatus: {
                    case0: {
                        status:false,
                        src: '',
                        animated: false
                    },
                    case1: {
                        status:false,
                        src: '',
                        animated: false
                    },
                    case2: {
                        status:false,
                        src: '',
                        animated: false
                    },
                    case3: {
                        status:false,
                        src: '',
                        animated: false
                    },
                    case4: {
                        status:false,
                        src: '',
                        animated: false
                    },
                    case5: {
                        status:false,
                        src: '',
                        animated: false
                    },
                    case6: {
                        status:false,
                        src: '',
                        animated: false
                    },
                    case7: {
                        status:false,
                        src: '',
                        animated: false
                    },
                    case8: {
                        status:false,
                        src: '',
                        animated: false
                    },
                    case9: {
                        status:false,
                        src: '',
                        animated: false
                    },
                    case10: {
                        status:false,
                        src: '',
                        animated: false
                    },
                    case11: {
                        status:false,
                        src: '',
                        animated: false
                    }
                }
            }
        },
        methods: {
            lazyLoadImg(el,index) {
                let img = el.querySelector('img');
                let imgP = new Image();
                imgP.src = this.items[index].img;
                imgP.onload = () => {
                    img.src = imgP.src;
                    setTimeout(() => {
                        this.casesStatus['case' + index].status = true;
                    }, 300)
                    this.casesStatus['case' + index].src = imgP.src;
                }
            },
            onScrollImg() {
                for (let i = 0; i < 12; i++) {
                    if (this.isElementInViewport(this.$refs.case[i])) {
                        this.lazyLoadImg(this.$refs.case[i],i);
                        this.casesStatus['case'+i].animated = true;
                    }
                }
            }
        },
        mounted() {
            this.onScrollImg();
            window.addEventListener('scroll',this.onScrollImg);
        },
        destroyed() {
            window.removeEventListener('scroll',this.onScrollImg)
        }
    }
</script>