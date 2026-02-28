import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabase = createClient(
  "https://wktttpjoidjgvihkocaq.supabase.co",
  "sb_publishable_NIYt85su5cy9qB5883gsJw_cMjExi-L"
)

const signupBtn = document.getElementById("signupBtn")
const loginBtn = document.getElementById("loginBtn")
const guestBtn = document.getElementById("guestBtn")
const message = document.getElementById("authMessage")

// SIGN UP
signupBtn.addEventListener("click", async () => {

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://uoemarkethub.vercel.app/index.html"
    }
  })

  if (error) {
    message.innerText = error.message
  } else {
    message.innerText = "Check your email to confirm signup."
  }
})


// LOGIN
loginBtn.addEventListener("click", async () => {

  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    message.innerText = "Invalid login credentials"
  } else {
    window.location.href = "index.html"
  }
})


// CONTINUE AS GUEST
guestBtn.addEventListener("click", () => {
  window.location.href = "index.html"
})