<template>
<transition name="drop">
	<div class="dialog-wrap" v-show="visible">
		<div class="dialog-box">
			<div class="dialog-header">
				<span class="dialog-title">{{dailog_title}}</span>
			</div>
			<div class="dialog-body">
				<p>恭喜您成功领取<span>{{dailog_Msg}}</span></p>
			</div>
			<div class="dialog-footer">
				<div @click="closedailog()">关闭</div>
				<div @click="goproduct()">立即使用</div> 
			</div>
		</div>
	</div>
</transition>
</template>
<script>
export default {
	data() {
		return {
			
		}
	},
	props: ['visible','dailog_title','dailog_Msg','closedailog'],
	methods: {
		goproduct:function(){
			 this.$emit('goproduct')
		},
	},
	computed: {
		
	}
}	

</script>

<style lang="scss">
@import '../../common/css/sass.scss';
.dialog-wrap{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background:rgba(0,0,0,0.5);overflow: auto;z-index: 998;
	.dialog-box{width: 74.67%; position: fixed; left: 50%;  top: 50%;-webkit-transform: translate3d(-50%,-50%,0);transform: translate3d(-50%,-50%,0);background: $base_bg_fff;	border-radius: 0.2rem;	text-align: center;	line-height: 1;	overflow: hidden;	z-index: 999;}
	.dialog-header{padding-top: 0.5rem;}
	.dialog-title{font-size: 0.36rem;color:$base_color_333;}
	.dialog-body{margin-top: 0.4rem;
		p{font-size: 0.3rem;color:$base_color_999;
			span{color: $base_color_price_tip;}
		}
	}
	.dialog-footer{margin-top: 0.4rem;border-top:0.02rem solid $base_border_f3; display: flex; justify-content: space-between;
		div{flex: 1; text-align: center; padding: .25rem 0}
		div:first-child{border-right:.02rem solid $base_border_f3; background: $base_bg_f8}
		div:last-child{background: $base_color_price_tip; color: $base_color_fff;}
	}

}	

</style>