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
          <vue-editable-grid
            class="grid"
            ref="grid"
            id="mygrid"
            :column-defs="columnDefs"
            :row-data="rowDatas"
            row-data-key='interpretationId'
            @cell-updated="cellUpdated"
            @row-selected="rowSelected"
          >
            <template v-slot:header>
              Interpretation Datas
            </template>
            <template v-slot:header-r>
              Total rows: {{ rowDatas.length }}
            </template>
          </vue-editable-grid>

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
      columnDefs: [
        { sortable: true, filter: true, field: 'Context', headerName: 'Context', editable: true },
        { sortable: true, filter: true, field: 'Type', headerName: 'Type', editable: true },
        { sortable: true, filter: true, field: 'Expression', headerName: 'Expression', editable: true },
        { sortable: true, filter: true, field: 'Description', headerName: 'Description',  editable: true },
        { sortable: true, filter: true, field: 'Color', headerName: 'Color',  editable: true }
      ],
      rowDatas: [
        {
          Context: 'Context',
          Type: 'Type',
          Expression: 'Expression',
          Description: '',
          Color: 'None'
        },
        {
          Context: 'Context',
          Type: 'Type',
          Expression: 'Expression',
          Description: '',
          Color: 'None'
        },
        {
          Context: 'Context',
          Type: 'Type',
          Expression: 'Expression',
          Description: '',
          Color: 'None'
        },
        {
          Context: 'Context',
          Type: 'Type',
          Expression: 'Expression',
          Description: '',
          Color: 'None'
        }                                
      ]
    };
  },
  methods: {
    cellUpdated(event) {
      
    },
    rowSelected() {
      
    },    
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
.grid {
  height: 400px;
}
</style>
