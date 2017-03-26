<template>
    <div>
        <!-- 1.0 提交评论 -->
        <div class="postCommentStyle">
            <h4 class="postCommentTitle">提交评论 </h4>
            <div class="submitTextArea">
                <textarea ref="commentTextArea"
                          placeholder="请输入要评论的内容"
                          rows="3">
                </textarea>
                <mt-button @click="postcomment"
                           type="primary"
                           size="large">
                           提交评论
                </mt-button>
            </div>
        </div>
        <!-- 2.0 评论列表 -->
        <div class="commentListStyle"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
            <h4 class="commentListTitle">评论列表</h4>
            <div v-for="item in commentList"
                 class="commentContent">
                <h5>{{item.content}}</h5>
                <p>
                    <span class="commentUser">{{item.user_name}}</span>
                    <span class="commentTime">{{item.add_time | timeFilter('YYYY-MM-DD')}} </span>
                </p>
            </div>
            <mt-button @click="loadMore"
                       plain
                       class="loadmore"
                       type="danger"
                       size="large"
                       v-if="isData">向下滑动加载更多</mt-button>
            <mt-button v-else="isData"
                       plain
                       class="loadmore"
                       type="danger"
                       size="large">没有了</mt-button>
        </div>
    </div>
</template>

<style scoped>
h4 {
    border-bottom: 1px solid rgba(92, 92, 92, 0.3);
    padding: 5px 5px 10px 5px;
}

.submitTextArea {
    padding: 5px;
}

.commentListStyle {
    padding: 5px;
    margin-top: 20px;
    border-top: 1px solid rgba(92, 92, 92, 0.3);
}

.commentContent {
    padding: 5px;
    border-bottom: 1px solid rgba(92, 92, 92, 0.3);
}

h5 {
    font-size: 16px;
    color: black;
}

.commentUser,
.commentTime {
    margin-top: 10px;
    color: #0094ff;
    float: left;
    width: 50%;
}

.commentTime {
    float: right;
}

.commentContent {
    height: 70px;
    overflow-y: auto;
}

.loadmore {
    margin-top: 15px;
}
</style>

<script>
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
// Vue.use(InfiniteScroll);
export default {
    data() {
        return {
            commentList: [],
            pageindex: 1,
            isData: true
        }
    },
    created() {
        this.getCommentList(true)
    },
    methods: {
        getCommentList(is) {
            this.getDataGet("api/getcomments/" + this.ID + "?pageindex=" + this.pageindex, (res) => {
                if (is) {
                    this.commentList = res.message
                } else {
                    this.commentList = this.commentList.concat(res.message)
                    res.message.length < 10 && (this.isData = false)
                }
            })
        },
        postcomment() {
            const commentContent = this.$refs.commentTextArea.value;
            if (!commentContent || commentContent.trim().length <= 0) {
                Toast("请输入评论内容!");
                return;
            }
            this.getDataPsst("api/postcomment/" + this.ID, { content: commentContent }, res => {
                Toast(res.message);
                this.$refs.commentTextArea.value = "";
                this.pageindex = 1;
                this.getCommentList(true)
            })
        },
        loadMore() {
            if (this.isData) {
                this.pageindex++;
                this.getCommentList(false)
            }
        }
    },
    props: ["ID"]
}
</script>