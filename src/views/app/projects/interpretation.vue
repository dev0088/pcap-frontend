<template>
  <div class="main-content">
    <breadcumb :page="'Interpretation'" :folder="'Projects'" />
    <b-row class="mb-30">
      <b-col>
        <b-modal id="modal-1" title="Add">
          <b-row>
            <b-form-group
              class="col-md-6 mb-3"
              label="Application"
            >
              <b-form-input
                type="text"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              class="col-md-6 mb-3"
              label="Context"
            >
              <b-form-input
                type="text"
                required
              ></b-form-input>
            </b-form-group>
          </b-row>     
          <b-row>
            <b-form-group
              class="col-md-6 mb-3"
              label="Pattern"
            >
              <b-form-input
                type="text"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              class="col-md-6 mb-3"
              label="Description"
            >
              <b-form-input
                type="text"
                required
              ></b-form-input>
            </b-form-group>
          </b-row>                
        </b-modal>            
        <b-card title="Interpretation" class="text-left ">
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

          <b-button variant="primary ripple m-1 add-button-i add-button-interpretation" v-b-modal.modal-1>Add New</b-button>
        </b-card>
      </b-col>
    </b-row>

    <b-card class="wrapper csv-area mb-30">
      <h4 class="heading">CSV Upload</h4>
      <b-form>
        <input type="file" />
        <b-button variant="primary ripple m-1">Upload</b-button>
      </b-form>
    </b-card>    
  </div>
</template>

<script>
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Interpretation"
  },
  data() {
    return {
      columns: [
        {
          label: "Id",
          field: "id",
        },
        {
          label: "Application",
          field: "app"
        },        
        {
          label: "Context",
          field: "context"
        },
        {
          label: "Pattern",
          field: "pattern"
        },
        {
          label: "Description",
          field: "description"
        }        
      ],
      rows: [
        {
          id: 1,
          app: 'http',
          context: 'www.facebook.com',
          pattern: 'Content-Length',
          description: 'Description'
        }                                               
      ]
    };
  }  
};
</script>
<style>
.add-button-interpretation {
  margin-top: 30px!important;
}
.mb-30 {
  margin-top: unset!important;
}
</style>
