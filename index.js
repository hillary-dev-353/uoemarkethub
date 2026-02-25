import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabase = createClient(
  "https://wktttpjoidjgvihkocaq.supabase.co",
  "sb_publishable_NIYt85su5cy9qB5883gsJw_cMjExi-L"
)

const searchInput = document.getElementById("searchInput")
const categoryFilter = document.getElementById("categoryFilter")
const sortFilter = document.getElementById("sortFilter")

let allItems = []

// 🔐 FORCE AUTH FIRST
async function checkAuth() {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    window.location.href = "auth.html"
  }
}

checkAuth()

async function loadItems() {
  const { data } = await supabase
    .from("items")
    .select("*")
    .order("createdat", { ascending: false })

  allItems = data || []
  renderItems()
}

function renderItems() {
  const container = document.getElementById("itemsContainer")
  container.innerHTML = ""

  let filtered = [...allItems]

  const search = searchInput.value.toLowerCase()
  const category = categoryFilter.value
  const sort = sortFilter.value

  if (search) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(search)
    )
  }

  if (category !== "All") {
    filtered = filtered.filter(item =>
      item.category === category
    )
  }

  if (sort === "priceLow") filtered.sort((a,b)=>a.price-b.price)
  if (sort === "priceHigh") filtered.sort((a,b)=>b.price-a.price)

  filtered.forEach(item => {
    const card = document.createElement("div")
    card.className = "card"

    card.innerHTML = `
      <img src="${item.image}">
      <div class="card-body">
        <h4>${item.name}</h4>
        <p class="price">Ksh ${item.price}</p>
      </div>
    `

    card.onclick = () => {
      window.location.href = `item.html?id=${item.id}`
    }

    container.appendChild(card)
  })

  if (filtered.length === 0) {
    container.innerHTML = "<p>No items found.</p>"
  }
}

searchInput.addEventListener("input", renderItems)
categoryFilter.addEventListener("change", renderItems)
sortFilter.addEventListener("change", renderItems)

loadItems()

document.getElementById("profileBtn").addEventListener("click", () => {
  window.location.href = "profile.html"
})