<template>
  <div class="mycouponDiv">
    <HeaderName :titleName="title" :headFlag='headFlag'></HeaderName>
    <div class="couponMsgBox">
      <ul class="couponlistDiv">
        <li v-for="(item, index) in cpnDiscountsInfoList">
              <div class="couponlistMsg">
                <div >
                  <div class="couponlistShow">
                    <p class="couponlist_Name">{{item.name}}</p>
                    <p class="couponlist_Date">有效期: {{item.bindTime.split(' ')[0]}} - {{item.experTime.split(' ')[0]}}</p>
                  </div>
                </div>
                <div class="couponNum"><p><span>{{item.discountRatio}}</span>折</p><i>最高可减{{item.upperAmount}}元</i></div>
              </div>
               <div class="couponlistType">
                  <div>{{item.note}}</div>
                  <div class="prolink"  v-on:click="selsect(item.packAgeId,item.projectId)">查看可用商品&gt;</div>
                </div>
            </li>
            <li v-for="(item, index) in cpnVoucherInfoList">
              <div class="couponlistMsg">
                <div >
                  <div class="couponlistShow">
                    <p class="couponlist_Name">{{item.name}}</p>
                    <p class="couponlist_Date">有效期: {{item.bindTime.split(' ')[0]}} - {{item.experTime.split(' ')[0]}}</p>
                  </div>
                </div>
                <div class="couponNum"><p>￥<span>{{item.worth}}</span></p><i>{{item.floorAmount==0?"无门槛":"满"+item.floorAmount+"元可用"}}</i></div>
              </div>
               <div class="couponlistType">
                  <div>{{item.note}}</div>
                  <div class="prolink"  v-on:click="selsect(item.packAgeId,item.projectId)">查看可用商品&gt;</div>
                </div>
            </li>
      </ul>
    </div>
    <br>
  </div>
</template>

<script type="text/javascript">
  import HeaderName from '@/base/Head/head'
  import {headershowWx} from '@/common/js/common.js'
  export default {
    name: 'mycoupon',
    data () {
      return {
        title:"已领优惠券",
         cpnVoucherInfoList:[], // 抵用券
         cpnDiscountsInfoList:[], // 折扣券
         coupounNum:'',//券批次号
         usermsg:localStorage.getItem('usermsg'),
         headFlag:false
      }
    },
    components: {
      HeaderName
    },
    created(){
      this.couponlist()
      if(!headershowWx()){
        this.headFlag = true;
      }
    },
    methods:{
      couponlist:function(){//领券信息
        var url = '/coupons/voucher/getMemCouponList' //获取用户优惠券接口(包括抵用券和折扣券)
        //this.axios.post('/coupons/discount/getMemDiscountList',{"acId": this.usermsg.split(' ')[0],"amount": 38,"batchId": this.coupounNum,"packAgeId":localStorage.getItem("couponMsgAll").split('|')[1],"projectId":localStorage.getItem("couponMsgAll").split('|')[0],"statusList": [0]})
        this.axios.post(url,{"acId": this.usermsg.split(' ')[0]})
          .then((res)=>{
            this.cpnDiscountsInfoList = res.data.result.cpnDiscountsInfoList // 折扣券
            this.cpnVoucherInfoList = res.data.result.cpnVoucherInfoList // 抵用券
          })
          .catch((error)=>{
            console.log(error)
          })
        },
        selsect: function (packAgeId,projectId) {
            var Numsize = packAgeId.split(',')
            var Numsize2 = projectId.split(',')
            console.log(Numsize,Numsize2)
        },

    }
  }
</script>

<style type="text/css">
  .mycouponDiv{
    position: relative;
    width:100%;
    height:100%;
    background: #f8f8f8;
    min-height: 13rem;
  }
  .mycouponDiv .couponMsgBox{
  }
  .mycouponDiv .couponMsgBox .couponlistDiv li {
    padding: .2rem .2rem;
    position: relative;
    background: #fff;
    margin: .33rem;
    border-radius: .1rem;
    overflow: hidden;
  }
  .mycouponDiv .couponMsgBox .couponlistDiv li:last-child{
    margin-bottom: 0;
  }
  .mycouponDiv .couponMsgBox .couponlistDiv li .couponlistMsg{
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .mycouponDiv .couponMsgBox .couponlistDiv li .couponlistMsg .couponlistShow{
    position: absolute;
    top:50%;
    -webkit-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .mycouponDiv .couponMsgBox .couponlistDiv li .couponlistMsg .couponlist_Name{
    color: #666;
    font-size: .3rem;
    font-weight: bold;
  }
  .mycouponDiv .couponMsgBox .couponlistDiv li .couponlistMsg .couponlist_Date{
    color: #999;
    padding-top: .25rem;
    font-size: .24rem;
  }
  .mycouponDiv .couponMsgBox .couponlistDiv li .couponlistMsg img{
    width:1.2rem;
  }
  .mycouponDiv .couponMsgBox .couponlistDiv li .couponlistMsg .couponNum{
    color: #f60;  font-size: .32rem; text-align: center; padding: .2rem 0;
  }
.mycouponDiv .couponMsgBox .couponlistDiv li .couponlistMsg .couponNum span{font-weight: bold; font-size: .46rem; margin-right: .05rem;}
.mycouponDiv .couponMsgBox .couponlistDiv li .couponlistMsg .couponNum i{display: inline-block; padding: .03rem .1rem; color: #999; background: #f3f3f3; font-size: .26rem; font-style: normal; border-radius: .06rem;}
  .mycouponDiv .couponMsgBox .couponlistDiv li .couponlistType{
    border-top: dashed .02rem #ddd;
    padding-top: .2rem;
    margin-top: .2rem;
    color: #676767;
    font-size: .24rem;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .mycouponDiv .couponMsgBox .couponlistDiv li .couponlistType:before{
    content: '';
    position: absolute;
    left:-.32rem;
    top:-.15rem;
    background: #f8f8f8;
    width:.3rem;
    height: .3rem;
    border-radius: .15rem;
  }
  .mycouponDiv .couponMsgBox .couponlistDiv li .couponlistType:after{
    content: '';
    position: absolute;
    right:-.32rem;
    top:-.15rem;
    background: #f8f8f8;
    width:.3rem;
    height: .3rem;
    border-radius: .15rem;
  }
  .mycouponDiv .couponMsgBox .couponlistDiv li .prolink{
    color: #956010;
  }
</style>
