import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabase = createClient(
  "https://wktttpjoidjgvihkocaq.supabase.co",
  "sb_publishable_NIYt85su5cy9qB5883gsJw_cMjExi-L"
)

const profilePic = document.getElementById("profilePic")
const imageInput = document.getElementById("profileImageInput")
const myPostsDiv = document.querySelector(".my-posts")

async function initProfile() {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    window.location.href = "auth.html"
    return
  }

  document.getElementById("profileName").textContent = user.email

  loadMyPosts(user.id)
}

async function loadMyPosts(userId) {
  const { data } = await supabase
    .from("items")
    .select("*")
    .eq("ownerid", userId)

  myPostsDiv.innerHTML = ""

  data.forEach(item => {
    const div = document.createElement("div")
    div.className = "card"
    div.innerHTML = `
      <img src="${item.image}">
      <div class="card-body">
        <h4>${item.name}</h4>
        <p class="price">Ksh ${item.price}</p>
      </div>
    `
    myPostsDiv.appendChild(div)
  })
}

window.goHome = () => window.location.href = "index.html"
window.goToPost = () => window.location.href = "post.html"

window.logoutUser = async () => {
  await supabase.auth.signOut()
  window.location.href = "auth.html"
}

window.changePhoto = () => {
  imageInput.click()
}

initProfile()