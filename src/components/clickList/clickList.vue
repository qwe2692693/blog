<template>
  <el-row class="row-container">
    <h1 class="htitle">点击排行</h1>
    <ul class="list">
      <li v-for="(item,index) in Hits" :key="index">
        <router-link tag="div" :to="{name:'content',params:{name:item._id}}" @click.native="homeActiveFun(item.category.catname)">
          <el-link :underline="false" type="info">
            <i :style="index<3 ? 'color:red' : ''">{{ index+1 }}</i>
            {{item.title}}
          </el-link>
        </router-link>
      </li>
    </ul>
  </el-row>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      Hits: ""
    };
  },
  created() {
    this.getHits();
  },
  methods: {
    ...mapMutations(['homeActiveFun']),
    async getHits() {
      try {
        let res = await this.axios.get("/getHits");
        if (res.status == 200) {
          this.Hits = res.data;
          console.log(res)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  margin-top: 10px;
  li {
    margin-bottom: 10px;
    background: #f6f6f6;
    padding: 10px;
    border-radius: 5px;
    position: relative;
    z-index: 5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    a {
      display: inline-block;
    }
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      content: "";
      width: 100%;
      height: 0%;
      background: rgb(17, 195, 226);
      z-index: -1;
      transition: 0.5s all;
    }
    &:hover a {
      color: #fff;
    }
    &:hover::before {
      height: 100%;
    }
  }
}
</style>
