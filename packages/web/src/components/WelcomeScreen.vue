<script>
export default {
  name: 'WelcomeScreen',
  data () {
    return {
      error: false,
      submitted: false,
      honeypot: '',
      haxor: false,
      form: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    encode (data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    submitEmailForm () {
      if (!this.honeypot) {
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.encode({
            'form-name': 'keebhoarder-interest',
            ...this.form
          })
        }).then((res) => {
          if (res.status === 200) {
            this.submitted = true
          } else {
            this.error = true
          }
        })
      } else {
        this.submitted = true
      }
    }
  }
}
</script>

<template>
  <div class="flex justify-center items-center flex-col h-full">
    <h1 class="text-theme-text text-4xl font-extrabold">Keebhoarder<span class="blink font-normal">|</span></h1>
    <h2 class="text-theme-text-alt text-lg font-semibold">securely manage your keyboard habit</h2>
    <form class="mt-6 p-4 bg-theme-bg rounded overflow-hidden relative w-72 flex flex-col" @submit.prevent="submitEmailForm" name="keebhoarder-interest" v-if="!submitted && !error">
      <h3 class="text-center mb-4 font-bold text-theme-link">Get launch updates</h3>
      <FormInput type="text" name="name" v-model="form.name" class="mb-2" required>First Name</FormInput>
      <FormInput type="email" name="email" v-model="form.email" class="mb-6" required>Email Address</FormInput>
      <FormInput type="text" name="birthday" v-model="honeypot" style="position: absolute !important;top: 9999px;">die robot scum</FormInput>
      <div class="w-full text-right">
        <keycap capStyle="large" theme="accent">&#10229; Keep me updated</keycap>
      </div>
    </form>
    <div class="mt-6 p-6 bg-accent-cap text-accent-legend rounded text-center font-bold" v-else-if="submitted">
      Form successfully submitted, we will let you know when we are ready!
    </div>
    <div class="mt-6 p-6 bg-accent-cap text-accent-legend rounded text-center font-bold" v-else-if="error">
      There was a problem submitting the form. We are working on that.
    </div>
  </div>
</template>

<style lang="css" scoped>
.blink {
  animation: 1s blink step-end infinite;
}

@keyframes blink {
  from, to {
    color: transparent;
  }
  50% {
    color: inherit;
  }
}
</style>
