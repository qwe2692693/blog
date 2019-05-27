<template>
  <el-row class="row-container">
    <h1 class="htitle">特别推荐</h1>
    <el-row class="recommend-container">
      <el-col :span="6">
        <el-card :body-style="{ padding: '10px' }" shadow="hover" class="card">
          <div class="card-imgBox">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            >
          </div>
          <div class="recommend-text">
            <span>好吃的汉堡</span>
            <el-row type="flex" justify="space-between" align="middle">
              <time class="time">2017-8-12</time>
              <el-link :underline="false" type="primary">+查看全文</el-link>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '10px' }" shadow="hover" class="card">
          <div class="card-imgBox">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            >
          </div>
          <div class="recommend-text">
            <span>好吃的汉堡</span>
            <el-row type="flex" justify="space-between" align="middle">
              <time class="time">2017-8-12</time>
              <el-link :underline="false" type="primary">+查看全文</el-link>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-row>
</template>
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

