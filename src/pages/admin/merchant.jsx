import InputNotice from "@/components/inputs/InputNotice";
import Loader from "@/components/Loader";
import Layout from "@/components/layouts/Layout";
import { merchantSchema, merchantValidator } from "@/schema/merchant";
import { setInputNotice, setNotice } from "@/store/slices/common";
import { validate } from "@/validators";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import supabase from "@/db/supabase";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import println from "@/helpers/print";

const MerchantFormContext = createContext({});
function useMerchantForm() {
    return useContext(MerchantFormContext);
}

function MerchantInput({ type = 'text', name, label }) {
    const [merchant, setMerchant] = useMerchantForm();
    return (
        <div className="input-row">
            <label htmlFor={name}>{label}</label>
            <input value={merchant[name]} type={type} name={name}
                onChange={(e) => {
                    setMerchant({ ...merchant, [name]: e.target.value });
                }}
            />
            <InputNotice name={name} />
        </div>
    )
}

function MerchantForm() {
    // useMerchant -> will try to fetch merchant detail if user.role= and user.merchant;
    const { user: { user: { id: uid, email } } } = useAuthContext();
    const [uploadStatus, setUploadStatus] = useState(false);
    const [merchant, setMerchant] = useState({ ...merchantSchema });
    const dispatch = useDispatch();
    const router = useRouter();

    async function updateUserRole(merchantID) {
        const { data, error } = await supabase.from('roles')
            .update({ 'role': 'admin', 'merchant': merchantID }).eq('uid', uid);
        if (error) {
            dispatch(setNotice(`Role update failed!`));
        }
    }

    async function saveMerchant() {
        // println(merchant);
        const { data: merchantData, error: joinMerchantError } = await supabase
            .from('merchants')
            .insert([merchant]);

        if (joinMerchantError) {
            println(joinMerchantError);
            setUploadStatus(false);
            dispatch(setNotice('Joining merchant process failed!'));
            return;
        }
        println(merchantData);
        setUploadStatus(false);
        dispatch(setNotice(`Saved, Please visit office with documents to complete it!`));
        setMerchant({ ...merchantSchema });
    }

    async function joinMerchant(e) {
        e.preventDefault();
        const { status, errors } = await validate(merchant, merchantValidator);
        if (status) {
            setUploadStatus(true);
            // store {merchant} in the database;
            await saveMerchant();
            // send user for payment, onSuccess: payment detail will be saved!;
            // router.push('');
            // get merchantID from localstorage.
            // onSuccessfullPayment: update roles.role to "admin";
        } else {
            setUploadStatus(false);
            errors.forEach(err => {
                dispatch(setInputNotice({ name: err.path[0], message: err.message }));
            })
        }
    }

    async function handlePostJoinProcess() {
        // get merchant-id from db.
        // if exists
        // will be done in payment/success
    }

    useEffect(() => {
        handlePostJoinProcess();
    }, [])
    return (
        <Layout>
            <MerchantFormContext.Provider value={[merchant, setMerchant]}>
                <div className="w-1/2 m-auto">
                    <h1 className="text-xl font-semibold">Merchant Form</h1>
                    <form onSubmit={joinMerchant} className="col items-end">
                        <MerchantInput name={'full_name'} label={'Full Name'} />
                        <MerchantInput name={'address'} label={'Address'} />
                        <MerchantInput type="email" name={'email'} label={'Email'} />
                        <MerchantInput type="text" name={'phone'} label={'Phone'} />
                        <MerchantInput name={'business_name'} label={'Business Name'} />
                        <MerchantInput name={'business_address'} label={'Business Address'} />
                        <MerchantInput type="text" name={'pan_number'} label={'Pan Number'} />
                        <MerchantInput type="date" name={'start_date'} label={'Business start date'} />
                        <button type="submit">
                            {
                                uploadStatus ? <Loader /> : "Join"
                            }
                        </button>
                    </form>
                </div>
            </MerchantFormContext.Provider>
        </Layout>
    )
}

export default MerchantForm