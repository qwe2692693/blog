<template>
  <el-header class="header" height="48px">
    <el-row type="flex" tag="nav" class="nav">
      <router-link
        to="/"
        class="nav-head"
        @click.native="activeClick('首页')"
        :class="homeActive == '首页' ? 'active' : '' "
      >首页</router-link>
      <router-link
        class="nav-head"
        v-for="navs in activeNav"
        :key="navs._id"
        :to="{ name: 'list', params: { id: navs._id}}"
        @click.native="activeClick(navs.catname)"
        :class="homeActive == navs.catname ? 'active' : '' "
      >
        {{ navs.catname }}
        <div class="nav-content">
          <router-link
            v-for="item in activeNavChilden(navs.id)"
            :key="item._id"
            :to="{ name: 'list', params: { id: item._id}}"
          >{{ item.id }}</router-link>
        </div>
      </router-link>
    </el-row>
  </el-header>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      nav: []
    };
  },
  created() {
    this.head();
    
  },
  methods: {
    ...mapMutations([ "homeActiveFun"]),
    async head() {
      try {
        const res = await this.axios.get("/category");
        this.nav = res.data;
      } catch (err) {
        console.log("导航错误" + err);
      }
    },
    activeClick(obj) {
      this.homeActiveFun(obj)
    }
  },
  computed: {
    ...mapState(["homeActive",'count']),
    activeNav() {
      return this.nav.filter(navObj => {
        return navObj.pid == 0;
      });
    },
    activeNavChilden() {
      return obj => {
        return this.nav.filter(navObj => {
          return obj == navObj.pid;
        });
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  background: #409eff;
}
.nav {
  max-width: 1250px;
  margin: 0 auto;
  line-height: 48px;
  a {
    color: #fff;
    padding: 0 10px;
    font-size: 14px;
    background: #409eff;
    z-index: 10;
    display: block;
    &.active {
      background: #d68686;
    }
    &:hover {
      color: #fff;
      background: #d68686;
      border: none !important;
      &.nav-head {
        .nav-content {
          display: block;
        }
      }

      &::after {
        border: none;
      }
    }
    &.nav-head {
      position: relative;
      .nav-content {
        position: absolute;
        top: 48px;
        left: 0;
        width: 100%;
        text-align: center;
        background: #409eff;
        display: none;
      }
    }
  }
}
</style>

