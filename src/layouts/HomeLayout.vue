<template>
  
  <div class="homepage">
  	<home-header></home-header>
    <slot></slot>

  </div>
</template>
<script>
import Header from '../containers/navs/Header';


export default {
	components: {
    "home-header": Header,


  },
};
</script>
