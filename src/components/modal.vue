<template>
  <div id="modal-template">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <img
              class="modal-close"
              src="../assets/img/exit.svg"
              alt=""
              @click="$emit('close')"
            />
            <header class="modal-header">
              <slot name="header"> default header </slot>
            </header>
            <main class="modal-body">
              <slot name="body"> default body </slot>
            </main>
            <footer class="modal-footer">
              <slot name="footer">
                <MainButtons class="modal-default-button">Send</MainButtons>
              </slot>
            </footer>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MainButtons from "@/components/default/MainButtons.vue";

export default {
  components: {
    MainButtons,
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 700px;
  margin: 0 auto;
  background-color: #0b1729;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(#0b1729, 0.33);
  transition: all 0.3s ease;
  position: relative;
  padding: 50px 20px;
  color: #fff;
  z-index: 9999;

}
.modal-close {
  width: 32px;
  height: 32px;
  right: 16px;
  top: 16px;
  cursor: pointer;
  position: absolute;
}

.modal-header {
  margin-top: 0;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 20px;
}

.modal-body {
  margin: 40px 0;
  text-align: center;
}
.modal-footer {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media (max-width: 1100px) {
  .modal-container {
    max-width: 250px;
    padding: 50px;
  }
  .modal-header {
    font-size: 14px;
  }
}
@media (max-width: 375px) {
  .modal-container {
    max-width: 150px;
    padding: 50px 80px;
  }
}
</style>
