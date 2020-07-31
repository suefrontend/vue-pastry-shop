import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		cakes: [],
		cart: [],
	},
	getters: {
		getItems(state) {
			return state.cakes;
		},
		getItemsInCart(state) {
			return state.cart.map(({ id, price, quantity }) => {
				const product = state.cakes.find((el) => el.id === id);
				return {
					id: product.id,
					name: product.name,
					price: product.price,
					quantity,
				};
			});
		},
		getTotalPrice(state) {
			let totalPrice = state.cart.reduce(
				(accum, item) => accum + item.price,
				0
			);
			return totalPrice.toLocaleString();
		},
		getTotalQuantity(state) {
			return state.cart.reduce((accum, item) => accum + item.quantity, 0);
		},
		cartItemsLength(state) {
			return state.cart.length;
		},
	},
	mutations: {
		setItems: function (state, cakes) {
			state.cakes = cakes;
		},
		setItemsToCart: function (state, payload) {
			const item = state.cakes.find((el) => el.id === payload);
			const existingItem = state.cart.find((el) => item.id === payload);
			// if it's already exists in state.cart just update Quantity
			// otherwise push an object

			state.cart.push({
				id: item.id,
				name: item.name,
				price: item.price,
				quantity: 1,
			});
		},
		deleteItem: function (state, payload) {
			const item = state.cart.find((el) => el.id === payload);
			state.cart.splice(item, 1);
		},
	},
	actions: {
		getItems({ commit }) {
			firebase
				.firestore()
				.collection('cakes')
				.orderBy('id', 'desc')
				.get()
				.then((snapshot) => {
					const cakeList = [];
					snapshot.forEach((doc) => {
						cakeList.push(doc.data());
					});
					commit('setItems', cakeList);
				});
		},
		addToCart({ commit }, payload) {
			commit('setItemsToCart', payload);
		},
		deleteItemFromCart({ commit }, payload) {
			console.log('Item deleted!');
			commit('deleteItem', payload);
		},
	},
});
