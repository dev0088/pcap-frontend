<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <breadcumb :page="'HTTP Header Value Descriptions'" :folder="'Dashboard'" />
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
        <b-button v-b-modal.modal-add block variant="primary mb-30" class="btn-rounded" @click="editHeader(-1)">
          + Add New HTTP Header Value Description
        </b-button>

          <b-modal id="modal-add" centered title="Add New HTTP Header Value Description" @ok="addHeader" @cancel="refresh">
            <b-form id="form-add">
              <b-form-group id="input-group-1" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="text"
                  v-model="headerValueDescriptionForm.name"
                  placeholder="header name..."
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-1" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="text"
                  v-model="headerValueDescriptionForm.value"
                  placeholder="header value..."
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-1" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="text"
                  v-model="headerValueDescriptionForm.color"
                  placeholder="header color..."
                  required
                ></b-form-input>
              </b-form-group>              
              
              <b-form-group>
                <b-form-textarea
                  id="textarea"
                  v-model="headerValueDescriptionForm.description"
                  placeholder="description..."
                  rows="3"
                ></b-form-textarea>
              </b-form-group>
            </b-form>
          </b-modal>
      </div>

      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'button'">
          <a href="#" v-b-modal.modal-edit block  @click="editHeader(props.row.id)">
            <span class="ul-btn__icon"><i class="i-Eraser-2 text-20 text-success mr-2"></i></span>
            {{ props.row.button }}
           </a>
          <a href="#" @click="removeHeader(props.row.id)">
            <i class="i-Close-Window text-20 text-danger"></i>
            {{ props.row.button }}
          </a>
        </span>
      </template>
    </vue-good-table>

    <b-modal id="modal-edit" centered title="Edit HTTP Header Value Description" @ok="saveHeader" @cancel="refresh">
      <b-form id="form-edit">
        <b-form-group id="input-group-edit" label-for="input-2">
          <b-form-input
            id="input-edit"
            type="text"
            v-model="headerValueDescriptionForm.name"
            placeholder="header name..."
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-edit" label-for="input-2">
          <b-form-input
            id="input-edit"
            type="text"
            v-model="headerValueDescriptionForm.value"
            placeholder="header value..."
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-textarea
            id="textarea-edit"
            v-model="headerValueDescriptionForm.description"
            placeholder="description..."
            rows="3"
          ></b-form-textarea>
        </b-form-group>
      </b-form>
    </b-modal>

    <div class="row mb-30">
      <div class="col-md-12">
        <div class="table-bottom large-12 medium-12 small-12 cell">
          <b-button variant="primary" class="float-right" v-on:click="downloadCSV()">Download</b-button>
        </div>
      </div>
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
  apiGetHttpHeaderValueDescriptions, 
  apiDownloadHttpHeaderValueDescriptions, 
  apiUploadHttpHeaderValueDescriptions,
  apiAddHttpHeaderValueDescription,
  apiDeleteHttpHeaderValueDescription,
  apiUpdateHttpHeaderValueDescription,
} from "@/api/http-header-value-descriptions";

export default {
  metaInfo: {
    title: "Dashboard HTTP Header Value Descriptions"
  },
  data() {
    var res = {
      columns: [
        {
          label: "Header Name",
          field: "name",
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "Value",
          field: "value",
          html: true,
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
          label: "Color",
          field: "color",
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
      headerValueDescriptionForm: [
        {
          id: -1,
          name: '',
          value: '*',
          description: '',
          created_at: '',
          color: 'None'
        }
      ]
    };
    this.refresh();    
    return res;
  },
  methods: {
    refresh() {
      apiGetHttpHeaderValueDescriptions()
      .then(
        items => {
          this.rows = [];
          items.forEach(({ id, name, value, description, updated_at }, index) => {
            this.rows.push({
              id,
              name,
              value,
              description,
              updated_at
            });
          });
        }
      );
    },
    downloadCSV(event) {
      let fileName = null;
      const result = apiDownloadHttpHeaderValueDescriptions()
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
          fileLink.setAttribute('download', fileName || `http_header_value_descriptions.csv`);
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
      apiUploadHttpHeaderValueDescriptions(formData)
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
    addHeader() {
      const { name, value, description } = this.headerValueDescriptionForm;
      const that = this;
      if (name) {
        apiAddHttpHeaderValueDescription({name, value, description})
        .then(res => {
          that.$bvModal.hide('modal-add');
          that.refresh();
        })
        .catch(error => {
          console.log('===== error: ', error);
        });
      }
    },
    editHeader(id) {
      if (id === -1) {
        this.headerValueDescriptionForm = {
          id: -1,
          name: '',
          value: '*',
          description: '',
          created_at: '',
          color: 'None'
        };
      } else {
        const data = this.rows.find( item => item.id === id);
        this.headerValueDescriptionForm = data;
      }
    },
    saveHeader() {
      const that = this;
      const { name, description } = this.headerValueDescriptionForm;
      apiUpdateHttpHeaderValueDescription(
        this.headerValueDescriptionForm.id,
        { name, value, description }
      )
      .then(res => {
        that.$bvModal.hide('modal-edit');
        that.refresh();
      })
      .catch(error => {
        console.log('===== error: ', error);
      });
    },
    removeHeader(id) {
      const that = this;
      apiDeleteHttpHeaderValueDescription(id)
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
