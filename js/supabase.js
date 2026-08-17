// =========================================================
// SUPABASE CONNECTION
// =========================================================


// ---------------------------------------------------------
// PROJECT CONFIGURATION
// ---------------------------------------------------------

const SUPABASE_URL = "https://plusrqnmpfobrkigholp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_TOSxaFz_Tu7KE5i4_6sV-Q_70684Rbn";



// ---------------------------------------------------------
// CREATE SUPABASE CLIENT
// ---------------------------------------------------------

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );



// ---------------------------------------------------------
// CONNECTION CHECK
// ---------------------------------------------------------

console.log(
    "Supabase client initialized:",
    supabaseClient
);



// =========================================================
// SUPABASE AUTHENTICATION
// =========================================================


// ---------------------------------------------------------
// ENSURE USER SESSION
// ---------------------------------------------------------

async function ensureSupabaseSession() {

    const {
        data: sessionData,
        error: sessionError
    } =
        await supabaseClient.auth.getSession();


    if (sessionError) {

        console.error(
            "Unable to read Supabase session:",
            sessionError
        );


        return null;

    }


    // Existing session found.
    if (
        sessionData.session
    ) {

        console.log(
            "Supabase session ready:",
            sessionData.session.user.id
        );


        return sessionData.session.user;

    }


    // No session exists yet.
    const {
        data,
        error
    } =
        await supabaseClient.auth
            .signInAnonymously();


    if (error) {

        console.error(
            "Anonymous sign-in failed:",
            error
        );


        return null;

    }


    console.log(
        "Anonymous Supabase user created:",
        data.user.id
    );


    return data.user;

}


// ---------------------------------------------------------
// CURRENT SUPABASE USER
// ---------------------------------------------------------

let currentSupabaseUser =
    null;



// ---------------------------------------------------------
// INITIALIZE SUPABASE
// ---------------------------------------------------------

async function initializeSupabase() {

    currentSupabaseUser =
        await ensureSupabaseSession();


    if (
    currentSupabaseUser
) {

    console.log(
        "Supabase ready for user:",
        currentSupabaseUser.id
    );


    window.dispatchEvent(
        new CustomEvent(
            "supabase-ready"
        )
    );

}

}


initializeSupabase();

initializeSupabase();



