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

///////////////////////shipping company and price//////////////////////

const createShippers = async (data) => {
    try {
        let result = await api.post(Apis.CreateShippers, data);
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

const getShipper = async () => {
    try {
        let result = await api.get(Apis.GetShippers);
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

const getUpdateShippers = async (data) => {
    try {
        let result = await api.post(Apis.UpdateShippers, data);
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

//////////////////Category Advert//////////////////////
const createCatAdvert = async (data) => {
    try {
        let result = await api.post(Apis.CreateCatAdvert, data);
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

const getCatAdvert = async () => {
    try {
        let result = await api.get(Apis.GetCatAdvert);
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

const getUpdateCatAdvert = async (data) => {
    try {
        let result = await api.post(Apis.UpdateCatAdvert, data);
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

///////////////////////Home page Slider//////////////////////

const createSliders = async (data) => {
    try {
        let result = await apifile.post(Apis.CreateSlider, data);
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

const getSlider = async () => {
    try {
        let result = await api.get(Apis.GetSlider);
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

const getUpdateSlider = async (data) => {
    try {
        let result = await api.post(Apis.UpdateSlider, data);
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


///////////////////////Home page Advertisiment Banner//////////////////////

const createAdvertBanner = async (data) => {
    try {
        let result = await apifile.post(Apis.CreateAdvertBanner, data);
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

const getAdvertBanner = async () => {
    try {
        let result = await api.get(Apis.GetAdvertBanner);
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

///////////////////////Crystal Customization Options//////////////////////

const createCrystalCustomOption = async (data) => {
    try {
        let result = await api.post(Apis.CreateCrystalOption, data);
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

const getCrystalCustomOption = async () => {
    try {
        let result = await api.get(Apis.GetCrystalOption);
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
    createShippers,
    getShipper,
    getUpdateShippers,
    createCatAdvert,
    getCatAdvert,
    createSliders,
    getSlider,
    getUpdateSlider,
    getUpdateCatAdvert,
    createAdvertBanner,
    getAdvertBanner,
    createCrystalCustomOption,
    getCrystalCustomOption
};