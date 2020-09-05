<template>
  <div class="couponDiv" v-if="couponlistFlag">
    <div class="couponMsgBox">
        <div class="selectcouponbox">
            <div>选择可用优惠券</div>
            <div><span class="closecouponbtn" @click="usecoupon"></span></div>
        </div>
        <div class="couponTip">每个订单只可用一张优惠券</div> 
        <ul class="couponlistMsg">
            <li v-for="(item, index) in coupondatalist" @click="selsect(index,$event)" :class="{curron:index == curronindex}">
                <div class="couponlistType">
                    <div class="couponprice"><em>{{item.discountRatio}}</em>折<p>最高可减{{item.upperAmount}}元</p></div>
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

    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'coupon',
    data () {
      return {
          curronindex:'-1'
      }
    },
    props:['coupondatalist','couponlistFlag'],
    created(){

    },
    methods:{
        selsect: function (index,$event) {
        this.curronindex = index
      },
        usecoupon:function(){
            console.log('22222')
            this.$emit('couponlistFlag',false)
        }
    
    }
  }
</script>

<style lang="scss">
@import '../../common/css/sass.scss';
  .couponDiv{position: absolute; left: 0; top:0; width:100%;  height:100%; background:rgba(0, 0, 0, .6); z-index: 99;
    .couponMsgBox{position: absolute; width: 100%; height: 400px; left:0; bottom:0; background:$base_bg_fff; border-top-right-radius: .15rem; border-top-left-radius: .15rem; overflow-y: scroll;
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
    }
  
  }
</style>
