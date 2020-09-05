<template>
  <div class="probuttonBox">
    <div class="probuyPrice"><em>{{priceshow}}</em>元<span>{{coupontips}}</span></div>
    <div>
    <div class="propricebuy" @click="shopping()">
       立即购买
    </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'probuybutton',
    data() {
      return{

      }
    },
    props:['priceshow','coupontips'],
    methods:{
      shopping:function(){
        this.$emit('shopping')
      }
    }

  }
</script>
<style type="text/css">
  .probuttonBox{
    position: fixed;
    width:100%;
    left:0;
    bottom:0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    height:1.4rem;
    border-top: solid .05rem #f8f8f8;
    align-content: center;
    align-items: center;
  }
  .probuttonBox div{
    width:50%;
  }
  .probuttonBox div:last-child{
    text-align: center;
  }
  .probuttonBox .probuyPrice{
    color: #333;
    padding: 0 .3rem; white-space: nowrap;
  }
  .probuttonBox .probuyPrice em{
    font-size: .4rem;
    color:#956010;
    margin-right: .1rem;
  }
  .probuttonBox .probuyPrice span{
    color: #999;
    margin-left: .1rem;
    text-decoration: line-through;
    font-size: .22rem;
  }
  .probuttonBox .propricebuy{
    display: block;
    /*! autoprefixer: off */
    background-image: -webkit-linear-gradient(right,#000,#000);
    /* autoprefixer: on */
    background-image: -moz-linear-gradient(right,#000,#000);
    background-image: -o-linear-gradient(right,#000,#000);
    background-image: linear-gradient(right,#000,#000);
    width: 80%;
    padding: .2rem 0;
    border-radius: .6rem;
    text-align: center;
    color: #e7b474;
    margin: 0 auto;
    font-size:.32rem;
  }
</style>
