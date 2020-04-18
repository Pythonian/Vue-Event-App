<template>
	<div>
		<h1>Uh-Oh!</h1>
		<h3>It looks like you're experiencing a network issue. Please try again.</h3>
		<router-link :to="{ name: 'event-list' }">Go to Homepage</router-link>
	</div>
</template>