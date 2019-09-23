<template>
  <div id="app">
    <v-test :title="'2222'" @click="isShow = true"/>
    <button @click="isShow = true">
      点击
    </button>
    <v-dialogue v-model="isShow">
      提示
    </v-dialogue>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    }
  },

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
