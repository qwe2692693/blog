<template>
  <el-container id="container">
    <listMain/>
    <Aside/>
  </el-container>
</template>

<script>
// 引入模块
import listMain from "@/components/listMain/listMain.vue";
import Aside from "@/components/index/Aside.vue";

export default {
  name: "list",
  data() {
    return {};
  },
  methods: {},
  created() {
  },
  components: {
    listMain,
    Aside
  }
};
</script>
<style lang="scss" scoped>
#container {
  width: 1250px;
  margin: 0 auto;
}
</style>
