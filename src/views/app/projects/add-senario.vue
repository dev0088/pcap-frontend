<template>
  <div class="main-content">
    <breadcumb :page="'Add New Scenario'" :folder="'Projects'" />
    <b-card class="wrapper scenarios">
      <b-row>
        <b-form-group
          class="col-md-6 mb-3"
          label="Platform"
        >
          <b-form-select
            :options="options1"
          >
          </b-form-select>
        </b-form-group>
        <b-form-group
          class="col-md-12 mb-3"
          label="Scenario"
        >
          <b-form-input
            type="text"
            required
          ></b-form-input>
        </b-form-group>
      </b-row>      
      <div class="text-right">
        <b-button variant="primary ripple m-1 add-button-i">Add New Scenario</b-button>
      </div><br /> 
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
      options1:[
        { value: 'x', text: ' Android' },
        { value: 'a', text: 'IOS' },
        { value: 'c', text: 'MAC' },
        { value: 'd', text: 'EDGE' },
      ],
    };
  },
  methods: {
  }  
};
</script>
<style>

</style>
