<script setup lang="ts">

</script>

<template>
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
</template>

<style scoped>

</style>
