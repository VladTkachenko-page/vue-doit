<template>
  <div class="news">
    <div class="news__header">
      <div class="news__header_title title">
        <h3>News</h3>
      </div>
      <div class="news__header_tabs">
        <Tabs
          :tabs="tabs"
          :active="this.newsActive"
          @selected="this.newsActive = $event"
        />
      </div>
    </div>
    <div class="news__wrap">
      <div
        class="news__item"
        v-for="(item, index) in showItems()"
        :key="index"
        :class="{ bigCard: index % 6 === 0 || index % 6 === 1 }"
      >
        <div class="news__item_image">
          <img :src="item.src" alt="" />
        </div>
        <div class="news__item_title">{{ item.title }}</div>
        <div class="news__item_info">
          {{ item.description }}
        </div>
      </div>
      <div class="news__none title" v-if="showItems().length === 0">
        News not found
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from "@/components/default/Tabs.vue";

export default {
  data() {
    return {
      newsActive: "All",
      tabs: [
        { name: "All" },
        { name: "StarCraft II" },
        { name: "Dota II" },
        { name: "CS:GO" },
        { name: "LOL" },
        { name: "Fortnite" },
      ],
      news: [
        {
          title: "LoL Doit 2022",
          description:
            "With Spring in sight, we're thrilled to welcome LG UltraGear as our Official Gaming Monitor Partner for the League of Legends European Championship 2022 and 2023 seasons, powering the stage with ultra-fast and high-performance gaming monitors in an exciting new partnership.",
          src: "https://i.ytimg.com/vi/0HeXp0cTxE0/maxresdefault.jpg",
        },
        {
          title: "Fortnite ify Tournament Ended",
          description:
            "The best ever tournament in Fortnite history ended! Winner are here!!!",
          src: "https://cdn2.unrealengine.com/Fortnite%2Fblog%2Fseason-x-blog%2F10BR_Announce_KeyArt_BlogHeader-1920x1080-aca2c821a0e9ece24d5545ce7171d58f76598013.jpg",
        },
        {
          title: "CS:GO Super hero Tournament!",
          description: "Kill them all!!!",
          src: "https://zikurat.media/wp-content/uploads/2020/06/8c24fb6f5bd097233f2f84273cedff5a.jpg",
        },
        {
          title: "Fortnite 5vs5",
          description:
            "Kill them all!!! Super puper duper  soonn. Best team allowed!",
          src: "https://cdn2.unrealengine.com/7up-v2-3840x2160-e11fc91a84d6.jpg",
        },
        {
          title: "Fortnite ify Tournament Ended",
          description:
            "The best ever tournament in Fortnite history ended! Winner are here!!!",
          src: "https://cdn2.unrealengine.com/Fortnite%2Fblog%2Fseason-x-blog%2F10BR_Announce_KeyArt_BlogHeader-1920x1080-aca2c821a0e9ece24d5545ce7171d58f76598013.jpg",
        },
        {
          title: "CS:GO 2022 Service Medal",
          description:
            "When you reach Global General (Rank 40), you’ll have the option to reset your Profile Rank and earn (or upgrade) a 2022 Service Medal. The 2022 Service Medal is an inspectable display item that will be visible wherever your avatar is shown.",
          src: "https://cdn.akamai.steamstatic.com/apps/csgo/images/blog/service_medal_2022.png",
        },
        {
          title: "Fortnite 5vs5",
          description:
            "Kill them all!!! Super puper duper  soonn. Best team allowed!",
          src: "https://cdn2.unrealengine.com/7up-v2-3840x2160-e11fc91a84d6.jpg",
        },
        {
          title: "Fortnite ify Tournament Ended",
          description:
            "The best ever tournament in Fortnite history ended! Winner are here!!!",
          src: "https://cdn2.unrealengine.com/Fortnite%2Fblog%2Fseason-x-blog%2F10BR_Announce_KeyArt_BlogHeader-1920x1080-aca2c821a0e9ece24d5545ce7171d58f76598013.jpg",
        },
      ],
    };
  },
  components: {
    Tabs,
  },

  computed: {
    filteredNews() {
      return this.filterArray(this.news, this.newsActive);
    },
  },

  methods: {
    filterArray(arr, keyword) {
      if (keyword === "All") return arr;
      return arr.filter((item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase())
      );
    },
    showItems() {
      return this.filteredNews;
    },
  },
};
</script>

<style scoped>
.news__header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.news__header_title {
  margin-right: 48px;
}
.news__wrap {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.news__item {
  overflow: hidden;
  background: #10171f;
  max-width: 288px;
  width: 100%;
  height: 490px;
  cursor: pointer;
}
.news__item_image {
  width: 100%;
  height: 240px;
}
.news__item_image img {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
}
.news__item_title {
  padding: 1rem;
  font-weight: bold;
  font-style: normal;
  font-size: 18px;
  line-height: 27px;
  color: #f5f5f5;
  opacity: 0.88;
}
.news__item_info {
  margin-top: 1rem;
  padding: 1rem;
  font-size: 16px;
  line-height: 150%;
  color: #67707a;
}
.bigCard {
  max-width: 600px;
  height: 328px;
}
.bigCard .news__item_image {
  width: 208px;
  height: 100%;
  float: left;
  margin-right: 1rem;
}
.bigCard .news__item_image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.bigCard .news__item_title {
  font-weight: bold;
  font-size: 22px;
  line-height: 130%;
  padding: 1rem;
  font-style: normal;
}
.bigCard .news__item_info {
  padding: 1rem;
  font-size: 16px;
  line-height: 150%;
  color: #5e656b;
}
.news__none {
  text-align: center;
}
@media (max-width: 1400px) {
  .bigCard {
    max-width: 100%;
  }
  .news__item {
    max-width: 48%;
  }
}
@media (max-width: 1200px) {
  .news__header {
    flex-direction: column;
  }
}
@media (max-width: 1100px) {
  .news__header {
    align-items: start;
    gap: 7px;
  }
  .news__item,
  .bigCard {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    height: 490px;
  }
  .bigCard .news__item_image {
    width: 100%;
    height: 300px;
  }
  .bigCard .news__item_image img,
  .news__item_image img {
    object-position: top;
  }
}
@media (max-width: 475px) {
  .news__item,
  .bigCard {
    height: 358px;
  }
  .bigCard .news__item_image,
  .news__item_image {
    width: 100%;
    height: 160px;
  }
}
</style>
