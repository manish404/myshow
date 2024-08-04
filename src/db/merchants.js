import supabase from "./supabase";

async function getMerchants() {
    const { data, error } = await supabase.from('merchants')
        .select('id,full_name, email, address, phone, \
        business_name, business_address, pan_number, start_date, active').limit(15);
    if (error) return null;
    return data;
}

async function updateMerchantStatus(id, email, value) {
    if (!id && !value && !email) return false;
    const { data: merchantsData, error: merchantsError } = await supabase.from('merchants')
        .update({
            'active': value
        }).eq('id', id);
    if (merchantsError) return false;
    const { data: rolesData, error: rolesError } = await supabase.from('roles')
        .update({ 'role': value ? 'admin' : 'user' }).eq('email', email);
    if (rolesError) return false;
    return true;
}

export { getMerchants, updateMerchantStatus };