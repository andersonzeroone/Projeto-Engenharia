<template>
  <div class="section">
     <div class="card is-clearfix columns">
        <figure class="card-image is-480x480 column is-one-thirds">
          <img src="https://bulma.io/images/placeholders/480x480.png">
        </figure>
        {{product.FANTASIA}}
        {{product.id}}
        <div class="card-content column is-two-thirds">
          <div class="card-content__title">
            <h2 class="title is-4">{{ product.PRODUTO}}
              <button class="button is-small" :title="removeFromFavouriteLabel" v-show="product.isFavourite" @click="removeFromFavourite(product.ID_PRODUTO)">
                <span class="icon is-small">
                  <i class="fas fa-heart"></i>
                </span>
              </button>
              <button class="button is-small" :title="addToFavouriteLabel" v-show="!product.isFavourite" @click="saveToFavorite(product.id)">
                <span class="icon is-small">
                  <i class="far fa-heart"></i>
                </span>
              </button>
            </h2>
          </div>
          <div class="card-content__text">
            <p>
              {{ product.PRODUTO}}
            </p>
          </div>
          <div class="card-content__ratings" v-if="product.rating === 1">
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__ratings" v-else-if="product.rating === 2">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__ratings" v-else-if="product.rating === 3">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__ratings" v-else-if="product.rating === 4">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__ratings" v-else-if="product.rating === 5">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__reviews">
       
            <div class="select is-rounded is-small is-pulled-right">
              <select @change="onSelectQuantity(product.ID_PRODUTO)" v-model="selected">
                <option v-for="quantity in quantityArray" :value="quantity">{{ quantity }}</option>
              </select>
            </div>
          </div>
          <div class="card-content__price is-pulled-left">
            <span class="title is-3" > R$ {{ product.PRECO }} </span>
          </div>
          <div class="card-content__btn is-pulled-right">
            <button class="button is-primary" v-if="!isAddedBtn" @click="addToCart(product.ID_PRODUTo)">{{ addToCartLabel }}</button>
            <button class="button is-text" v-if="isAddedBtn" @click="removeFromCart(product.ID_PRODUTO)">{{ removeFromCartLabel }}</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-detail-component',
  
  data () {
    return {
      addToCartLabel: 'Add to cart',
      removeFromCartLabel: 'Remove from cart',
      addToFavouriteLabel: 'Add to favourite',
      removeFromFavouriteLabel: 'Remove from favourite',
      product: {},
      selected: 1,
      quantityArray: []
    };
  },
  mounted () {
    this.product = this.$store.getters.getProductById(this.$route.params.id);
    this.selected = this.product.quantity;
    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }
  },
  computed: {
    isAddedBtn () {
      return this.product.isAddedBtn;
    }
  },
  methods: {
    addToCart (id) {
    
      let data = {
        user_id:5,
        produto_id: id,
        quantity: this.selected,
        cnpj:'00428414000116',
        status: true
  
      }
      //this.$store.commit('addToCart', id);
    
      this.$store.dispatch('addToCart', data)
      this.$store.dispatch('getCart')
      //this.$store.commit('setAddedBtn', data);
    },
    removeFromCart (id) {
      let data = {
        id: id,
        status: false
      }
      this.$store.commit('removeFromCart', id);
      this.$store.commit('setAddedBtn', data);
    },
    onSelectQuantity (id) {
      let data = {
        id: id,
        quantity: this.selected
      }
      this.$store.commit('quantity', data);
    },
    saveToFavorite (id) {
      let isUserLogged = this.$store.state.userInfo.isLoggedIn;
      if (isUserLogged) {
        this.$store.commit('addToFavourite', id);
      } else {
        this.$store.commit('showLoginModal', true);
      }
    },
    removeFromFavourite (id) {
      this.$store.commit('removeFromFavourite', id);
    }
  }
};
</script>

<style lang="scss" scoped>
 .section{
    width: 68%;
    margin-left: 15%;
  }
  .card {
    margin-top: 10%;
  }
 .card-image {
    width: 35% !important;
  }
  .card-content {
    padding: 20px 10px 183px 0;
    &__text {
      margin: 15px 0;
    }
    &__reviews {
      display: inline-block;
      width: 57%;
      margin-bottom: 10px;
    }
    // margin-left: 38%;
    // width: 55%;
    // margin-top: -36%;
  }

</style>