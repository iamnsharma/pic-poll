import axios from 'axios';
import {BASE_URL} from '../../config';

export async function sendOTP(payload: any) {
  console.log(payload, 'payload');

  let apiUrl = `${BASE_URL}/api/v1/email/sendOtp`;
  let data = {
    email: payload,
  };
  console.log(apiUrl, 'apiUrl');

  return await axios
    .post(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: any) => {
      console.log(response, 'response');

      return response.data;
    })
    .catch((error: any) => {
      console.log('ResponseError', error);
      // Handle error
      return {success: false, data: error};
    });
}

export async function verifyOTP(payload: any) {
  console.log(payload, 'payload');

  let apiUrl = `${BASE_URL}/api/v1/email/verifyOTP`;
  let data = {
    email: payload?.email,
    otp: payload?.otp,
  };
  console.log(apiUrl, 'apiUrl');

  return await axios
    .patch(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: any) => {
      console.log(response, 'response from verify otp');

      return response.data;
    })
    .catch((error: any) => {
      console.log('ResponseError', error);
      // Handle error
      return {success: false, data: error};
    });
}

export const uploadImage = async (payload: any) => {
  try {
    const formData = new FormData();
    formData.append('image', payload);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    const response = await fetch(`${BASE_URL}/image`, requestOptions);
    const result = await response.json();

    console.log('Image upload successful:', result);
    return result; // You can return the result or any other data as needed
  } catch (error) {
    console.log('Image upload error:', error);
    throw error; // You can throw an error or handle it as needed
  }
};

export async function updateUser(payload: any) {
  console.log(payload, 'payload from update user');

  let apiUrl = `${BASE_URL}/api/v1/battle`;
  let data = {
    // firstName: payload?.firstName,
    // lastName: payload?.lastName,
    // displayName: payload?.displayName,
    // mobile_number: payload?.mobile_number,
    // wallet_amount: payload?.wallet_amount,
    gender: payload?.gender,
  };
  console.log(apiUrl, 'apiUrl');

  return await axios
    .patch(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: any) => {
      console.log(response, 'response from update user');

      return response.data;
    })
    .catch((error: any) => {
      console.log('ResponseError', error);
      // Handle error
      return {success: false, data: error};
    });
}

export async function addBattle(payload: any) {
  console.log(payload, 'payload from add battle');

  let apiUrl = `${BASE_URL}/api/v1/battle`;
  let data = {
    user_id: payload?.user_id,
    selected_numbers: payload?.selected_numbers,
    opened_number: payload?.opened_number,
    win_status: false,
  };
  console.log(apiUrl, 'apiUrl');

  return await axios
    .post(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: any) => {
      console.log(response, 'response');

      return response.data;
    })
    .catch((error: any) => {
      console.log('ResponseError', error);
      // Handle error
      return {success: false, data: error};
    });
}

export async function getAllBattle() {
  let apiUrl = `${BASE_URL}/api/v1/battle`;

  return await axios
    .get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: any) => {
      console.log(response, 'get all battle response');

      return response.data;
    })
    .catch((error: any) => {
      console.log('ResponseError', error);
      // Handle error
      return {success: false, data: error};
    });
}

export async function addPurchaseHistory(payload: any) {
  console.log(payload, 'payload from add battle');

  let apiUrl = `${BASE_URL}/api/v1/purchasehistory`;
  let data = {
    customer_id: payload?.customer_id,
    amount: payload?.amount,
    transition: payload?.transition,
  };
  console.log(apiUrl, 'apiUrl');

  return await axios
    .post(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: any) => {
      console.log(response, 'response from add purchaseHistory');

      return response.data;
    })
    .catch((error: any) => {
      console.log('ResponseError', error);
      // Handle error
      return {success: false, data: error};
    });
}

export async function addWithdrawHistory(payload: any) {
  console.log(payload, 'payload from add battle');

  let apiUrl = `${BASE_URL}/api/v1/withdrawhistory`;
  let data = {
    customer_id: payload?.customer_id,
    amount: payload?.amount,
  };
  console.log(apiUrl, 'apiUrl');

  return await axios
    .post(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: any) => {
      console.log(response, 'response');

      return response.data;
    })
    .catch((error: any) => {
      console.log('ResponseError', error);
      // Handle error
      return {success: false, data: error};
    });
}

export async function getPurchaseHistory() {
  let apiUrl = `${BASE_URL}/api/v1/purchasehistory`;

  return await axios
    .get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: any) => {
      console.log(response, 'get all battle response');

      return response.data;
    })
    .catch((error: any) => {
      console.log('ResponseError', error);
      // Handle error
      return {success: false, data: error};
    });
}

export async function getWithdrawHistory() {
  let apiUrl = `${BASE_URL}/api/v1/withdrawhistory`;

  return await axios
    .get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: any) => {
      console.log(response, 'get all battle response');

      return response.data;
    })
    .catch((error: any) => {
      console.log('ResponseError', error);
      // Handle error
      return {success: false, data: error};
    });
}
