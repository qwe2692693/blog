<template>
  <el-header class="header" height="48px">
    <div class="nav">
      <ul class="nav dropdown-box">
        <li class="dropdown">
          <router-link
            to="/"
            @click.native="activeClick('首页')"
            :class="homeActive == '首页' ? 'active' : '' "
            tag="a"
          >首页</router-link>
        </li>
        <li class="dropdown" v-for="navs in activeNav" :key="navs._id">
          <router-link
            :to="{ name: 'list', params: { id: navs._id}}"
            @click.native="activeClick(navs.catname)"
            :class="homeActive == navs.catname ? 'active' : '' "
            tag="a"
          >{{ navs.catname }}</router-link>
          <div class="dropdown-content">
            <router-link
              v-for="item in activeNavChilden(navs.id)"
              :key="item._id"
              :to="{ name: 'list', params: { id: item._id}}"
              tag="a"
            >{{ item.catname }}</router-link>
          </div>
        </li>
      </ul>
    </div>
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
    ...mapMutations(["homeActiveFun"]),
    async head() {
      try {
        const res = await this.axios.get("/category");
        this.nav = res.data;
      } catch (err) {
        console.log("导航错误" + err);
      }
    },
    activeClick(obj) {
      this.homeActiveFun(obj);
    }
  },
  computed: {
    ...mapState(["homeActive", "count"]),
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
  height: 48px;
  line-height: 48px;
}
.dropdown-box {
  display: flex;
}
.dropdown {
  position: relative;
  z-index: 1;
  &:hover {
    background: #d68686;
  }
  a {
    padding: 0 15px;
    display: block;
    color: #fff;
    white-space: nowrap;
    &.active {
      background: #d68686;
    }
  }
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #409eff;
  a {
    &:hover {
      background: #d68686;
    }
  }
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>

