<template>
  <div class="main-content">
    <breadcumb :page="'All Projects Archive'" :folder="'Projects'" />
    <b-card class="wrapper all-projects">
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
            <b-button variant="danger ripple" @click="deleteFromArchive">
              <i class="i-Folder-Close"></i>
            </b-button>
            <b-button variant="light m-1 ripple" @click="deleteFromArchive">
              <i class="i-Folder-Remove"></i>
            </b-button>
            <b-button variant="primary ripple m-1">
              <i class="i-Folder-Download"></i>
            </b-button>        
            <router-link tag="a" to="/" class="primary ripple m-1">
              Analyzes
            </router-link>        
            <router-link tag="a" to="/app/projects/scenario" class="primary ripple m-1">
              Scenarios
            </router-link>                             
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
          width: "420px"
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
.all-projects i {
  font-size: 18px;
}
</style>
