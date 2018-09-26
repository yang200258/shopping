<template>
    <div class="goodscomment-container">
        <cmt-box :id="this.id"></cmt-box>
    </div>
</template>

<script>

import comment from '../Comment.vue'
export default {
    data() {
        return {
            id: this.$route.params.id
        }
    },
    methods: {

    },
    components: {
        "cmt-box": comment
    }
}
</script>

