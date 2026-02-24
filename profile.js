import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabase = createClient("https://wktttpjoidjgvihkocaq.supabase.co", "sb_publishable_NIYt85su5cy9qB5883gsJw_cMjExi-L")

// 🔵 DOM
const profilePic = document.getElementById("profilePic");
const imageInput = document.getElementById("profileImageInput");

// 🔵 Auth Check
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "auth.html";
    return;
  }

  document.getElementById("profileName").textContent =
    user.displayName || user.email;

  const docSnap = await getDoc(doc(db, "users", user.uid));
  if (docSnap.exists()) {
    profilePic.src = docSnap.data().photoURL || profilePic.src;
  }
});

// ===============================
// 🔵 BUTTON FUNCTIONS
// ===============================

window.goHome = function () {
  window.location.href = "index.html";
};

window.goToPost = function () {
  window.location.href = "post.html";
};

window.logoutUser = async function () {
  try {
    await signOut(auth);
    window.location.href = "auth.html";
  } catch (error) {
    console.error(error);
    alert("Error logging out.");
  }
};

window.changePhoto = function () {
  imageInput.click();
};

// ===============================
// 🔵 UPLOAD PROFILE PHOTO
// ===============================

imageInput.addEventListener("change", async () => {

  const file = imageInput.files[0];
  const user = auth.currentUser;

  if (!file || !user) return;

  try {
    const imageRef = ref(storage, `profiles/${user.uid}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);

    await setDoc(doc(db, "users", user.uid), {
      photoURL: url
    }, { merge: true });

    profilePic.src = url;
    alert("Profile updated!");

  } catch (error) {
    console.error(error);
    alert("Error uploading image.");
  }
});
