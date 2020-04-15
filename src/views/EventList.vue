<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard />
    <BaseIcon />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
export default {
  // Register as a child component of EventList
  components: {
    EventCard
  }
}
</script>
