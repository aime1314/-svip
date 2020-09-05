<template>
  <div class="buttonBox">
    <div  class="indexBtn" @click="about()">
      <span class="membertype">开通超级会员</span>
      {{retailPrice}}元/年
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'indexbutton',
    data() {
      return{

      }
    },
    props:['retailPrice'],
    methods: {
      about:function(){
        this.$parent.goabout();
      }

    },
  }
</script>
