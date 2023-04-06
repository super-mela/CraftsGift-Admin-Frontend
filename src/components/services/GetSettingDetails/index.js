import api from '../../ApiConfig';
import { Apis } from '../../../config';
import apifile from '../../ApiFileConfig'
import { NotificationManager } from 'react-notifications';


///////////////About Us///////////////////////////
const createAboutUs = async (data) => {
    try {
        let result = await apifile.post(Apis.CreateAboutUs, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getAboutUs = async () => {
    try {
        let result = await api.get(Apis.GetAboutUs);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const getUpdateAboutUs = async (data) => {
    try {
        let result = await api.post(Apis.UpdateAboutUs, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

/////////////////////Banner Image//////////////////////////////

const createBannerIamge = async (data) => {
    try {
        let result = await apifile.post(Apis.CreateBannerIamge, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getBannerImage = async () => {
    try {
        let result = await api.get(Apis.GetBannerImage);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


export default {
    createAboutUs,
    getAboutUs,
    getUpdateAboutUs,
    createBannerIamge,
    getBannerImage,
};