<template>
  <div class="leagues">
    <nuxt-child />
    <div class="leagues__top">
      <div class="leagues__title title">{{ game }}: Leagues</div>
      <div class="leagues__logo">
        <img :src="icon" alt="" />
      </div>
    </div>
    <div class="leagues__wrap">
      <default-slider class="leagues__items">
        <template v-slot:slide>
          <swiper-slide class="leagues__item">
            <div class="leagues-card">
              <img
                class="leagues-card__img"
                src="https://zikurat.media/wp-content/uploads/2020/06/8c24fb6f5bd097233f2f84273cedff5a.jpg"
                alt=""
              />
              <div class="leagues-card__wrap">
                <div class="leagues-card__title">
                  CS:GO <br />
                  Europe League
                </div>
                <div class="leagues-card__items">
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Start</div>
                    <div class="leagues-card__item-text">07/06</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">End</div>
                    <div class="leagues-card__item-text">07/06</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Mode</div>
                    <div class="leagues-card__item-text">1v1</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Slots</div>
                    <div class="leagues-card__item-text">16/30</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Pool</div>
                    <div class="leagues-card__item-text">$ 1500</div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="leagues__item">
            <div class="leagues-card">
              <img
                class="leagues-card__img"
                src="https://zikurat.media/wp-content/uploads/2020/06/8c24fb6f5bd097233f2f84273cedff5a.jpg"
                alt=""
              />
              <div class="leagues-card__wrap">
                <div class="leagues-card__title">
                  CS:GO <br />
                  Europe League
                </div>
                <div class="leagues-card__items">
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Start</div>
                    <div class="leagues-card__item-text">07/06</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">End</div>
                    <div class="leagues-card__item-text">07/06</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Mode</div>
                    <div class="leagues-card__item-text">1v1</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Slots</div>
                    <div class="leagues-card__item-text">16/30</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Pool</div>
                    <div class="leagues-card__item-text">$ 1500</div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="leagues__item">
            <div class="leagues-card">
              <img
                class="leagues-card__img"
                src="https://zikurat.media/wp-content/uploads/2020/06/8c24fb6f5bd097233f2f84273cedff5a.jpg"
                alt=""
              />
              <div class="leagues-card__wrap">
                <div class="leagues-card__title">
                  CS:GO <br />
                  Europe League
                </div>
                <div class="leagues-card__items">
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Start</div>
                    <div class="leagues-card__item-text">07/06</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">End</div>
                    <div class="leagues-card__item-text">07/06</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Mode</div>
                    <div class="leagues-card__item-text">1v1</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Slots</div>
                    <div class="leagues-card__item-text">16/30</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Pool</div>
                    <div class="leagues-card__item-text">$ 1500</div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide class="leagues__item">
            <div class="leagues-card">
              <img
                class="leagues-card__img"
                src="https://zikurat.media/wp-content/uploads/2020/06/8c24fb6f5bd097233f2f84273cedff5a.jpg"
                alt=""
              />
              <div class="leagues-card__wrap">
                <div class="leagues-card__title">
                  CS:GO <br />
                  Europe League
                </div>
                <div class="leagues-card__items">
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Start</div>
                    <div class="leagues-card__item-text">07/06</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">End</div>
                    <div class="leagues-card__item-text">07/06</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Mode</div>
                    <div class="leagues-card__item-text">1v1</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Slots</div>
                    <div class="leagues-card__item-text">16/30</div>
                  </div>
                  <div class="leagues-card__item">
                    <div class="leagues-card__item-title">Pool</div>
                    <div class="leagues-card__item-text">$ 1500</div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </template>
      </default-slider>
      <!-- <div class="leagues__not-found" v-else>Leagues not found!</div> -->
      <router-link class="leagues__more" :to="`/leagues/${game}/more`"
        >More</router-link
      >
      <div class="leagues__news-title">News</div>
    </div>
  </div>
</template>

<script>
import DefaultSlider from "@/components/default/DefaultSlider.vue";
import { SwiperSlide } from "swiper/vue/swiper-vue";

export default {
  data() {
    return {
      game: "",
      leagues: [],
      news: [],
    };
  },
  components: {
    DefaultSlider,
    SwiperSlide,
  },

  mounted() {
    this.game = this.$attrs.game;
    console.log("this.game: ", this.game);
  },
};
</script>

<style scoped>
.leagues__news-title {
  font-size: 23px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 56px;
}
.leagues__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #fff;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.leagues__logo img {
  max-height: 80px;
}
.leagues__wrap {
  position: relative;
}
.leagues__not-found {
  color: #b83333;
  text-align: center;
  margin: 50px 0;
  font-size: 30px;
  font-weight: 500;
}
.leagues__more {
  position: absolute;
  right: 0;
  text-transform: uppercase;
  font-size: 23px;
  font-weight: 700;
  line-height: 56px;
  margin-top: -10px;
  text-decoration: none;
  color: #fff;
}
.leagues__news-title {
  margin-top: 30px;
  color: #fff;
}
.leagues-card {
  background-color: #151a1f;
  max-width: 370px;
  cursor: pointer;
  color: #fff;
}
.leagues-card__img {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  width: 100%;
}
.leagues-card__wrap {
  padding: 30px 22px;
}
.leagues-card__title {
  font-size: 22px;
  font-weight: 500;
  color: #e6e8eb;
  margin-bottom: 30px;
}
.leagues-card__items {
  display: flex;
  justify-content: space-between;
}
.leagues-card__item {
  text-align: center;
}
.leagues-card__item-title {
  color: #8996a3;
  line-height: 16px;
  text-align: left;
}
@media (max-width: 750px) {
  .leagues-card {
    margin: 0 auto;
  }
}
@media (max-width: 500px) {
  .leagues-card__wrap {
    padding: 15px 11px;
  }
}
</style>
