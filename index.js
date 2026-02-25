import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabase = createClient(
  "https://wktttpjoidjgvihkocaq.supabase.co",
  "sb_publishable_NIYt85su5cy9qB5883gsJw_cMjExi-L"
)

// Get elements safely
const searchInput = document.getElementById("searchInput")
const categoryFilter = document.getElementById("categoryFilter")
const sortFilter = document.getElementById("sortFilter")
const profileBtn = document.getElementById("profileBtn")
const container = document.getElementById("itemsContainer")

let allItems = []

// ✅ Check session silently (NO redirect)
async function initSession() {
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    console.log("Logged in:", session.user.email)
  } else {
    console.log("Guest user")
  }
}

initSession()

// ✅ Load items from Supabase
async function loadItems() {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("createdat", { ascending: false })

  if (error) {
    console.error(error.message)
    return
  }

  allItems = data || []
  renderItems()
}

// ✅ Render items
function renderItems() {
  if (!container) return

  container.innerHTML = ""

  let filtered = [...allItems]

  const search = searchInput ? searchInput.value.toLowerCase() : ""
  const category = categoryFilter ? categoryFilter.value : "All"
  const sort = sortFilter ? sortFilter.value : ""

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

  if (sort === "priceLow") filtered.sort((a, b) => a.price - b.price)
  if (sort === "priceHigh") filtered.sort((a, b) => b.price - a.price)

  if (filtered.length === 0) {
    container.innerHTML = "<p>No items found.</p>"
    return
  }

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

    card.addEventListener("click", () => {
      window.location.href = `item.html?id=${item.id}`
    })

    container.appendChild(card)
  })
}

// ✅ Profile button protection
if (profileBtn) {
  profileBtn.addEventListener("click", async () => {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      window.location.href = "auth.html"
    } else {
      window.location.href = "profile.html"
    }
  })
}

// Filters
if (searchInput) searchInput.addEventListener("input", renderItems)
if (categoryFilter) categoryFilter.addEventListener("change", renderItems)
if (sortFilter) sortFilter.addEventListener("change", renderItems)

loadItems()