import {create} from 'zustand'
import { instance } from '../hooks/service'

export const VerifyStore = create(
    (set,get) =>({
        verifiedUsers:null,
        add:null,
        check:false,
        storeId:null,
        verifycheck:null,
        getVerifications: async(data) => {
            try {
                const response = await instance.post('verification/process',data);
                set(state => ({...state, verifiedUsers:response.data.data}))
                
                return response.data;
            } catch (error) {
                console.log(error);
                
                return error;
            } finally{
                return null;
            }
        },
        getCheck: async(data) => {
            try {
                const response = await instance.post('verification/check',data);
                set(state => ({...state, verifycheck:response.data.data}))
                
                return response.data;
            } catch (error) {
                console.log(error);
                
                return error;
            } finally{
                return null;
            }
        },
        setAdd: (value) =>{
            set(state => ({...state, add:value}))
        },
        setCheck: (value) =>{
            set(state => ({...state, check:value}))
        },
        setStoreId: (value) =>{
            set(state => ({...state, storeId:value}))
        },
    })
)