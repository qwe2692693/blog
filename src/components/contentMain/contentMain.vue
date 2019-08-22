<template>
  <el-main>
    <el-row class="row-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }" 
          @click.native="homeActiveFun('首页')">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{name:'list',params:{id:contentObj.content.category._id}}"
        >{{contentObj.content.category.catname}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{contentObj.content.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <section class="content-box">
        <h2 class="title">{{contentObj.content.title}}</h2>
        <div class="item">
          <span>{{ contentObj.content.addTime}}</span>
          <span>{{contentObj.content.addView}} 次浏览</span>
        </div>
        <article class="content" v-html="contentObj.content.content"></article>
      </section>
      <section class="pages">
        <div v-if="contentObj.contentPrve == null" >上一篇：沒有了</div>
        <router-link :to='{name:"content",params:{name:contentObj.contentPrve._id}}'  v-else>上一篇：{{ contentObj.contentPrve.title}}</router-link>
        
        <div v-if="contentObj.contentNext == null" >下一篇：沒有了</div>
        <router-link
          tag="a"
          :to='{name:"content",params:{name:contentObj.contentNext._id}}'
           v-else
        >下一篇：{{ contentObj.contentNext.title}}</router-link>
      </section>
    </el-row>
  </el-main>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  props: {
    contentObj: {
      type: Object,
      required: true
    }
  },
  methods:{
    ...mapMutations([
      'homeActiveFun'
    ]),
  }
};
</script>
<style lang="scss" scoped>
.el-main {
  padding: 0;
  margin-right: 15px;
}
.content-box,
.item,
.content {
  margin-top: 15px;
}
.item {
  color: #999;
  span {
    padding-right: 15px;
  }
}
.pages {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}
</style>