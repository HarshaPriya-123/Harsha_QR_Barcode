let qrCode;

function generateQR(){
  let text = document.getElementById("textInput").value
  if(text === ""){
    alert("Please enter text or link")
    return
  }
  document.getElementById("qr").innerHTML=""
  qrCode = new QRCode(document.getElementById("qr"),{
    text:text,
    width:200,
    height:200
  })
  document.getElementById("display").innerText="Generated from: " + text
}

function generateBarcode(){
  let text = document.getElementById("textInput").value
  if(text === ""){
    alert("Please enter text or link")
    return
  }
  JsBarcode("#barcode",text,{
    format:"CODE128",
    width:2,
    height:90,
    displayValue:true,
    fontSize:14
  })
  document.getElementById("display").innerText="Generated from: " + text
}

function downloadQR(){
  if(!qrCode){
    alert("Please generate a QR code first")
    return
  }
  const qrImg = document.querySelector("#qr img")
  if(!qrImg){
    alert("QR code not ready")
    return
  }
  const link = document.createElement("a")
  link.href = qrImg.src
  link.download = "QR_Code.png"
  link.click()
}

function downloadBarcode(){
  const svg = document.getElementById("barcode")
  if(!svg || svg.innerHTML.trim() === ""){
    alert("Please generate a Barcode first")
    return
  }
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svg);
  const blob = new Blob([source], {type:"image/svg+xml"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Barcode.svg";
  link.click();
  URL.revokeObjectURL(url);
}