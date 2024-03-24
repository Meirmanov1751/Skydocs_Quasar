<template>
  <!-- <q-item
    clickable
    tag="a"
    target="_blank"
    :href="props.link"
  >
    <q-item-section
      v-if="props.icon"
      avatar
    >
      <img :src="props.icon">
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
    </q-item-section>
  </q-item> -->

  <div class="sidebar-menu-item"
      v-if="allowed.includes(props.id)"
      :id="props.id"
      style="display: flex;
            width: 55px;
            height: 36px;
            margin-bottom: 20px;
            padding-top: 5px;
            margin-left: 31px;"
      :onclick="(e) => {
        changeHash(e, props.link)
      }"
      >

        <img :src="props.icon" style="margin-left: 5px; height: 24px;">
        <img v-if="allowed.includes(props.id)"
            src="../../assets/images/arrow-right-sign-to-navigate.svg"
            style="height: 10px; margin-top: 7px; margin-left: 10px;"
            class="sidebar-menu-arrow-right" >

  </div>

  <div class="sidebar-menu-item"
      v-if="!allowed.includes(props.id)"
      :id="props.id"
      style="display: flex;
            width: 35px;
            height: 36px;
            margin-bottom: 20px;
            padding-top: 5px;
            margin-left: 31px"
      :onclick="(e) => {
        changeHash(e, props.link)
      }"
      >

        <img :src="props.icon" style="margin-left: 5px; height: 24px;">

  </div>

</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

defineOptions({
  name: 'EssentialLink'
})

const allowed = [
  'ao-ktk-struct',
  'dp',
  'fin-oco',
  'sidebar-mail',
  'sidebar-calendar',
  'sad-inst',
  'spec-plugins',
  'ui-elems'
]

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    default: ''
  },

  link: {
    type: String,
    default: '#'
  },

  icon: {
    type: String,
    default: ''
  },

  id: {
    type: String,
    required: true
  }
})

function changeHash( e, hash ) {
  router.push(hash);
}

</script>

<style lang="scss">

.q-item__section{
  margin-left: 0;
}

.sidebar-menu-item {
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 25px;
}

.sidebar-menu-item:hover {
  background-color: #6FD5F5;
  cursor: pointer;
  border: 1px solid #6FD5F5;
  border-radius: 25px;
}

.sidebar-menu-p{
  margin: 0;
  margin-left: 10px;

  color: black;

  margin-top: 2px;
  width: 200px;
}

.sidebar-menu-arrow-right{
  height: 10px;
  margin-top: 6px;
}

</style>
