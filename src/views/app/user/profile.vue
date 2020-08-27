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
                v-model="userForm.first_name"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              class="col-md-6 mb-3"
              label="Surname"
            >
              <b-form-input
                type="text"
                required
                v-model="userForm.last_name"
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
                v-model="userForm.email"
              ></b-form-input>
            </b-form-group>
          </b-row>     
          <b-button variant="primary ripple m-1" v-on:click="saveProfile()">Update Profile</b-button>            
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
                v-model="passwordForm.currentPassword"
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
                v-model="passwordForm.newPassword"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              class="col-md-6 mb-3"
              label="New Password (Again)"
            >
              <b-form-input
                type="password"
                required
                v-model="passwordForm.confirmPassword"
              ></b-form-input>
            </b-form-group>            
          </b-row>     
          <b-button variant="primary ripple m-1" v-on:click="updatePasword()">Update Password</b-button>      
        </b-card>
      </b-col>      
    </b-row>
  </div>
</template>

<script>
import {
  getUserInfoFromLocal,
  apiUserById,
  apiUpdateUser,
  apiUpdateUserPassword
} from "@/api/users";

export default {
  metaInfo: {
    title: "Account Details"
  },
  data() {
    const localUserInfo = getUserInfoFromLocal();
    const res = {
      userInfo: localUserInfo,
      userForm: [{
        ...localUserInfo
      }],
      passwordForm: [{
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }]
    };
    this.refresh();
    return res;
  },
  methods: {
    refresh() {
      const localUserInfo = getUserInfoFromLocal();
      apiUserById(localUserInfo.id)
      .then(
        userInfo => {
          this.userInfo = userInfo;
          this.userForm = userInfo;
        }
      );
    },
    makeToast(variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: ` ${variant || "default"}`,
        variant: variant,
        solid: true
      });
    },
    saveProfile() {
      const that = this;
      const { username, first_name, last_name, email } = this.userForm;
      apiUpdateUser(
        this.userForm.id,
        { username, first_name, last_name, email }
      )
      .then(res => {
        that.refresh();
        that.makeToast("success", "Successfully updated profile.")
      })
      .catch(error => {
        console.log('===== error: ', error);
        that.makeToast("danger", 'Failed updated profile.');
      });
    },
    updatePasword() {
      const { id } = this.userInfo;
      const { currentPassword, newPassword, confirmPassword } = this.passwordForm;
      const that = this;
      if (newPassword !== confirmPassword) {
        this.makeToast("danger", "The new password and the confirm password must be same");
        return;
      }
      apiUpdateUserPassword(
        id,
        {
          old_password: currentPassword,
          new_password: newPassword
        }
      )
      .then(res => {
        that.refresh();
        that.makeToast("success", "Successfully updated password.");
      })
      .catch(error => {
        console.log('===== error: ', error);
        that.makeToast("danger", 'Failed updated password. Please input current password correctly.');
      });
    }
  }
};
</script>
<style>

</style>
