<template>
	<div class="mask" @click="onMask" @touchmove.prevent></div>
</template>

<script type="text/javascript">
	export default {
		methods: {
			onMask() {
				this.$emit('Mask')
			}
		}
	}
</script>

<style type="text/css">
	.mask {
		position: fixed;
		top:0;
		left: 0;
		background: rgba(0,0,0,.5);
		width: 100%;
		height: 100%;
		z-index: 12;
	}
</style>
