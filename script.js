let qrCode;

function generateQR(){
  let text = document.getElementById("textInput").value.trim();
  if(!text){ alert("Please enter text or link"); return; }

  document.getElementById("qr").innerHTML = "";
  qrCode = new QRCode(document.getElementById("qr"), {
    text: text,
    width: 200,
    height: 200
  });

  document.getElementById("display").innerText = "Generated from: " + text;
}

function generateBarcode(){
  let text = document.getElementById("textInput").value.trim();
  if(!text){ alert("Please enter text or link"); return; }

  JsBarcode("#barcode", text, {
    format: "CODE128",
    width: 2,
    height: 100,
    displayValue: true,
    fontSize: 14
  });

  document.getElementById("display").innerText = "Generated from: " + text;
}

function downloadQR(){
  const qrCanvas = document.querySelector("#qr canvas");
  if(!qrCanvas){ alert("Please generate a QR code first"); return; }

  const dataURL = qrCanvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "QR_Code.png";
  link.click();
}

function downloadBarcode(){
  const svg = document.getElementById("barcode");
  if(!svg || svg.innerHTML.trim() === ""){ alert("Please generate a Barcode first"); return; }

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