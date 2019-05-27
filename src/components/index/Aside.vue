<template>
    <el-aside>
        <asideUpdates/>
        <clickList/>
    </el-aside>
</template>
<script>
import asideUpdates from '@/components/asideUpdates/asideUpdates'
import clickList from '@/components/clickList/clickList'
export default {
    components:{
        asideUpdates,
        clickList
    }
}
</script>
<style lang="scss" scoped>

</style>

