<template>
  <div class="HeaderName" v-if="headFlag">
    <div class="headMsgBox">
        <span class="icons-arrow_back" @click="back">&nbsp;</span>
        {{titleName}}
        <!--<span class="icons-arrow_next">下一步</span>-->
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'HeaderName',
    data() {
      return{
      }
    },
    props:['titleName','headFlag'],
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>
<style lang="scss">
@import '../../common/css/sass.scss';
.HeaderName {background: #fff;width: 100%; height: 0.88rem; line-height: 0.88rem; position: fixed; left: 0; top: 0; z-index: 100;}

.headMsgBox {position: relative; width: 100%; text-align: center; font-size: 0.3rem; font-weight: bolder; }

.icons-arrow_back {display: block; width: .6rem; height: 0.88rem; line-height: 0.88rem; position: absolute; left: 0; top: 0; background: url("../../common/images/back.png") left center no-repeat; background-size: 100%; }

.icons-arrow_next {display: block; width: .86rem; height: 0.88rem; line-height: 0.88rem; position: absolute; right: 0; top: 0; }
</style>
