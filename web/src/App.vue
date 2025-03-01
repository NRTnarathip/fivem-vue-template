<script setup lang="ts">
import { onMounted } from "vue";
import { isOnFiveM } from "./NuiTool";

onMounted(() => {
	console.log("Hello World");
});
</script>

<template>
	<div id="appBackgroundTester" v-if="!isOnFiveM"></div>

	<div id="app"></div>
</template>

<style src="./App.css" />
