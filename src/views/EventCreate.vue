<template>
  <div>
    <h3>Create an Event</h3>
    <form @submit.prevent="createEvent">

      <BaseSelect label="Select a Category" v-model="event.category" :options="categories" class="field" />
      
      <h3>Name & describe your event</h3>
      <BaseInput label="Title" v-model="event.title" type="text" placeholder="Title" class="field" />

      <BaseInput label="Description" v-model="event.description" type="text" placeholder="Description" class="field" />

      <h3>Where is your event?</h3>
      <BaseInput label="Location" v-model="event.location" type="text" placeholder="Location" class="field" />

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <BaseSelect label="Select a time" v-model="event.time" :options="times" class="field" />

      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(),
      times,
      categories: this.$store.state.categories
    }
  },
  methods: {
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          // redirect to the created event
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEvent()
        })
        .catch(() => {
          // End progress bar when there's an error
          NProgress.done()
        })
    },
    createFreshEvent() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
