<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <breadcumb :page="'Domains'" :folder="'Dashboard'" />

    <div class="row">
      
      <div class="col-md-12">
        <div class="card mb-30">
          <div class="card-body p-0 ">
            <div class="card-title p-3 mb-2">
              <div class="row border-bottom">
                <h5 class="col-md-6">Domains</h5>
                <div slot="table-actions" class="col-md-6">
                  <b-button variant="primary" class="float-right" @click="downloadCSV">
                    Download
                  </b-button>
                </div>
              </div>
            </div>
            
            <vue-good-table
              :columns="columns"
              :line-numbers="false"
              styleClass="order-table vgt-table"
              :rows="rows"
            >
            </vue-good-table>

            <div class="large-12 medium-12 small-12 cell">
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

import { getDomains, downloadDomains, uploadDomains } from "@/api/apis";

export default {
  metaInfo: {
    title: "Dashboard domains"
  },
  data() {
    var res = {
      columns: [
        {
          label: "No",
          field: "id",
          thClass: "text-left pl-3",
          tdClass: "text-left pl-3"
        },
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
        }
      ],
      rows: [],
      file: ''
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
              id: index + 1,
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
    uploadCSV(){
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
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
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
