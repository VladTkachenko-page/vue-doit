<template>
  <div class="action">
    <div class="action__code">
      <span class="action_code">Success</span>
      <div class="action__text">
        <span> Your email has been verified <br /> </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, applyActionCode } from "firebase/auth";

export default {
  async mounted() {
    const mode = this.$route.query.mode;

    // Get the one-time code from the query parameter.
    const actionCode = this.$route.query.oobCode;

    // Configure the Firebase SDK.
    // This is the minimum configuration required for the API to be used.

    const auth = await getAuth();

    // Handle the user management action.
    switch (mode) {
      case "resetPassword":
        // Display reset password handler and UI.
        // handleResetPassword(auth, actionCode, continueUrl, lang);
        break;
      case "recoverEmail":
        // Display email recovery handler and UI.
        // handleRecoverEmail(auth, actionCode, lang);
        break;
      case "verifyEmail":
        // Display email verification handler and UI.
        await handleVerifyEmail(auth, actionCode);
        break;
      default:
      // Error: invalid mode.
    }
    async function handleVerifyEmail(auth, actionCode) {
      // Localize the UI to the selected language as determined by the lang
      // parameter.
      // Try to apply the email verification code.
      await applyActionCode(auth, actionCode)
        .then((resp) => {
          console.log("resp: ", resp);
        })
        .catch((error) => {
          console.log("error: ", error);
          // Code is invalid or expired. Ask the user to verify their email address
          // again.
        });
    }
  },
};
</script>

<style scoped>
.action {
  width: 100%;
  height: 77vh;
  margin-top: 25px;
  font-family: "Roboto";
  font-style: normal;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background: rgb(15, 18, 21);
  background: linear-gradient(
    180deg,
    rgba(20, 114, 255, 0) 0%,
    rgba(20, 114, 255, 1) 100%
  );
}

.action__code {
  font-weight: bold;
  font-size: 60px;
  line-height: 100%;
  text-align: center;
  color: #ffffff;
}

.action__text {
  font-weight: 700;
  font-size: 30px;
  line-height: 130%;
  text-align: center;
  color: #0f1215;
  padding: 20px;
}

@media (min-width: 769px) {
  .action {
    margin: 0 auto;
    font-family: "Roboto";
    font-style: normal;
    display: flex;
    flex-flow: row-reverse nowrap;
    justify-content: center;
    align-items: center;
    background: rgb(15, 18, 21);
  }

  .action__code {
    font-weight: bold;
    font-size: 116px;
    line-height: 100%;
    background: rgba(0, 212, 255, 1);
    background: linear-gradient(
      270deg,
      rgba(20, 114, 255, 0) 0%,
      rgba(20, 114, 255, 1) 100%
    );
    padding-top: 109px;
  }

  .action__text {
    font-family: "Roboto";
    font-weight: normal;
    font-size: 30px;
    line-height: 130%;
    text-align: left;
    padding: 128px 80px;
    border: 1px solid rgba(9, 9, 121, 1);
    border-image: linear-gradient(to right, #0a68f5 10%, transparent 90%);
    border-image-slice: 1;
  }
}
</style>
