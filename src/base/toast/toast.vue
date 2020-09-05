<template>
	<transition name="drop">
		<div class="kf-toast" v-if="toast_show">
			<span>{{toast_text}}</span>
		</div>
	</transition>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
                toast_text:"",
                toast_show:false
			}
        },
		methods: {
            
		}
	}
</script>

<style type="text/css">
    .kf-toast {
    position: fixed;
    width: 100%;
    text-align: center;
    left: 0;
    margin: 0 auto;
    top:50%;
    -webkit-transform:translate3d(0,-50%,0);
    transform:translate3d(0,-50%,0);
    z-index: 12;
    }
    .kf-toast span{
    display: inline-block;
    padding: .2rem;
    background: rgba(0,0,0,.5);
    border-radius: .08rem;
    color: #fff;
    font-size: .3rem;
    text-align: center;
    max-width: 80%;
    }
</style>
