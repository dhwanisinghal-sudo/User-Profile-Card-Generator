const form=document.getElementById("profileForm"),bio=document.getElementById("bio"),toast=document.getElementById("toast");
bio.addEventListener("input",()=>document.getElementById("bioCount").textContent=bio.value.length);
function notify(message){toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2500)}
form.addEventListener("submit",async event=>{
 event.preventDefault();
 const payload={name:document.getElementById("name").value.trim(),bio:bio.value.trim(),image_url:document.getElementById("imageUrl").value.trim()};
 const button=document.getElementById("generateButton"),message=document.getElementById("message");
 button.disabled=true;button.textContent="Generating...";
 try{
  const response=await fetch("/api/profile",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  const result=await response.json();if(!response.ok)throw new Error(result.error||"Could not generate profile.");
  document.getElementById("cardName").textContent=result.name;document.getElementById("cardBio").textContent=result.bio;
  const img=document.getElementById("profileImage");img.onload=()=>{img.classList.remove("hidden");document.querySelector(".avatar").firstChild.textContent=""};img.onerror=()=>notify("Profile generated, but the image URL could not load.");img.src=result.image_url;
  document.getElementById("caption").textContent="Your profile card is ready.";message.textContent="Success! Your data was processed by the Python backend.";notify("Profile card generated successfully.");
 }catch(error){message.textContent=error.message;notify(error.message)}
 finally{button.disabled=false;button.textContent="Generate profile card ↗"}
});