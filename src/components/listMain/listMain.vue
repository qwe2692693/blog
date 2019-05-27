<template>
  <el-main>
    <el-row class="row-container">
      <ul class="list">
        <li v-for="(item,key) in list" :key="key">
          <h3 class="list-title">
            <router-link tag="a" :to="{ name:'content',params:{name:item._id}}">{{ item.title }}</router-link>
          </h3>
          <div class="list-inner">
            <div class="list-img">
              <img
                src="http://www.yangqq.com/d/file/news/life/2018-06-29/75842f4d1e18d692a66c38eb172a40ab.jpg"
                alt
              >
            </div>
            <el-row tag="p" class="list-text">{{ item.description }}</el-row>
            <el-row class="list-info">
              <div class="info-position">
                <el-row type="flex" align="middle">
                  <a class="list-avatar" href="javvascript:;">
                    <img src="@/assets/images/20190429151448.jpg" alt>
                  </a>
                  <span class="info-time">2018-11-08</span>
                  <a href="javascript:;" class="info-link">
                    【
                    <span>{{ item.category.catname }}</span> 】
                  </a>
                </el-row>

                <router-link tag="div" :to="{ name:'content',params:{name:item._id}}">
                  <el-button type="primary" size="small">阅读全文</el-button>
                </router-link>
              </div>
            </el-row>
          </div>
        </li>
      </ul>
    </el-row>
  </el-main>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    async contenFun(id) {
      try {
        const res = await this.axios.get("/content?id=" + id);
        this.list = res.data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    //注意顺序
    this.contenFun(this.$route.params.id);
  },
  watch: {
    '$route'(to, from) {
      this.contenFun(this.$route.params.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-main {
  padding: 0;
  margin-right: 15px;
}
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
      color: #909399;
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

