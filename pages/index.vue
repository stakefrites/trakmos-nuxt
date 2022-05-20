<script setup>
import { storeToRefs } from 'pinia';
import {ref, onBeforeMount} from "vue"
import {useStore} from "~/store/store"
const loginType = ref(null)
const key = ref('6287252e3153aaa43702f0cb')
const errorMessage = ref(null);
const router = useRouter();
const store = useStore();

const {id, user} = storeToRefs(store);

onBeforeMount(()=> {

    const user = localStorage.getItem("user");

})


const signUp = () => {
  loginType.value = 'signUp'
}

const signIn = () => {
  loginType.value = 'signIn'
}

const login = async () => {
    errorMessage.value = null
    const {data, refresh} = await useAsyncData("loginUser",  () => $fetch(`/api/user/${key.value}`))
    if (data.value.user) {
        user.value = data.value.user
        router.push("/dashboard")
        localStorage.setItem("user", JSON.stringify(data.value.user))

    } else {
        errorMessage.value = "Invalid key!"
    }
}
</script>

<template>
    <NuxtLayout name="default">
        <v-row class="d-flex justify-center">
            <v-col sm="8" md="6" lg="4">
                <v-card v-if="!loginType">
                        <v-card-title>
                            <h1>Login</h1>
                        </v-card-title>
                        <v-card-text>
                            <div class="text-body-1">Welcome to trakmos, fren.</div>
                            <div class="text-body-2">Are you a recurring griller? 🥩.</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" @click="signUp">Sign up</v-btn>
                            <v-btn variant="outlined" @click="signIn">login</v-btn>
                        </v-card-actions>
                </v-card>
                <v-card v-if="loginType == 'signIn'">
                    <v-alert type="error" v-if="errorMessage">{{errorMessage}}</v-alert>
                        <v-card-title>
                            <div>Welcome back to trakmos, fren.</div>
                        </v-card-title>
                        <v-card-text>
                            <div class="text-body-2">Your stake is in your plate, waiting with warm fries. 🍟</div>
                            <v-form class="mt-10">
                                <v-text-field
                                    v-model="key"
                                    label="Enter your trakmos key"
                                    type="text"
                                    required
                                    color="primary">
                                </v-text-field>
                                

                            </v-form>
                            
                        </v-card-text>
                <v-card-actions>
                    <v-btn @click="login">Login</v-btn>
                </v-card-actions>
                </v-card>
                <v-card v-if="loginType == 'signUp'">
                        <v-card-title>
                            <h1>Sign Up</h1>
                        </v-card-title>
                        <v-card-text>
                            <div class="text-body-1">Welcome to trakmos, fren.</div>
                            <div class="text-body-2">Are you a recurring griller? 🥩.</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" @click="signUp">Sign up</v-btn>
                            <v-btn variant="outlined" @click="signIn">login</v-btn>
                        </v-card-actions>
                
                </v-card>
            </v-col>
        </v-row>
    </NuxtLayout>
</template>