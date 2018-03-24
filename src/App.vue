<template>
  <div id="app">
    <my-header></my-header>
    <tab></tab>
    <router-view/>
  </div>
</template>

<script>
  import MyHeader from './components/myHeader/myHeader.vue'
  import Tab from './components/tab/tab.vue'
export default {
  name: 'App',
  components:{
    MyHeader,
    Tab
  }
}
</script>

<style>

</style>
