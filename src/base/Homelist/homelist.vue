<template>
  <div>
    <li v-for="(item,index) in memberlistmsg" @click="gotoPage(index)">
          <a href="javascript:;">
            <div>
              <p class="hotelName">{{item.giftName}}</p>
              <p class="hotelTip">最高减{{item.offerAmount}}元，
                <i v-if="item.useLimitType != 'fixed'">
                  {{item.useLimit}}次 
                  <i v-if="item.useLimitType == 'daily'" >/ 天</i>
                  <i v-else-if="item.useLimitType == 'monthly'" >/ 月</i>
                  <i v-else >/ 无限制</i>
                </i>
                <i v-else>
                  共{{item.useLimit}}次
                </i>
              </p>
            </div>
            <div v-if="memberflag"><div class="gouser">去使用</div></div>
            <div v-else>
              <div class="btnBox" v-if="item.offerAmount"><span class="moeny">省{{item.offerAmount}}元</span><span class="num">x {{item.useLimit}}</span></div>
            </div>
          </a>
        </li>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'homelist',
    data() {
      return{
        
      }
    },
    props:['memberlistmsg','projectId','memberflag'],
    methods:{
     gotoPage:function(index){
        if(this.memberflag){
          localStorage.setItem("couponMsgAll",this.projectId + '|'+ this.memberlistmsg[index]["giftId"] + '|'+ this.memberlistmsg[index]["packageId"])
          this.$router.push({name:'obtain',params:{projectId:this.projectId,packageId:this.memberlistmsg[index]["packageId"]}})
        }
        
    },
      
    }

  }
</script>
