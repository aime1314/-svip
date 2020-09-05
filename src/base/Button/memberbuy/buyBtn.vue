<template>
  <div class="buybuttonBox">
    <div  class="indexBtn" @click="shopping()">
      立即支付{{memberMoney}}元
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'indexbutton',
    data() {
      return{
      }
    },
    props:['memberMoney'],
    methods:{
      shopping:function(){
        this.$emit('shopping')
      }
    }
  }
</script>
<style>
  .buybuttonBox{
    position: fixed;
    width:100%;
    left:0;
    bottom:0;
    background: #fff;
    height:1.2rem;
    padding-top:.3rem;
  }
  .buybuttonBox .indexBtn{
    display: block;
    /*! autoprefixer: off */
    background-image: -webkit-linear-gradient(right,#000,#000);
    /* autoprefixer: on */
    background-image: -moz-linear-gradient(right,#000,#000);
    background-image: -o-linear-gradient(right,#000,#000);
    background-image: linear-gradient(right,#000,#000);
    width: 92%;
    padding: .25rem 0;
    border-radius: .6rem;
    text-align: center;
    color: #e7b474;
    margin: 0 auto;
    font-size:.28rem;
  }
</style>
