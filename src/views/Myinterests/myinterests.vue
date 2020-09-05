<template>
  <div class="interestsDiv">
    <HeaderName :titleName="title" :headFlag='headFlag'></HeaderName>
    <ul class="interestsMsgBox">
      <li v-for="item in hotquanlist" @click="goproduct(item.goodsId)">
        <div>
          <span class="interesImg"><img :src="item.goodsPicture" alt=""></span>
        </div>
        <div>
          <p class="interesName">{{item.goodsName}}</p>
          <p class="interesMember"><span>会员专享</span></p>
          <div class="interesPrice">
            <div>多店通用</div>
            <div>¥{{item.goodsPrice}} <span><em>¥</em>{{item.goodsPrice}}</span></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  import HeaderName from '@/base/Head/head'
  import {headershowWx} from '@/common/js/common.js'
  export default {
    name: 'myinterests',
    data () {
      return {
        title:"热门权益",
        hotquanlist:[],
        headFlag:false
      }
    },
    components: {
      HeaderName
    },
    created(){
      this.hotquanyi()
      if(!headershowWx()){
        this.headFlag = true;
      }
    },
    methods:{
      hotquanyi:function(){//热门权益
        this.axios({
           method:'post',
            url: '/mercury/gift/goodsList',
            data:{"hotTag":1},
            // headers: {"X-REQUESTED-SO-TOKEN": localStorage.getItem(localStorage.getItem('CHANNEL') + "_loginToken")}
        })
          .then((res)=>{
           this.hotquanlist = res.data.result
            console.log(this.hotquanlist)
          })
          .catch((error)=>{
            console.log(error)
          })
      },
      goproduct: function (goodsId) {
        this.$router.push({name:'product',params:{id:goodsId}})
      }

    }
  }
</script>

<style type="text/css">
  .interestsDiv{
    position: relative;
    width:100%;
    height:100%;
    background: #f8f8f8;
    min-height: 13rem;
  }
  .interestsDiv .interestsMsgBox{
    padding-top: .1rem;
  }
  .interestsDiv .interestsMsgBox li{
    display: flex;
    justify-content: flex-start;
    padding: .2rem .2rem;
    position: relative;
    background: #fff;
    margin: .33rem;
    border-radius: .1rem;
    overflow: hidden;
  }
  .interestsDiv .interestsMsgBox li .interesImg{
    display: block;
    background: #ddd;
    width:1.5rem;
    height: 1.5rem;
    margin-right: .2rem;
    overflow: hidden;
    border-radius: .05rem;
  }
  .interestsDiv .interestsMsgBox li .interesImg img{
    width: 100%;
  }
  .interestsDiv .interestsMsgBox li .interesName{
    font-size: .3rem;
    font-weight: bold;
    color: #333;
    width: 4.7rem;
  }
  .interestsDiv .interestsMsgBox li .interesMember span{
    display: inline-block;
    color: #956010;
    border:solid 0.02rem #956010;
    margin: .1rem 0;
    font-size: .22rem;
    padding: .02rem .1rem;
    border-radius: .05rem;
  }
  .interestsDiv .interestsMsgBox li .interesPrice{
    padding-top: .1rem;
    color: #999;
    font-size: .24rem;
    display: flex;
    justify-content: space-between;
  }
  .interestsDiv .interestsMsgBox li .interesPrice span{
    font-size: .34rem;
    color: #956010;
    font-weight: bold;
  }
  .interestsDiv .interestsMsgBox li .interesPrice span em{
    display: inline-block;
    margin: 0 .05rem 0 .1rem;
    font-size: .26rem;
  }
</style>
