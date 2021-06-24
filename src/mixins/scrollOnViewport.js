export const scrollOnViewport = {
    methods: {
        isElementInViewport(el) {
            let rect = el.getBoundingClientRect();
            return (
                rect.top - 90 <= window.innerHeight
            );
        },
        onScroll() {
            let triggers = document.querySelectorAll('.trigger'),
                triggersLength = triggers.length;

            for (let i = 0; i < triggersLength; i++) {
                if (this.isElementInViewport(triggers[i])) {
                    triggers[i].classList.add('animated')

                    setTimeout(() => {
                        triggers[i].classList.remove('animated');
                        triggers[i].classList.remove('trigger');
                    },1800)
                }
            }
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