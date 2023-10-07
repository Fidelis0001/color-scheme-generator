const seedColor = document.getElementById("seed-color");
const colorGrid = document.getElementById("color-grid");
const mode = document.getElementById("mode");
const getColorSchemeBtn = document.getElementById("get-color-scheme-btn");

getColorSchemeBtn.addEventListener("click", function () {
  let chosenColor = seedColor.value;
  let color = chosenColor.replace("#", "");
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode.value}&count=5`,
    {
      method: "GET",
      "Content-Type": "application/json",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      let colorsArr = data.colors;
      let newColorsArr = colorsArr.map((color) => color.hex);
      let finalColorsArr = newColorsArr.map((hexValue) => hexValue.value);
      console.log("logs out", finalColorsArr);
      document.getElementById("color-grid").innerHTML = `
      <div id="colors">
          <div id="color-0"></div>
          <div id="color-1"></div>
          <div id="color-2"></div>
          <div id="color-3"></div>
          <div id="color-4"></div>
      </div>
      <div id="color-hex-codes">
      <span id="color-0-hex" class="copy-hex"> ${finalColorsArr[0]}
      </span>
      <span id="color-1-hex" class="copy-hex"> ${finalColorsArr[1]}
      </span>
      <span id="color-2-hex" class="copy-hex"> ${finalColorsArr[2]}
      </span>
      <span id="color-3-hex" class="copy-hex"> ${finalColorsArr[3]}
      </span>
      <span id="color-4-hex" class="copy-hex"> ${finalColorsArr[4]}
      </span>
      </div>
      `;
      document.getElementById("color-0").style.backgroundColor =
        finalColorsArr[0];
      document.getElementById("color-1").style.backgroundColor =
        finalColorsArr[1];
      document.getElementById("color-2").style.backgroundColor =
        finalColorsArr[2];
      document.getElementById("color-3").style.backgroundColor =
        finalColorsArr[3];
      document.getElementById("color-4").style.backgroundColor =
        finalColorsArr[4];

      let hexElements = document.querySelectorAll("span");
      hexElements.forEach(function (hex) {
        hex.onclick = function () {
          document.execCommand("copy");
        };
        hex.addEventListener("copy", function (event) {
          event.preventDefault();
          if (event.clipboardData) {
            event.clipboardData.setData("text/plain", hex.textContent.trim());
            console.log(event.clipboardData.getData("text"));
          }
          window.alert("Text copied to the clipboard!");
        });
      });
    });
});
