<template>
  <div class="aboutDiv">
    <HeaderName :titleName="title" :headFlag="headFlag"></HeaderName>
    <div class="memberMsgBox">
      <div class="memberTitle">
        选择会员套餐
      </div>
      <ul class="membershow">
        <li v-for="(item, index) in membertypelistmsg" v-on:click="addClass(index,$event)" v-bind:class="{curron:index == current}">
          <div class="proName">{{item.projectName}}</div>
          <div class="proMoney"><em>¥</em>{{item.retailPrice}}</div>
          <div class="proCut">¥<em>{{item.marketPrice}}</em></div>
        </li>
        <!--<li>-->
          <!--<div class="proName">年卡</div>-->
          <!--<div class="proMoney"><em>¥</em>399</div>-->
          <!--<div class="proCut">¥476</div>-->
        <!--</li>-->

      </ul>
      <div class="protocol">购买即同意<router-link  class="indexBtn" to="">《客乐芙会员协议》</router-link></div>
    </div>
    <div class="memberMsgBox" style="margin-top: .3rem; margin-bottom: 2rem">
      <div class="memberTitle">
        会员权益介绍
      </div>
        <ul class="memberlistMsg header">
          <li><span>权益</span><span>年卡</span><span>半年卡</span><span>月卡</span></li>
        </ul>
        <ul class="memberlistMsg">
          <li v-for="item in buymemberlistmsg"><span>{{item.gift_name}}</span><span><i v-if="item.column4">{{item.column4}}次/年</i><i v-else>-</i></span><span><i v-if="item.column3">{{item.column3}}次/半年</i><i v-else>-</i></span><span><i v-if="item.column2">{{item.column2}}次/季</i><i v-else>-</i></span></li>
          <!--<li><span>自助餐二免一</span><span>2次/年</span><span>1次/半年</span><span>&nbsp;</span></li>-->
        </ul>
    </div>
    <MemberbuyBtn :memberMoney="buymoney" @shopping="shopping"></MemberbuyBtn>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
  import HeaderName from '@/base/Head/head'
  import MemberbuyBtn from '@/base/Button/memberbuy/buyBtn'
  import {headershowWx} from '@/common/js/common.js'
  export default {
    name: 'about',
    data() {
      return {
        title: "客乐芙超级会员",
        current: 0,
        buymoney: "-",
        selectmemberType:"-",
        buschannelId:localStorage.getItem('CHANNEL'),
        membertypelistmsg: [],
        buymemberlistmsg: [],
        projectId:"",//项目iD
        kelefu_type:"",//支付类型
        kelefu_money:"",//支付金额
        headFlag:false
      }
    },
    components: {
      HeaderName,
      MemberbuyBtn,
    },
    created(){
      this.objectMsg()
      if(!headershowWx()){
        this.headFlag = true;
      }
    },
    methods: {
      addClass: function (index, $event) {
        this.current = index
        this.buymoney = this.membertypelistmsg[index]["retailPrice"]
        this.projectId = this.membertypelistmsg[index]['projectId']
        localStorage.setItem('projectId',this.projectId)
      },
      shopping:function(){
        this.axios({
          method: 'post',
          url: '/yangjian/mem/heartBeat',
        })
        .then(res => {
            if(res.data.code == "100"){
                if(res.data.result.svipStatus == '1'){//已是会员
                    localStorage.setItem("usermsg",res.data.result.acid + ' ' + res.data.result.svipLevel + ' ' + res.data.result.svipStatus + ' ' + res.data.result.svipExpirationDate + ' ' + res.data.result.mobile + ' ' + res.data.result.svipCard + ' ' + res.data.result.mbName)
                    // this.$router.push({name:'/home?channel='+localStorage.getItem('CHANNEL')})
                    window.location.href = '/home?channel='+localStorage.getItem('CHANNEL')
                }else{
                    this.axios.post('/mercury/sviporder/createS',{"proId": this.projectId})
                      .then((res)=>{
                        // localStorage.setItem("orderId",res.data.result.orderId)
                        // this.$router.push({name:'shopping',params:{type:"1"}})
                        window.location.href = '/shopping/1'
                      })
                      .catch((error)=>{
                        console.log(error)
                      })
                }
            }else{
              window.location.href = process.env.PASSPORT_ROOT+"/login?channel="+ localStorage.getItem('CHANNEL') + "&backurl="+ window.location.href
            }
        })
        .catch(error => {
          console.log(error)
        })
      },
      objectMsg:function(){
        this.axios.get('/mercury/gift/projectInfo/' + this.buschannelId)
          .then((res)=>{
             this.membertypelistmsg = res.data.result.project
             this.buymemberlistmsg = res.data.result.giftPack
             this.buymoney = this.membertypelistmsg[this.current]['retailPrice']
             this.projectId = this.membertypelistmsg[this.current]['projectId']
             localStorage.setItem('projectId',this.projectId)
          })
          .catch((error)=>{
            console.log(error)
          })
      }

    },
  }
</script>

<style lang="scss">
@import '../../common/css/sass.scss';
.aboutDiv {height: 13.34rem; position: relative; background: #000; padding-top: .2rem;}
.aboutDiv .memberMsgBox { background: #fff; border-radius: 0.08rem;  margin: 0 0.3rem;  overflow: hidden; }
.aboutDiv .memberTitle {  padding: 0.3rem 0.35rem; font-weight: bold; font-size: 0.3rem; }
.aboutDiv .membershow { display: flex; justify-content: space-between; padding: 0 0.35rem; text-align: center; }
.aboutDiv .membershow li { flex: 0 0 31%; background: #f8f8f8;  border: solid 0.02rem #f8f8f8; border-radius: .05rem; margin: 0 1%; }
.aboutDiv .membershow .proName {  font-size: 0.3rem; font-weight: bold; color: #333;  padding: 0.2rem; }
.aboutDiv .membershow .proMoney {  color: #FF4926;  font-size: 0.4rem; padding-bottom: 0.2rem; font-weight: bold; }
.aboutDiv .membershow .proMoney em { font-style: normal;  font-size: 0.28rem;  display: inline-block;  margin-right: 0.05rem; }
.aboutDiv .membershow .proCut { color: #999; padding-bottom: 0.2rem; }
.aboutDiv .membershow .proCut em { text-decoration: line-through;  display: inline-block;  margin-left: 0.05rem; }
.aboutDiv .membershow li.curron { border: solid 0.02rem rgba(196, 151, 94, 0.6); background-color: #fff8ed; border-radius: .05rem; }
.aboutDiv .protocol { color: #808285; font-size: .26rem; padding: .35rem; }
.aboutDiv .protocol a { color: #956010; }
.aboutDiv .memberlistMsg li {display: flex; justify-content: space-between; text-align: center; }
.aboutDiv .memberlistMsg li span {  display: block; width: 25%; background: #FFF8ED;  padding: .12rem 0;  font-size: .23rem; color: #060607; }
.aboutDiv .memberlistMsg li span:nth-child(even) { background: #FFC4975E;color: #ad8242; }
.aboutDiv .memberlistMsg.header span { font-size: 0.26rem; font-weight: bold; color: #333; } .aboutDiv .memberlistMsg.header span:nth-child(even) {  color: #333; }

</style>
