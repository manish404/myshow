import supabase from "./supabase";

async function getMerchants() {
    const { data, error } = await supabase.from('merchants')
        .select('id,full_name, email, address, phone, \
        business_name, business_address, pan_number, start_date, active').limit(15);
    if (error) return null;
    return data;
}

async function updateMerchantStatus(id, value) {
    if (!id && !value) return false;
    const { data, error } = await supabase.from('merchants')
        .update({
            'active': value
        }).eq('id', id);
    if (error) return false;
    return true;
}

export { getMerchants, updateMerchantStatus };