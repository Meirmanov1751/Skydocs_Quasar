<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if='!leftDrawerOpen' elevated>
      <q-toolbar>

        <q-btn
          id="sidebar-button"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <div id="header-search">
          <input
            placeholder=""
            id="header-search-input"
          >

          <img src="../assets/images/header-search.svg"
               style="width: 34px;" id="header-search-icon">
        </div>

        <div>
          <img src="../assets/images/mail.svg"
               style="width: 28px; height: 28px; margin-left: 20px;">
          <img src="../assets/images/notification.svg"
               style="width: 28px; height: 28px; margin-left: 20px;">
          <img src="../assets/images/V.svg"
               style="width: 28px; height: 28px; margin-left: 20px;">
        </div>

        <div id="account" style="flex-direction: row;display: flex;width: 227px;height: 42px;
        margin-left: 69px;">
          <q-icon :name="biPersonCircle"
                  style="color: #434F63;" size="34px"></q-icon>
          <div style="margin-left: 10px;display: flex;flex-direction: column;">
            <p>Ген дир</p>
            <p>ФИО</p>
          </div>
          <img src="../assets/images/arrow-down-sign-to-navigate.svg" style="width: 10px;">
        </div>

      </q-toolbar>
    </q-header>

    <q-header v-if='leftDrawerOpen' elevated>
      <q-toolbar>

        <q-btn
          id="sidebar-button"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <div id="header-search" style="width: 1250px;">
          <input
            placeholder=""
            id="header-search-input"
          >

          <img src="../assets/images/header-search.svg"
               style="width: 34px;" id="header-search-icon">
        </div>

        <div>
          <img src="../assets/images/mail.svg" style="width: 28px; height: 28px;
           margin-left: 20px;">
          <img src="../assets/images/notification.svg"
               style="width: 28px; height: 28px; margin-left: 20px;">
          <img src="../assets/images/V.svg" style="width: 28px; height: 28px; margin-left: 20px;">
        </div>

        <div id="account" style="flex-direction: row;display: flex;width: 227px;height: 42px;
        margin-left: 69px;">
          <q-icon :name="biPersonCircle" style="color: #434F63;" size="34px"></q-icon>
          <div style="margin-left: 10px;display: flex;flex-direction: column;">
            <p>Ген дир</p>
            <p>ФИО</p>
          </div>
          <img src="../assets/images/arrow-down-sign-to-navigate.svg" style="width: 10px;">
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer
      :width="leftDrawerWidth"
      show-if-above
      bordered
    >
      <q-list>
        <div id="sidebar-wrapper" v-if="leftDrawerOpen">
          <LogoImage/>

          <div id="sidebar-menu-info" style="height: 22px; margin-top: 36px;
           margin-bottom: 25px"></div>

          <hr style="width: 50%; margin-bottom: 34px">

          <div class="circle"></div>

          <EssentialLinkShort
            v-for="link in MenuLinksList"
            :key="link.title"
            v-bind="link"/>

          <div class="circle" style="margin-top: 60px"></div>

          <EssentialLinkShort
            v-for="link in CabinetLinksList"
            :key="link.title"
            v-bind="link"/>

          <div class="circle" style="margin-top: 60px"></div>

          <EssentialLinkShort
            v-for="link in SpravLinksList"
            :key="link.title"
            v-bind="link"/>

        </div>

        <div id="sidebar-wrapper" v-if="!leftDrawerOpen">
          <FullLogo/>
          <div id="sidebar-menu-info"
               style="width: 233px; height: 22px; display: flex;
                margin-left: 36px;
                margin-top: 36px; margin-bottom: 25px">
            <p id="current-time"
               style="font-size: 19px; height: 22px; margin: 0; margin-top: -5px;">12:31</p>
            <div id="sidebar-menu-info-icons" style="margin-left: 83px">
              <img src="../assets/images/theme.svg">
              <img src="../assets/images/language.svg" style="margin-left: 20px">
              <img src="../assets/images/full-screen.svg" style="margin-left: 20px">
            </div>
          </div>

          <hr style="width: 80%; margin-bottom: 34px">

          <p class="menu-p">МЕНЮ</p>

          <EssentialLink
            v-for="link in MenuLinksList"
            :key="link.title"
            v-bind="link"
          />

          <p class="menu-p" style="margin-top: 60px;">ЛИЧНЫЙ КАБИНЕТ</p>

          <EssentialLink
            v-for="link in CabinetLinksList"
            :key="link.title"
            v-bind="link"
          />

          <p class="menu-p" style="margin-top: 60px;">СПРАВОЧНИКИ</p>

          <EssentialLink
            v-for="link in SpravLinksList"
            :key="link.title"
            v-bind="link"
          />

        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/layouts/EssentialLink.vue'
import EssentialLinkShort from 'components/layouts/EssentialLinkShort.vue';
import FullLogo from 'components/layouts/FullLogo.vue';
import LogoImage from 'components/layouts/LogoImage.vue';
import { biPersonCircle } from '@quasar/extras/bootstrap-icons'

defineOptions({
  name: 'MainLayout'
})

const MenuLinksList = [
  {
    title: 'ТЕСТ АНВАРА',
    icon: 'src/assets/images/profile.svg',
    id: 'profile',
    link: '/',
  },
  {
    title: 'Рабочий стол',
    icon: 'src/assets/images/desktop.svg',
    id: 'desktop',
    link: '/desktop',
  },
  {
    title: 'Структура АО КТК',
    icon: 'src/assets/images/ao-ktk-struct.svg',
    id: 'ao-ktk-struct',
    link: '/ao-ktk-struct',
  },
  {
    title: 'Делопроизводство',
    icon: 'src/assets/images/dp.svg',
    id: 'dp',
    link: '/dp',
  },
  {
    title: 'Фин-ОЦО',
    icon: 'src/assets/images/fin-oco.svg',
    id: 'fin-oco',
    link: '/fin-oco',
  },
]

const CabinetLinksList = [

  {
    title: 'Профиль',
    icon: 'src/assets/images/profile.svg',
    id: 'profile',
    link: '/profile',
  },
  {
    title: 'Почта',
    icon: 'src/assets/images/sidebar-mail.svg',
    id: 'sidebar-mail',
    link: '/sidebar-mail',
  },
  {
    title: 'Календарь',
    icon: 'src/assets/images/calendar.svg',
    id: 'sidebar-calendar',
    link: '/sidebar-calendar',
  },
  {
    title: 'Счет',
    icon: 'src/assets/images/calc.svg',
    id: 'sidebar-calc',
    link: '/sidebar-calc',
  },
]

const SpravLinksList = [
  {
    title: 'Инструменты СЭД',
    icon: 'src/assets/images/sad-inst.svg',
    id: 'sad-inst',
    link: '/sad-inst',
  },
  {
    title: 'Специальные плагины',
    icon: 'src/assets/images/spec-plugins.svg',
    id: 'spec-plugins',
    link: '/spec-plugins',
  },
  {
    title: 'Графики',
    icon: 'src/assets/images/charts.svg',
    id: 'charts',
    link: '/charts',
  },
  {
    title: 'Таблицы',
    icon: 'src/assets/images/tables.svg',
    id: 'tables',
    link: '/tables',
  },
  {
    title: 'UI элементы',
    icon: 'src/assets/images/ui-elems.svg',
    id: 'ui-elems',
    link: '/ui-elems',
  },
  {
    title: 'Формы',
    icon: 'src/assets/images/forms.svg',
    id: 'forms',
    link: '/forms',
  },
  {
    title: 'Параметры сетки',
    icon: 'src/assets/images/params.svg',
    id: 'params',
    link: '/params',
  },
]

const leftDrawerOpen = ref(false)
const leftDrawerWidth = ref(320)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
  if( leftDrawerWidth.value === 320 ) {
    leftDrawerWidth.value = 96
  } else {
    leftDrawerWidth.value = 320
  }
  console.log(leftDrawerWidth.value)
}

</script>

<!-- Notice lang='scss' -->
<style lang='scss'>
body{
  background: #F8F8FA
}

.q-header{
  display: flex;
  height: 70px;
  background-color: white;
  padding: 10px 32px 15px 32px;
}

#header-search-input{
  height: 34px;
  width: 266px;
  border: 1px solid black;
  border-radius: 20px;
  background-color: #F8F8FA;
  margin-left: 37px;
}

.q-btn{
  background-color: #434F63;
}

#header-search{
  width: 1024px;
  display: flex;
}

#header-search-icon{
  margin-left: -34px;
  top: 2px;
  color: #434F63;
}

#mailIcon{
  color: #434F63;
}

#account p {
  color: black;
  margin: 0;
  margin-top: -2px;
  width: 160px;
}

.menu-p{
  margin-left: 20px;
  color: #097CB4;
  font-weight: 700;
}

.content{
  width: calc(100% - 100px);
  min-height: 800px;
  margin: 50px 45px 110px 32px;
  border: 2px solid white;
  border-radius: 10px;
  background: white;
  box-shadow: rgb(169 169 169) 1px 1px 15px
}

.circle{
  height: 10px;
  width: 10px;
  background: #097CB4;
  border: 1px solid #097CB4;
  border-radius: 25px;
  margin-left: 43px;
  margin-bottom: 15px;
}

</style>
