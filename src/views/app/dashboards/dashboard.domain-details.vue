<template>
  <div class="main-content">
    <breadcumb :page="'Domain Details'" :folder="'Domains'" />
    <b-modal id="modal-1" title="Edit">
      <b-row>
        <b-form-group
          class="col-md-6 mb-3"
          label="Domain Name"
        >
          <b-form-input
            type="text"
            required
            value="domain.com"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="col-md-6 mb-3"
          label="Details"
        >
          <b-form-input
            type="text"
            required
            value="Details"
          ></b-form-input>
        </b-form-group>
      </b-row>      
    </b-modal>    
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
            <b-button variant="primary ripple m-1" v-b-modal.modal-1>Edit</b-button>
            <b-button variant="danger m-1" @click="deleteDomainDetails">Remove</b-button>
          </span>
        </template>
      </vue-good-table>
    </b-card>

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
    title: "Domain Details"
  },
  data() {
    return {
      columns: [
        {
          label: "Domain Name ",
          field: "domain",
        },
        {
          label: "Details",
          field: "details"
        },
        {
          label: "Actions",
          field: "actions",
          html: true,
          width: "250px"
        }        
      ],
      rows: [
        {
          domain: 'domain.com',
          details: 'more details'
        },    
        {
          domain: 'domain.com',
          details: 'more details'
        },    
        {
          domain: 'domain.com',
          details: 'more details'
        },    
        {
          domain: 'domain.com',
          details: 'more details'
        },                                                    
      ]
    };
  },
  methods: {
    deleteDomainDetails() {
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
.mb-30 {
  margin-top: 30px;
}
.csv-area .heading {
  margin-bottom: 20px;
}
</style>
