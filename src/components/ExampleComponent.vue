<template>
  <q-layout style="width: 90%">
    <div style="width: 100%; margin-top: 20px; display:flex; justify-content: end;
     align-items: center">
      <q-btn style="padding: 5px 70px" @click="handleHome" label="SKYDOCS" color="primary" />
    </div>
    <q-banner rounded style="margin:16px 0; text-align: center;
    background-color: #c5e1a5">Тестирование таблицы Postgres SQL</q-banner>

    <div style="width: 100%; display:flex; justify-content: center; align-items: center">
      <q-card style="width: 80%;">
        <q-input style="padding: 0 10px" v-model="name" label="Name"></q-input>
        <q-input style="padding: 0 10px" v-model="description" label="Description"></q-input>
        <q-input style="padding: 0 10px" v-model="price" label="Price"></q-input>
        <q-input style="padding: 0 10px" v-model="tax" label="Tax"></q-input>
        <div style="width: 100%; display:flex; justify-content: center; align-items: center">
          <q-btn style="width: 100%; padding: 0 10px; margin: 10px; background-color: #00b0ff"
                 @click="postData" label="Submit"></q-btn>
        </div>
      </q-card>
    </div>

    <q-table
      style="margin-top: 20px"
      :color="'brown'"
      :rows="items"
      :columns="columns"
      row-key="id"
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

    <div class="q-mt-md">
      Selected: {{ JSON.stringify(selectedIds) }}
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
  computed: {
    selectedIds() {
      return this.selected.map((item) => item.id);
    }
  },
  methods: {
    handleHome() {
      this.$router.push('/home');
    },
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
        const body = { ids: this.selectedIds };
        // Отправить запрос на удаление объекта
        await axios.delete('http://127.0.0.1:8000/delete_items/', { data: body });
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
