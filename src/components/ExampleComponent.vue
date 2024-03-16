<template>
  <div>
    <q-input v-model="name" label="Name"></q-input>
    <q-input v-model="description" label="Description"></q-input>
    <q-input v-model="price" label="Price"></q-input>
    <q-input v-model="tax" label="Tax"></q-input>
    <q-btn style="width: 100%; margin-top: 10px;" @click="postData" label="Submit"></q-btn>

    <q-table
      style="margin-top: 20px;"
      :rows="items"
      :columns="columns"
    />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      description: '',
      price: '',
      tax: '',
      items: [],
      columns: [
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: 'name',
        },
        {
          name: 'description',
          label: 'Description',
          align: 'left',
          field: 'description',
        },
        {
          name: 'price',
          label: 'Price',
          align: 'left',
          field: 'price',
        },
        {
          name: 'tax',
          label: 'Tax',
          align: 'left',
          field: 'tax',
        }
      ]
    };
  },
  methods: {
    async postData() {
      try {
        await axios.post('http://127.0.0.1:8000/insert/', {
          name: this.name,
          description: this.description,
          price: this.price,
          tax: this.tax
        });
        this.getItems();
        // Очистить форму после отправки данных
        this.name = '';
        this.description = '';
        this.price = '';
        this.tax = '';
      } catch (error) {
        console.error(error);
      }
    },
    async getItems() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/inserted/');
        this.items = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.getItems();
  }
};
</script>
