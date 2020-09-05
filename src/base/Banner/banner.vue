<template>
  <div>
    <div v-if="!memberflag">
    <div class="bannerBox" >
      <div class="logo"><img :src="logoImg" class="logoImg" /></div>
      <div class="logo_Tips"><img :src="logoTipsImg" class="logo_TipsImg"  /></div>
    </div>
    <div class="moneyDiv">预计一年最高省<span>{{actMoney}}</span>元</div>
    <div class="scroolDiv">
      <span></span>188****8888 刚开通了会员
    </div>
    </div>

  <div v-else>
    <div class="cardBox">
        <div class="cardMsg">
          <div class="mylogo"><img :src="logoImg" class="logoImg" /></div>
          <div class="mylogo_Tips"><img :src="logoTipsImg" class="logo_TipsImg"  /></div>
          <div class="myuerdate">{{update}} 会员到期</div>
          <div class="mycardNum">NO：{{vipcard}}</div>
        </div>
    </div>
      <ul class="entranceBox">
        <li>
          <router-link to="myorder">
            <div class="entranTipB"><span class="Order">&nbsp;</span></div>
            我的订单
          </router-link>
        </li>
        <li>
          <router-link to="mycoupon">
            <div class="entranTipB"><span class="Coupon">&nbsp;</span></div>
          已领优惠券
          </router-link>
        </li>
        <li>
          <router-link to="myinterests">
            <div class="entranTipB"><span class="Equity">&nbsp;</span></div>
          热门权益
          </router-link>
        </li>
      </ul>
  </div>


  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'Banner',
    data() {
      return{
      }
    },
    props:['actMoney','logoImg','logoTipsImg','update','vipcard','memberflag'],
  }
</script>
