<template>
  <div class="myorderDiv">
    <HeaderName :titleName="title" :headFlag='headFlag'></HeaderName>
    <tabs :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">
      <div class="myorderlist" slot="tabcontent">
        <ul>
          <li v-for="(item,index) in orderlist" @click="gotoordershow(item.orderId)">
            <div class="orderstatus">
              <div>订单编号: {{item.orderId}}</div>
              <div class="doing"><span v-if="item.status =='7'">已完成</span><span v-else>进行中</span></div>
            </div>
            <div class="orderpromsg">
              <div class="orderproImg">
                <img src="../../common/images/coffee.png" width="100%">
              </div>
              <div class="ordermsgshow">
                <p>{{item.goodsName}}</p>
                <div>
                  单价: {{item.goodsPrice}}元
                </div>
              </div>
            </div>
            <div class="orderprice"><span>¥ {{item.actualPaidAmount}}</span></div>
          </li>
          
        </ul>
      </div>

    </tabs>
    
  </div>
</template>

<script type="text/javascript">
  import HeaderName from '@/base/Head/head'
  import tabs from '@/base/Tab/tab'
  import {headershowWx} from '@/common/js/common.js'
  export default {
    name: 'myoorder',
    data () {
      return {
        title:"我的订单",
        tabIndex: 0,
        orderlist:[],
        uporderlist:[],
        tabList:[
          {
						index : 0,
						name: "全部订单",
						type: "0"
					},
					{
						index : 1,
						name: "进行中",
						type: "1"
          },
					{
						index : 2,
						name: "已结束",
						type: "2"
					}
        ],
        headFlag:false
      }
    },
    components: {
      HeaderName,
      tabs
    },
    created(){
      this.myorderlist(1,10,null)
      if(!headershowWx()){
        this.headFlag = true;
      }
    },
    methods:{
      changeTab:function(tab) {
				this.tabIndex = tab.index
        this.count = 1
				if(tab.type == "0"){
					this.myorderlist(1,10,null)
				}
				if(tab.type == "1"){
					this.myorderlist(1,10,0)
				}
				if(tab.type == "2"){
          this.myorderlist(1,10,7)
        }
      },
      myorderlist:function(pageNo,pageSize,status){//0待支付 1支付中 2支付成功 -2支付失败 3已取消  4退款中  -5退款失败  6支付超时  7交易完成
        this.axios({
           method:'post',
            url: '/mercury/sviporder/useOrderPage',
            data:{"pageNo":pageNo,"pageSize":pageSize,"status":status},
            // headers: {"X-REQUESTED-SO-TOKEN": localStorage.getItem(localStorage.getItem('CHANNEL') + "_loginToken")}
        })
          .then((res)=>{
            this.orderlist = res.data.result.records
          })
          .catch((error)=>{
            console.log(error)
          })
      },
      gotoordershow:function(showorder){
          console.log(showorder)
         this.$router.push({name:'myordershow',params:{id:showorder}})
      }

    }
  }
</script>

<style lang="scss">
@import '../../common/css/sass.scss';
  .myorderDiv{position: relative;width:100%;height:100%; background: $base_bg_f8;min-height:$base_body_minheight;
    .myorderlist{margin-bottom: .2rem;min-height: 11.2rem;
      li{background: #fff; padding: .33rem 0.33rem .23rem 0.33rem; margin: .25rem 0;
        .orderstatus{ display: flex;justify-content: space-between;color: #999; font-size: .23rem; 
        .doing{color:#956010;}
        }
        .orderpromsg{display: flex;justify-content: flex-start; align-items: center; align-content: center;background: $base_bg_f8; padding: .35rem; border-radius: .05rem; margin: .15rem 0;
          .orderproImg{width:1.2rem;}
          .ordermsgshow{padding-left:.2rem;font-size: .26rem;
            p{font-weight: bold; color: #666;}
            div{ padding-top: .05rem;color: #999;line-height: .38rem;font-size: .24rem;}
          }
        }
        .orderprice{text-align: right;color: #333; font-size: .24rem;
          span{color:#956010;font-size: .26rem;}
        }
      }
    }
  }
</style>
