<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { isOnFiveM, RegisterNUIAction, TriggerNUICallback } from "./NUITool";
import { StartTester } from "./AppTester";
import { NUIAction } from "./NUIAction";
import { NUICallback } from "./NUICallback";
import { ResolvePublicPath } from "./Utils";
import { appConfig } from "./AppConfig";

appConfig.Init();

const message = ref("Hello Human");
RegisterNUIAction(NUIAction.Hello, (data: any) => {
	message.value = data.msg;
});

const GetImageSpongebob = computed(() => {
	return ResolvePublicPath("img/sp.jpg");
});

onMounted(async () => {
	await TriggerNUICallback(NUICallback.WebReady);
	//ready

	message.value = await TriggerNUICallback(NUICallback.GetHelloMessage);

	if (!isOnFiveM) {
		StartTester();
	}
});
</script>

<template>
	<div id="appBackgroundTester" v-if="!isOnFiveM"></div>

	<div id="app">
		<div id="hello">
			<div>{{ message }}</div>
			<img :src="GetImageSpongebob" />
		</div>
	</div>
</template>

<style>
@import url("App.scss");
</style>
