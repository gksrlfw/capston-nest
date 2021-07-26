/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
import { reactive, toRefs, ref } from "vue";
import { BASE_URL, axiosOptions, TOKEN, EMAIL } from "@/store/Global";
import axios from 'axios';

export class SearchStore {
  authState = reactive({
    signinError: '',
    signupError: '',
    isSignin: false,
    isSignup: false,
    signinResponse: {},
  });

  userInputApart = ref('');
  userInputGu = ref('');
  searchHelper = ref({});

  getSearchHelper() {
    return this.searchHelper.value;
  }

  async setSearchHelper(userInput) {
    const response = await axios.get(`${BASE_URL}/search/helper?helper=${userInput}`);
    this.searchHelper.value = response.data;
    console.log(response, this.searchHelper.value);  
  }

  async filterGu(userInput) {
    this.userInputGu.value = userInput;
    const response = await axios.get(`${BASE_URL}/search/gu?gu=${userInput}`);
    console.log(response);
  }

  async search(userInput) {
    this.userInputApart.value = userInput;
    const response = await axios.get(`${BASE_URL}/search/apart?apart=${userInput}`, signupRequest, axiosOptions);
    console.log(response);
  }

  getAuthState() {
    return this.authState;
  }

  setAuthState(signinResponse) {
    this.authState.signinResponse = signinResponse;
    this.authState.isSignin = true;
  }
  async signup(signupRequest){
    try {
      console.log(BASE_URL, signupRequest)
      const response = await axios.post(`${BASE_URL}/auth/signup`, signupRequest, axiosOptions);
      console.log(response);
      this.succeedSignup();
    }
    catch(err) {
      console.error(err.response);
      this.failedSignup(err.response.data.message);
    }
  }

  async signin(signinRequest) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, signinRequest, axiosOptions);
      console.log(response.data.data);
      this.succeedSignin(response.data.message);
      sessionStorage.setItem(TOKEN, JSON.stringify(response.data.data.token));
      sessionStorage.setItem(EMAIL, JSON.stringify(signinRequest.email));
      return this.getAuthState();
    }
    catch(err) {
      console.error(err.response);
      this.failedSignin(err.response.data.message);
    }
  }

  async signout() {
    try {
      const token = JSON.parse(sessionStorage.getItem(TOKEN));
      if(!token) return;
      
      const headers = {
        Authorization: `TOKEN ${token}`
      }
      await axios.get(`${BASE_URL}/auth/signout`, { headers }, axiosOptions);
      this.clearState();
      sessionStorage.removeItem(TOKEN);
      sessionStorage.removeItem(EMAIL);
    }
    catch(err) {
      console.error(err.message);
    }
  }

  async refresh() {
    try {
      const token = JSON.parse(sessionStorage.getItem(TOKEN));
      if(!token) return;
      const email = JSON.parse(sessionStorage.getItem(EMAIL));
      this.authState.signinResponse.email = email;
      const headers = {
        Authorization: `TOKEN ${token}`
      }
      const response = await axios.get(`${BASE_URL}/auth/refresh`, { headers }, axiosOptions);
      this.succeedSignin(response.data.message);
      console.log(response);
    }
    catch(err) {
      console.error(err.response);
      await this.signout();
      return alert(err.response.data.message);
    }
  }
 
  clearState() {
    this.authState.isSignin = false;
    this.authState.isSignup = false;
    this.authState.signinError = '';
    this.authState.signupError = '';
    this.authState.signinResponse = {};
  }
  clearError() {
    this.authState.signinError = '';
    this.authState.signupError = '';
  }
  succeedSignin(signinResponse) {
    this.authState.signinResponse = signinResponse;
    this.authState.isSignin = true;
  }
  succeedSignup() {
    this.authState.isSignup = true;
  }
  failedSignin(error) {
    this.authState.isSignin = false;
    this.authState.signinError = error;
  }

  failedSignup(error) {
    this.authState.isSignup = false;
    this.authState.signupError = error;
  }
}

const searchStore = new SearchStore();
export default searchStore;