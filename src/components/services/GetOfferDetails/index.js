import api from '../../ApiConfig';
import { Apis } from '../../../config';
import apifile from '../../ApiFileConfig'
import { NotificationManager } from 'react-notifications';


const createOfferList = async (data) => {
    try {
        let result = await apifile.post(Apis.CreateOfferList, data);
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

const getOfferList = async () => {
    try {
        let result = await api.get(Apis.GetAllOfferList);
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
const getUpdateOfferList = async (data) => {
    try {
        let result = await apifile.post(Apis.GetUpdateOfferList, data);
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

const searchOfferList = async (data) => {
    try {
        let result = await api.post(Apis.SearchOfferList, data);
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

const getOfferDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetOfferDeleteById, { params: { id } });
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
    createOfferList,
    getOfferList,
    getOfferDeleteById,
    getUpdateOfferList,
    searchOfferList,
};