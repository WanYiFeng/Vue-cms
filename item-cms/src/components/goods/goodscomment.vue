<template>
<div class="publicHeader">
    <comment :ID="this.$route.query.infoid"></comment>
</div>
</template>
<script>
import comment from '../childConponent/comment.vue'
export default {
    components:{
        comment
    }
}
</script>
