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

        <div class="q-pa-md">
          <q-uploader
            url="http://localhost:8000/upload"
            accept=".jpg, .jpeg, .png"
            multiple
            @added="file_selected">
          </q-uploader>

          <q-btn @click="uploadFile()">Upload</q-btn>
        </div>

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
// import { onMounted, ref } from "vue";

export default {

  data() {
    return {
      selectedFile: '',
      checkIfDocumentUpload: '',
      headers: { 'Content-Type': 'multipart/form-data' },
      name: '',
      description: '',
      price: '',
      tax: '',
      attaches: [],
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
    file_selected(files) {
      this.selectedFile = files;
      this.checkIfDocumentUpload = true;
    },
    async uploadFile() {
      const fd = new FormData();
      console.log('selectedFile.length: ' + this.selectedFile.length);
      for (let x = 0; x < this.selectedFile.length; x++) {
        console.log('selectedFile.x: ' + x);
        fd.append('files', this.selectedFile[x]);
      }
      /* fd.append('name', this.name);
      fd.append('tax', this.tax);
      fd.append('description', this.description);
      fd.append('price', this.price); */
      console.log(fd)
      try {
        const response = await axios.post('http://localhost:8000/upload', fd, {
          headers: this.headers,
        });
        console.log('response.data.ok: ' + response.data.ok);
        // Обработка успешного ответа
        if (response.data.ok) {
          // Здесь можно добавить код для дальнейшей обработки
        }
      } catch (error) {
        // Обработка ошибки, если запрос не удался
        console.error('Ошибка при загрузке файла:', error);
        // Здесь можно добавить код для отображения сообщения об ошибке пользователю
      }
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
        this.selected = [];
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
