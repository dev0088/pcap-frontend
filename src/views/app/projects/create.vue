<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <breadcumb :page="'Create Project'" :folder="'Projects'" />

    <b-row>
      <b-col md="12 mb-30">
        <b-card>
          <b-form class="steps">
            <div class="step" v-if="currentStep == 1">
              <h2 class="heading">Uygulama Künyesi</h2>
              <div class="step-content">
                <b-row>
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Analiz Bilgileri"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Analiz Bilgileri"
                    ></b-form-input>
                  </b-form-group>   
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="NAT IP Adresi"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="NAT IP Adresi"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Gateway"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Gateway"
                    ></b-form-input>
                  </b-form-group>   
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Public IP"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Public IP"
                    ></b-form-input>
                  </b-form-group>  
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="DNS"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="DNS"
                    ></b-form-input>
                  </b-form-group>  
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Mac Adresleri"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Mac Adresleri"
                    ></b-form-input>
                  </b-form-group>  
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Sistem Bilgisi"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Sistem Bilgisi"
                    ></b-form-input>
                  </b-form-group>          
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="İşletim Sistemi"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="İşletim Sistemi"
                    ></b-form-input>
                  </b-form-group>    
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="IMEI SV"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="IMEI SV"
                    ></b-form-input>
                  </b-form-group>      
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Android Sürümü"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Android Sürümü"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Android Seri No"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Android Seri No"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Version"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Version"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Kullanıcı Adı"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Kullanıcı Adı"
                    ></b-form-input>
                  </b-form-group>   
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Şifre"
                  >
                    <b-form-input
                      type="password"
                      required
                      placeholder="Şifre"
                    ></b-form-input>
                  </b-form-group>                                                                                                                                     
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Bağlantı Tipi"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Bağlantı Tipi"
                    ></b-form-input>
                  </b-form-group>  
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="İsim Soyisim"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="İsim Soyisim"
                    ></b-form-input>
                  </b-form-group>  
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Cep Telefonu"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Cep Telefonu"
                    ></b-form-input>
                  </b-form-group>  
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="E-Mail Adresi"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="E-Mail Adresi"
                    ></b-form-input>
                  </b-form-group>  
                </b-row>
              </div>             
            </div>
            <div class="step" v-if="currentStep == 2">
              <h2 class="heading">PCAP Yükleme</h2>
              <div class="step-content">
                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="pcapOptions" v-on:vdropzone-sending="savePCAP"></vue-dropzone>
              </div>             
            </div>     
            <div class="step" v-if="currentStep == 3">
              <h2 class="heading">Fotoğraf Yükleme</h2>
              <div class="step-content">
                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="photoOptions" v-on:vdropzone-sending="savePhotos"></vue-dropzone>
              </div>             
            </div>   
            <div class="step" v-if="currentStep == 4">
              <h2 class="heading">Hash Yükleme</h2>
              <div class="step-content">
                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="hashOptions" v-on:vdropzone-sending="saveHash"></vue-dropzone>
              </div>             
            </div>    
            <div class="step" v-if="currentStep == 5">
              <h2 class="heading">Analiz</h2>
              <div class="step-content">
                <b-row>
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Analiz Bilgileri"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Analiz Bilgileri"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>   
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="NAT IP Adresi"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="NAT IP Adresi"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Gateway"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Gateway"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>   
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Public IP"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Public IP"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>  
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="DNS"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="DNS"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>  
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Mac Adresleri"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Mac Adresleri"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>  
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Sistem Bilgisi"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Sistem Bilgisi"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>          
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="İşletim Sistemi"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="İşletim Sistemi"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>    
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="IMEI SV"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="IMEI SV"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>      
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Android Sürümü"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Android Sürümü"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Android Seri No"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Android Seri No"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Version"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Version"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Kullanıcı Adı"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Kullanıcı Adı"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>   
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Şifre"
                  >
                    <b-form-input
                      type="password"
                      required
                      placeholder="Şifre"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>                                                                                                                                     
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Bağlantı Tipi"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Bağlantı Tipi"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>  
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="İsim Soyisim"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="İsim Soyisim"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>  
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="Cep Telefonu"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="Cep Telefonu"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>  
                  <b-form-group
                    class="col-md-6 mb-3"
                    label="E-Mail Adresi"
                  >
                    <b-form-input
                      type="text"
                      required
                      placeholder="E-Mail Adresi"
                      value="Input Value"
                    ></b-form-input>
                  </b-form-group>  
                </b-row>
                <div class="br"></div>
                <b-row class="">
                  <b-col md="6" xl="4" class=" mb-30">
                    <b-card title="PCAP Dosyaları" class="text-left ">
                      <b-list-group>
                        <b-list-group-item>file.pcap</b-list-group-item>
                        <b-list-group-item>file.pcap</b-list-group-item>
                        <b-list-group-item>file.pcap</b-list-group-item>
                      </b-list-group>
                    </b-card>
                  </b-col>
                  <b-col md="6" xl="4" class=" mb-30">
                    <b-card title="Fotoğraflar" class="text-left ">
                      <b-list-group>
                        <b-list-group-item>image.png</b-list-group-item>
                        <b-list-group-item>image.jpeg</b-list-group-item>
                      </b-list-group>
                    </b-card>
                  </b-col>
                  <b-col md="6" xl="4" class=" mb-30">
                    <b-card title="Hash Dosyaları" class="text-left ">
                      <b-list-group>
                        <b-list-group-item>file.hash</b-list-group-item>
                        <b-list-group-item>file.hash</b-list-group-item>
                        <b-list-group-item>file.hash</b-list-group-item>
                      </b-list-group>
                    </b-card>
                  </b-col>
                </b-row>                
              </div>         
            </div>        
            <div class="step" v-if="currentStep == 6">
              <h2 class="heading">Eksik Bilgi Tamamlama</h2>
              <div class="step-content">
                <vue-good-table
                  :columns="columns"
                  :line-numbers="false"
                  styleClass="order-table vgt-table"
                  :rows="rows"
                  :sort-options="{
                    enabled: false
                  }"
                >
                </vue-good-table>
              </div>             
            </div>       
            <div class="step" v-if="currentStep == 7">
              <h2 class="heading">Anlamlandırma</h2>
              <div class="step-content">
                <vue-good-table
                  :columns="columnsSummary"
                  :line-numbers="false"
                  styleClass="order-table vgt-table"
                  :rows="rowsSummary"
                  :sort-options="{
                    enabled: false
                  }"
                >
                </vue-good-table>                
              </div>             
            </div>                                                                 
          </b-form>
          <div class="actions">
            <div class="row">
              <div class="col-sm-6">
                <button 
                  type="button" 
                  class="btn btn-outline-primary ripple m-1" 
                  v-if="currentStep > 1"
                  v-on:click="currentStep = currentStep > 1 ? (currentStep - 1) : 1"
                >
                  Önceki Adım
                </button>
              </div>
              <div class="col-sm-6 text-right">
                <button 
                  type="button" 
                  class="btn btn-outline-primary ripple m-1" 
                  v-on:click="currentStep = currentStep != maxStep ? (currentStep + 1) : maxStep"
                  v-if="currentStep != 5 && currentStep != 6"
                >
                  Sonraki Adım
                </button>  
                <button 
                  type="button" 
                  class="btn btn-primary ripple m-1" 
                  v-on:click="currentStep = currentStep != maxStep ? (currentStep + 1) : maxStep"
                  v-if="currentStep == 5"
                >
                  Analize Başla
                </button>    
                <button 
                  type="button" 
                  class="btn btn-primary ripple m-1" 
                  v-on:click="currentStep = currentStep != maxStep ? (currentStep + 1) : maxStep"
                  v-if="currentStep == 6"
                >
                  Alan Adlarını Ekle
                </button>                                    
              </div>
            </div>
          </div>             
        </b-card>
      </b-col>
    </b-row>
  </div>
  <!-- ============ Body content End ============= -->
</template>
<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  metaInfo: {
    title: "Create domain"
  },
  components: {
    vueDropzone: vue2Dropzone
  },  
  data() {
    return {
      columns: [
        { label: 'Alan Adı İsmi', field: 'name', html: true },
        { label: 'Açıklama', field: 'details', html: true }
      ],
      rows: [
        { id:1, name:"<input type='text' class='form-control' />", details: "<input type='text' class='form-control' />", },
        { id:2, name:"<input type='text' class='form-control' />", details: "<input type='text' class='form-control' />", },
        { id:3, name:"<input type='text' class='form-control' />", details: "<input type='text' class='form-control' />", },
        { id:4, name:"<input type='text' class='form-control' />", details: "<input type='text' class='form-control' />", }
      ],
      columnsSummary: [
        { label: 'Application', field: 'app' },
        { label: 'Context', field: 'context' },
        { label: 'Pattern', field: 'pattern' },
        { label: 'Açıklama', field: 'details', html: true }
      ],
      rowsSummary: [
        { id:1, app:"Name", context: "Context", pattern: "Pattern", details: "<input type='text' class='form-control' />", },
        { id:2, app:"Name", context: "Context", pattern: "Pattern", details: "<input type='text' class='form-control' />", },
      ],      
      pcapOptions: {
          url: 'workspace/${proje_adi}/pcaps',
          thumbnailWidth: 250,
          maxFilesize: 0.5,
          addRemoveLinks: true,
          dictDefaultMessage: "Dosyaları seçin yada sürükleyip bırakın"
      },    
      photoOptions: {
          url: 'workspace/${proje_adi}/images',
          thumbnailWidth: 250,
          maxFilesize: 0.5,
          addRemoveLinks: true,
          dictDefaultMessage: "Dosyaları seçin yada sürükleyip bırakın"
      },  
      hashOptions: {
          url: 'workspace/${proje_adi}/images',
          thumbnailWidth: 250,
          maxFilesize: 0.5,
          addRemoveLinks: true,
          dictDefaultMessage: "Dosyaları seçin yada sürükleyip bırakın"
      },                  
      currentStep: 1,
      maxStep: 7
    }
  },
  methods: {
    savePCAP: (file, xhr, formData) => {
      console.log(file, xhr, formData)
    },
    savePhotos: (file, xhr, formData) => {
      console.log(file, xhr, formData)
    },
    saveHash: (file, xhr, formData) => {
      console.log(file, xhr, formData)
    }        
  }
};
</script>
<style>
.step {
  width: 100%;
}
.steps .step-content {
  margin: 2rem 0;
}
.dropzone {
  line-height: 150px;
}
.dropzone .dz-message {
  margin: unset;
  line-height: 150px;
}
</style>
