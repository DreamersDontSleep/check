<template>
  <div>
    <div class="articeContent">
      <div class="titleContent">
        <h1 class="title">{{ articleData.title }}</h1>
        <p class="other-info">
          <span><b>发布人：</b>{{ articleData.author }}</span> | <span><b>发布时间：</b>{{ articleData.publishDate }}</span>
        </p>
      </div>
      <br>
      <div class="abstracts">摘要：{{ articleData.abstracts }}</div>
      <div
        class="content"
        v-html="articleData.content" />
      <div class="footer">编辑：<b>{{ articleData.author }}</b> | 责任编辑：<b>{{ articleData.author }}</b></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleData: {}
    }
  },
  created() {
    const content = this.$route.query.content
    this.articleData = content
  }
}
</script>

<style lang="scss" scoped>
.articeContent {
  width: 100%;
  height: 100%;
  padding: 20px 0px;
}
.titleContent {
  text-align: center;
  margin: 0px 100px 10px 100px;
  .title {
    font-size: 18px;
    letter-spacing: 3px;
  }
  .other-info {
    line-height: 30px;
    font-size: 14px;
  }
}
.abstracts {
  padding: 10px;
  margin: 0px 100px 30px 100px;
  color: #999;
  text-indent: 2em;
  line-height: 30px;
  border: 1px dotted;
}
.content {
  line-height: 30px;
  margin: 0px 100px 30px 100px;
}
.footer {
  font-size: 14px;
  margin: 0px 100px 30px 100px;
}
</style>
