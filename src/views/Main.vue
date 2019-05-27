<template>
    <el-container id="container">
      <Mains/>
      <Aside/>
    </el-container>
</template>

<script>
// 引入模块
import Mains from "@/components/index/Mains.vue";
import Aside from "@/components/index/Aside.vue";

export default {
  components: {
    Mains,
    Aside
  },
  created() {
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
#container {
  width: 1250px;
  margin: 0 auto;
}
</style>
