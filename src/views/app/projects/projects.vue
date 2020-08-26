<template>
  <div class="main-content">
    <breadcumb :page="'All Projects Archive'" :folder="'Projects'" />
    <b-card class="wrapper">
      <vue-good-table
        :columns="columns"
        :pagination-options="{
          enabled: true,
          mode: 'records'
        }"
        styleClass="tableOne vgt-table"
        :rows="rows"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'actions'">
            <b-button variant="danger m-1" @click="deleteFromArchive">Delete</b-button>
            <b-button variant="light m-1" @click="deleteFromArchive">Remove</b-button>
            <b-button variant="primary ripple m-1">Download</b-button>
          </span>
        </template>
      </vue-good-table>
    </b-card>
  </div>
</template>

<script>
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "All Project Archive"
  },
  data() {
    return {
      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Details",
          field: "details"
        },        
        {
          label: "Actions",
          field: "actions",
          html: true,
          width: "320px"
        }        
      ],
      rows: [
        {
          name: 'Project name',
          details: 'more details'
        },    
        {
          name: 'Project name',
          details: 'more details'
        },    
        {
          name: 'Project name',
          details: 'more details'
        },    
        {
          name: 'Project name',
          details: 'more details'
        },                                                    
      ]
    };
  },
  methods: {
    deleteFromArchive() {
      this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("Are you sure?")
        .then(value => {
          this.boxOne = value;
        })
        .catch(err => {
          // An error occurred
        });
    },
  }  
};
</script>
<style>

</style>
