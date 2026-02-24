import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabase = createClient("https://wktttpjoidjgvihkocaq.supabase.co", "sb_publishable_NIYt85su5cy9qB5883gsJw_cMjExi-L")


export async function postItem() {

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    alert("Login first.")
    return
  }

  const name = document.getElementById("itemName").value.trim()
  const price = document.getElementById("itemPrice").value
  const description = document.getElementById("itemDescription").value.trim()
  const category = document.getElementById("itemCategory").value
  const whatsapp = document.getElementById("itemWhatsapp").value.trim()
  const imageFile = document.getElementById("itemImage").files[0]

  const fileName = Date.now() + "_" + imageFile.name

  await supabase.storage.from("images").upload(fileName, imageFile)

  const { data } = supabase.storage.from("images").getPublicUrl(fileName)

  await supabase.from("items").insert({
    name,
    price: Number(price),
    description,
    category,
    whatsapp,
    image: data.publicUrl,
    ownerid: user.id,
    ownername: user.email,
    createdat: new Date()
  })

  alert("Posted successfully!")
  window.location.href = "profile.html"
}