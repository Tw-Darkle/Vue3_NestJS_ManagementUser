<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" max-width="700" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" color="success" size="x-large" rounded="xl">
          <v-icon color="light" icon="mdi-plus" size="small"></v-icon>
          เพิ่มข้อมูลผู้ใช้งาน
        </v-btn>
      </template>

      <v-card prepend-icon="mdi-account" title="กรอกข้อมูล">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="firstName" label="ชื่อ" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="lastName" label="นามสกุล" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="nickName" label="ชื่อเล่น" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="age" label="อายุ" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="tel" label="เบอร์โทร" required></v-text-field>
            </v-col>


          </v-row>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="ยกเลิก" color="red" variant="tonal" @click="dialog = false"></v-btn>

          <v-btn color="success" text="บันทึก" variant="tonal" type="submit" @click="onSubmit"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { shallowRef } from 'vue';
import { ref } from 'vue';
const emit = defineEmits(['userCreated']);

let dialog = shallowRef(false)



const firstName = ref('');
const lastName = ref('');
const nickName = ref('');
const age = ref('');
const tel = ref('');

const onSubmit = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "firstName": firstName.value,
    "lastName": lastName.value,
    "nickName": nickName.value,
    "age": age.value,
    "tel": tel.value,
    "isActive": true
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:3000/api/users", requestOptions)
    .then((response) => response.json())
    .then((result) => {

      if (result) {
        dialog.value = false;
        firstName.value = '';
        lastName.value = '';
        nickName.value = '';
        age.value = '';
        tel.value = '';
        emit('userCreated');
      }
    })
    .catch((error) => console.error("เกิดข้อผิดพลาดที่การเพิ่มข้อมูล",error));

    fetch()

}
</script>
<style></style>
