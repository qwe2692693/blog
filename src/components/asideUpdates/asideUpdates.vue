<template>
  <!--最新推荐-->
  <el-row class="row-container">
    <h1 class="htitle">个人资料</h1>
    <ul class="list">
      <li>
        <el-link :underline="false" type="info">....暂无</el-link>
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

