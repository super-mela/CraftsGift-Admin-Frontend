import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const getAllCustomOrderList = async () => {
    try {
        let result = await api.get(Apis.GetAllCustomOrderDetails);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCustomeOrderStatusUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetCustomOrderStatusUpdate, data);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCustomOrderEmailSend = async (data) => {
    try {
        let result = await api.post(Apis.GetCustomOrderEmail, data);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default {
    getAllCustomOrderList,
    getCustomeOrderStatusUpdate,
    getCustomOrderEmailSend,
};