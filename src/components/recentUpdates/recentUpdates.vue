<template>
  <el-row class="row-container">
    <h1 class="htitle">最新博文</h1>
    <ul class="list">
      <li v-for="(item,index) in newBlog" :key="index">
        <h3 class="list-title">
          <router-link
            tag="a"
            :to="{name:'content',params:{name:item._id}}"
            @click.native="homeActiveFun(item.category.catname)"
            class="fc-gray"
          >{{ item.title }}</router-link>
        </h3>
        <div class="list-inner">
          <div class="list-img">
            <img :src="item.contentImg ==''? imgNull :doneServeUrl+item.contentImg" alt />
          </div>
          <el-row tag="p" class="list-text">{{item.description}}</el-row>
          <el-row class="list-info">
            <div class="info-position">
              <el-row type="flex" align="middle">
                <a class="list-avatar" href="javascript:;">
                  <img src="@/assets/images/20190429151448.jpg" alt />
                </a>
                <span class="info-time">{{ item.addTime }}</span>
                <a
                  href="javascript:;"
                  class="info-link"
                  @click.prevent="linkBtn('list',{id:item.category._id},item.category.catname)"
                >
                  【
                  <span>{{ item.category.catname }}</span> 】
                </a>
              </el-row>

              <div>
                <el-button
                  type="primary"
                  size="small"
                  @click="linkBtn('content',{name:item._id},item.category.catname)"
                >阅读全文</el-button>
              </div>
            </div>
          </el-row>
        </div>
      </li>
    </ul>
  </el-row>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      newBlog: []
    };
  },
  created() {
    this.newBlogFun();
  },
  methods: {
    ...mapMutations(['homeActiveFun']),
    async newBlogFun() {
      try {
        let res = await this.axios.get("/contentAll", {
          params: {
            limit: ""
          }
        });
        if (res.status == 200) {
          this.newBlog = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    linkBtn(name, params,str) {
      this.$router.push({ name: name, params: params });
      this.homeActiveFun(str)
    }
  },
  computed: {
    ...mapGetters(["doneServeUrl"]),
    ...mapState(["imgNull"])
  }
};
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
    height: 130px;
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

