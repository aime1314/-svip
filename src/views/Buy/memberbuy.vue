<template>
  <div class="payDiv">
    <HeaderName :titleName="title" :headFlag='headFlag'></HeaderName>
    <div class="buyMsgBox">
      <div class="buyTime">
        <i>支付剩余时间 {{min}}:{{sec}}</i>
        <i></i>
      </div>
      <div class="buyMoney">
        <span>¥</span>{{money}}
      </div>
    </div>
    <div class="buyBank">
      请选择支付方式
    </div>
    <div class="banklistBox" style="margin-top: 0">
      <ul>
        <li v-for="(item, index) in paytype" v-on:click="selsect(index,$event)" v-bind:class="{curron:index == current}">
          <div><span :class="item.palyClass"><i v-if="!payImgflag"><img :src="item.palyImg"></i><i v-else></i></span>{{item.palyName}}</div><div><em>&nbsp;</em></div>
        </li>
      </ul>
    </div>
    <div class="buybuttonBox">
      <div class="indexBtn" :class="{disable:!payStatus}" @click="gopay">
        立即支付{{money}}元
      </div>
    </div>

  <div class="dailogDiv" v-if="dailogflag">
    <div class="dailogmsgbox">
      <div class="dailogTitle">支付确认</div>
      <div class="dailogMsgShow">
        <p>1、请在微信内完成支付，如果你已支付成功，请点击“已完成支付"</p>
        <p>2、如果您还未安装微信6.0.2及以上版本客户端，请点击“取消”并点击其他支付方式</p>
      </div>
      <div class="payBtnbox">
        <div>取消</div>
        <div>完成支付</div>
      </div>
    </div>
  </div>


  </div>
</template>

<script type="text/javascript">
  import HeaderName from '@/base/Head/head'
  import wx from 'weixin-js-sdk'
  import {personMsg,headershowWx} from '@/common/js/common.js'
  export default {
    name: 'memberbuy',
    data() {
      return{
        title: "确认支付",
        money:"",
        current: 0,
        kelefu_type:"",
        paytypeName:"-",//支付渠道
        orderId:"-",
        payImgflag:true,
        payStatus:true,
        timeStatus:true,
        toast_show:false,
        toast_text:"",
        orderExpireTime:"-",//结束时间
        dailogflag:false,
        paysuccUrl:'/home?channel='+localStorage.getItem('CHANNEL'),
        paytype:[
          {"palyClass":"wechat","palyImg":"../../common/images/WeChat.png","palyName":"微信支付","palyTypename":"wxpay"},
          {"palyClass":"alipay","palyImg":"../../common/images/Alipay.png","palyName":"支付宝","palyTypename":"alipay"},
          {"palyClass":"kltpay","palyImg":"../../common/images/kltpay.png","palyName":"开联通","palyTypename":"kltpay"},
          ],
          endtime:'',
          day: "0",
          hr: "0",
          min: "0",
          sec: "0",
          headFlag:false
      }
    },
    components: {
      HeaderName,
    },
    mounted(){
      //  this.axios({
      //     method:'POST',
      //     url: '/mercury/pubpay/jssdk',
      //     data: encodeURIComponent(window.location.href.split('#')[0]),
      //     headers: {"X-REQUESTED-SO-TOKEN": localStorage.getItem(localStorage.getItem('CHANNEL') + "_loginToken")}
      //   })
      //     .then((res)=>{
      //       console.log(res)
      //       wx.config({
      //         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //         appId: res.data.result.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
      //         timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
      //         nonceStr: res.data.result.nonceStr, // 必填，生成签名的随机串
      //         signature: res.data.result.signature,// 必填，签名，见附录1
      //         jsApiList: [
      //           'checkJsApi',
      //           'onMenuShareTimeline',
      //           'onMenuShareAppMessage',
      //           'hideMenuItems',
      //           'onMenuShareQQ',
      //           'onMenuShareWeibo',
      //           'onMenuShareQZone',
      //           'showMenuItems',
      //           'hideAllNonBaseMenuItem',
      //           'showAllNonBaseMenuItem',
      //           'translateVoice',
      //           'startRecord',
      //           'stopRecord',
      //           'onVoiceRecordEnd',
      //           'playVoice',
      //           'onVoicePlayEnd',
      //           'pauseVoice',
      //           'stopVoice',
      //           'uploadVoice',
      //           'downloadVoice',
      //           'chooseImage',
      //           'previewImage',
      //           'uploadImage',
      //           'downloadImage',
      //           'getNetworkType',
      //           'openLocation',
      //           'getLocation',
      //           'hideOptionMenu',
      //           'showOptionMenu',
      //           'closeWindow',
      //           'scanQRCode',
      //           'chooseWXPay',
      //           'openProductSpecificView',
      //           'addCard',
      //           'chooseCard',
      //           'openCard'
      //         ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      //     });
      //     })
      //     .catch((error)=>{
      //       console.log(error)
      //     })
    },
    created(){
      this.kelefu_type = this.$route.params.type  //1是会员支付，2是购买产品支付.
      if(this.kelefu_type == "1"){
         this.axios({
          method: 'post',
          url: '/yangjian/mem/heartBeat',
        })
        .then(res => {
            if(res.data.code == "100"){
                if(res.data.result.svipStatus == '1'){//已是会员
                    localStorage.setItem("usermsg",res.data.result.acid + ' ' + res.data.result.svipLevel + ' ' + res.data.result.svipStatus + ' ' + res.data.result.svipExpirationDate + ' ' + res.data.result.mobile + ' ' + res.data.result.svipCard + ' ' + res.data.result.mbName)
                    // this.$router.push({name:'/mygift'})
                    window.location.href = '/home?channel='+localStorage.getItem('CHANNEL')
                }else{
                   this.createorder('/mercury/sviporder/createS',localStorage.getItem('projectId'))
                }
            }else{
              window.location.href = process.env.PASSPORT_ROOT+"/login?channel="+ localStorage.getItem('CHANNEL') + "&backurl=" + process.env.BACKRUL_ROOT+"/shopping/1"
            }
        })
        .catch(error => {
          console.log(error)
        })
      }else if(this.kelefu_type == "2"){
        this.paysuccUrl = '/myorder';
        this.createorder('/mercury/sviporder/createU',localStorage.getItem('goodsId'),localStorage.getItem('couponId'))
      }

      this.paytypeName = this.paytype[this.current]['palyTypename']
      if(!headershowWx()){
        this.headFlag = true;
      }

    },
    methods:{
      createorder:function(url,proId,couponId){
        this.axios({
          method: "post",
          url: url,
          // headers: {"X-REQUESTED-SO-TOKEN": localStorage.getItem(localStorage.getItem('CHANNEL') + '_loginToken')},
          data:{
              "proId": proId,
              "num":'1',
              "couponId":couponId
          }
        })
          .then((res)=>{
            this.orderId = res.data.result.orderId
            this.money = (res.data.result.actualPaidAmount).toFixed(2)
            this.endtime =  res.data.result.orderExpireTime
            this.countdown()
          })
          .catch((error)=>{
            console.log(error)
          })
      },


       selsect: function (index, $event) {
        this.current = index
        this.payStatus = true
        this.paytypeName = this.paytype[this.current]['palyTypename']
        console.log(this.paytypeName)
        
      },
      countdown: function () {
        var end = Date.parse(this.formateDate(new Date(this.endtime)))
        var now = Date.parse(this.formateDate(new Date()))
        var msec = end - now
        var day = parseInt(msec / 1000 / 60 / 60 / 24)
        var hr = parseInt(msec / 1000 / 60 / 60 % 24)
        var min = parseInt(msec / 1000 / 60 % 60)
        var sec = parseInt(msec / 1000 % 60)
        if(msec < 0){
          this.timeStatus = false
          this.$router.push({name:'/about'})
        }else{
        this.day = day
        this.hr = hr > 9 ? hr : '0' + hr
        this.min = min > 9 ? min : '0' + min
        this.sec = sec > 9 ? sec : '0' + sec
        var that = this
        setTimeout(function () {
          that.countdown()
        }, 1000)
        }
        
      },
      gopay:function(){
        if(this.payStatus && this.timeStatus){
          this.axios({
          method: "post",
          url: "/mercury/sviporder/prepay",
          // headers: { "X-REQUESTED-SO-TOKEN": localStorage.getItem(localStorage.getItem('CHANNEL') + '_loginToken')},
          data:{
            "orderId": this.orderId,
            "payMethod": this.paytypeName,
            "tradeType": "JSAPI" //公众号支付JSAPI    H5支付 MWEB   
          }
        })
          .then((res)=>{
            // this.payStatus = false

            // setInterval(function () {
            //     this.payStatus = true
            // }, 5000)    
            //var timestamp1 = (new Date()).getTime().toString;
            // var nonceStr1 = res.data.result.nonceStr;
            // var package1 = res.data.result.prepayId;
            // var paySign1 = res.data.result.sign;
            // this.dailogflag = true;

            if(res.data.code == "200"){
              this.$toast(res.data.msg)
              window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5NDY3Mjk2OQ==&scene=124#wechat_redirect'
            }else{
              this.onBridgeReady(res.data.result,this.paysuccUrl);
            }
            //微信支付监听
            if (typeof WeixinJSBridge == "undefined"){
              if( document.addEventListener ){
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              }else if (document.attachEvent){
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
            }else{
              this.onBridgeReady()
            }
            // wx.chooseWXPay({
            //   timestamp: res.data.result.timestamp, //时间戳，自1970年以来的秒数     
            //   nonceStr: res.data.result.nonceStr, //随机串     
            //   package: res.data.result.package0,     
            //   signType: res.data.result.signType,  //微信签名方式：     
            //   paySign: res.data.result.paySign, //微信签名 
            //   success: function (data) {
            //     callback('paysuccess');
            //     alert('22222')
            //   },
            //   fail: function (data) {
            //     callback('payfail')
            //   },
            //   cancel: function (data) {
            //     callback('paycancel')
            //   }
            //   })

            })
          .catch((error)=>{
            console.log(error)
          })
        }else{
           this.$toast("支付超时，请重新下单支付")
           setTimeout(function(){
              window.location.href = "/about"
           },2000)
        }
      },
      onBridgeReady: function (event,url){
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
              "appId": "wxa6718ad0b10bf642",     //公众号名称， 测试：wxa6718ad0b10bf642    生产：wx3bd94d3a0ee86c01    
              "timeStamp": event.timestamp,         //时间戳，自1970年以来的秒数     
              "nonceStr": event.nonceStr, //随机串     
              "package": event.package0,     
              "signType": event.signType,         //微信签名方式：     
              "paySign":event.paySign //微信签名 
            },
            function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                window.location.href = url
            } 
        }); 
      },
      formateDate:function(date, format){
        if (!date) return;
			    if (!format) format = "yyyy/MM/dd HH:mm:ss";
			    switch (typeof date) {
			        case "string":
			            date = new Date(date.replace(/-/g, "/"));
			            break;
			        case "number":
			            date = new Date(date);
			            break;
			    }
			    if (!date instanceof Date) return;
			    var dict = {
			        "yyyy": date.getFullYear(),
			        "M": date.getMonth() + 1,
			        "d": date.getDate(),
			        "H": date.getHours(),
			        "m": date.getMinutes(),
			        "s": date.getSeconds(),
			        "MM": ("" + (date.getMonth() + 101)).substr(1),
			        "dd": ("" + (date.getDate() + 100)).substr(1),
			        "HH": ("" + (date.getHours() + 100)).substr(1),
			        "mm": ("" + (date.getMinutes() + 100)).substr(1),
			        "ss": ("" + (date.getSeconds() + 100)).substr(1)
			    };
			    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
			        return dict[arguments[0]];
			    });

      }
    }
  }
</script>
<style type="text/css">
.payDiv{
  position: relative;
  width:100%;
  height:100%;
  padding-bottom:5rem;
  background: #f8f8f8;
}
  .buyMsgBox,.banklistBox{
    background: #fff;
  }
  .buyTime{
    text-align: center;
    padding: .4rem 0 .2rem 0;
    color: #999;
  }
  .buyMoney{
    font-size: .5rem;
    color: #333;
    text-align: center;
    font-weight: bold;
    padding-bottom: .4rem;
  }
.buyMoney span{
  font-size: .3rem;
  font-weight: normal;
}
  .buyBank{
    padding:.25rem .35rem;
  }
  .banklistBox ul li{
    margin-left: .35rem;
    padding-right: .35rem;
    border-bottom: solid .02rem #eee;
    display: flex;
    justify-content: space-between;
  }
.banklistBox ul li:last-child{
  border-bottom: none;
}
.banklistBox ul li div{
  padding:.2rem 0;
}
.banklistBox ul li div span{
  display: inline-block;
  width: .42rem;
  vertical-align: middle;
  height: .42rem;
  background-position: left top;
  background-size: 100%;
  margin-right: .1rem;
}
.banklistBox ul li div span.wechat{
  background-image: url(../../common/images/WeChat.png);
}
.banklistBox ul li div span.alipay{
  background-image: url(../../common/images/Alipay.png);
}
.banklistBox ul li div span.kltpay{
  background-image: url(../../common/images/kltpay.png);
}
.banklistBox ul li div em{
  display: inline-block;
  width: .48rem;
  height: .48rem;
  background: url(../../common/images/Oval.png) left top no-repeat;
  background-size: 100%;
}
.banklistBox ul li.curron div em{
  background: url(../../common/images/selected.png) left top no-repeat;
  background-size: 100%;
}
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
  background:#000;
  width: 92%;
  padding: .25rem 0;
  border-radius: .6rem;
  text-align: center;
  color: #e7b474;
  margin: 0 auto;
  font-size:.28rem;
}
.buybuttonBox .indexBtn.disable{
  background:#f8f8f8;
  color: #999;
}
.dailogDiv{position:fixed; width: 100%; height: 100%; background: rgba(0, 0, 0, .6); left: 0; top: 0; z-index: 10;}
.dailogmsgbox{ position: fixed; width: 80%; left: 10%; top: 50%; transform: translateY(-50%);background: #fff; border-radius: .06rem; padding: .2rem 0 0 0; font-size: .26rem; color: #666;}
.dailogTitle{text-align: center; padding: .2rem 0; font-weight: bold; color: #333;}
.dailogMsgShow{padding: 0 .2rem; line-height: .38rem;}
.dailogMsgShow p{margin: .2rem 0;}
.dailogMsgShow p:first-child{padding-top: 0; margin-top: 0}
.payBtnbox{display: flex; width: 100%; border-top: solid .02rem #f3f3f3; justify-content:space-between; margin-top: .3rem}
.payBtnbox div{width: 50%; text-align: center; padding: .2rem 0;}
.payBtnbox div:first-child{background: #f8f8f8; border-bottom-left-radius: .06rem}
.payBtnbox div:last-child{background: #f60; border-bottom-right-radius: .06rem; color: #fff;}
</style>
