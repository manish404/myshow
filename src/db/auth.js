import supabase from "@/db/supabase";
import println from "@/helpers/print";

async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });
    println('siwg', data, error);
}

async function getRole() {
    const { data: { user } } = await supabase.auth.getUser();
    // println(user);
    let res;
    if (user) {
        res = await supabase.from('roles').select('role, expires_on').eq('uid', user.id);
    }
    return res;
}

async function logout() {
    await supabase.auth.signOut();
}

export { signInWithGoogle, getRole, logout };