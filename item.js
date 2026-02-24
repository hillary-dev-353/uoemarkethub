import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabase = createClient("https://wktttpjoidjgvihkocaq.supabase.co", "sb_publishable_NIYt85su5cy9qB5883gsJw_cMjExi-L")


const itemId = new URLSearchParams(window.location.search).get("id");
const itemDetailsDiv = document.getElementById("itemDetails");

async function loadItem() {

  const docSnap = await getDoc(doc(db, "items", itemId));
  const item = docSnap.data();

  itemDetailsDiv.innerHTML = `
    <img src="${item.image}" style="width:100%;max-height:300px;object-fit:cover;">
    <h2>${item.name}</h2>
    <p><strong>Price:</strong> KES ${item.price}</p>
    <p>${item.description}</p>
    <a href="https://wa.me/${item.whatsapp}" target="_blank">
      <button>Chat on WhatsApp</button>
    </a>
    <button id="reportBtn" style="margin-top:10px;background:black;color:white;">
      Report Item
    </button>
  `;

  document.getElementById("reportBtn").onclick = async () => {

    if (!auth.currentUser) {
      alert("Login first.");
      return;
    }

    await addDoc(collection(db, "reports"), {
      itemId,
      reportedBy: auth.currentUser.uid,
      createdAt: serverTimestamp()
    });

    alert("Report submitted.");
  };

  loadComments();
}

loadItem();
