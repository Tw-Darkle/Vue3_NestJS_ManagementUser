<template>
  <div>
    <v-card height="80" density="compact">
      <v-toolbar  title="การจัดการข้อมูลผู้ใช้งาน" class="title" extended></v-toolbar>
    </v-card>
    <div class="btns-create" >
      <CreateUser v-on:userCreated="refetchList" />
    </div>
    <div class="content-body">
      <ListUser ref="listUserRef"/>
    </div>
  </div>
</template>

<script setup>
import ListUser from './components/ListUser'
import CreateUser from './components/CreateUser'

const listUserRef = ref(null);

const refetchList = () => {
  if (listUserRef.value) {
    listUserRef.value.fetchUsers();
  }
};

</script>


<style>
.content-body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btns-create {
  display: flex;
  justify-content: end;
  margin-right: 15rem;

}

.v-toolbar-title {
  font-size: 2.5rem !important;
  font-weight: 500 !important;
}

.v-toolbar-title__placeholder{
  display: flex;
  justify-content: left;
  align-items: center;
  height: 80px;
}

</style>
