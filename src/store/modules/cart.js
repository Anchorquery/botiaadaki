export default {
  state: {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    order: {}
  },
  mutations: {
    setCart(state, payload) {
      state.cart.push(payload);
    },

    setItem(state, payload) {
      let item = state.cart.find(product => {
        return product.id === payload.id;
      });
      item.qty = payload.qty;
      item.subtotal = payload.subtotal;
      item.DT03 = payload.DT03;
      item.DT02 = payload.DT02;
      item.DT01 = payload.DT01;
      item.precio = payload.precio;
      item.importe = payload.importe;
      item.editPrice = payload.editPrice
    },
    deleteItem(state, payload) {
      state.cart = payload;
    },
    setOrder(state, payload) {
      state.order = payload;
    },
    clearCart(state, payload) {
      state.cart = payload;
      
    }
  },
  getters: {
    getCart: state => state.cart,
    getOrder: state => state.order
  },
  actions: {}
};
