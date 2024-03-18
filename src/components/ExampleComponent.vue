<template>
  <q-layout style="width: 90%">

    <q-banner rounded style="margin-top:16px; margin-bottom:16px; text-align: center;
    background-color: #c5e1a5">Тестирование таблицы Postgres SQL</q-banner>

    <q-card>
      <q-input v-model="name" label="Name"></q-input>
      <q-input v-model="description" label="Description"></q-input>
      <q-input v-model="price" label="Price"></q-input>
      <q-input v-model="tax" label="Tax"></q-input>
      <q-btn style="width: 100%; margin-top: 10px;" @click="postData" label="Submit"></q-btn>
    </q-card>

    <q-table
      style="margin-top: 20px"
      :color="'brown'"
      :rows="items"
      :columns="columns"
      row-key="name"
      selection="multiple"
      v-model:selected="selected"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="delete_forever"
          no-caps
          @click="deleteSelected"
        />
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            color="negative"
            icon-right="delete"
            no-caps
            flat
            dense
            @click="deleteItem(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div>

  </q-layout>
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
      selected: [],
      columns: [
        {
          name: 'id',
          label: 'id',
          align: 'left',
          field: 'id',
        },
        {
          name: 'name',
          label: 'name',
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
        },
        {
          name: 'action',
          label: 'Delete',
          align: 'center',
          field: 'action',
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
        await this.getItems();
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
    },
    async deleteItem(itemId) {
      try {
        console.log(itemId);
        // Отправить запрос на удаление объекта
        await axios.delete(`http://127.0.0.1:8000/items/${itemId}`);
        // Получить обновленные данные
        await this.getItems();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteSelected() {
      try {
        // Отправить запрос на удаление объекта
        await axios.delete('http://127.0.0.1:8000/delete_items/', this.selected);
        // Получить обновленные данные
        await this.getItems();
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getItems();
  }
};
</script>
