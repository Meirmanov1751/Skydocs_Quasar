<script setup lang="ts">

</script>

<template>

  <div class="page">
    <aside class="sidebar">
      <div class="sidebar__logo">
        <img src="src/assets/logo.png" alt="123" />
      </div>
      <div class="sidebar__info">
        <div class="sidebar__info-time">12:23</div>
        <div class="sidebar__info-tools">
          <button>
            <img src="src/assets/sun.png" alt="" />
          </button>
          <button>
            <img src="src/assets/sun.png" alt="" />
          </button>
          <button>
            <img src="src/assets/sun.png" alt="" />
          </button>
        </div>
      </div>
      <nav class="sidebar__menu">
        <h2 class="sidebar__menu-title">Меню</h2>
        <ul class="sidebar__menu-items">
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Рабочий стол
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Структура АО КТК <span>></span>
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Делопроизводство <span>></span>
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Фин-ОЦО <span>></span>
            </a>
          </li>
        </ul>
      </nav>
      <nav class="sidebar__menu">
        <h2 class="sidebar__menu-title">Личный кабинет</h2>
        <ul class="sidebar__menu-items">
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Профиль
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Почта <span>></span>
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Календарь <span>></span>
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Счет
            </a>
          </li>
        </ul>
      </nav>
      <nav class="sidebar__menu">
        <h2 class="sidebar__menu-title">Справочники</h2>
        <ul class="sidebar__menu-items">
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Инструменты СЭД <span>></span>
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Специальные плагины <span>></span>
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Графики
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Таблицы
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              UI элементы <span>></span>
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Формы
            </a>
          </li>
          <li>
            <a href="#">
              <img src="src/assets/menu.png" alt="" />
              Параметры сетки
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    <header class="header">
      <div class="header__left">
        <button class="header__sort">
          <img src="src/assets/sort.png" alt="">
        </button>
        <div class="header__search">
          <input type="search" placeholder="Общий поиск">
          <button class="header__search-btn">
            <img src="src/assets/search.png" alt="">
          </button>
        </div>
      </div>
      <div class="header__right">
        <div class="header__btns">
          <button>
            <img src="src/assets/folder.png" alt="">
          </button>
          <button>
            <img src="src/assets/folder.png" alt="">
          </button>
          <button>
            <img src="src/assets/folder.png" alt="">
          </button>
        </div>
        <button class="header__profile">
          <img class="header__profile-avatar" src="src/assets/avatar.png" alt="">
          <div class="header__profile-info">
            <div class="header__profile-info__text">
              <h5>Генеральный директор</h5>
              <p>Фамилия И. О.</p>
            </div>
            <span>></span>
          </div>
        </button>
      </div>
    </header>
    <main class="main">
      <div class="card">
        <div class="card__header">
          <div class="breadcrumbs">
            <q-breadcrumbs>
              <q-breadcrumbs-el class="breadcrumbs__item" label="Делопроизводство" to="/" />
              <q-breadcrumbs-el class="breadcrumbs__item" label="Входящие документы"
                                @click="handleCorrin"  />
              <q-breadcrumbs-el class="breadcrumbs__item" label="Исходящие докумееты"
                                @click="handleCorrout"  />
              <q-breadcrumbs-el class="breadcrumbs__item active" label="Общая корреспонденция" />
            </q-breadcrumbs>
          </div>
          <div class="card__tools">
            <button class="card__tools-item">
              <img src="src/assets/edit.png" alt="">
            </button>
            <button class="card__tools-item">
              <img src="src/assets/edit.png" alt="">
            </button>
            <button class="card__tools-item">
              <img src="src/assets/edit.png" alt="">
            </button>
          </div>
        </div>
        <div class="card__menu">
          <div class="card__menu-action">
            <span>Не выбрано</span>
            <div class="btn">Действие </div>
          </div>
          <div class="card__menu-sort">

          </div>
        </div>
      </div>
    </main>
  </div>

<!--  <q-page class="flex flex-center">
    <q-btn @click="handleCorrin" label="corrin" color="primary" />
    <q-btn @click="handleCorrout" label="corrout" color="primary" />
  </q-page>-->
</template>

<script>
export default {
  methods: {
    handleCorrin() {
      this.$router.push('/corrin');
    },
    handleCorrout() {
      this.$router.push('/corrout');
    }
  }
};
</script>

<style scoped>

</style>
