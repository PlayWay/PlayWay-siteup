<template lang="pug">
    include ../../tools/mixins.pug

    +b.services#services
        +e.container.container
            +e.title.trigger Услуги
            +e.list
                +e.item.service__(v-for="service in services")
                    +e.img.trigger
                        img(:src="service.img")
                    +e.title.trigger {{ service.title }}
                    +e.text.trigger {{ service.text }}
                    +e.UL.list.trigger
                        +e.LI.item.trigger(v-for="item in service.list") • {{ item }}
</template>

<script>
    import constants from '../../../content/constants.json';

    export default {
        data() {
            return {
                services: [
                    {
                        img: '/public/media/images/services/development.svg',
                        title: 'Разработка',
                        text: 'Строим четкие задачи и анализируем бизнес клиента, чтобы создать полезный продукт',
                        list: ['сайты','мобильные приложения','информационные порталы','сервисы']
                    },
                    {
                        img: '/public/media/images/services/design.svg',
                        title: 'Дизайн',
                        text: 'Решаем логические задачи с помощью удобного интерфейса и создаем сильные брендинг-идеи любых продуктов',
                        list: ['брендирование','UX-аналитика','UI-дизайн','моделирование','продуктовый дизайн']
                    },
                    {
                        img: '/public/media/images/services/marketing.svg',
                        title: 'Маркетинг',
                        text: 'Выстраиваем стратегию рекламы так, чтобы приводить настоящих клиентов, а не посетителей',
                        list: ['поисковая оптимизация','контекстная реклама','контент-маркетинг','стратегия продвижения','SMM','аналитика']
                    },
                    {
                        img: '/public/media/images/services/support.svg',
                        title: 'Поддержка',
                        text: 'Ведем проекты и внедряем сервисы, помогающие увеличивать продажи и сокращать расходы',
                        list: ['CRM-системы','корпоративные порталы','call-track системы','dash-борды','серверное обслуживание','интеграции']
                    },
                    {
                        img: '/public/media/images/services/commerce.svg',
                        title: 'E-commerce',
                        text: 'Правильно представляем ваши товары и услуги в интернете',
                        list: ['интернет-магазины','онлайн-банкинг','системы продаж','защита информации','работа с каталогами']
                    },
                ]
            }
        },
        created(){

        },
        destroyed(){

        },
        mounted(){

        },
        methods: {

        },
        components: {
        }
    };
</script>