<template>
	<v-sheet>
		<h2 class="text-center">Autocomplete</h2>
		<v-col cols="12" class="ma-auto col-md-6">
			<v-card>
				<v-tabs show-arrows v-model="tab" centered>
					<v-tabs-slider color="primary"></v-tabs-slider>
					<v-tab>Drug</v-tab>
					<v-tab>Strength</v-tab>
					<v-tab>Quantity</v-tab>
					<v-tab>DoS</v-tab>
				</v-tabs>

				<v-tabs-items v-model="tab">
					<v-tab-item>
						<v-col cols="12">
							<v-chip-group>
								<v-chip
									close
									v-for="(all, ind) in drugs"
									:key="all"
									@click="deleteDrug(ind)"
								>
									{{ all }}
								</v-chip>
							</v-chip-group>
						</v-col>
						<v-sheet class="d-flex flex-row ma-0 pa-0">
							<v-col cols="9" class="ma-0 pa-0">
								<v-text-field
									label="Add Drug"
									flled
									dense
									outlined
									hint="ex) Dupixent"
								></v-text-field>
							</v-col>
							<v-col cols="3" class="ma-0 pa-0"
								><v-btn width="100%" outlined height="40px" @click="addDrug()"
									>add</v-btn
								></v-col
							>
						</v-sheet>
					</v-tab-item>
					<v-tab-item>
						<v-col cols="12">
							<v-chip-group>
								<v-chip
									close
									v-for="(all, ind) in strengths"
									:key="all"
									@click="deleteStrength(ind)"
								>
									{{ all }}
								</v-chip>
							</v-chip-group>
						</v-col>
						<v-sheet class="d-flex flex-row ma-0 pa-0">
							<v-col cols="9" class="ma-0 pa-0">
								<v-text-field
									label="Add Strength"
									flled
									dense
									outlined
									hint="ex) 40/0.4ML"
								></v-text-field>
							</v-col>
							<v-col cols="3" class="ma-0 pa-0"
								><v-btn width="100%" outlined height="40px" @click="addStrength()"
									>add</v-btn
								></v-col
							>
						</v-sheet>
					</v-tab-item>
					<v-tab-item>
						<v-col cols="12">
							<v-chip-group>
								<v-chip
									close
									v-for="(all, ind) in quantities"
									:key="all"
									@click="deleteQuantity(ind)"
								>
									{{ all }}
								</v-chip>
							</v-chip-group>
						</v-col>
						<v-sheet class="d-flex flex-row ma-0 pa-0">
							<v-col cols="9" class="ma-0 pa-0">
								<v-text-field
									label="Add Quantity"
									flled
									dense
									outlined
									hint="ex) 30"
								></v-text-field>
							</v-col>
							<v-col cols="3" class="ma-0 pa-0"
								><v-btn width="100%" outlined height="40px" @click="addQuantity()"
									>add</v-btn
								></v-col
							>
						</v-sheet>
					</v-tab-item>
					<v-tab-item>
						<v-col cols="12">
							<v-chip-group>
								<v-chip
									close
									v-for="(all, ind) in doss"
									:key="all + doss"
									@click="deleteDos(ind)"
								>
									{{ all }}
								</v-chip>
							</v-chip-group>
						</v-col>
						<v-sheet class="d-flex flex-row ma-0 pa-0">
							<v-col cols="9" class="ma-0 pa-0">
								<v-text-field
									label="Add Days of Supply"
									flled
									dense
									outlined
									hint="ex) 30"
								></v-text-field>
							</v-col>
							<v-col cols="3" class="ma-0 pa-0"
								><v-btn width="100%" outlined height="40px" @click="addDos()"
									>add</v-btn
								></v-col
							>
						</v-sheet>
					</v-tab-item>
				</v-tabs-items>
			</v-card>
		</v-col>
	</v-sheet>
</template>

<script>
export default {
	name: 'AutocompleteComp',
	data() {
		return {
			tab: null,
			drugs: ['sdf', 'asdf'],
			strengths: ['sd', 'sdf'],
			quantities: [30, 90],
			doss: [30, 90, 180],
		}
   },
   addDrug(){},
   addStrength(){},
   addQuantity(){},
   addDos(){},
	deleteDrug(ind) {},
	deleteStrength(ind) {},
	deleteQuantity(ind) {},
	deleteDos(ind) {},
}
</script>