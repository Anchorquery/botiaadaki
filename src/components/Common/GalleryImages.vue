<template>
  <div>
    <div v-viewer="options" class="images clearfix">
      <template v-for="{source, thumbnail} in imagenes">

          <img :src="thumbnail" :key="source" :data-source="source" class="image"  :alt="source.split('?image=').pop()">

        
      </template>
    </div>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import axios from 'axios';
export default {
		props:["imagenes"],
  data () {
    return {
      options: {
        toolbar: true,
        url: 'data-source'
      }
    }
		},
  computed: {
  },
  methods: {
      downloadItem ( url, name, mime ) {
        console.log(name)
    axios.get(url, { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: mime })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = name
        link.click()
        URL.revokeObjectURL(link.href)
      }).catch(console.error)
  },
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .image {
    width: calc(20% - 10px);
    cursor: pointer;
    margin: 5px;
    display: inline-block;
  }
</style>