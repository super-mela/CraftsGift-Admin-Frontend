import api from '../../ApiConfig';
import apifile from '../../ApiFileConfig'
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const addCrystalList = async (data, config) => {

    try {
        let result = await apifile.post(Apis.AddCrystalList, data);
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
const getAllCrystalList = async () => {
    try {
        let result = await api.get(Apis.GetAllCrystalList);
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
const getAllCrystalPhoto = async () => {
    try {
        let result = await api.get(Apis.GetAllCrystalPhoto);
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
const getUpdateCrystal = async (data, config) => {
    try {
        let result = await apifile.post(Apis.GetUpdateCrystal, data, config);
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

const getUploadCrystalImage = async (data, config) => {
    try {
        let result = await api.post(Apis.GetUploadCrystalImage, data, config);
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
const getDeleteCrystal = async (id) => {
    try {
        let result = await api.delete(Apis.GetDeleteCrystal, { params: { id } });
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
const getCrystalById = async (id) => {
    try {
        let result = await api.get(Apis.GetCrystalById, { params: { id } });
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

const getCrystalPhotoDeleteById = async (data) => {
    try {
        let result = await api.post(Apis.GetCrystalPhotoDeleteById, {
            id: data.id, imgUrl: data.imgUrl
        });
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
    addCrystalList,
    getAllCrystalList,
    getUpdateCrystal,
    getDeleteCrystal,
    getUploadCrystalImage,
    getAllCrystalPhoto,
    getCrystalById,
    getCrystalPhotoDeleteById,
}