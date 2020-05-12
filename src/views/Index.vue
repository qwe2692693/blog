<template>
  <el-container direction="vertical" id="container">
    <Header/>
    <router-view/>
    <Footer/>
  </el-container>
</template>

<script>
// 引入模块
import Header from "@/components/index/Header.vue";
import Footer from "@/components/index/Footer.vue";

export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    Header,
    Footer
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
#container{
  height: 100%;
}
</style>
