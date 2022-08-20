<template>
    <input class="search-color rounded-lg p-3 w-4/5 m-3" placeholder="Buscar por nombre..." type="text" v-model="searchName" v-on:keyup="paginationReset()">
    <div>
        <select v-model="searchSpecie" @change="paginationReset()" class="search-color rounded-lg p-3 w-4/5 m-3">
            <option v-for="option in optionsSpecies" :value="option.id" :key="option.id">
                {{ option.name }}
            </option>
        </select>
    </div>
    <div>
        <select v-model="searchStatu" @change="paginationReset()" class="search-color rounded-lg p-3 w-4/5 m-3">
            <option v-for="option in optionsStatus" :value="option.id" :key="option.id">
                {{ option.name }}
            </option>
        </select>
    </div>
    <div>
        <select v-model="searchGender" @change="paginationReset()" class="search-color rounded-lg p-3 w-4/5 m-3">
            <option v-for="option in optionsGenders" :value="option.id" :key="option.id">
                {{ option.name }}
            </option>
        </select>
    </div>
    <div>
        <select v-model="orderOptions" class="search-color rounded-lg p-3 w-4/5 m-3">
            <option v-for="option in optionsOrder" :value="option.id" :key="option.id">
                {{ option.name }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        name: 'Characters',
        data(){
        return {
            item: 1,
            list : null,
            pagination : null,
            searchName: "",
            searchSpecie: "",
            searchStatu: "",
            searchGender: "",
            orderOptions: "",
            error: 1,
            optionsSpecies: [
                { name: 'All', id: '' },
                { name: 'Animal', id: 'Animal' },
                { name: 'Alien', id: 'Alien' },
                { name: 'Cronenberg', id: 'Cronenberg' },
                { name: 'Disease', id: 'Disease' },
                { name: 'Human', id: 'Human' },
                { name: 'Humanoid', id: 'Humanoid' },
                { name: 'Mythological Creature', id: 'Mythological Creature' },
                { name: 'Poopybutthole', id: 'Poopybutthole' },
                { name: 'Robot', id: 'Robot' },
                { name: 'Unknown', id: 'unknown' }
            ],
            optionsStatus: [
                { name: 'All', id: '' },
                { name: 'Alive', id: 'alive' },
                { name: 'Dead', id: 'dead' },
                { name: 'Unknown', id: 'unknown' }
            ],
            optionsGenders: [
                { name: 'All', id: '' },
                { name: 'Female', id: 'female' },
                { name: 'Male', id: 'male' },
                { name: 'Genderless', id: 'genderless' },
                { name: 'Unknown', id: 'unknown' }
                ],
            optionsOrder: [
                { name: 'None', id: '' },
                { name: 'Name (A - Z)', id: 'nameAZ' },
                { name: 'Name (Z - A)', id: 'nameZA' },
                { name: 'Species', id: 'species' },
                { name: 'Status', id: 'status' },
                { name: 'Gender', id: 'gender' }
                ]
            }
        },
        methods: {
            paginationReset() {
                this.item = 1
            },
            orderNameAZ() {
                return this.list.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            },
            orderNameZA() {
                return this.list.sort((a, b) => {
                    return b.name.localeCompare(a.name);
                });
            },
            orderSpecies() {
                return this.list.sort((a, b) => {
                    return a.species.localeCompare(b.species);
                });
            },
            orderStatus() {
                return this.list.sort((a, b) => {
                    return a.status.localeCompare(b.status);
                });
            },
            orderGender() {
                return this.list.sort((a, b) => {
                    return a.gender.localeCompare(b.gender);
                });
            }
        },
        computed : {
            filterSearch : function (){
                if (this.searchName || this.searchSpecie || this.searchStatu || this.searchGender){
                    this.getData(this.item + '&name=' + this.searchName + '&species=' + this.searchSpecie + '&status=' + this.searchStatu + '&gender=' + this.searchGender)
                    this.listFilterPage('name=' + this.searchName + '&species=' + this.searchSpecie + '&status=' + this.searchStatu + '&gender=' + this.searchGender);
                } else {
                    this.getData(this.item);
                    this.listPage();
                }
                if (this.orderOptions){
                    switch (this.orderOptions) {
                        case 'nameAZ':
                            this.orderNameAZ()
                            break;
                        case 'nameZA':
                            this.orderNameZA()
                            break;
                        case 'species':
                            this.orderSpecies()
                            break;
                        case 'status':
                            this.orderStatus()
                            break;
                        case 'gender':
                            this.orderGender()
                            break;
                        default:
                        break;
                    }
                } 
                return this.list;
            }
        },
        watch : {
            item : function (){
                this.getData(this.item);
            }
        },
        components : {},
        created() {}
    }
    </script>

    <style>
    .search-color {
        outline-color: rgb(142 250 107);
    }
</style>