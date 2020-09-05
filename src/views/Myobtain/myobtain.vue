<template>
  <div class="myobtain">
    <HeaderName :titleName="title" :headFlag='headFlag'></HeaderName>
    <div class="obtainMsgBox">
      <div>
        <p class="obtainName">{{myobtainMsg.giftName}}</p>
        <p class="obtainTip">
          · 最高减{{myobtainMsg.offerAmount}}元<br>
          · <i v-if="myobtainMsg.useLimitType != 'fixed'">
              {{myobtainMsg.useLimit}}次 
              <i v-if="myobtainMsg.useLimitType == 'daily'" >/ 天</i>
              <i v-else-if="myobtainMsg.useLimitType == 'monthly'" >/ 月</i>
              <i v-else >/ 无限制</i>
            </i>
            <i v-else>
              共{{myobtainMsg.useLimit}}次
            </i>
        </p>
      </div>
      <div>
        <span class="obtainImg"><img v-bind:src="proImg" width="100%"> </span>
      </div>
    </div>
    <div class="mystraeDiv">
      <div  class="exchangeBtn" :class="{disable:!exchangflag}" @click="getcoupon($event)">
        立即兑换
      </div>
      <p>
        
        <i v-if="myobtainMsg.useLimitType != 'fixed'">
              <i v-if="myobtainMsg.useLimitType == 'daily'" >今天剩余{{mygiftNum}}次</i>
              <i v-else-if="myobtainMsg.useLimitType == 'monthly'" >本月剩余次数 {{mygiftNum}} 次</i>
              <i v-else >无限次使用</i>
            </i>
            <i v-else>
              共{{mygiftNum}}次
            </i>
      </p>
      <p v-if="myunuseNum">您还有 {{myunuseNum}} 张优惠券可使用  <span v-on:click="goproduct">立即使用</span></p>
      <p v-else></p>
    </div>
    <div class="aboutobtain">
      <div class="aboutobtainTitle">权益有效期</div>
      <p v-if="couponMsg.experDay">自领用之日起，{{couponMsg.experDay}}天内有效</p>
      <p v-else>
        {{couponMsg.experTime}}过期
      </p>
      <div class="aboutobtainTitle">使用规则</div>
      {{couponMsg.note}}
    </div>


    <dailogGet :visible="visible" :dailog_title="dailog_title" :dailog_Msg="dailog_Msg" @goproduct="goproduct" :closedailog="closedailog"></dailogGet>
  </div>
</template>

<script type="text/javascript">
  import HeaderName from '@/base/Head/head'
  import dailogGet from '@/base/Dialog/dialog'
  import {headershowWx} from '@/common/js/common.js'
  import {Toast } from 'mint-ui'
  export default {
    name: 'myobtain',
    data() {
      return {
        title: "-",//标题
        myobtainMsg:{},//项目信息
        couponMsg:{},//优惠券信息
        proImg:'',//项目图片
        packageId:'',//权益包ID
        coupounNum:'100001',//券批次号
        cpnType:0, //券类型:0 折扣券 ，1抵用券，2第三方券
        myunuseNum:'',//领取未使用数量
        mygiftNum:'-',//还可领取数量
        maxgiftNum:0,//基本大领取数量
        visible:false,//弹框是否显示
        dailog_title:'',//弹框标题
        dailog_Msg:'',//弹框内容
        //packAgeId2:'',//权益包ID
        projectId:'',//项目ID
        getcouponflag:true,
        exchangflag:true,
        headFlag:false,
        acid:this.$store.state.memberinfo.acid ? this.$store.state.memberinfo.acid : localStorage.getItem('usermsg').split(' ')[0],
        svipCard:this.$store.state.memberinfo.svipCard ? this.$store.state.memberinfo.svipCard : localStorage.getItem('usermsg').split(' ')[5],
        mobile:this.$store.state.memberinfo.mobile ? this.$store.state.memberinfo.mobile : localStorage.getItem('usermsg').split(' ')[4],
      }
    },
    components: {
      HeaderName,
      dailogGet
    },
    created() {
      console.log(this.acid)
      this.projectId = this.$route.params.projectId
      this.packageId = this.$route.params.packageId
      this.getquanyiBasemsg()
      // this.getgiftbasemsg()
      // this.getcouponlist()
      if(!headershowWx()){
        this.headFlag = true;
      }
    },
    methods: {
      getquanyiBasemsg:function(){//权益包信息
        this.axios({
          method:'get',
          url: '/mercury/gift/getGiftPackage/'+ this.packageId,
        })
          .then((res)=>{
             this.$store.commit('updateCouponlistMsg',res.data.result)
             console.log(this.$store.state.couponlist)
             this.myobtainMsg = res.data.result
             this.maxgiftNum =  res.data.result.useLimit
             this.title = this.myobtainMsg.giftName
             this.coupounNum = res.data.result.batchId
             this.cpnType = res.data.result.cpnType
              if(this.myobtainMsg.giftType == 'coffee'){
                this.proImg = require('../../common/images/coffee.png')
              }else if(this.myobtainMsg.giftType == 'video'){
                this.proImg = require('../../common/images/video.png')
              }else if(this.myobtainMsg.giftType == 'buffet'){
                this.proImg = require('../../common/images/buffet.png')
              }else if(this.myobtainMsg.giftType == 'film'){
                this.proImg = require('../../common/images/film.png')
              }else if(this.myobtainMsg.giftType == 'supermarket'){
                this.proImg = require('../../common/images/supermarket.png')
              }else if(this.myobtainMsg.giftType == 'tea'){
                this.proImg = require('../../common/images/tea.png')
              }else if(this.myobtainMsg.giftType == 'telephone'){
                this.proImg = require('../../common/images/telephone.png')
              }else if(this.myobtainMsg.giftType == 'trip'){
                this.proImg = require('../../common/images/trip.png')
              }
              if(this.coupounNum!=null){
                this.getgiftbasemsg()
                this.getcouponlist()
              } else {
                Toast({
                  message: '权益配置异常:批次号为空'
                });
              }
          })
          .catch((error)=>{
            console.log(error)
          })
      },
      getgiftbasemsg:function(){//优惠券信息
        var url = '/coupons/discount/getDiscountBatchInfoByBatch';
        if(1 == this.cpnType){
          //抵用券
          url = '/coupons/voucher/getVoucherBatchInfoByBatch'
        }
        this.axios({
          method:'post',
          url: url,
          data:this.coupounNum,//券批次号
          })
          .then((res)=>{
            this.couponMsg = res.data.result
            //this.packAgeId2 = this.couponMsg.packageId.split(',')[0].split('|')[1]
            this.getcouponNum()
          })
          .catch((error)=>{
            console.log(error)
          })
      },
      getcouponNum:function(){//已领用券数量
        var url = 'coupons/discount/getMemDiscountCountByBatch' //折扣券
        if(1 == this.cpnType){
          url = 'coupons/voucher/getMemVouchersCountByBatch'
        }
        this.axios.post(url,{
          "acId": this.acid,
          "batchId": this.coupounNum, 
          // "endTime": "",
          //"packAgeId": this.packageId,
          //"projectId": this.projectId,
          // "startTime": ""
          })
          .then((res)=>{
            console.log(res.data.result)
            this.mygiftNum = this.maxgiftNum - (res.data.result==null?0:res.data.result)  //还可领券数量
            if(res.data.result == this.maxgiftNum){//已领券量等于最大领可领券量
               this.exchangflag = false
               this.getcouponflag = false
            }
          })
          .catch((error)=>{
            console.log(error)
          })
        
      },
      getcouponlist:function(){//用户未使用的券信息
        this.axios.post('coupons/voucher/getMemCouponList',{
          "acId": this.acid,
          "batchId":this.coupounNum, //券批次号
          "status": 0
          })
          .then((res)=>{
            // 如果是抵用券
            if(1 == this.cpnType){
              if(res.data.result.cpnVoucherInfoList!=null){
                this.myunuseNum = res.data.result.cpnVoucherInfoList.length
              } else {
                this.myunuseNum = 0;
              }
            } else {
              if(res.data.result.cpnDiscountsInfoList!=null){
                this.myunuseNum = res.data.result.cpnDiscountsInfoList.length
              } else {
                this.myunuseNum = 0;
              }
            }
          })
          .catch((error)=>{
            console.log(error)
          })
        
      },
      getcoupon:function($event){//发券     
        var url = 'coupons/discount/putCpnDiscount';//折扣券发券接口
        if(1 == this.cpnType){
            url = 'coupons/voucher/putCpnVoucher';//抵用券发放接口
        }
      if(this.getcouponflag){
        this.axios.post(url,{"acId": this.acid,"batchId": this.coupounNum,"mobile":this.mobile,"acName":this.svipCard})
          .then((res)=>{
            //res.data.result:true:领券成功; false:领券失败
            if(res.data.result){
              this.getcouponNum()
              this.getcouponlist()
              this.visible = true
              this.dailog_title = "领取成功"
              this.dailog_Msg = this.couponMsg.label
            }
          })
          .catch((error)=>{
            console.log(error)
          })
        }

      },
      closedailog:function(){
        this.visible = false
      },
      goproduct: function () {
        if(this.giftType == "cost"){
          this.$router.push({name:'telbill',params:{id:this.myobtainMsg.giftId}})
        }else {
          this.$router.push({name:'product',params:{id:this.myobtainMsg.giftId}})
        }
      }
    }
  }
</script>

<style lang="scss">
@import '../../common/css/sass.scss';
  .myobtain{position: relative;width:100%;height:100%; background: $base_bg_fff;min-height:$base_body_minheight;
    .obtainMsgBox{background: $base_bg_f8; margin: 0 .33rem .25rem .33rem; border-radius: .1rem; display: flex; justify-content: space-between; padding: .35rem;  align-items: center; align-content: center;
      .obtainName{color: $base_color_price_tip; font-size: .32rem; font-weight: bold;}
      .obtainTip{color:$base_color_price_tip; font-size: .24rem; padding: .1rem 0 0 0; line-height: .42rem;}
      .obtainImg{ display: block; width:1.8rem; height:1.8rem; background: $base_bg_fff; border-radius: 1rem; overflow: hidden;}
    }
    .mystraeDiv{text-align: center; padding-bottom: .3rem;color: #796256;
      .exchangeBtn{display: block; /*! autoprefixer: off */  background:$base_bg_000;   width: 92%;  padding: .2rem 0;  border-radius: .6rem; text-align: center;color: #e7b474;  margin: 0 auto .2rem auto; font-size:.32rem; }
      .exchangeBtn.disable{background: $base_bg_f8;color: $base_color_999;}
      p{padding: .08rem 0;
        span{color: #956010; display: inline-block;  border-radius: .3rem; padding: .03rem .2rem; border:solid .02rem #956010; margin-left: .2rem;}
      }
    }
    .aboutobtain{padding:0 .35rem; color: $base_color_price_tip; font-size:.26rem; line-height: .5rem;
      .aboutobtainTitle{padding:.1rem 0;font-size: .28rem; font-weight: bold;}
    }
  }
</style>
