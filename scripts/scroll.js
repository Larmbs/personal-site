var scroll_pos_prev = window.scrollY;

document.addEventListener("scroll", async function() {
    let scroll_pos_current = window.scrollY
    if (scroll_pos_prev > scroll_pos_current) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-12vh";
      }
      scroll_pos_prev = scroll_pos_current;
});
