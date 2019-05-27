<template>
  <el-header class="header" height="48px">
    <el-row type="flex" tag="nav" class="nav">
      <router-link to="/" exact-active-class="active">首页</router-link>
         <!-- :to="{ name: 'list', params: { id: navs.cateShort }}" -->
      <router-link
         v-for='navs in nav' 
         :key='navs._id'
         :to="{ name: 'list', params: { id: navs.cateShort}}"
         exact-active-class="active"
         >
         {{ navs.catname }}
      </router-link>
    </el-row>
  </el-header>
</template>
<script>
export default {
  data() {
    return {
      nav: [],
    }
  },
  created() {
    this.head()
  },
  methods: {
    async head() {
      try {
        const res = await this.axios.get("/category");
        this.nav = res.data;
      } catch (err) {
        console.log('导航错误'+err);
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.header {
  background: #409eff;
}
.nav {
  max-width: 1250px;
  margin: 0 auto;
  line-height: 48px;
  a {
    color: #fff;
    padding: 0 10px;
    font-size: 14px;
    &.active {
      background: #d68686;
    }
    &:hover {
      color: #fff;
      background: #d68686;
      border: none !important;
      &::after {
        border: none;
      }
    }
  }
}
</style>

