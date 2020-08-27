<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <breadcumb :page="'Domains'" :folder="'Dashboard'" />
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
        <b-button v-b-modal.modal-add block variant="primary mb-30" class="btn-rounded" @click="editDomain(-1)">
          + Add New Domain
        </b-button>

          <b-modal id="modal-add" centered title="Add New Domain" @ok="addDomain" @cancel="refresh">
            <b-form id="form-add">
              <b-form-group id="input-group-1" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="text"
                  v-model="domainForm.name"
                  placeholder="domain name...."
                  required
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
            </b-form>
          </b-modal>
      </div>

      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'button'">
          <a href="#" v-b-modal.modal-edit block  @click="editDomain(props.row.id)">
            <span class="ul-btn__icon"><i class="i-Eraser-2 text-20 text-success mr-2"></i></span>
            {{ props.row.button }}
           </a>
          <a href="#" @click="removeDomain(props.row.id)">
            <i class="i-Close-Window text-20 text-danger"></i>
            {{ props.row.button }}
          </a>
        </span>
      </template>
    </vue-good-table>

    <b-modal id="modal-edit" centered title="Edit Domain" @ok="saveDomain" @cancel="refresh">
      <b-form id="form-edit">
        <b-form-group id="input-group-edit" label-for="input-2">
          <b-form-input
            id="input-edit"
            type="text"
            v-model="domainForm.name"
            placeholder="domain name...."
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-textarea
            id="textarea-edit"
            v-model="domainForm.description"
            placeholder="Description..."
            rows="3"
          ></b-form-textarea>
        </b-form-group>
      </b-form>
    </b-modal>

    <div class="row mb-30">
    
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h4 class="heading">CSV Upload</h4>
            <div class="table-bottom large-12 medium-12 small-12 cell">
              <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
              <b-button variant="primary" class="float-right" v-on:click="uploadCSV()">Upload</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ============ Body content End ============= -->
</template>
<script>
// import { echartBar, echartPie } from "@/data/echarts";

// import { echart1, echart2, echart3 } from "@/data/dashboard1";

import {
  apiGetDomains, 
  apiDownloadDomains, 
  apiUploadDomains,
  apiAddDomain,
  apiDeleteDomain,
  apiUpdateDomain,
} from "@/api/apis";

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
          name: '',
          description: '',
          created_at: ''
        }
      ],      
    };
    this.refresh();    
    return res;
  },
  methods: {
    refresh() {
      apiGetDomains()
      .then(
        domains => {
          this.rows = [];
          domains.forEach(({ id, name, description, updated_at }, index) => {
            this.rows.push({
              id,
              name,
              description,
              updated_at
            });
          });
        }
      );
    },
    downloadCSV(event) {
      let fileName = null;
      const result = apiDownloadDomains()
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
    uploadCSV(){
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('fileName', this.file.name)
      const that = this;
      apiUploadDomains(formData)
      .then(function() {
        that.refresh();
      })
      .catch(function(error) {
        console.log('FAILURE: ', error);
      });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    addDomain() {
      const { name, description } = this.domainForm;
      const that = this;
      if (name) {
        apiAddDomain({name, description})
        .then(res => {
          that.$bvModal.hide('modal-add');
          that.refresh();
        })
        .catch(error => {
          console.log('===== error: ', error);
        });
      }
    },
    editDomain(id) {
      if (id === -1) {
        this.domainForm = [{
          id: -1,
          name: '',
          description: '',
          created_at: ''
        }];
      } else {
        const data = this.rows.find( domain => domain.id === id);
        this.domainForm = data;
      }
    },
    saveDomain() {
      const that = this;
      const { name, description } = this.domainForm;
      apiUpdateDomain(
        this.domainForm.id,
        { name, description }
      )
      .then(res => {
        that.$bvModal.hide('modal-edit');
        that.refresh();
      })
      .catch(error => {
        console.log('===== error: ', error);
      });
    },
    removeDomain(id) {
      const that = this;
      apiDeleteDomain(id)
      .then(res => {
        that.refresh();
      })
      .catch(error => {
        console.log('===== error: ', error);
      });
    }    
  },
};
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
.table-head {
  align-items: center;
  padding-bottom: 10px;
}
.table-bottom {
  padding-top: 20px;
}
</style>
