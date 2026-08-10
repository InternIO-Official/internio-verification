/* =====================================================
   INTERNIO SHARED ADMIN AUTHENTICATION
   InternIO = Innovation & Opportunities
===================================================== */


/* =====================================================
   SUPABASE CONFIGURATION
===================================================== */

const SUPABASE_URL =
    "https://hgodypvijzrvnsfylwdu.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_4oTVR9f73fDNrMFXyxl2IA_A7As8VMv";


/* =====================================================
   CREATE SHARED SUPABASE CLIENT
===================================================== */

if (!window.supabase) {

    console.error(
        "InternIO: Supabase JavaScript library was not loaded."
    );

    throw new Error(
        "Supabase library missing. Load Supabase JS before auth.js."
    );
}


const internioSupabase =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
                storage: window.localStorage
            }
        }
    );


/* =====================================================
   CHECK ADMIN LOGIN
===================================================== */

async function requireAdmin() {

    try {

        const {
            data,
            error
        } =
        await internioSupabase
            .auth
            .getSession();


        if (error) {

            console.error(
                "InternIO session error:",
                error
            );

            redirectToAdminLogin();

            return false;
        }


        const session =
            data
                ? data.session
                : null;


        if (!session) {

            redirectToAdminLogin();

            return false;
        }


        return true;

    }

    catch (error) {

        console.error(
            "InternIO authentication error:",
            error
        );

        redirectToAdminLogin();

        return false;
    }
}


/* =====================================================
   REDIRECT TO ADMIN LOGIN
===================================================== */

function redirectToAdminLogin() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    /*
     * Don't redirect admin.html to itself.
     */

    if (
        !currentPage ||
        currentPage === "admin.html"
    ) {

        window.location.href =
            "admin.html";

        return;
    }


    /*
     * Remember which page the admin wanted.
     */

    const loginURL =
        "admin.html?redirect=" +
        encodeURIComponent(
            currentPage
        );


    window.location.href =
        loginURL;
}


/* =====================================================
   GET CURRENT ADMIN SESSION
===================================================== */

async function getAdminSession() {

    try {

        const {
            data,
            error
        } =
        await internioSupabase
            .auth
            .getSession();


        if (error) {

            console.error(
                "InternIO session error:",
                error
            );

            return null;
        }


        return data
            ? data.session
            : null;

    }

    catch (error) {

        console.error(
            "InternIO session error:",
            error
        );

        return null;
    }
}


/* =====================================================
   GET CURRENT ADMIN USER
===================================================== */

async function getAdminUser() {

    try {

        const {
            data,
            error
        } =
        await internioSupabase
            .auth
            .getUser();


        if (error) {

            console.error(
                "InternIO user error:",
                error
            );

            return null;
        }


        return data
            ? data.user
            : null;

    }

    catch (error) {

        console.error(
            "InternIO user error:",
            error
        );

        return null;
    }
}


/* =====================================================
   LOGOUT
===================================================== */

async function internioLogout() {

    try {

        const {
            error
        } =
        await internioSupabase
            .auth
            .signOut();


        if (error) {

            console.error(
                "InternIO logout error:",
                error
            );

        }

    }

    finally {

        window.location.href =
            "admin.html";

    }
}


/* =====================================================
   AUTH STATE LISTENER
===================================================== */

internioSupabase
    .auth
    .onAuthStateChange(
        function (
            event,
            session
        ) {

            console.log(
                "InternIO Auth:",
                event,
                session
                    ? "Session active"
                    : "No active session"
            );

        }
    );
