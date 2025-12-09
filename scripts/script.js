window.addEventListener('load', e => {
  const d = new Date();
  let year = d.getFullYear();
  const cr = document.getElementById('copyright')
  cr.innerHTML = "©" + year + " Play2Learn"
})
