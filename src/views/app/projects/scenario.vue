<template>
  <div class="main-content">
    <breadcumb :page="'Scenarios'" :folder="'Projects'" />
    <b-card class="wrapper scenarios"> 
      <div class="text-right">
        <router-link tag="a" to="/app/projects/add-senario" class="primary ripple m-1">
          Add New Scenario
        </router-link>                             
      </div><br />
        <v-jstree :data="data">
          <template scope="_">
            <div>
              <b-badge variant="warning" pill>
                {{_.model.type}}
              </b-badge>
              {{_.model.text}}
            </div>
          </template>
        </v-jstree>      
    </b-card>
  </div>
</template>

<script>
import VJstree from "vue-jstree";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "All Project Archive"
  },
  components: {
    VJstree
  },  
  data() {
    return {
      data: [
        {
          text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
          type: "Scenario #151",
          children: [
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
            },
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
            },
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
              children: [
                {
                  text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
                  type: "Scenario #151",
                }
              ]
            },
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
            },
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
            }
          ]
        },
        {
          text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
          type: "Scenario #151",
          children: [
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
            },
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
            },
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
              children: [
                {
                  text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
                  type: "Scenario #151",
                }
              ]
            },
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
            },
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
            }
          ]
        },
        {
          text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
          type: "Scenario #151",
          children: [
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
            },
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
            },
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
              children: [
                {
                  text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
                  type: "Scenario #151",
                }
              ]
            },
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
            },
            {
              text: "Stackoverflow_Android_Web_Chrome - İletiyi Cevaplama",
              type: "Scenario #151",
            }
          ]
        }        
      ],      
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
.scenarios .badge {
  margin-right: 10px;
}
</style>