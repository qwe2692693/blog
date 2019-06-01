<template>
  <el-row class="row-container">
    <h1 class="htitle">最新博文</h1>
    <ul class="list">
      <li>
        <h3 class="list-title">
          <el-link href="javascript:;" target="_blank" type="info">作为一个设计师,如果遭到质疑你是否能恪守自己的原则?</el-link>
        </h3>
        <div class="list-inner">
          <div class="list-img">
            <img
              src="http://www.yangqq.com/d/file/news/life/2018-06-29/75842f4d1e18d692a66c38eb172a40ab.jpg"
              alt
            >
          </div>
          <el-row tag="p" class="list-text">
            就拿我自己来说吧，有时候会很矛盾，设计好的作品，不把它分享出来，会觉得待在自己电脑里面实在是没有意义。
            干脆就发布出去吧。我也害怕收到大家不好的评论，有些评论，可能说者无意，但是对于每一个用心的站长来说，
            都会受很深
          </el-row>
          <el-row class="list-info">
            <div class="info-position">
              <el-row type="flex" align="middle">
                <a class="list-avatar" href="javvascript:;">
                  <img src="@/assets/images/20190429151448.jpg" alt>
                </a>
                <span class="info-time">2018-11-08</span>
                <a href="javascript:;" class="info-link">
                  【
                  <span>设计心得</span> 】
                </a>
              </el-row>

              <div>
                <el-button type="primary" size="small">阅读全文</el-button>
              </div>
            </div>
          </el-row>
        </div>
      </li>
        <li>
        <h3 class="list-title">
          <el-link href="javascript:;" target="_blank" type="info">作为一个设计师,如果遭到质疑你是否能恪守自己的原则?</el-link>
        </h3>
        <div class="list-inner">
          <div class="list-img">
            <img
              src="http://www.yangqq.com/d/file/news/life/2018-06-29/75842f4d1e18d692a66c38eb172a40ab.jpg"
              alt
            >
          </div>
          <el-row tag="p" class="list-text">
            就拿我自己来说吧，有时候会很矛盾，设计好的作品，不把它分享出来，会觉得待在自己电脑里面实在是没有意义。
            干脆就发布出去吧。我也害怕收到大家不好的评论，有些评论，可能说者无意，但是对于每一个用心的站长来说，
            都会受很深
          </el-row>
          <el-row class="list-info">
            <div class="info-position">
              <el-row type="flex" align="middle">
                <a class="list-avatar" href="javvascript:;">
                  <img src="@/assets/images/20190429151448.jpg" alt>
                </a>
                <span class="info-time">2018-11-08</span>
                <a href="javascript:;" class="info-link">
                  【
                  <span>设计心得</span> 】
                </a>
              </el-row>

              <div>
                <el-button type="primary" size="small">阅读全文</el-button>
              </div>
            </div>
          </el-row>
        </div>
      </li>
        <li>
        <h3 class="list-title">
          <el-link href="javascript:;" target="_blank" type="info">作为一个设计师,如果遭到质疑你是否能恪守自己的原则?</el-link>
        </h3>
        <div class="list-inner">
          <div class="list-img">
            <img
              src="http://www.yangqq.com/d/file/news/life/2018-06-29/75842f4d1e18d692a66c38eb172a40ab.jpg"
              alt
            >
          </div>
          <el-row tag="p" class="list-text">
            就拿我自己来说吧，有时候会很矛盾，设计好的作品，不把它分享出来，会觉得待在自己电脑里面实在是没有意义。
            干脆就发布出去吧。我也害怕收到大家不好的评论，有些评论，可能说者无意，但是对于每一个用心的站长来说，
            都会受很深
          </el-row>
          <el-row class="list-info">
            <div class="info-position">
              <el-row type="flex" align="middle">
                <a class="list-avatar" href="javvascript:;">
                  <img src="@/assets/images/20190429151448.jpg" alt>
                </a>
                <span class="info-time">2018-11-08</span>
                <a href="javascript:;" class="info-link">
                  【<span>设计心得</span>】
                </a>
              </el-row>

              <div>
                <el-button type="primary" size="small">阅读全文</el-button>
              </div>
            </div>
          </el-row>
        </div>
      </li>
    </ul>
  </el-row>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.list {
  li {
    overflow: hidden;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ced0d4;
  }
  .list-title {
    margin-bottom: 10px;
    a {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .list-img {
    width: 23%;
    float: left;
    margin-right: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
  .list-text {
    display: -webkit-box;
    font-size: 14px;
    color: #909399;
  }
  .list-info {
    // &::after,
    // &::before {
    //   display: table;
    //   clear: both;
    //   content: "";
    // }
    .info-position {
      position: absolute;
      left: calc(23% + 10px);
      right: 0;
      bottom: 0;
      display: flex;
      display: -webkit-flex;
      -webkit-justify-content: space-between;
      -moz-justify-content: space-between;
      justify-content: space-between;
      -webkit-align-items: center;
      -moz-align-items: center;
      align-items: center;
    }
    .info-time {
      margin: 0 5px 0 10px;
    }
    .info-link {
      color: #909399;
      span {
        color: #66b1ff;
      }
    }
  }
  .list-avatar {
    img {
      width: 30px;
      height: 30px;
      border-radius: 100%;
    }
  }
}
</style>

