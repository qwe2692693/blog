<template>
    <el-main>
        <Recommend/>
        <recentUpdates/>
    </el-main>
</template>
<script>
import Recommend from  '@/components/recommend/Recommend.vue'
import recentUpdates from '@/components/recentUpdates/recentUpdates.vue'
export default {
    components:{
        Recommend,
        recentUpdates
    }
}
</script>
<style lang="scss" scoped>
.el-main{
    padding: 0;
    margin-right: 15px;
}
</style>

