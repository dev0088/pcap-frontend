<template>
  <div class="main-content">
    <breadcumb :page="'Account Details'" :folder="'Profile'" />
    <b-row class="mb-30">
      <b-col>
        <b-card title="Account Details" class="text-left ">
          <b-row>
            <b-form-group
              class="col-md-6 mb-3"
              label="Upload Photo"
            >
              <input type="file" />
            </b-form-group>      
          </b-row>
          <b-row>      
            <b-form-group
              class="col-md-6 mb-3"
              label="Name"
            >
              <b-form-input
                type="text"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              class="col-md-6 mb-3"
              label="Surname"
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
              label="E-Mail"
            >
              <b-form-input
                type="text"
                required
              ></b-form-input>
            </b-form-group>
          </b-row>     
          <b-button variant="primary ripple m-1">Update Profile</b-button>            
        </b-card>
      </b-col>
      <b-col>
        <b-card title="Reset Password" class="text-left ">
          <b-row>      
            <b-form-group
              class="col-md-6 mb-3"
              label="Current Paswordd"
            >
              <b-form-input
                type="password"
                required
              ></b-form-input>
            </b-form-group>
          </b-row> 
          <b-row>      
            <b-form-group
              class="col-md-6 mb-3"
              label="New Password"
            >
              <b-form-input
                type="password"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              class="col-md-6 mb-3"
              label="New Password (Again)"
            >
              <b-form-input
                type="password"
                required
              ></b-form-input>
            </b-form-group>            
          </b-row>     
          <b-button variant="primary ripple m-1">Update Password</b-button>      
        </b-card>
      </b-col>      
    </b-row>
  </div>
</template>

<script>
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Account Details"
  }
};
</script>
<style>

</style>
