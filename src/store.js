import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    userInfo: {
      isLoggedIn: false,
      isSignedUp: false,
      hasSearched: false,
      name: '',
      productTitleSearched: ''
    },
    cart:
      {
      produtos:[],
      total:0,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
    },
    userInfo: {
      isLoggedIn: false, 
      isSignedUp: false,
      hasSearched: false,
      name: '',
      productTitleSearched: ''
    },
    systemInfo: {
      openLoginModal: false,
      openSignupModal: false,
      openCheckoutModal: false
    }
  },
  
  getters: {
    productsAdded: state => {
      return state.products.filter(el => {
       return el.isAddedToCart;
      });
    },
    productsAdded2: state => {
      console.log(state.cart.total)
      return state.cart.total
    },
    productsAddedToFavourite: state => {
      return state.products.filter(el => {
        return el.ID_PRODUTO;
      });
    },
    getProductById: state => id => {
      return state.products.find(product => product.ID_PRODUTO == id);
    },
    isUserLoggedIn: state => {
      return state.userInfo.isLoggedIn;
    },
    isUserSignedUp: state => {
      return state.userInfo.isSignedUp;
    },
    getUserName: state => {
      return state.userInfo.name;
    },
    isLoginModalOpen: state => {
      return state.systemInfo.openLoginModal;
    },
    isSignupModalOpen: state => {
      return state.systemInfo.openSignupModal;
    },
    isCheckoutModalOpen: state => {
      return state.systemInfo.openCheckoutModal;
    },
    quantity: state => {
      return state.products.ESTOQUE;
    }
  },
  
  mutations: {

   setTotal: (state, produtos) => {

    state.cart.total = produtos.length
    state.cart.produtos = produtos

    },
    addToCart: (state, id) => {
      state.products.forEach(el => {
        if (id === el.ID_PRODUTO) {
          el.isAddedToCart = true;
        }
      });

    },
    setAddedBtn: (state, data) => {
      state.products.forEach(el => {
        if (data.id === el.ID_PRODUTO) {
          el.isAddedBtn = data.status;
        }
      });
    },
    removeFromCart: (state, id) => {
      state.products.forEach(el => {
        if (ID_PRODUTO === el.ID_PRODUTO) {
          el.state.cart.isAddedToCart = false;
        }
      });
    },
    removeProductsFromFavourite: state => {
      state.products.filter(el => {
        el.state.cart.isFavourite = false;
      });
    },
    isUserLoggedIn: (state, isUserLoggedIn) => {
      state.userInfo.isLoggedIn = isUserLoggedIn;
    },
    isUserSignedUp: (state, isSignedUp) => {
      state.userInfo.isSignedUp = isSignedUp;
    },
    setHasUserSearched: (state, hasSearched) => {
      state.userInfo.hasSearched = hasSearched;
    },
    setUserName: (state, name) => {
      state.userInfo.name = name;
    },
    setProductTitleSearched: (state, titleSearched) => {
      state.userInfo.productTitleSearched = titleSearched;
    },
    showLoginModal: (state, show) => {
      state.systemInfo.openLoginModal = show;
    },
    showSignupModal: (state, show) => {
      state.systemInfo.openSignupModal = show;
    },
    showCheckoutModal: (state, show) => {
      state.systemInfo.openCheckoutModal = show;
    },
    addToFavourite: (state, id) => {
      state.products.forEach(el => {
        if (ID_PRODUTO === el.ID_PRODUTO) {
          el.state.cart.isFavourite = true;
        }
      });
    },
    removeFromFavourite: (state, id) => {
      state.products.forEach(el => {
        if (id === el.id) {
          el.isFavourite = false;
        }
      });
    },
    quantity: (state, data) => {
      state.products.forEach(el => {
        if (data.id === el.ID_PRODUTO) {
          el.ESTOQUE = data.quantity;
        }
      });
    }
  },
   
  actions: {
    getProducts() {
      //axios aqui
      axios
        //.get("http://191.252.103.186/api/produtos")
        .get("http://192.168.0.107/api/produtos")
        .then(response => {
          let list = [];
          console.log(response.data)

          this.state.products = response.data;
          
          for(let t =0; t < this.state.products.length; t++){
            this.state.products[t].isAddedToCart = false;    
          }
         
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCart({commit}) {
      const self = this
      console.log(self)
      let data = {user_id:'5', cnpj:'00428414000116'}
      axios
        .get("http://192.168.0.107/api/getCart",data)
        .then(response => {
          console.log(response.data)
          commit('setTotal', response.data, response.data.length)
        })
        .catch(error => {
          console.log(error);
        });
    },
    addToCart({commit}, payload){
      let selfe = this
      console.log(payload)
     // axios.post("http://191.252.103.186/api/addToCart")
      axios.post("http://192.168.0.107/api/addToCart", payload)
          .then(response => {
         
          this.state.products.forEach(el => {
            if (payload.produto_id === el.ID_PRODUTO ) {
              el.isAddedToCart = true;
              console.log(el)

            }
          });
      
        console.log(response);
      }).catch(
        console.log("Deu merda!!")
      )

    }
  }
});
