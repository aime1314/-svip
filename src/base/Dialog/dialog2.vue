<template>
	<div class="dialog-wrap" v-show="visible" @click.self="handleWrapperClick" @touchmove.prevent>
		<div class="dialog-box" :style="style">
			<div class="dialog-header2">
				<span class="dialog-title">{{ title }}</span>
				<a v-if="isClose" class="close-btn--dialog" href="javascript:;" @click="popClose"><i class="nwd-icons nwd-icons-close_thin"></i></a>
			</div>
			<div class="dialog-body2">
				<slot></slot>
			</div>
			<div class="dialog-footer2" v-if="isFooter">
				<slot name="footer">
					
				</slot>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		visible: {
		    type: Boolean,
		    default: true
	    },
	    isClose: {
		    type: Boolean,
		    default: true
	    },
	    isFooter: {
		    type: Boolean,
		    default: true
	    },
		title: {
			type: String,
			default: "标题"
		},
		width: String,
		beforeClose: Function,
		appendToBody: {
	        type: Boolean,
	        default: false
	    },
	    closeOnClickModal: {
	        type: Boolean,
	        default: true
	    },
	},
	methods: {
		handleWrapperClick() {
	        if (!this.closeOnClickModal) return;
	        this.handleClose();
	    },
	    handleClose() {
	        if (typeof this.beforeClose === 'function') {
	        	this.beforeClose(this.hide);
	        } else {
	        	this.hide();
	        }
	    },
	    hide(cancel) {
	        if (cancel !== false) {
	          this.$emit('update:visible', false);
	          this.$emit('close');
	          this.closed = true;
	        }
	    },
	    popClose(){
	    	//this.visible = false;	
	    	this.$emit("popClose")
	    }
	},
	computed: {
		style(){
			let style = {};
			if (this.width) {
	        	style.width = this.width;
	        }
	        return style;
		}
	}
}	

</script>
<style>
.dialog-wrap{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background:rgba(0,0,0,0.5);
	overflow: auto;
	z-index: 998;
}	
.dialog-box{
	width: 74.67%;
	position: fixed;
	left: 50%;
	top: 50%;
	-webkit-transform: translate3d(-50%,-50%,0);	
	transform: translate3d(-50%,-50%,0);
	background: #fff;
	border-radius: 0.2rem;
	text-align: center;
	line-height: 1;
	overflow: hidden;
	z-index: 999;
}
.dialog-header2{
	height: 0.9rem;
	line-height: 0.9rem;
	border-bottom: 1px solid #e5e5e5;
	position: relative;
	font-size: .34rem;

}
.dialog-title2{
	font-size: 0.34rem;
	color: #333;
}
.close-btn--dialog{
	font-size: 0.34rem;
	color: #999;
	position: absolute;
	top: 50%;
	-webkit-transform:translateY(-50%);
	left: 0.3rem;
}
.dialog-body p{
	font-size: 0.3rem;
	color: #666;
}
.dialog-footer2{
	height: 0.9rem;
	line-height: 0.9rem;
	border-top: 1px solid #e5e5e5;
}
.dialog-btn{
	display: -webkit-box;
	display: -webkit-flex;
	display: box;
	display: flex;
	width: 100%;
	height: 0.9rem;
	line-height: 0.9rem;
	/*border-top: 1px solid #ececec;*/
}
.dialog-btn a{
	display: block;
	-webkit-box-flex:1;
	-webkit-flex:1;
	width: 0%;
	font-size: 0.34rem;
	border-left: 1px solid #ececec;
}
.dialog-btn a:first-child{
	border-left: 0;
}
.dialog-btn a.dialog-btn--primary{
	color: #0076FF;
}
.dialog-btn a.dialog-btn--minor{
	color: #333;
}
</style>