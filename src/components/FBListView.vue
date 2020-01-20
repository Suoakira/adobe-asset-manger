<template>
  <div class="listview-container">

    <div class="q-pa-md q-gutter-sm">
      <q-tree
      :nodes="lazy"
      icon="folder"
      default-expand-all
      node-key="filePath"
      @lazy-load="onLazyLoad"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import uuidv1 from 'uuid/v1';

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

        if (key.indexOf("Lazy load empty") > -1) {
          done([]);
          return;
        }

        const childNodes = this.convertToNodes(this.getFilesAndFolders)
        done(childNodes)

    },

    convertToNodes(filesAndFolders) {
      const fileTreeNodes = filesAndFolders.map(file => {
        return {
          label: file.label,
          expandable: file.isDir,
          lazy: file.isDir,
          filePath: file.nodeKey,
          children: []
        };
      });


      return fileTreeNodes.filter(file => file.expandable);
    },

    retrieveFilesAndFolders() {

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

<style lang="scss" >
.listview-container {
  position: fixed;
  width: 269px;
  max-width: 780px;
  top: 0px;
  height: 100%;
  background: #2e2e2e;

 .q-mr-xs {
        color: #80D3F7;

  }

  .q-tree__node-header-content {
    width: 70%;
    float: right;
    opacity: 0.4;
    font-weight: 500;
    font-size: 11px;
    color: white;
    text-align: left;
    padding-left: 4px;

    &:hover {
      opacity: 0.8;
    }

  }

  .selected-file {
    background: yellow;
  }
}
</style>