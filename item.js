import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabase = createClient(
  "https://wktttpjoidjgvihkocaq.supabase.co",
  "sb_publishable_NIYt85su5cy9qB5883gsJw_cMjExi-L"
)

const itemId = new URLSearchParams(window.location.search).get("id")
const itemDetailsDiv = document.getElementById("itemDetails")
const commentsSection = document.getElementById("commentsSection")

async function loadItem() {
  const { data } = await supabase
    .from("items")
    .select("*")
    .eq("id", itemId)
    .single()

  itemDetailsDiv.innerHTML = `
    <img src="${data.image}" style="width:100%;max-height:300px;object-fit:cover;">
    <h2>${data.name}</h2>
    <p><strong>Price:</strong> KES ${data.price}</p>
    <p>${data.description}</p>

    <a href="https://wa.me/2541xxxxxxxx" target="_blank">
      <button>Chat via 2541...</button>
    </a>

    <a href="https://wa.me/2547xxxxxxxx" target="_blank">
      <button style="background:green;">Chat via 2547...</button>
    </a>
  `

  loadComments()
}

async function loadComments() {
  const { data } = await supabase
    .from("comments")
    .select("*")
    .eq("itemid", itemId)

  commentsSection.innerHTML = ""

  data.forEach(c => {
    const p = document.createElement("p")
    p.textContent = c.text
    commentsSection.appendChild(p)
  })
}

window.addComment = async function () {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    alert("Login first")
    return
  }

  const text = document.getElementById("newComment").value

  await supabase.from("comments").insert({
    itemid: itemId,
    text,
    userid: user.id
  })

  document.getElementById("newComment").value = ""
  loadComments()
}

window.goBack = () => window.history.back()

loadItem()