<script setup>
import { storeToRefs } from 'pinia';
import {ref, onBeforeMount} from "vue"
import {useStore} from "~/store/store"
const loginType = ref(null)
const username = ref("jean");
const password = ref("myPassword");
const errorMessage = ref(null);
const router = useRouter();
const store = useStore();

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';


const {id, user} = storeToRefs(store);

onBeforeMount(()=> {
 if (user.value) {
        router.push("/dashboard")
    } 
})


const signUp = () => {
  loginType.value = 'signUp'
}

const signIn = () => {
  loginType.value = 'signIn'
}

const login = async () => {
    errorMessage.value = null;
    const { data} = await useFetch("/trakmos/login",{
        method: "POST",
        baseURL: BASE_URL,
        body: {
            user: {
                username: username.value,
                password: password.value
            }
        }
    })
    console.log("data", data.value);
    if (data.value.status === "error") {
        console.log(`An error has occured: ${data.value.message}`)
        errorMessage.value = data.value.message
    } else {
        id.value = data.value.user;
        router.push("/dashboard")
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
                                    v-model="username"
                                    label="Username"
                                    type="text"
                                    required
                                    color="primary">
                                </v-text-field>
                                 <v-text-field
                                    v-model="password"
                                    label="Password"
                                    type="password"
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