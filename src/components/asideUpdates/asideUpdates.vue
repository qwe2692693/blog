<template>
  <!--最新推荐-->
  <el-row class="row-container">
    <h1 class="htitle">最新更新</h1>
    <ul class="list">
      <li>
        <el-link :underline="false" type="info">【个人博客空间申请】金牛云服，免费领空间啦</el-link>
      </li>
      <li>
        <el-link :underline="false" type="info">双十一，阿里云特惠活动，快来领券啦</el-link>
      </li>
       <li>
        <el-link :underline="false" type="info">双十一，阿里云特惠活动，快来领券啦</el-link>
      </li>
       <li>
        <el-link :underline="false" type="info">双十一，阿里云特惠活动，快来领券啦</el-link>
      </li>
       <li>
        <el-link :underline="false" type="info">双十一，阿里云特惠活动，快来领券啦</el-link>
      </li>
    </ul>
  </el-row>
</template>
<script>
export default {};
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
      width: 0%;
      height: 100%;
      background: rgb(17, 195, 226);
      z-index: -1;
      transition: 0.5s all;
    }
    &:hover a {
      color: #fff;
    }
    &:hover::before {
      width: 100%;
    }
  }
}
</style>

