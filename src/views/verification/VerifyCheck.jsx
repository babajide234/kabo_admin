import { useEffect } from "react";
import { useUserStore } from "src/@core/store/userStore";
import { VerifyStore } from "src/@core/store/verifyStore";

const VerifyCheck = () => {

    const id = VerifyStore((state)=> state.storeId);
    const getCheck = VerifyStore((state)=> state.getCheck);
    const token = useUserStore((state)=> state.user);

    useEffect(()=>{

        const data = {
            token:token,
            store_id: id,
            kyc_id: "",
            number: "",
            type: "", 
            doc_url: "", 
            phone_number: "", 
            bvn: "",
            photo_url: "",
            otp: "", 
            send_otp : "" 
        }

        getCheck(data)
    },[getCheck, id, token])


    return (
        <div>
            Enter
        </div>
    );
}

export default VerifyCheck;