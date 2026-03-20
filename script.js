let qrCode;

// Generate QR Code (Improved compatibility)
function generateQR(){
  let text = document.getElementById("textInput").value.trim();

  if(!text){
    alert("Please enter text or link");
    return;
  }

  document.getElementById("qr").innerHTML = "";

  // Keep original text but ensure scanner-friendly format
  let formattedText = text;

  qrCode = new QRCode(document.getElementById("qr"), {
    text: formattedText,
    width: 200,
    height: 200
  });

  document.getElementById("display").innerText = "Generated from: " + text;
}


// ✅ Generate Barcode (Improved scanner compatibility)
function generateBarcode(){
  let text = document.getElementById("textInput").value.trim();

  if(!text){
    alert("Please enter text or link");
    return;
  }

  let formatType = "CODE128";

  // If numeric & length = 12 → use EAN13 (better scanner support)
  if(/^\d+$/.test(text) && text.length === 12){
    formatType = "EAN13";
  }

  JsBarcode("#barcode", text, {
    format: formatType,
    width: 2,
    height: 100,
    displayValue: true,
    fontSize: 14,
    margin: 10
  });

  document.getElementById("display").innerText = "Generated from: " + text;
}


// Download QR
function downloadQR(){
  const qrCanvas = document.querySelector("#qr canvas");

  if(!qrCanvas){
    alert("Please generate a QR code first");
    return;
  }

  const dataURL = qrCanvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "QR_Code.png";
  link.click();
}


// Download Barcode
function downloadBarcode(){
  const svg = document.getElementById("barcode");

  if(!svg || svg.innerHTML.trim() === ""){
    alert("Please generate a Barcode first");
    return;
  }

  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svg);

  const svgBlob = new Blob([source], {type: "image/svg+xml"});
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();

  img.onload = function(){
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "Barcode.png";
    link.click();

    URL.revokeObjectURL(url);
  };

  img.src = url;
}
