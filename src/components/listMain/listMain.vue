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
              <img :src="item.contentImg ==''  ? imgNull : doneServeUrl+item.contentImg" alt />
            </div>
            <el-row tag="p" class="list-text">{{ item.description }}</el-row>
            <el-row class="list-info">
              <div class="info-position">
                <el-row type="flex" align="middle">
                  <a class="list-avatar" href="javvascript:;">
                    <img src="@/assets/images/20190429151448.jpg" alt />
                  </a>
                  <span class="info-time">{{ item.addTime }}</span>
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

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[pagesize, 15, 20, 25]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.count"
        ></el-pagination>
      </div>
    </el-row>
  </el-main>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      list: [],
      pages:{},
      currentPage: 1, 
      pagesize:10, 
    };
  },
  methods: {
    async contenFun(id,page,pagesize) {
      try {
        const res = await this.axios.get("/content",{
          params:{
            id:id,
            page:page,
            limit:pagesize
          }
        });
        this.list = res.data.content;
        this.pages = res.data.pages;
      } catch (err) {
        console.log(err);
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.contenFun(this.$route.params.id,this.currentPage,val);
       window.scrollTo(0,0)
    },
    handleCurrentChange(val) {
      this.currentPage1 = val;
       this.contenFun(this.$route.params.id,val,this.pagesize);
    }
  },
  created() {
    //注意顺序
    this.contenFun(this.$route.params.id,this.currentPage,this.pagesize);
  },
  watch: {
    $route() {
      this.contenFun(this.$route.params.id,this.currentPage,this.pagesize);
    }
  },
  computed: {
    ...mapGetters(["doneServeUrl"]),
    ...mapState(["imgNull"])
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

