<template>
  <q-layout style="width: 90%">
    <q-banner rounded style="margin:16px 0; text-align: center;
    background-color: #c5e1a5">Тестирование таблицы Postgres SQL
    </q-banner>

    <div style="width: 100%; display:flex; justify-content: center; align-items: center">
      <q-card style="width: 80%;">
        <q-input style="padding: 0 10px" v-model="name" label="Name"></q-input>
        <q-input style="padding: 0 10px" v-model="description" label="Description"></q-input>
        <q-input style="padding: 0 10px" v-model="price" label="Price"></q-input>
        <q-input style="padding: 0 10px" v-model="tax" label="Tax"></q-input>
        <q-img src="http://localhost:8000/attachments/26" width="100px" ></q-img>
        <q-editor style="padding: 0 10px" v-model="sod" model-value=""></q-editor>
        <slot><div>sod2: {{sod}}</div></slot>

        <q-editor
          v-model="sod"
          readonly
          :definitions="editorDefinitions"
          class="readonly-editor"
        />

        <div class="q-pa-md">
          <q-uploader
            ref="uploader"
            field-name="files"
            url="http://localhost:8000/upload"
            accept=".jpg, .jpeg, .png, .docx"
            multiple
            @uploaded="clearUploader"
            @added="file_selected">
          </q-uploader>

          <q-btn @click="uploadFile">Upload</q-btn>
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
import { ref, reactive, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const selectedFile = ref('');
    const checkIfDocumentUpload = ref('');
    const name = ref('');
    const description = ref('');
    const price = ref('');
    const tax = ref('');
    const sod = ref('');
    const attaches = reactive([]);
    const items = ref([]);
    const selected = ref([]);
    const uploader = ref([]);

    const columns = [
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
    const selectedIds = computed(() => {
      return selected.value.map(item => item.id);
    });

    const handleHome = () => {
      router.push('/home');
    };

    const file_selected = (files) => {
      selectedFile.value = files;
      checkIfDocumentUpload.value = true;
    };

    const uploadFile = async () => {
      try {
        // console.log('[Sod]:' + sod.value)
        if (selectedFile.value.length < 1) {
          console.log('нет данных для загрузки на сервер')
          return
        }
        const fd = new FormData();
        for (let x = 0; x < selectedFile.value.length; x++) {
          console.log('[' + x + ' / ' + selectedFile.value.length + ']->send: ' + selectedFile.value[x].name)
          fd.append('files', selectedFile.value[x]);
        }
        const response = await axios.post('http://localhost:8000/upload', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.ok) {
          // Обработка успешного ответа

          console.log('отправка успешно обработана')
          // uploader.updateFileStatus(selectedFile.value[x], 'uploaded', 100)
          // uploader.ref.updateFileStatus(selectedFile.value[x], 'uploaded', 100)
        };

        console.log(uploader.value)
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
      }
    };

    const getItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/inserted/');
        items.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const postData = async () => {
      try {
        await axios.post('http://127.0.0.1:8000/insert/', {
          name: name.value,
          description: description.value,
          price: price.value,
          tax: tax.value,
        });
        await getItems();
        // Очистить форму после отправки данных
        name.value = '';
        description.value = '';
        price.value = '';
        tax.value = '';
      } catch (error) {
        console.error(error);
      }
    };

    const deleteItem = async (itemId) => {
      try {
        console.log(itemId);
        // Отправить запрос на удаление объекта
        await axios.delete(`http://127.0.0.1:8000/items/${itemId}`);
        // Получить обновленные данные
        await getItems();
      } catch (error) {
        console.error(error);
      }
    };

    const deleteSelected = async () => {
      try {
        const body = { ids: selectedIds };
        // Отправить запрос на удаление объекта
        await axios.delete('http://127.0.0.1:8000/delete_items/', { data: body });
        selected.value = [];
        // Получить обновленные данные
        await getItems();
      } catch (error) {
        console.error(error);
      }
    };

    const clearUploader = () => {
      // Очистить q-uploader
      uploader.value = [];
    };
    // Вызываем функцию getItems после монтирования компонента
    getItems();
    // Возвращаем переменные и методы для использования в шаблоне
    return {
      selectedFile,
      checkIfDocumentUpload,
      name,
      description,
      price,
      tax,
      sod,
      attaches,
      items,
      selected,
      columns,
      selectedIds,
      uploader,
      clearUploader,
      handleHome,
      file_selected,
      uploadFile,
      postData,
      getItems,
      deleteItem,
      deleteSelected
    };
  }
};
</script>

<style>
.readonly-editor .q-editor__toolbars-container {
  display: none;
}

</style>
