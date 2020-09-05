// <template>
//   <div class="couponDiv">
//     <HeaderName :titleName="title" :headFlag='headFlag'></HeaderName>
//     <div class="couponMsgBox">
//         <div class="no_couponDiv">
//           <div>
//             不使用折扣券
//           </div>
//           <div>
//             <span class="no_coupon" v-on:click="usecoupon" v-bind:class="{curron:couponShow}">
//               <em>&nbsp;</em>
//             </span>
//           </div>
//         </div>
//         <div v-if="couponShow">
//           <div class="couponlisttips">每个订单只能使用一张</div>
//           <ul class="couponlistDiv">
//             <li v-for="(item, index) in coupondatalist" v-on:click="selsect(index,$event)" v-bind:class="{curron:index == curronindex}">
//               <div class="couponlistMsg">
//                 <div >
//                   <div class="couponlistShow">
//                     <p class="couponlist_Name">{{item.name}}</p>
//                     <p class="couponlist_Date">有效期: {{item.bindTime.split(' ')[0]}} - {{item.experTime.split(' ')[0]}}</p>
//                   </div>
//                 </div>
//                 <div class="couponNum"><p><span>{{item.discountRatio}}</span>折</p><i>最高可减{{item.upperAmount}}元</i></div>
//               </div>
//               <div class="couponlistType">{{item.note}}</div>
//             </li>
            
//           </ul>
//         </div>
//     </div>
//     <br>
//   </div>
// </template>

// <script type="text/javascript">
//   import HeaderName from '@/base/Head/head'
//   import {headershowWx} from '@/common/js/common.js'
//   export default {
//     name: 'coupon',
//     data () {
//       return {
//         title:"使用折扣券",
//         couponShow:true,
//         curronindex:localStorage.getItem('couponcurronidnex'),
//         couponojb:{},
//         coupondatalist:[],
//         coupondatalist_n:[],
//         coupounNum:'-',//券批次号
//         discountNum:'',//优惠券编码
//         upperAmount:'',//最大优惠折扣
//         acId:'',//用户ID
//         packAgeId:'',
//         discountRatio:'',//折扣
//         discountName:'',//折扣名
//         usermsg:localStorage.getItem('usermsg'),
//         headFlag:false
//       }
//     },
//     // created() {
//     // },
//     components: {
//       HeaderName
//     },
//     created(){
//       this.coupounNum = this.$route.params.id
//       this.couponlist(0)
//       if(!headershowWx()){
//         this.headFlag = true;
//       }
//     },
//     methods:{
//       couponlist:function(status){//领券信息
//         this.axios.post('/coupons/discount/getMemDiscountList',{"acId": this.usermsg.split(' ')[0], "batchId": this.coupounNum})
//           .then((res)=>{
//            this.coupondatalist = res.data.result
//           })
//           .catch((error)=>{
//             console.log(error)
//           })
//       },

//     selsect: function (index,$event) {
//         this.curronindex = index
//         this.discountNum = this.coupondatalist[this.curronindex].discountNum
//         this.upperAmount = this.coupondatalist[this.curronindex].upperAmount
//         this.discountRatio = this.coupondatalist[this.curronindex].discountRatio
//         this.discountName = this.coupondatalist[this.curronindex].name
//         localStorage.setItem("couponcurronidnex",this.curronindex)
//         //localStorage.setItem("couponcurronbatchId",this.batchId)
//         localStorage.setItem("couponcurrondiscountNum",this.discountNum)
//         localStorage.setItem("couponcurrondiscountRatio",this.discountRatio)
//         localStorage.setItem("couponcurronupperAmount",this.upperAmount)
//         localStorage.setItem("couponcurrondiscountName",this.discountName)
//         localStorage.setItem("couponflag",true)
        
//         this.$router.push({name:'product',params:{id:localStorage.getItem("giftPid")}})
//       },
//       usecoupon:function () {
//         localStorage.removeItem("couponcurronidnex")
//         localStorage.removeItem("couponcurrondiscountNum")
//         localStorage.removeItem("couponcurrondiscountRatio")
//         localStorage.removeItem("couponcurronupperAmount")
//         localStorage.removeItem("couponcurrondiscountName")
//         localStorage.removeItem("couponflag")
//         this.curronindex = null
//         if(this.couponShow){
//           this.couponShow = false
//         }else {
//           this.couponShow = true
//         }
//         this.$router.push({name:'product',params:{id:localStorage.getItem("giftPid")}})
//       }
//     }
//   }
// </script>

// <style type="text/css">
//   .couponDiv{
//     position: relative;
//     width:100%;
//     height:100%;
//     background: #f8f8f8;
//     margin-top: .9rem;
//     min-height: 13rem;
//   }
//   .couponDiv .couponMsgBox{
//     padding-top: .2rem;
//   }

//   .couponDiv .couponMsgBox .no_couponDiv{
//     display: flex;
//     justify-content: space-between;
//     background: #fff;
//     padding: .23rem .33rem .13rem .33rem;
//   }
//   .couponDiv .couponMsgBox .no_coupon{
//     display: inline-block;
//     width:1rem;
//     border-radius: .25rem;
//     background: #fff;
//     height: .5rem;
//     background: #f5f5f5;
//     border: solid .02rem #e5e5e5;
//     position: relative;
//     box-sizing: border-box;
//   }
//   .couponDiv .couponMsgBox .no_coupon em{
//     width:.5rem;
//     height: .5rem;
//     background: #fff;
//     border: solid .02rem #e5e5e5;
//     position: absolute;
//     top:-.02rem;
//     left: -.02rem;
//     border-radius: .25rem;
//     box-sizing: border-box;
//   }
//   .couponDiv .couponMsgBox .no_coupon.curron{
//     background: #C4975E;
//   }
//   .couponDiv .couponMsgBox .no_coupon.curron em{
//     top:-.02rem;
//     left: .46rem;
//   }
//   .couponDiv .couponMsgBox .couponlisttips{
//     text-align: center;
//     color: #999;
//     font-size: .24rem;
//     padding-top: .3rem;
//   }
//   .couponDiv .couponMsgBox .couponlistDiv li {
//     padding: .2rem .2rem;
//     position: relative;
//     background: #fff;
//     margin: .33rem;
//     border-radius: .1rem;
//     overflow: hidden;
//   }
//   .couponDiv .couponMsgBox .couponlistDiv li:last-child{
//     margin-bottom: 0;
//   }
//   .couponDiv .couponMsgBox .couponlistDiv li.curron:before{
//     content: '';
//     position: absolute;
//     left:0;
//     top:0;
//     width: 0;
//     height: 0;
//     border-top: .56rem solid #C4975E;
//     border-right: .56rem solid transparent;
//   }
//   .couponDiv .couponMsgBox .couponlistDiv li.curron:after{
//     content: '';
//     position: absolute;
//     background: url(../../common/images/check.png) .05rem .05rem no-repeat;
//     background-size:50%;
//     left:0;
//     top:0;
//     width:.56rem;
//     height: .56rem;
//   }
//   .couponDiv .couponMsgBox .couponlistDiv li .couponlistMsg{
//     display: flex;
//     justify-content: space-between;
//     position: relative;
//   }
//   .couponDiv .couponMsgBox .couponlistDiv li .couponlistMsg .couponlistShow{
//     position: absolute;
//     top:50%;
//     -webkit-transform: translateY(-50%);
//     -o-transform: translateY(-50%);
//     transform: translateY(-50%);
//   }
//   .couponDiv .couponMsgBox .couponlistDiv li .couponlistMsg .couponlist_Name{
//     color: #666;
//     font-size: .3rem;
//     font-weight: bold;
//   }
//   .couponDiv .couponMsgBox .couponlistDiv li .couponlistMsg .couponlist_Date{
//     color: #999;
//     padding-top: .25rem;
//     font-size: .24rem;
//   }
//   .couponDiv .couponMsgBox .couponlistDiv li .couponlistMsg .couponNum{
//     color: #f60;  font-size: .32rem; text-align: center; padding: .2rem 0;
//   }
//     .couponDiv .couponMsgBox .couponlistDiv li .couponlistMsg .couponNum span{font-weight: bold; font-size: .46rem; margin-right: .05rem;}
//     .couponDiv .couponMsgBox .couponlistDiv li .couponlistMsg .couponNum i{display: inline-block; padding: .03rem .1rem; color: #999; background: #f3f3f3; font-size: .26rem; font-style: normal; border-radius: .06rem;}
//   .couponDiv .couponMsgBox .couponlistDiv li .couponlistType{
//     border-top: dashed .02rem #ddd;
//     padding-top: .2rem;
//     margin-top: .2rem;
//     color: #676767;
//     font-size: .24rem;
//     position: relative;
//   }
//   .couponDiv .couponMsgBox .couponlistDiv li .couponlistType:before{
//     content: '';
//     position: absolute;
//     left:-.32rem;
//     top:-.15rem;
//     background: #f8f8f8;
//     width:.3rem;
//     height: .3rem;
//     border-radius: .15rem;
//   }
//   .couponDiv .couponMsgBox .couponlistDiv li .couponlistType:after{
//     content: '';
//     position: absolute;
//     right:-.32rem;
//     top:-.15rem;
//     background: #f8f8f8;
//     width:.3rem;
//     height: .3rem;
//     border-radius: .15rem;
//   }
// </style>
