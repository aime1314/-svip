<template>
  <div class="telbillDiv">
    <HeaderName :titleName="title" :headFlag="headFlag"></HeaderName>
    <div class="telbillMsgBox">
      <div class="telNumber">
        <div>
          <input v-bind:value="18888888888" >
          <span>账号绑定号码（上海移动）</span>
        </div>
        <div>
        </div>
      </div>

      <div class="proMsg_name">{{proName}}</div>
      <div class="proMsg_list">
        <div class="curron">5元<span>原价: 10元</span></div>
        <div>10元<span>原价: 20元</span></div>
        <div>20元<span>原价: 40元</span></div>
      </div>
      <div class="proMsg_obtain">
        <div class="obtainName">折扣券</div>
        <div>
          <router-link to="/coupon">5折话费券 ></router-link>
        </div>
      </div>
      <div class="proMsg_about">
        <h2>充值说明</h2>
        1、话费充值优惠为客乐芙超级会员专属特权；<br>
        2、无优惠券不可充值。
        *所有解释权归客乐芙所有
      </div>
    </div>
    <ProbuyButton></ProbuyButton>
  </div>
</template>

<script type="text/javascript">
  import HeaderName from '@/base/Head/head'
  import ProbuyButton from '@/base/Button/product/productbuy'
  import {headershowWx} from '@/common/js/common.js'
  export default {
    name: 'telbill',
    data () {
      return {
        title:"",
        proName:"-",
        headFlag:false
      }
    },
    created() {
      if(!headershowWx()){
        this.headFlag = true;
      }
    },
    components: {
      HeaderName,
      ProbuyButton
    }
  }
</script>

<style class="text/css">
  .telbillDiv{
    position: relative;
    width:100%;
    height:100%;
    background: #fff;
    margin-top: 1.1rem;
  }
  .telbillDiv .telbillMsgBox{
    margin: .25rem .33rem;
  }
  .telbillDiv .telbillMsgBox .telNumber{
    color: #999;
    font-size: .3rem;
    padding: .2rem 0 .2rem 0;
    display: flex;
    justify-content: space-between;
    width:93%;
  }
  .telbillDiv .telbillMsgBox .telNumber input{
    border: solid .02rem #f8f8f8;
    padding: .2rem;
    font-size:.6rem;
    width:100%;
    border-radius: .05rem;
  }
  .telbillDiv .telbillMsgBox .telNumber span{
    display: block;
    font-size: .26rem;
    padding-top: .1rem;
  }
  .telbillDiv .telbillMsgBox .proMsg_name{
    font-weight: bold;
    color: #333;
    font-size: .3rem;
    padding: .2rem 0 .2rem 0;
  }

  .telbillDiv .telbillMsgBox .proMsg_list{
    display: flex;
    justify-content:flex-start;
    padding: 0rem 0 .2rem 0;
  }
  .telbillDiv .telbillMsgBox .proMsg_list div{
    border: solid .02rem #9f9f9f;
    border-radius: .05rem;
    padding:.2rem .2rem;
    margin: 0 .1rem;
    color: #999;
    text-align: center;
    font-size: .36rem;
  }
  .telbillDiv .telbillMsgBox .proMsg_list div span{
    display: block;
    font-size: .28rem;
    margin-top: .1rem;
  }
  .telbillDiv .telbillMsgBox .proMsg_list div.curron{
    border:solid .02rem #956010;
    color: #956010;
  }
  .telbillDiv .telbillMsgBox .proMsg_list div:first-child{margin-left: 0}
  .telbillDiv .telbillMsgBox .proMsg_obtain{
    background: #F8F8F8;
    display: flex;
    justify-content:space-between;
    padding:.18rem .2rem;
    margin: .2rem 0;
  }
  .telbillDiv .telbillMsgBox .proMsg_obtain a{
    color: #956010;
  }
  .telbillDiv .telbillMsgBox .proMsg_about{
    padding:.2rem 0;
    color:#676769;
    font-size: .26rem;
    line-height: .5rem;
    margin-bottom: 2rem;
  }
  .telbillDiv .telbillMsgBox .proMsg_about h2{
    font-size: .3rem;
    margin-bottom: .2rem;
  }
</style>
