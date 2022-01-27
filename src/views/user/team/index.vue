<template>
  <UserLayout>
    <div class="team">
      <h2 class="team__title title">My Team</h2>
      <div class="team__items">
        <div
          class="team__item"
          v-for="item in getUser.teams"
          :key="item.id"
          @click="this.$router.push(`/user/team/${item.id}`)"
        >
          {{ item.name }}
        </div>
        <div
          class="team__item"
          @click="this.$router.push(`/user/team/${new Date().getTime()}`)"
        >
          Create Team
        </div>
      </div>
    </div>
  </UserLayout>
</template>

<script>
import { mapGetters } from "vuex";
import UserLayout from "@/layouts/UserLayout.vue";

export default {
  computed: mapGetters(["getUser"]),
  components: {
    UserLayout,
  },
  async mounted() {
    await this.$store.dispatch("fetchTeam");

  }
};
</script>

<style scoped>
.team {
  width: 100%;
  color: #fff;
}
.team__title {
  text-align: center;
  margin-bottom: 40px;
}
.team__items {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 64px;
}
.team__item {
  padding: 30px 15px;
  min-width: 230px;
  border: 2px solid #20252b;
  font-size: 22px;
  font-weight: 700;
  line-height: 100%;
  text-align: center;
  cursor: pointer;
}
</style>
