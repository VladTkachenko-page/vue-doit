<template>
  <swiper
    :modules="modules"
    :slides-per-view="swiperOptions.slidesPerView"
    :space-between="swiperOptions.spaceBetween"
    :pagination="{ clickable: true }"
    :breakpoints="swiperOptions.breakpoints"
    :autoplay="swiperOptions.autoplay"
    @swiper="onSwiper"
    class="default-slider__items"
  >
    <slot name="slide"></slot>
  </swiper>
</template>
<script>
// import Swiper core and required modules
import { Pagination, A11y, Autoplay } from "swiper";

// Import Swiper Vue.js components
import { Swiper } from "swiper/vue/swiper-vue";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

// Import Swiper styles
export default {
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 10,
        autoplay: {
          delay: 5000,
        },
        breakpoints: {
          1250: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 30,
          },
          750: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 5,
          },
        },
      },
    };
  },
  components: {
    Swiper,
  },
  setup() {
    return {
      modules: [Pagination, A11y, Autoplay],
    };
  },
};
</script>

<style>
.default-slider__items {
  cursor: pointer;
  padding-bottom: 50px;
}

.swiper-pagination-bullet {
  background: #20272e;
  width: 12px;
  height: 17px;
  border-radius: 0;
  bottom: 0;
}
.swiper-pagination-bullet-active {
  background-color: #4f5f70;
}
</style>
