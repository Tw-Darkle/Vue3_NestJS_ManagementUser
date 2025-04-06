<template>
  <div>
    <v-table density="compact" class=" elevation-1 " fixed-header>
      <thead>
        <tr>
          <th class="text-center p">
            ชื่อ
          </th>
          <th class="text-center p">
            นามสกุล
          </th>
          <th class="text-center p">
            ชื่อเล่น
          </th>
          <th class="text-center p">
            อายุ
          </th>
          <th class="text-center p">
            เบอร์โทร
          </th>
          <th class="text-center p">
            แก้ไขข้อมูล
          </th>
          <th class="text-center p">
            ลบข้อมูล
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.id">
          <td class="text-left p">{{ item.firstName }}</td>
          <td class="text-center p">{{ item.lastName }}</td>
          <td class="text-center p">{{ item.nickName }}</td>
          <td class="text-center p">{{ item.age }}</td>
          <td class="text-center p">{{ item.tel }}</td>
          <td class="text-center p"><v-btn color="warning" text="แก้ไข" variant="tonal" type="submit"
              @click="onEdit(item.id)"></v-btn></td>
          <td class="text-center p"><v-btn color="red" text="ลบ" variant="tonal" type="submit"
              @click="onDelete(item.id)"></v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </div>

  <div class="text-center pa-4">
    <v-dialog v-model="dialog" max-width="700" persistent>
      <v-card prepend-icon="mdi-account" title="แก้ไขข้อมูล">
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
              <v-text-field v-model="tel" label="เบอร์" required></v-text-field>
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
import axios from 'axios';
import { shallowRef } from 'vue'

const firstName = ref('');
const lastName = ref('');
const nickName = ref('');
const age = ref('');
const tel = ref('');
const selectedUserId = ref(null);

let dialog = shallowRef(false)
const users = ref([]);


const fetchUsers = async () => {
  const response = await axios.get('http://localhost:3000/api/users/');
  users.value = response.data;

};

onMounted(fetchUsers);

defineExpose({
  fetchUsers,
});

const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${id}`);
    const user = response.data;

    firstName.value = user.firstName;
    lastName.value = user.lastName;
    nickName.value = user.nickName;
    age.value = user.age;
    tel.value = user.tel;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดที่ฟังชั่น fetchUserById ", error);
  }
};

const onEdit = async (id) => {
  selectedUserId.value = id;
  await fetchUserById(id);
  dialog.value = true;
};

const onSubmit = async () => {
  try {
    const updatedUser = {
      firstName: firstName.value,
      lastName: lastName.value,
      nickName: nickName.value,
      age: age.value,
      tel: tel.value,
    };

    await axios.patch(`http://localhost:3000/api/users/${selectedUserId.value}`, updatedUser);
    dialog.value = false;
    await fetchUsers();
  } catch (error) {
    console.error("เกิดข้อผิดพลาดที่การอัพเดทข้อมูล:", error);
  }
};

const onDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/users/${id}`);
    users.value = users.value.filter(user => user.id !== id);

  } catch (error) {
    console.error("เกิดข้อผิดพลาดที่การลบข้อมูล", error);
  }
};

onMounted(fetchUsers);

</script>

<style>
.v-table__wrapper {
  font-size: 1.5rem;
}

.p {
  font-weight: 300;
  border: 1px solid;
  border-color: #8888;
}
</style>
