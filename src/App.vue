<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background: #f6f6f6;
  }
  #app {
    width: 100%;
    height: 100%;
    min-width: 1024px;
  }
  input {
    outline: none;
  }
  .cursor {
    cursor: pointer;
  }
</style>
