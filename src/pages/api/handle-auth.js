import supabase from "@/db/supabase";
import println from "@/helpers/print";

export default async function handler(req, res) {
    // const refreshToken = req;
    println(req.headers.cookie, req.headers.cookie['sb-vrhyeprulbnxbynjopmp-auth-token']);
    // supabase.auth.setSession(req)
    return res.json({ 'message': 'done' });
}