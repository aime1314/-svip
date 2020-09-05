<template>
	<div>
		<div class="tab">
			<ul class="tab-header">
				<li v-for="tab in tabList" :class="[tabIndex == tab.index ? 'active' : '']"  @click="changeTab(tab)">{{tab.name}}</li>
			</ul>
			<div class="tab-body">
				<slot name="tabcontent"></slot>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			tabList: Array,
			tabIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			changeTab(tab) {
				this.$emit('changeTab', tab)
			}
		}
	}
</script>

<style type="text/css" scoped="">
	.fund-info {
		padding: .6rem 0;
		background: #fff;
	}
	.tab-header {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.tab-header li {
		-webkit-box-flex: 1;
	    -ms-flex: 1 1 auto;
	    flex: 1 1 auto;
		height: .8rem;
		line-height: .8rem;
		background: #fff;
		font-size: .28rem;
		color: #999;
		text-align: center;
		position: relative
	}
	.tab-header li.active {
		color: #956010;
	}
	.tab-header li.active:before {
		content: "";
		position: absolute;
		width:36%;
		height: .04rem;
		background: #956010;
		left: 50%;
		margin-left: -18%;
		bottom: 0;
	}
	.tab-body {
		margin-top: .1rem;
	}
</style>