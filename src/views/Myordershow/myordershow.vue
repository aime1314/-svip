<template>
  <div class="myorderDivshow">
    <HeaderName :titleName="title" :headFlag='headFlag'></HeaderName>
    <div class="statusBox">
      <p class="statusMsg"><i v-if="ordermsg.status == '0'">待支付</i><i v-else-if="ordermsg.status == '3'">已取消</i><i v-else-if="ordermsg.status == '7'">已完成</i><i v-else>处理中</i></p>
      <p class="statusTips">感谢您的信任，期待再次光临！</p>
    </div>
    <div class="msgbox">
      <div class="msgshow">
        <div class="orderProname">
           <span class="orderproImg"><img src="../../common/images/coffee.png" width="100%"></span>
          {{ordermsg.goodsName}}
        </div>
        <div>
          <p>¥ {{ordermsg.goodsPrice}}</p>
          <p>x{{ordermsg.goodsNum}}</p>
        </div>
      </div>
    </div>
    <div class="msgbox">
      <div class="msgshow">
        <div>手机号</div>
        <div>{{ordermsg.mobile}}</div>
      </div>
    </div>
    <div class="msgbox">
      <div class="msgshow">
        <div>商品金额</div>
        <div class="">¥ {{ordermsg.goodsPrice}}</div>
      </div>
      <div class="msgshow">
        <div>折扣券</div>
        <div class="">- ¥ {{ordermsg.discountAmount}}</div>
      </div>
      <div class="msgshow border-top">
        <div>实付金额</div>
        <div class="order_money">¥ {{ordermsg.actualPaidAmount}}</div>
      </div>
    </div>
    <div class="msgbox">
      <div class="msgshow">
        <div class="tips">订单编号</div>
        <div class="orderNum">{{ordermsg.orderId}}</div>
      </div>
      <div class="msgshow">
        <div class="tips">下单时间</div>
        <div class="orderNum">{{ordermsg.orderTime}}</div>
      </div>
    </div>
    <!-- <div class="payBtn" v-if="!payflag" @click="gotopay">
      立即支付
    </div> -->
  </div>
</template>

<script type="text/javascript">
  import HeaderName from '@/base/Head/head'
  import {headershowWx} from '@/common/js/common.js'
  export default {
    name: 'myoordershow',
    data () {
      return {
        title:"订单详情",
        orderid:'',
        ordermsg:{},
        payflag:false,
        headFlag:false
      }
    },
    components: {
      HeaderName,
    },
    created(){
    this.orderid = this.$route.params.id
    if(!headershowWx()){
        this.headFlag = true;
      }
    this.axios({
        method:'post',
        url: '/mercury/sviporder/uoDetail',
        data:this.orderid,
        // headers: {"X-REQUESTED-SO-TOKEN": localStorage.getItem(localStorage.getItem('CHANNEL') + "_loginToken")}
      })
      .then((res)=>{
          this.ordermsg = res.data.result
          if(res.data.result.goodsId == "0"){
              this.payflag = true
          }
          //localStorage.setItem('goodsId',res.data.result.goodsId)
      })
      .catch((error)=>{
        console.log(error)
      })





    },
    methods:{
      gotopay:function(){
        this.$router.push({name:'shopping',params:{type:"2"}})
      }
    }
  }
</script>


<style lang="scss">
@import '../../common/css/sass.scss';
  .myorderDivshow{position: relative;width:100%;height:100%; background: $base_bg_f8;min-height:$base_body_minheight;
    .statusBox{background: #C4975E; padding: .6rem .3rem; color: $base_color_fff;
      .statusMsg{font-size: .4rem;}
      .statusTips{padding-top: .1rem;}
    }
    .msgbox{background: $base_bg_fff; padding-left:.3rem;  margin-top: .2rem;
      .msgshow{display: flex; justify-content: space-between; padding: .2rem 0; padding-right: .3rem;
        .orderProname{font-size: .3rem;}
        .orderproImg{width:1.2rem; display: inline-block; margin-right: .1rem;}
        .tips,.orderNum{color:$base_color_999;}
        .order_money{color: $base_color_price_tip}
      }
    }
    .border-top{border-top:solid .02rem $base_border_f3; padding-right: 0}
    .payBtn{width: 100%; margin: .5rem 0; text-align: center; padding: .2rem 0}
  }
</style>
