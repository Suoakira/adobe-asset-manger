<template>
  <div class="listview-container">
    <h5>List view</h5>
    <q-btn @click="convertToNodes(getFilesAndFolders)">Test</q-btn>
    <div class="q-pa-md q-gutter-sm">
      <q-tree
      :nodes="lazy"
      icon="folder"
      default-expand-all
      node-key="label"
      @lazy-load="onLazyLoad"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      lazy: [
        {
          label: "Node 1",
          children: [
            { label: "Node 1.1", lazy: true },
            { label: "Node 1.2", lazy: true }
          ]
        },
        {
          label: "Node 2",
          lazy: true
        },
        {
          label: "Lazy load empty",
          lazy: true
        },
        {
          label: "Node is not expandable",
          expandable: false,
          children: [{ label: "Some node" }]
        }
      ],
    };
  },

  methods: {
    onLazyLoad({ node, key, done, fail }) {
      // call fail() if any error occurs
      
      this.$store.dispatch("navigatePath", node.filePath)

      this.convertToNodes(this.getFilesAndFolders)

      // setTimeout(() => {
        // simulate loading and setting an empty node
        if (key.indexOf("Lazy load empty") > -1) {
          done([]);
          return;
        }

        done(this.convertToNodes(this.getFilesAndFolders))


      //   const label = node.label;
      //   done([
      //     { label: `${label}.1` },
      //     { label: `${label}.2`, lazy: true },
      //     {
      //       label: `${label}.3`,
      //       children: [
      //         { label: `${label}.3.1`, lazy: true },
      //         { label: `${label}.3.2`, lazy: true }
      //       ]
      //     }
      //   ]);
      // }, 1000);
    },

    convertToNodes(filesAndFolders) {
      const fileTreeNodes = filesAndFolders.map(file => {
        return {
          label: file.label + Date.now(),
          expandable: file.isDir,
          lazy: file.isDir,
          filePath: file.nodeKey,
          children: []
        };
      });

      // this.lazy = fileTreeNodes

      console.log("fileTreeNodes", fileTreeNodes);
      return fileTreeNodes.filter(file => file.expandable);
    },

    retrieveFilesAndFolders() {
      console.log(this.getFilesAndFolders);
      return this.getFilesAndFolders;
    }
  },

  computed: {
    ...mapGetters(["getFilesAndFolders"])
  },

  created() {
    this.lazy = this.convertToNodes(this.getFilesAndFolders)
  }
};
</script>

<style lang="scss" scoped>
.listview-container {
  position: fixed;
  right: 407px;
  width: 300px;
  max-width: 780px;
  top: 40px;
  height: 100%;
  background: pink;

  .selected-file {
    background: yellow;
  }
}
</style>