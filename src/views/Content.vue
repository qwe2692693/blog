<template>
  <el-container id="container">
    <el-main v-if="!loging">加载中</el-main>
    <ContentMain v-if="loging" :contentObj="contentObj"/>
    <Aside/>
  </el-container>
</template>

<script>
// 引入模块
import ContentMain from "@/components/contentMain/contentMain.vue";
import Aside from "@/components/index/Aside.vue";

export default {
  data() {
    return {
      name: "",
      contentObj: {},
      loging: false,
    };
  },
  components: {
    ContentMain,
    Aside
  },
  methods: {
    async content(name) {
      try {
        const content = await this.$axios.get("/contentName?name=" + name);
        this.contentObj = content.data;
        this.loging = true;
      } catch (err) {
        alert("内容" + err);
      }
    },
    async addView(id){
      try{
          let res = await this.axios.get('/hitsAdd',{
            params:{
              id:id
            }
          });
      }catch(err){
        console.log(err)
      }
    } 
  },
  created() {
    this.name = this.$route.params.name;
    this.$nextTick(() => {
      this.content(this.name);
      this.addView(this.name);
    });
  },
  watch: {
    '$route'(to) {
       this.content(to.params.name);
       this.addView(to.params.name);
    }
  }
};
</script>
<style lang="scss" scoped>
#container {
  width: 1250px;
  margin: 0 auto;
}
</style>

