/* =====================================================
   INTERNIO SHARED ADMIN AUTHENTICATION
===================================================== */

const SUPABASE_URL =
    "https://hgodypvijzrvnsfylwdu.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_4oTVR9f73fDNrMFXyxl2IA_A7As8VMv";


const internioSupabase =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =====================================================
   CHECK ADMIN LOGIN
===================================================== */

async function requireAdmin() {

    try {

        const {
            data: {
                session
            }
        } =
        await internioSupabase
            .auth
            .getSession();


        if (!session) {

            const currentPage =
                window.location.pathname
                    .split("/")
                    .pop();


            window.location.href =
                "admin.html?redirect=" +
                encodeURIComponent(
                    currentPage
                );


            return false;
        }


        return true;

    }

    catch(error) {

        console.error(
            "InternIO authentication error:",
            error
        );


        window.location.href =
            "admin.html";


        return false;
    }

}


/* =====================================================
   GET CURRENT ADMIN SESSION
===================================================== */

async function getAdminSession() {

    const {
        data: {
            session
        }
    } =
    await internioSupabase
        .auth
        .getSession();


    return session;

}


/* =====================================================
   LOGOUT
===================================================== */

async function internioLogout() {

    await internioSupabase
        .auth
        .signOut();


    window.location.href =
        "admin.html";

}
