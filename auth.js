import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabase = createClient(
  "https://wktttpjoidjgvihkocaq.supabase.co",
  "sb_publishable_NIYt85su5cy9qB5883gsJw_cMjExi-L"
)

document.addEventListener("DOMContentLoaded", () => {

  const signupBtn = document.getElementById("signupBtn")
  const loginBtn = document.getElementById("loginBtn")
  const guestBtn = document.getElementById("guestBtn")
  const message = document.getElementById("authMessage")

  // SIGN UP
  signupBtn.onclick = async () => {

    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()

    if (!email || !password) {
      message.innerText = "Enter email and password"
      return
    }

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
      message.innerText = "Verification email sent. Check your inbox."
    }
  }

  // LOGIN
  loginBtn.onclick = async () => {

    const email = document.getElementById("loginEmail").value.trim()
    const password = document.getElementById("loginPassword").value.trim()

    if (!email || !password) {
      message.innerText = "Enter login details"
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      message.innerText = "Invalid login credentials"
    } else {
      window.location.href = "index.html"
    }
  }

  // GUEST
  guestBtn.onclick = () => {
    window.location.href = "index.html"
  }

})