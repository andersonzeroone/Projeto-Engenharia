<template>
  <div>
 <hero></hero>
    <products-list-container></products-list-container>
    <div v-for="t in products" :key="products.ID_PRODUTO">
      {{t.PRODUTO}}<br>
    </div>
  </div>
</template>

<script>
import ProductsListContainer from '../products_list/ProductsListContainer';

import HeroSection from '../hero/Hero';

export default {
  name: 'homepage-component',
  products: [],

  data(){
    return{
      products: this.products
    }
  },

  components: {
    'products-list-container': ProductsListContainer,
   
     'hero': HeroSection
  },
  computed(){
   
  },
  mounted () {
    this.$store.dispatch("getProducts");
    this.products = this.$store.state.products
    console.log(this.$store.state.products)
  }
};
</script>
