<template>
  <div class="saved-folder">{{ niceName }}

    <q-btn @click="removeFavFolder(path)">x</q-btn>
  </div>

</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    niceName: String,
    icon: String,
    path: String
  },
  methods: {
    ...mapActions(['removeFavFolder'])
  }
};
</script>

<style lang="scss">
.saved-folder {
  background: pink;
  width: 100%;
  height: 30px;
  margin: 1px;

}
</style>
