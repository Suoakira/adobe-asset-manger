<template>
  <div class="sidebar-left-container">
    <q-expansion-item expand-separator v-model="favTabExpanded" label="Librarys">
      <q-card>
        <q-card-section>
          <div v-for="savedFolder in getSavedFolders" :key="savedFolder">
            <SavedFolderCard :savedFolderPath="savedFolder" :niceName="folderNicename(savedFolder)"></SavedFolderCard>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item expand-separator v-model="getFileTreeExpanded" label="File Tree">
      <q-card>
        <q-card-section>
          <FBListView />
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import FBListView from "./FBListView";
import SavedFolderCard from "./_SavedFolderCard";

export default {
  data: () => ({
    favTabExpanded: true,
    getFileTreeExpanded: true
  }),
  components: {
    FBListView,
    SavedFolderCard
  },
  methods: {
    folderNicename(path) {
      const splitPath = path.split("/");

      return splitPath[splitPath.length - 1];
    }
  },
  computed: {
    ...mapGetters(["getSavedFolders"])
  }
};
</script>

<style lang="scss">
.sidebar-left-container {
  position: fixed;

  width: 200px;
  max-width: 780px;
  top: 40px;
  height: 100%;
  background: #272727;
  box-shadow: 0 8px 30px 0 rgba(0, 0, 0, 0.2);

  .q-item {
    background: #2e2e2e;
  }

  .q-item__label {
    opacity: 0.6;
    font-size: 10px;
    color: #ffffff;
    font-weight: 500;
  }

  .q-item__label--caption {
    opacity: 0.6;
    font-size: 10px;
    color: #ffffff;
    font-weight: 300;
  }

  .q-expansion-item__toggle-icon {
    font-size: 16px !important;
  }

  .q-card__section {
    padding: 4px 0px 4px 16px;
    background: #272727;
  }

  .q-pa-md {
    &.q-gutter-sm {
      padding: 0px;
    }
  }
}
</style>