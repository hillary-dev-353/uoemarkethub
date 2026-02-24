import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabase = createClient("https://wktttpjoidjgvihkocaq.supabase.co", "sb_publishable_NIYt85su5cy9qB5883gsJw_cMjExi-L")

window.signUp = async function () {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    alert(error.message)
  } else {
    alert("Account created!")
    window.location.href = "index.html"
  }
}

window.login = async function () {
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    alert(error.message)
  } else {
    window.location.href = "index.html"
  }
}

window.logoutUser = async function () {
  await supabase.auth.signOut()
  window.location.href = "auth.html"
}