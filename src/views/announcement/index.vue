<template>
  <div class="app-container">
    <v-table
      :data="announcementList"
      :columns="columns">
      <template slot="title" slot-scope="{ scope }">
        <!-- <router-link :to="{ name: 'Detail', params: { announcementId: scope.row._id }}" style="color: rgb(51, 153, 204)"> -->
        <router-link :to="{ path: '/announcement/detail', query: { 'content': scope.row }}" style="color: rgb(51, 153, 204)">
          {{ scope.row.title }}
        </router-link>
      </template>
    </v-table>
  </div>

</template>

<script>
import { getAnnouncementList } from '@/api/announcement'
export default {
  data() {
    return {
      announcementList: [],
      columns: [
        { attrs: { label: '序号', type: 'index', width: 200 }},
        { attrs: { label: '标题' }, slot: 'title' },
        { attrs: { label: '部门 / 组织', prop: 'comeFrom' }},
        { attrs: { label: '发布人', prop: 'author' }},
        { attrs: { label: '发布时间', prop: 'publishDate' }}
      ]
    }
  },
  mounted() {
    this.fetchAnnouncementList()
  },
  methods: {
    fetchAnnouncementList() {
      getAnnouncementList().then(res => {
        this.announcementList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
