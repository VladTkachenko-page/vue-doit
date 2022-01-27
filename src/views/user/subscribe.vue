<template>
  <UserLayout>
    <div class="subscribe">
      <h2 class="title">Premium</h2>
      <div class="subscribe__items">
        <form class="subscribe__item free" @submit.prevent="submit('free')">
          <div class="subscribe__item-title">FREE</div>
          <div class="subscribe__item-price">$0 per month</div>
          <p class="subscribe__item-description">
            A night to remember for Brazil. Drama is never too far away at Copa
            America and this final had it by the bucketlad. Thanks for your
            company. A night to remember for Brazil. Drama is never too far away
            at Copa America and this final had it by the bucketlad. Thanks for
            your company.
          </p>
          <MainButtons
            class="primary subscribe__item-btn"
            v-if="getUser.subscribe !== 'free'"
          >
            Sign up</MainButtons
          >
          <div class="subscribe__active subscribe__item-title" v-else>
            <p>Active</p>
          </div>
        </form>
        <form class="subscribe__item pro" @submit.prevent="submit('pro')">
          <div class="subscribe__item-title">PRO</div>
          <div class="subscribe__item-price">$5 per month</div>
          <p class="subscribe__item-description">
            A night to remember for Brazil. Drama is never too far away at Copa
            America and this final had it by the bucketlad. Thanks for your
            company. A night to remember for Brazil. Drama is never too far away
            at Copa America and this final had it by the bucketlad. Thanks for
            your company.
          </p>
          <MainButtons
            class="primary subscribe__item-btn"
            v-if="getUser.subscribe !== 'pro'"
          >
            Sign up</MainButtons
          >
          <div class="subscribe__active subscribe__item-title" v-else>
            <p>Active</p>
          </div>
        </form>
        <form
          class="subscribe__item organizer"
          @submit.prevent="submit('organizer')"
        >
          <div class="subscribe__item-title">Organizer</div>
          <div class="subscribe__item-price">$15 per month</div>
          <p class="subscribe__item-description">
            A night to remember for Brazil. Drama is never too far away at Copa
            America and this final had it by the bucketlad. Thanks for your
            company. A night to remember for Brazil. Drama is never too far away
            at Copa America and this final had it by the bucketlad. Thanks for
            your company.
          </p>
          <MainButtons
            class="primary subscribe__item-btn"
            v-if="getUser.subscribe !== 'organizer'"
          >
            Sign up</MainButtons
          >
          <div class="subscribe__active subscribe__item-title" v-else>
            <p>Active</p>
          </div>
        </form>
      </div>
    </div>
  </UserLayout>
  <modal v-if="showModal" @close="showModal = false">
    <template v-slot:header>
      <h1>Change subscribe</h1>
    </template>
    <template v-slot:body>
      <p>Your subscribe {{ getUser.subscribe }}.</p>
      <p>Are you sure you want to change the subscription to a {{ change }}?</p>
      <p>Cost: {{ price }}$ per month</p>
    </template>
    <template v-slot:footer>
      <div class="edit-team__btn" @click="showModal = false">
        <MainButtons class="secondary">No</MainButtons>
      </div>
      <div class="edit-team__btn" @click="subscribe">
        <MainButtons>Yes</MainButtons>
      </div>
    </template>
  </modal>
</template>

<script>
import { mapGetters } from "vuex";
import UserLayout from "@/layouts/UserLayout.vue";
import MainButtons from "@/components/default/MainButtons.vue";
import { getDatabase, ref, update } from "firebase/database";
import modal from "@/components/modal.vue";

export default {
  data() {
    return {
      showModal: false,
      change: "",
      price: 0,
    };
  },
  computed: mapGetters(["getUser"]),
  components: {
    UserLayout,
    modal,
    MainButtons,
  },
  methods: {
    async submit(type) {
      this.change = type;
      if (type === "pro") {
        this.price = 5
      } else if (type === "organizer") {
        this.price = 15
      } else {
        this.price = 0
      }
      this.showModal = true;
      if (this.getUser.subscribe === type) {
        return this.$toast.error(
          `You already have ${type[0].toUpperCase()}${type.slice(1)} subscribe`
        );
      }
    },
    async subscribe() {
      const db = getDatabase();
      try {
        switch (this.change) {
          case "free":
            await update(ref(db, "users/" + this.getUser.uid), {
              subscribe: this.change,
            });
            this.showModal = false;
            break;
          case "pro":
            if (this.getUser.eur < 5) {
              this.showModal = false;
              return this.$toast.error("You don't have enough money");
            }
            await update(ref(db, "users/" + this.getUser.uid), {
              eur: this.getUser.eur - 5,
            });
            await update(ref(db, "users/" + this.getUser.uid), {
              subscribe: this.change,
            });
            this.showModal = false;
            break;
          case "organizer":
            if (this.getUser.eur < 15) {
              this.showModal = false;
              return this.$toast.error("You don't have enough money");
            }
            await update(ref(db, "users/" + this.getUser.uid), {
              eur: this.getUser.eur - 15,
            });
            await update(ref(db, "users/" + this.getUser.uid), {
              subscribe: this.change,
            });
            this.showModal = false;
            break;
        }
      } catch (e) {
        return this.$toast.error(e);
      }
      this.$toast.success(
        `Now you have ${this.change[0].toUpperCase()}${this.change.slice(
          1
        )} subscribe`
      );
    },
  },
};
</script>

<style scoped>
.subscribe__items {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.subscribe__item {
  background: radial-gradient(
      250.9% 252.09% at -142.43% -152.09%,
      rgba(20, 114, 255, 0.35) 0%,
      rgba(20, 114, 255, 0) 129.9%
    ),
    #181b1f;
  padding: 100px 22px 36px;
  max-width: 280px;
  width: 100%;
}
.subscribe__item-title {
  color: #2788f6;
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 42px;
}
.subscribe__item-price {
  font-size: 22px;
  font-weight: 500;
  line-height: 100%;
  color: #f5f5f5;
  margin-bottom: 16px;
}
.subscribe__item-description {
  font-size: 14px;
  line-height: 150%;
  color: #67707a;
  margin-bottom: 60px;
}
.subscribe__active {
  font-size: 32px;
  opacity: 0.5;
}
.pro {
  background: radial-gradient(
      250.9% 252.09% at -142.43% -152.09%,
      rgba(245, 200, 31, 0.25) 0%,
      rgba(245, 200, 31, 0) 129.9%
    ),
    #181b1f;
}
.pro .subscribe__item-title {
  color: #ffd321;
}
.pro .subscribe__item-btn {
  background: linear-gradient(180deg, #ffd321 0%, #9c6c0d 100%);
}
.organizer {
  background: radial-gradient(
      242.43% 252.09% at -142.43% -152.09%,
      rgba(66, 232, 128, 0.3) 0%,
      rgba(66, 232, 128, 0) 129.9%
    ),
    #181b1f;
}
.organizer .subscribe__item-title {
  color: #46f48c;
}
.organizer .subscribe__item-btn {
  background: linear-gradient(180deg, #46f48c 0%, #2b9d37 100%);
}
@media (max-width: 1305px) {
  .subscribe__items {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
