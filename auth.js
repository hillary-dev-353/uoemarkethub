import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabase = createClient(
  "https://wktttpjoidjgvihkocaq.supabase.co",
  "sb_publishable_NIYt85su5cy9qB5883gsJw_cMjExi-L"
)

window.addEventListener("load", () => {

  console.log("Auth JS Loaded")

  const signupBtn = document.getElementById("signupBtn")
  const loginBtn = document.getElementById("loginBtn")
  const guestBtn = document.getElementById("guestBtn")
  const message = document.getElementById("authMessage")

  if (!signupBtn || !loginBtn || !guestBtn) {
    console.error("Buttons not found in HTML")
    return
  }

  // SIGN UP
  signupBtn.addEventListener("click", async () => {

    console.log("Signup clicked")

    const email = document.getElementById("email")?.value.trim()
    const password = document.getElementById("password")?.value.trim()

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
      console.error(error)
    } else {
      message.innerText = "Verification email sent. Check inbox."
      console.log("Signup request sent")
    }
  })


  // LOGIN
  loginBtn.addEventListener("click", async () => {

    console.log("Login clicked")

    const email = document.getElementById("loginEmail")?.value.trim()
    const password = document.getElementById("loginPassword")?.value.trim()

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
      console.error(error)
    } else {
      window.location.href = "index.html"
    }
  })


  // CONTINUE AS GUEST
  guestBtn.addEventListener("click", () => {
    console.log("Guest clicked")
    window.location.href = "index.html"
  })

})