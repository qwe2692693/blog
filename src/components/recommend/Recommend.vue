<template>
  <el-row class="row-container">
    <h1 class="htitle">特别推荐</h1>
    <el-row class="recommend-container">
      <el-col :span="6" v-for="(item,index) in homeHotData" :key="index">
        <el-card :body-style="{ padding: '10px' }" shadow="hover" class="card">
          <div class="card-imgBox">
            <img
              :src="axios.defaults.baseURL.replace('/api','') + item.contentImg"
              class="image"
            >
          </div>
          <div class="recommend-text">
            <span>{{ item.title }}</span>
            <el-row type="flex" justify="space-between" align="middle">
              <time class="time">{{ item.addTime }}</time>
              <router-link tag="a" class="el-link el-link--primary" :to="{ name:'content',params:{name:item._id}}">+查看全文</router-link>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
export default {
  data(){
    return{
        homeHotData:[],
    }
  },
  created(){
    this.getHomeHot();
  },
  methods:{
      async getHomeHot(){
        try{
            const res = await this.axios.get('/homeHot');
            if(res.status == 200){
                this.homeHotData = res.data;
            }else{
              console.log("加载错误")
            }
        }catch(err){
          console.log(err)
        }
      }
  }
}
</script>
<style lang="scss" scoped>
.recommend-container {
  margin-left: -10px;
}
.card {
  margin: 10px;
  img {
    width: 100%;
    min-height: 100%;
    height: auto;
    transition: 1s all;
  }
  &:hover img{
    transform: scale(1.1);
  }
  .card-imgBox {
    height: 100px;
    overflow: hidden;
  }
}
.recommend-text {
  span {
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    font-size: 14px;
    max-height: 62px;
  }
  .time{
    font-size: 14px;
  }
}
</style>

