<template>
  <div class="section">
    <h3 class="title">{{ pageTitle }}</h3>
    <div class="columns is-centered is-multiline">
      <div class="card column is-one-fifth" v-for="product in produtos" :key="product.id">
        <products-component :product="product"></products-component>
      </div>
      <div class="section" v-if="productsInWishlist.length === 0">
        <p>{{ noProductLabel }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsComponent from '../Products';
import { getByTitle } from '../../filters';
import axios from "axios";

export default {
  name: 'wishlist-container-component',
  data () {
    return {
      pageTitle: 'Your Wishlist',
      noProductLabel: 'Your wishlist is empty',
      produtos: this.produtos
    }
  },

  components: {
    'products-component': ProductsComponent
  },

  computed: {
    productsInWishlist () {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle();
      } else {
        return this.$store.getters.productsAddedToFavourite;
      }
    }
  },

  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
  }
</style>


