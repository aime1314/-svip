<template>
<div>
  <div class="productDiv">
    <HeaderName :titleName="title" :headFlag='headFlag'></HeaderName>
    <div class="proMsgBox">
      <div v-for="(itemshow,index) in giftlist" v-show="index == giftcurronindex">
        <div class="proMsg_img"><img v-if="itemshow.fileDtoList!=null" :src="goodsPicture" alt="" width="100%"></div>
        <div class="proMsg_name">{{itemshow.name}}</div>
        <div class="proMsg_price">{{itemshow.salesPrice.toFixed(2)}}<em>元</em></div>
      </div>
      <div class="proMsg_list">
        <div v-for="(item,index) in giftlist" v-on:click="selsectgift(index)" v-bind:class="{curron:index == giftcurronindex}">{{item.name}}</div>
      </div>
      <div class="proMsg_obtain" v-on:click="gotocoupon">
        <div class="obtainName">优惠券</div>
        <div>
          <div v-if="cpnInfoCnt>0">
            <i v-if="cpnInfoCnt==1" >
                <span>{{couponName}}</span><img src="../../common/images/coupon_more.svg" alt="">
            </i>
            <i v-else>
              <span>{{cpnInfoCnt}}张可用折扣券</span><img src="../../common/images/coupon_more.svg" alt="">
            </i>
          </div>
          <div v-else>
            无可用折扣券
          </div>
        </div>
      </div>
      <div class="proMsg_about" v-for="(itemnode,index) in giftlist" v-show="index == giftcurronindex">
        <h2>商品简介</h2>
        <div v-for="(item,index) in itemnode.goodsClauseList" v-if="item.clauseType=='total'" v-html="item.clause"></div>
      </div>
    </div>
    <ProbuyButton :priceshow="priceshow" @shopping="shopping" :coupontips="coupontips"></ProbuyButton>
  </div>
   <!-- <Couponlist :cpnDiscountsInfoList="cpnDiscountsInfoList" :couponlistFlag="couponlistFlag" v-on:success="success(res)"></Couponlist> -->

<div class="couponDiv" v-if="couponlistFlag">
    <div class="couponMsgBox">
        <div class="selectcouponbox">
            <div>选择可用优惠券</div>
            <div><span class="closecouponbtn" @click="usecoupon"></span></div>
        </div>
        <div class="couponTip">每个订单只可用一张优惠券</div> 
        <ul class="couponlistMsg">
            <li v-for="(item, index) in cpnDiscountsInfoList" @click="selsect(index,item.couponsType,$event)" :class="{curron:index == curronindex}">
                <div class="couponlistType">
                    <div class="couponprice"><em>{{item.discountRatio}}</em>折<p>最高可减{{item.upperAmount}}元</p></div>
                    <div>
                        <p class="noteDiv">{{item.name}}</p>
                        <p class="noteDate">有效期: {{item.bindTime.split(' ')[0]}} - {{item.experTime.split(' ')[0]}}</p>
                    </div>
                </div>
                <div class="couponlistSelect"><span></span></div>
            </li>

            <li v-for="(item, index) in cpnVoucherInfoList"   @click="selsect(index,item.couponsType,$event)" :class="{curron:index == curronindex}" >
              <div class="couponlistType">
                    <div class="couponprice">￥<em>{{item.worth}}</em>元<p>{{item.floorAmount==0?"无门槛":"满"+item.floorAmount+"元可用"}}</p></div>
                    <div>
                        <p class="noteDiv">{{item.name}}</p>
                        <p class="noteDate">有效期: {{item.bindTime.split(' ')[0]}} - {{item.experTime.split(' ')[0]}}</p>
                    </div>
                </div>
                <div class="couponlistSelect"><span></span></div>

            </li>
            
           
            <li @click="usecoupon">
               <div class="couponlistType">
                    <div>不使用优惠券</div>
                </div>
                <div class="couponlistSelect"><span></span></div>
            </li>
        </ul>
        <!-- <div class="couponbtnDiv">使用</div> -->
    </div>
  </div>

  </div>
</template>

<script type="text/javascript">
  import HeaderName from '@/base/Head/head'
  import ProbuyButton from '@/base/Button/product/productbuy'
  import Couponlist from '@/base/Couponlist/couponlist'
  import {headershowWx} from '@/common/js/common.js'
  export default {
    name: 'product',
    data () {
      return {
        title:"",
        proName:"-",
        giftlist:[],
        giftcurronindex:0,
        cpnDiscountsInfoList:[], //折扣券
        cpnVoucherInfoList:[], //抵用券
        priceshow:'-',
        goodsPrice:'-',
        giftPid:'',//权益包ID
        coupounNum:'',//券批次号
        discountNum:'',//优惠券编码
        upperAmount:'',//最大优惠折扣
        discountRatio:'',//折扣
        //couponNumlist:'',//优惠券个数
        coupontips:'',//优惠额度
        goodsId:'',//商品ID
        curronindex:'-1',
        acid:localStorage.getItem('usermsg').split(' ')[0],//用户ID
        headFlag:false,
        couponName:'',
        couponNameflag:false,
        couponlistFlag:false,
        couponflag:false,
        couponState:true,
        cpnInfoCnt:0,
        goodsPicture:'',
      }
    },
    created() {
      localStorage.removeItem("couponId")
      this.giftPid = this.$route.params.id
      localStorage.setItem("giftPid", this.giftPid)
      // 页面加载时 清除缓存
      localStorage.removeItem("couponcurrondiscountNum")
      this.getGoddsDetailInfo()
      if(!headershowWx()){
        this.headFlag = true;
      }
    },
    components:{
      HeaderName,
      ProbuyButton,
      Couponlist
    },
    methods:{
      success(res){
        console.log(res)
        this.couponlistFlag = res;
     },
      getGoddsDetailInfo:function(){//产品详情
        this.axios({
          method:'post',
          url: '/mercury/gift/goodsDetail',
          data:this.giftPid,
        })
          .then((res)=>{
            this.title = res.data.result.giftName
            this.giftlist = res.data.result.resultlist
            this.goodsPrice = this.giftlist[this.giftcurronindex].salesPrice
            if (this.giftlist[this.giftcurronindex].fileDtoList.length>0) {
              this.goodsPicture = this.giftlist[this.giftcurronindex].fileDtoList[0].pgCdnHttpsFullUrl
            }
            // this.priceshow = this.giftlist[this.giftcurronindex].goodsPrice
            this.goodsId = this.giftlist[this.giftcurronindex].goodsId
            localStorage.setItem('goodsId', this.goodsId)
            if(res.data.result.batchId!=null){
              this.coupounNum = res.data.result.batchId
              //优惠券
              this.axios.post('coupons/voucher/getMemCouponList',{
                "acId": this.acid,
                "batchId":this.coupounNum, //券批次号
                "status": 0
                })
                .then((res)=>{
                    this.cpnDiscountsInfoList = res.data.result.cpnDiscountsInfoList // 折扣券
                    this.cpnVoucherInfoList = res.data.result.cpnVoucherInfoList // 抵用券
                    // 折扣券不为空
                    var couponMoney = 0; // 优惠金额
                    if (this.cpnDiscountsInfoList) {
                      this.cpnInfoCnt = this.cpnDiscountsInfoList.length
                      //只有一张时默认使用
                      if (this.cpnInfoCnt==1) {
                        this.discountRatio = this.cpnDiscountsInfoList[0].discountRatio //折扣
                        this.upperAmount = this.cpnDiscountsInfoList[0].upperAmount //最大优惠数
                        this.couponName = this.cpnDiscountsInfoList[0].name //名称
                        this.discountNum = this.cpnDiscountsInfoList[0].discountNum
                        localStorage.setItem("couponId",this.discountNum)
                        // 优惠金额  = 折扣*单价 跟 最大优惠上限 比较 取最小
                        couponMoney = (this.goodsPrice - (this.discountRatio * this.goodsPrice)/10) - this.upperAmount >0? this.upperAmount: (this.goodsPrice - (this.discountRatio * this.goodsPrice)/10).toFixed(2);
                        this.coupontips = "最高可省" + couponMoney + "元"
                      } 
                    } 
                    // 抵用券
                    if (this.cpnVoucherInfoList) {
                      for(var i=0; this.cpnVoucherInfoList.length>i; i++) {
                        //最低可使用金额
                        this.upperAmount = this.cpnVoucherInfoList[i].floorAmount //最低可使用金额
                        if(this.goodsPrice >= this.upperAmount){
                          this.cpnInfoCnt++
                        } else {
                          this.cpnVoucherInfoList[i].status = 9 // 不可用
                        }
                      }
                      if(this.cpnInfoCnt>0){
                        // 只有1张可用  默认展示
                        if(this.cpnInfoCnt==1){
                          for(var i=0; this.cpnVoucherInfoList.length>i; i++) {
                            //最低可使用金额
                            this.upperAmount = this.cpnVoucherInfoList[i].floorAmount //最低可使用金额
                            if(this.goodsPrice >= this.upperAmount){
                              this.couponName = this.cpnVoucherInfoList[i].name //名称
                              this.discountNum = this.cpnVoucherInfoList[0].voucherNum // 券ID
                              localStorage.setItem("couponId", this.discountNum)
                              // 优惠金额
                              couponMoney = this.cpnVoucherInfoList[i].worth.toFixed(2)  //抵用券金额
                              this.coupontips = "最高可省" + couponMoney + "元"
                            } 
                          }
                        } 
                      }
                    }
                    this.priceshow = (this.goodsPrice - couponMoney > 0 ? this.goodsPrice - couponMoney : 0 ).toFixed(2) 
                })
                .catch((error)=>{
                  console.log(error)
                })
              }
          })
          .catch((error)=>{
            console.log(error)
          })
      },
      selsectgift: function (index,$event) {
        this.giftcurronindex = index
        this.goodsId = this.giftlist[this.giftcurronindex].goodsId
        localStorage.setItem('goodsId', this.goodsId)

        this.goodsPrice = this.giftlist[this.giftcurronindex].salesPrice
        if(this.giftlist[this.giftcurronindex].fileDtoList.length>0) {
          this.goodsPicture = this.giftlist[this.giftcurronindex].fileDtoList[0].pgCdnHttpsFullUrl
        } else {
          this.goodsPicture = ''
        }
        var couponMoney = 0;

        if(this.discountRatio){
          // var couponMoney = (this.discountRatio * this.goodsPrice)/10 - this.upperAmount >0? this.upperAmount: (this.discountRatio * this.goodsPrice)/10;
           couponMoney = ((this.goodsPrice - (this.discountRatio * this.goodsPrice)/10) - this.upperAmount >0? this.upperAmount: (this.goodsPrice - (this.discountRatio * this.goodsPrice)/10)).toFixed(2);
          this.coupontips = "最高可省" + couponMoney + "元"
        }
        this.priceshow = (this.goodsPrice - couponMoney).toFixed(2)
      },
      shopping:function(){
        this.axios.post('/mercury/sviporder/createU',{"proId": this.goodsId, "num":1, "couponId":this.discountNum})
          .then((res)=>{
            if(res.data.code==200) {
              this.$toast(res.data.msg)
            } else {
              // 缓存折扣券
              localStorage.setItem("couponId",this.discountNum)
              this.$router.push({name:'shopping',params:{type:"2"}})
            }
            
          })
          .catch((error)=>{
            console.log(error)
          })
      },
      
      gotocoupon:function(){
        this.couponlistFlag = true
      },
      selsect: function (index,coupontype,$event) {//1,是优惠券，0是折扣券
        this.curronindex = index
        var couponMoney;
        if(coupontype == 1){//优惠券
          this.discountRatio = this.cpnVoucherInfoList[this.curronindex].floorAmount //最低可使用金额
          this.couponName = this.cpnVoucherInfoList[this.curronindex].name //名称
          this.discountNum = this.cpnVoucherInfoList[this.curronindex].voucherNum
          couponMoney = (this.cpnVoucherInfoList[this.curronindex].worth).toFixed(2) 
          // if(this.goodsPrice < this.discountRatio){
          //  this.couponState = false
          // }
        }else{
          this.discountRatio = this.cpnDiscountsInfoList[this.curronindex].discountRatio  //折扣
          this.upperAmount = this.cpnDiscountsInfoList[this.curronindex].upperAmount //最大优惠数
          this.couponName = this.cpnDiscountsInfoList[this.curronindex].name  //名称
          this.discountNum = this.cpnDiscountsInfoList[this.curronindex].discountNum
          couponMoney = ((this.goodsPrice - (this.discountRatio * this.goodsPrice)/10) - this.upperAmount >0? this.upperAmount: (this.goodsPrice - (this.discountRatio * this.goodsPrice)/10)).toFixed(2);
        }
       
        localStorage.setItem("couponId",this.discountNum)
        // this.couponflag = true
        this.cpnInfoCnt = 1
        this.couponlistFlag = false
        this.coupontips = "最高可省" + couponMoney + "元"
        this.priceshow = (this.goodsPrice - couponMoney > 0 ? this.goodsPrice - couponMoney : 0).toFixed(2)

      },
      usecoupon:function(){
        this.curronindex = '-1'
        this.couponlistFlag = false
        //this.couponflag = true
        this.cpnInfoCnt = 1
        this.coupontips = ''
        this.discountRatio = ''
        this.couponName  = '不使用优惠券'
        localStorage.removeItem("couponId")
        this.priceshow = (this.goodsPrice).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
@import '../../common/css/sass.scss';
  .productDiv{ position: relative;  width:100%;  height:100%; background: #fff; }
  .productDiv .proMsgBox{ margin:0 .33rem .25rem .33rem;}
  .productDiv .proMsgBox .proMsg_img{ background: #eee; border-radius: .1rem;  overflow: hidden;  height: 2.8rem;}
  .productDiv .proMsgBox .proMsg_name{font-weight: bold;  color: #333;  font-size: .3rem; padding: .2rem 0 .2rem 0;}
  .productDiv .proMsgBox .proMsg_price{
    color: #956010;
    font-size: .4rem;
  }
  .productDiv .proMsgBox .proMsg_price em{
    color: #666;
    font-size: .28rem;
    margin-left: .05rem;
  }
  .productDiv .proMsgBox .proMsg_list{
    display: flex;
    justify-content:flex-start;
    padding: .2rem 0 .2rem 0;
  }
  .productDiv .proMsgBox .proMsg_list div{
    border: solid .02rem #9f9f9f;
    border-radius: .05rem;
    padding:.05rem .2rem;
    margin: 0 .1rem;
    color: #999;
  }
  .productDiv .proMsgBox .proMsg_list div.curron{
    border:solid .02rem #956010;
    color: #956010;
  }
  .productDiv .proMsgBox .proMsg_list div:first-child{margin-left: 0}
  .productDiv .proMsgBox .proMsg_obtain{
    background: #F8F8F8;
    display: flex;
    justify-content:space-between;
    padding:.18rem .2rem;
    margin: .2rem 0;
    
  }
  .productDiv .proMsgBox .proMsg_obtain i {color:#999;}
  .productDiv .proMsgBox .proMsg_obtain i  img{vertical-align: middle; margin-left: .1rem;}
  .productDiv .proMsgBox .proMsg_obtain span{
    color: #956010;
  }
  .productDiv .proMsgBox .proMsg_about{
    padding:.2rem 0;
    color:#676769;
    font-size: .26rem;
    line-height: .5rem;
    margin-bottom: 2rem;
  }
  .productDiv .proMsgBox .proMsg_about h2{
    font-size: .3rem;
    margin-bottom: .2rem;
  }


  .couponDiv{position: fixed; left: 0; top:0; width:100%;  height:100%; background:rgba(0, 0, 0, .6); z-index: 99;
    .couponMsgBox{position: absolute; width: 100%; height: 500px; left:0; bottom:0; background:$base_bg_fff; border-top-right-radius: .15rem; border-top-left-radius: .15rem; overflow-y: scroll;
        .selectcouponbox{display: flex; justify-content: space-between; padding: .3rem .3rem .1rem .3rem;
            .closecouponbtn{display: inline-block; width: .32rem; height: .32rem; background: url(../../common/images/close.png) center no-repeat; background-size: 100%;}
        }
        .couponTip{color: $base_color_999; font-size: .24rem; text-align: center; padding: .3rem 0}
        .couponlistMsg li{display: flex; justify-content:flex-start; padding: .3rem .3rem .3rem .2rem; box-shadow: 0 .01rem .08rem #ddd; margin: 0 .3rem; align-items: center; align-content: center; border-radius: .1rem; margin-bottom: .3rem;
            .couponlistType{flex: 1;  display: flex; justify-content: flex-start; align-content: center; align-items: center;
                .couponprice{width: 28%; text-align: center; white-space: nowrap;color: $base_color_f60; font-size: .32rem;
                    em{font-size: .52rem; margin-left: .05rem;text-align: center; }
                    p{font-size: .22rem; color: $base_color_999; text-align: center;}
                }
                div:nth-of-type(2){flex: 1; border-left: solid .02rem $base_border_f3; padding-left: .2rem;
                    .noteDiv{font-size: .3rem; color: $base_color_333; padding: .05rem 0}
                    .noteDate{font-size: .24rem; color: $base_color_999; padding: .05rem 0}
                }
            }
            .couponlistSelect{width: 10%;text-align: center;
                span{display: inline-block; width: .4rem; height: .4rem; background: url(../../common/images/Oval.svg) center no-repeat; background-size: 100%;}
            }
            
        }
        .couponlistMsg li.curron{
             .couponlistSelect{width: 10%;text-align: center;
                span{display: inline-block; width: .4rem; height: .4rem; background: url(../../common/images/selected.svg) center no-repeat; background-size: 100%;}
            }
        }
      .couponbtnDiv{width: 90%; margin: 0 auto; background: $base_color_f60; text-align: center; color: $base_color_fff; height: .8rem; line-height: .8rem; border-radius: .2rem;}
    }
  
  }
</style>
