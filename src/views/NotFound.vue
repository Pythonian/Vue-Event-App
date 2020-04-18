<template>
	<div>
		<h2>Oops! Page Not Found</h2>
		<h3>The {{ resource }} you're looking for is not here.</h3>
		<router-link :to="{ name: 'event-list' }">Back Home</router-link>
	</div>
</template>

<script>
export default {
	props: {
		resource: {
			type: String,
			required: true
		}
	}
}
</script>