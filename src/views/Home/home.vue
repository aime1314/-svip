<template>
<div>
  <div :class="memberflag ? 'giftDiv home':'home'">
    <HeaderName :titleName="title" :headFlag='headFlag'></HeaderName>
    <Banner :actMoney="actMoney" :logoImg="logoImg" :logoTipsImg="logoTipsImg" :vipcard="vipcard" :update="update" :memberflag="memberflag"></Banner>
    <div class="listBox1">
      <div class="modeName">会员特权</div>
      <ul class="listMsg">
         <Homelist :memberlistmsg="memberlistmsg" :projectId="projectId" :memberflag="memberflag"></Homelist>
      </ul>
    </div>
    
    <div v-if="!memberflag">
      <Footer></Footer>
      <ButtonIndex :retailPrice="retailPrice"></ButtonIndex>
    </div>
    <router-view></router-view>
  </div>
</div>
</template>

<script type="text/javascript">
  import Banner from '@/base/Banner/banner'
  import Homelist from '@/base/Homelist/homelist'
  import Footer from '@/base/Footer/footer'
  import ButtonIndex from '@/base/Button/index/indexbutton'
  import noData from '@/base/Nodata/nodata'
  import HeaderName from '@/base/Head/head'
  import {getChannge,headershowWx} from '@/common/js/common.js'
export default {
  name: 'home',
  data () {
    return {
      title:'客乐芙超级会员',
      memberlistmsg:[],
      actMoney:"-",
      CHANNEL:'',
      projectId:"",
      logoImg:"",
      logoTipsImg: require('../../common/images/member.png'),
      retailPrice:"",
      vipcard:'-',
      update:'-',
      memberflag:false,
      headFlag:false,
      usermsg:null,
      projectType:null
    }
  },
  components: {
    Banner,
    Footer,
    ButtonIndex,
    noData,
    Homelist,
    HeaderName
  },
  created(){
    this.CHANNEL = getChannge('channel')
    localStorage.setItem("CHANNEL",this.CHANNEL)
    document.getElementById('app').style.paddingTop = '0rem'
    this.axios({
        method: 'post',
        url: '/yangjian/mem/heartBeat',
    })
      .then(res => {
          if(res.data.code == "100"){
              if(res.data.result.svipStatus == '1'){//已是会员
                  this.$store.commit('updateMemberInfo',res.data.result)
                  console.log(this.$store.state.memberinfo)
                  // localStorage.setItem("usermsg",res.data.result.acid + ' ' + res.data.result.svipLevel + ' ' + res.data.result.svipStatus + ' ' + res.data.result.svipExpirationDate + ' ' + res.data.result.mobile + ' ' + res.data.result.svipCard + ' ' + res.data.result.mbName)
                   this.memberflag = true
                   this.update = res.data.result.svipExpirationDate
                   this.vipcard = res.data.result.svipCard
                   this.projectType = res.data.result.svipLevel
                   if(this.$store.state.memberinfo.svipLevel == '5'){
                      this.logoTipsImg = require('../../common/images/member.png')
                   }else if(this.$store.state.memberinfo.svipLevel == '4'){//年卡会员
                      this.logoTipsImg = require('../../common/images/year-card.png')
                   }else if(this.$store.state.memberinfo.svipLevel == '3'){//半年卡会员
                      this.logoTipsImg = require('../../common/images/half-year-card.png')
                   }else if(this.$store.state.memberinfo.svipLevel == '2'){//季卡会员
                      this.logoTipsImg = require('../../common/images/season-card.png')
                   }else if(this.$store.state.memberinfo.svipLevel == '1'){//月卡会员
                      this.logoTipsImg = require('../../common/images/monthly-card.png')
                    }
              }else{
                   this.memberflag = false
              }
          }else{
           
          }
        this.buschanngeMsg()
      })
      .catch(error => {
        console.log(error)
      })

      
  },

  methods:{
    buschanngeMsg:function(){
        this.axios({
          method: 'post',
          url:'/mercury/gift/channelInfo',
          data:{"channel":getChannge('channel'),'projectType':this.projectType}
        })
        .then((res)=>{
          this.projectId = res.data.result.projectId
          // this.logoImg = res.data.channelLogo
          // this.logo_TipsImg = res.data.channelName
          this.logoImg = require('../../common/images/logo.png')
          var newsum = [];
          var allnum;
          this.axios.post('/mercury/gift/list',{"projectId":this.projectId})
              .then((res)=>{
                this.memberlistmsg = res.data.result.giftPackList
                for(var i = 0; i < this.memberlistmsg.length; i++){
                    allnum = parseInt(this.memberlistmsg[i]['offerAmount'] * this.memberlistmsg[i]['useLimit']);
                    newsum.push(allnum);
                  };
                  this.actMoney = newsum.reduce(function(prev,cur){
                    return prev + cur;
                  });
                  this.retailPrice = res.data.result.project.retailPrice
              })
              .catch((error)=>{
                console.log(error)
              })
        })
        .catch((error)=>{
          console.log(error)
        })
    },
    gotoPage:function(index){
        localStorage.setItem("couponMsgAll",this.projectId + '|'+ this.memberlistmsg[index]["giftId"] + '|'+ this.memberlistmsg[index]["packageId"])
        this.$router.push({name:'obtain',params:{projectId:this.projectId,packageId:this.memberlistmsg[index]["packageId"]}})
    },
    goabout:function(){
      // this.$router.push({name:'about?channel=' + getChannge('channel')})
      window.location.href = 'about?channel=' + getChannge('channel')
    }
  },
}
</script>
<style lang="scss">
@import '../../common/css/sass.scss';
.home { position: relative; min-height: 13.34rem; background: #000 url(../../common/images/homebg.png); background-position: left top; background-repeat: repeat-y; background-size: 100%;
  .bannerBox, .logo_Tips { text-align: center; padding-top: 0.5rem; }
  .logoImg { width: 2rem; }
  .logo_TipsImg {width: 4.4rem; }
  .moneyDiv { text-align: center; color: #999; font-size: 0.22rem;  padding-top: 0.15rem; 
    span { color: #ccc;font-weight: bolder; font-size: 0.36rem; margin: 0 0.05rem; }
  }
 .scroolDiv { text-align: center;padding: 0.1rem 0.05rem; margin: 0.1rem auto 0.2rem auto;color: #E8B575;  font-size: .22rem; background: url("../../common/images/line.png") left top no-repeat; background-size: 100%; width: 60%; 
  span { display: inline-block; width: .3rem; height: .3rem; background: url(../../common/images/shape.png) left top no-repeat;background-size: 100%; vertical-align: middle; margin-right: 0.1rem; }
 
 }


  .cardBox{ background: url(../../common/images/cardbg.png) left top no-repeat;  background-size: 100%;  height:3.8rem;  padding-top: .6rem; }
  .cardMsg{ width:6rem; height: 4rem;margin: 0 auto; background: url(../../common/images/card.png) left top no-repeat; background-size: 100%; text-align: center;}
  .mylogo{ padding-top: .5rem}
  .mylogo .logoImg{ width:2rem;}
  .mylogo_Tips{  padding-top:.3rem;}
  .mylogo_Tips .logo_TipsImg{  width:4.4rem;}
  .myuerdate{ text-align: center; color: rgba(255,255,255,.65); font-size: .26rem; padding-top: .2rem;}
  .mycardNum{ text-align: right;  padding-right: .45rem;  padding-top:.3rem;  color: rgba(255,255,255,.35); font-size: .22rem; }
  .entranceBox{  display: flex; justify-content: space-between;}
  .entranceBox li{ width:33.33%; text-align: center; }
  .entranceBox li .entranTipB{
    width:1.1rem;
    height:1.1rem;
    margin: 0 auto .1rem auto;
    /*! autoprefixer: off */
    background-image: -webkit-linear-gradient(bottom,rgba(190, 150, 93, 1),rgba(255, 204, 133, 1));
    /*! autoprefixer: on */
    background-image: -o-linear-gradient(bottom,rgba(190, 150, 93, 1),rgba(255, 204, 133, 1));
    background-image: linear-gradient(bottom,rgba(190, 150, 93, 1),rgba(255, 204, 133, 1));
    border-radius: .6rem;
    position: relative;
  }
  .entranceBox li span{
    display: block;
    width:.7rem;
    height:.7rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;
    position: absolute;
    left:50%;
    top:50%;
    margin-top: -.35rem;
    margin-left: -.35rem;

  }
  .entranceBox li a{
    display: block;
    font-size: .24rem;
    color: #666;
  }
  .entranceBox li span.Order{
    background-image: url(../../common/images/Order.png);
  }
  .entranceBox li span.Coupon{
    background-image: url(../../common/images/Coupon.png);
  }
  .entranceBox li span.Equity{
    background-image: url(../../common/images/Equity.png);
  }



 .listBox1 {background: #fff; border-radius: 0.08rem; margin: 0 0.35rem 0.2rem 0.35rem;  padding: 0.35rem;
    .modeName { color: #333; text-align: center; font-size: 0.36rem;  font-weight: bolder; padding: 0 0.1rem; }
    .listMsg li a { display: flex;justify-content: space-between; width: 100%;color: #666; text-decoration: none; align-items: center; align-content: center;  padding: 0.2rem 0; 
     .hotelName {  color: #333; font-size: 0.3rem; font-weight: 600; }
     .hotelTip { color: #666; font-size: 0.24rem;  padding: 0.05rem 0; }
    }
    .btnBox {  /**s**/ background-image: -webkit-linear-gradient(left, #e8b575, #956010); /**o**/ transform: skewX(-25deg); padding: 0.05rem 0.2rem; color: #fff;  font-size: 0.28rem; }
    .btnBox span { transform: skewX(25deg); display: inline-block; }
  }
 .btnBox .moeny {  margin-right: 0.1rem; font-size: 0.22rem; }
 .btnBox .num { font-size: 0.2rem; }
 .gouser{background-color: rgba(6, 6, 7, 1); padding: .1rem .3rem; color: #E8B575 ; font-size: .26rem; border-radius: .4rem;}
 .buttonBox { position: fixed; width: 100%; left: 0; bottom: 0; background: #000; height: 1.45rem;  padding-top: 0.2rem; }
 .buttonBox .indexBtn {display: block;  /* off */ background-image: -webkit-linear-gradient(right, #f8c580, #a97f4c); /* on */ width: 92%;padding: 0.1rem 0; border-radius: 0.6rem;  text-align: center;  color: #000;  margin: 0 auto;  font-size: 0.3rem; }
 .buttonBox .indexBtn .membertype { display: block; color: #333; font-size: 0.4rem; font-weight: bold; }
 }
.giftDiv{ background: #fff;
  .listBox1{
    /*! autoprefixer: off */
    background-image: -webkit-linear-gradient(left,rgba(255, 248, 237, 1),rgba(255, 248, 237, 1));
    /* autoprefixer: on */
    background-image: -o-linear-gradient(left,rgba(255, 248, 237, 1),rgba(255, 248, 237, 1));
    background-image: -moz-linear-gradient(left,rgba(255, 248, 237, 1),rgba(255, 248, 237, 1));
    background-image: linear-gradient(left,rgba(255, 248, 237, 1),rgba(255, 248, 237, 1));
    border-radius: .08rem;
    margin: .3rem .33rem .2rem .33rem;
    padding: .35rem;
    border: solid .03rem #C4975E;
  }
}

</style>