<template>
	<v-container>
		<div>
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-left">
								Item
							</th>
							<th>Quantity</th>
							<th>Price</th>
							<th />
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(item, index) in getItemsInCart"
							:key="index"
						>
							<!-- <tr> -->
							<td>{{ item.name }}</td>
							<td>{{ item.quantity }}</td>
							<td>${{ item.price.toLocaleString() }}</td>
							<!-- <td>{{ item.price.toLocaleString() }}円</td> -->
							<td>
								<v-icon @click="deleteItemFromCart(item.id)">
									mdi-delete
								</v-icon>
							</td>
						</tr>
						<tr>
							<td class="bold">
								Total
							</td>
							<td>{{ getTotalQuantity }}</td>
							<td>${{ getTotalPrice }}</td>
							<td />
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</div>
		<v-row>
			<v-col
				v-for="(cake, index) in getItems"
				:key="index"
				cols="6"
				md="4"
			>
				<v-card
					class="pa-2"
					maxWidth="344"
				>
					<v-img
						:src="cake.image"
						height="200px"
					/>

					<v-card-title>{{ cake.name }}</v-card-title>

					<v-card-subtitle>${{ cake.price }}</v-card-subtitle>

					<v-card-actions @click="addToCart(cake.id)">
						<v-btn
							button
							class="error"
						>
							ADD TO CART
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	name: 'App',

	computed: {
		...mapGetters([
			'getItems',
			'getItemsInCart',
			'getTotalPrice',
			'getTotalQuantity',
			'cartItemsLength',
			// 'getUpdatedTotal',
		]),
		// total() {
		// 	return this.getItemsInCart.reduce((total, p) => {
		// 		return total + p.price * p.quantity;
		// 	}, 0);
		// },
		// ...mapMutations(['getUpdatedTotal']),
	},
	mounted() {
		console.log('mounted');
		this.$store.dispatch('getItems');
		// ...mapGetters(['getItems']),
	},
	methods: {
		...mapActions(['addToCart', 'deleteItemFromCart', 'updateTotal']),
	},
};
</script>
<style>
button.error {
	background: #ff5252 !important;
	margin: 0 auto 3px auto;
	width: 100%;
}
tr td:not(:first-child) {
	text-align: center;
}
.bold {
	font-weight: bold;
}
.v-icon {
	cursor: pointer;
}
.v-data-table__wrapper {
	min-height: 200px;
}
.text-left {
	text-align: left;
}
table td {
	font-size: 150% !important;
}
table td:first-child,
table th:first-child {
	width: 60% !important;
}
</style>
