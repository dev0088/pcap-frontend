<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <breadcumb :page="'Vue Good Table'" :folder="'Datatables'" />
    <!-- <div class="wrapper"> -->
    <vue-good-table
      :columns="columns"
      :line-numbers="true"
      :search-options="{
        enabled: true,
        placeholder: 'Search this table'
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records'
      }"
      styleClass="tableOne vgt-table"
      :selectOptions="{
        enabled: false,
        selectionInfoClass: 'table-alert__box'
      }"
      :rows="rows"
    >
      <div slot="table-actions" class="mb-3">
        <!-- <b-button variant="primary" class="btn-rounded" @click="addDomain">
          Add New Domain
        </b-button> -->
        <b-button v-b-modal.modal-1 block variant="primary mb-30" class="btn-rounded">
          + Add New Domain
        </b-button>

          <b-modal id="modal-1" centered title="Add New Domain" hide-footer>
            <b-form @submit.prevent="addDomain()">
              <b-form-group id="input-group-1" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="text"
                  v-model="domainForm.name"
                  placeholder="domain name...."
                ></b-form-input>
              </b-form-group>
              
              <b-form-group>
                <b-form-textarea
                  id="textarea"
                  v-model="domainForm.description"
                  placeholder="Description..."
                  rows="3"
                ></b-form-textarea>
              </b-form-group>
              
              <b-row>
                <b-col lg="12" xl="12" md="12" class="text-right">
                  <b-button type="submit" variant="outline-primary" class="btn-mr2">Submit</b-button>
                  <b-button type="reset" variant="outline-danger" class="btn-mr2">Reset</b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-modal>

      </div>

      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'button'">
          <a href="#" @click="editDomain">
            <span class="ul-btn__icon"><i class="i-Eraser-2 text-20 text-success mr-2"></i></span>
            {{ props.row.button }}
          </a>
          <a href="#" @click="deleteDomain">
            <i class="i-Close-Window text-20 text-danger"></i>
            {{ props.row.button }}
          </a>
        </span>
      </template>
    </vue-good-table>

    <b-row class="mt-4 mb-4">
      <b-col lg="6" xl="6" md="12">
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        <b-button variant="primary" class="float-right" v-on:click="uploadCSV()">Upload CSV</b-button>
      </b-col>
      <b-col lg="6" xl="6" md="12" class="text-right">
        <b-button variant="primary" class="" @click="downloadCSV">
          Download CSV
        </b-button>
      </b-col>
    </b-row>
  </div>
  <!-- ============ Body content End ============= -->
</template>
<script>
// import { echartBar, echartPie } from "@/data/echarts";

// import { echart1, echart2, echart3 } from "@/data/dashboard1";

import { getDomains, downloadDomains, uploadDomains } from "@/api/apis";

export default {
  metaInfo: {
    title: "Dashboard domains"
  },
  data() {
    var res = {
      columns: [
        {
          label: "Domain Name",
          field: "name",
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "Description",
          field: "description",
          html: true,
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "Actions",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right"
        }
      ],
      rows: [],
      file: '',
      domainForm: [
        {
          id: -1,
          name: "",
          description: "",
        }
      ],
    };
    this.refreshDomains();    
    return res;
  },
  methods: {
    refreshDomains() {
      getDomains()
      .then(
        domains => {
          this.rows = [];
          domains.forEach(({ id, name, description, updated_at }, index) => {
            this.rows.push({
              name: name,
              description: description
            });
          });
        }
      );
    },
    downloadCSV(event) {
      let fileName = null;
      const result = downloadDomains()
        .then(response => {
          if (response.status === 200) {
            fileName = response.headers.get("Content-Disposition");
            if (fileName)
              fileName = fileName.match(/(?<=")(?:\\.|[^"\\])*(?=")/)[0];
            return response.blob();
          } else {
            return null;
          }
        })
        .then(blob => {
          var fileURL = window.URL.createObjectURL(new Blob([blob], {type: 'text/csv;charset=utf-8;'}));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', fileName || `domains.csv`);
          document.body.appendChild(fileLink);
          fileLink.click();
          fileLink.remove();
          window.URL.revokeObjectURL(fileURL);
        })
        .catch(err => {
          console.log('error: ', err);
        });
    },
    uploadCSV() {
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('fileName', this.file.name)
      const that = this;
      uploadDomains(formData)
      .then(function(){
        console.log('SUCCESS!!');
        that.refreshDomains();
      })
      .catch(function(error){
        console.log('FAILURE: ', error);
      });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    addDomain() {
      console.log('==== Add domain: ', this.domainForm.name, this.domainForm.description);
    },
    editDomain() {
      console.log('==== Delete domain');
    },
    deleteDomain() {
      console.log('==== Delete domain');
    }
  },
};
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
