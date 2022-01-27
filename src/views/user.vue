<template>
  <UserLayout>
    <div class="profile">
      <div class="profile__table">
        <p class="profile__title white">Profile</p>
        <table>
          <tbody>
            <tr>
              <td class="gray">ID</td>
              <td class="white">{{ getUser.id }}</td>
            </tr>
            <tr>
              <td class="gray">Name</td>
              <td class="white">{{ getUser.name }}</td>
            </tr>
            <tr>
              <td class="gray">Nickname</td>
              <td class="white">{{ getUser.login }}</td>
            </tr>
            <tr>
              <td class="gray">With us from</td>
              <td class="white">{{ getUser.dateRegistration }}</td>
            </tr>
            <tr>
              <td class="gray">Sex / Age</td>
              <td class="white">{{ getUser.sex }} / {{ getUser.age }}</td>
            </tr>
            <tr>
              <td class="gray">Nationality</td>
              <td class="white">{{ getUser.country }}</td>
            </tr>
            <tr>
              <td class="gray">Country</td>
              <td class="white">{{ getUser.country }}</td>
            </tr>
            <tr>
              <td class="gray">Web-site</td>
              <td class="white">
                <a target="_blank" class="white" :href="8"> 8 </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="profile__awards">
        <p class="profile__title white">Level and awards</p>
        <div
          class="progress-bar"
          v-for="item in getUser.results"
          :key="item.gameName"
          :style="{ color: item.gameColor }"
        >
          <p>
            {{ item.gameName }} <span>{{ item.value }}</span>
          </p>
          <div class="game-bar">
            <div class="scale"></div>
            <div
              :style="{
                background: item.gameColor,
                width: (item.value * 100) / 20 + '%',
              }"
              class="rate"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>

<script>
import UserLayout from "@/layouts/UserLayout.vue";
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["getUser"]),

  data() {
    return {
    };
  },

  components: {
    UserLayout,
  },

  async mounted(){
  }
};
</script>

<style scoped>
.profile {
  display: flex;
  gap: 80px;
  justify-content: center;
}
.profile__title {
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.profile__table tr {
  font-weight: 300;
  font-size: 16px;
  line-height: 100%;
  height: 32px;
}
.profile__table tr td {
  font-weight: 300;
  font-size: 16px;
  line-height: 100%;
  width: 160px;
}
.profile__awards {
  width: 100%;
  min-width: 320px;
}
.progress-bar {
  position: relative;
  height: 30px;
  margin-top: 2rem;
}
.progress-bar p span {
  float: right;
}
.progress-bar .game-bar .scale {
  position: absolute;
  bottom: 1px;
  left: 0;
  height: 2px;
  width: 100%;
  background: #2b353f;
}
.progress-bar .game-bar .rate {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 0;
  background: white;
  border-radius: 2px;
  z-index: 1;
}
@media (max-width: 900px) {
  .profile {
    flex-direction: column;
  }
}
</style>
