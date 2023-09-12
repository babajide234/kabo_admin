
import { create } from 'zustand';
import { earnings } from '../hooks/service';


export const EarningStore = create(
    ( set , get )=>({
        earnings: null,
        loading:false,
        getEarnings: async (data)=>{
            const response =  await earnings(data);
            
            if(response.data.status == "success"){
                set( state => ({ ...state, earnings: response.data.data}));
            }

            return response;
        },
        
    })
)