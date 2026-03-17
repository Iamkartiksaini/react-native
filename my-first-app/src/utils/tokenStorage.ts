import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "userToken";

let isStoreHealthy = false;
let isFirstLoading = true;

const checkSecureStore = async () => {
    if (isFirstLoading == false) return
    const available = await SecureStore.isAvailableAsync();
    console.log("SecureStore available:", available);
    if (available) {
        isStoreHealthy = true;
    } else {
        isStoreHealthy = false
    }
    isFirstLoading = false
};


checkSecureStore();

export const saveToken = async (token: string | null) => {
    if (!isStoreHealthy) {
        alert("SecureStore is not available");
        return;
    }
    if (token) {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
};

export const getToken = async () => {
    if (!isStoreHealthy) {
        alert("SecureStore is not available");
        return null;
    }

    let result = await SecureStore.getItemAsync(TOKEN_KEY);
    console.log("getToken result", result)
    if (result) {
        return result
    } else {
        alert('No values stored under that key.');
    }
    return null
};

export const deleteToken = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
};