import axios from "axios";
const input = document.querySelector('#input-link')
const shortenBtn = document.querySelector('.input-submit')
const copyBtn = document.querySelector('.copy-short')
const downloadBtn = document.querySelector('.copy-QR')

function validateUrl() {
    const inputString = input.value
    const urlPattern = new RegExp('(?:https?)');
    if (!!urlPattern.test(inputString) === true) {
        document.querySelector('.input-submit').classList.add('yellow')
    } else {
        return false
    }
}

input.addEventListener('input', validateUrl)

async function getRequest() {
    const r = await axios.get('https://e7ast1c-shrty.herokuapp.com/expand?hash=zgDN');
    console.log(r)
}

getRequest()

async function postRequest() {
    const r = await axios.post('https://e7ast1c-shrty.herokuapp.com/shorten', {
        "url": input.value
    })
    if (r && r.data && r.data.url) {
        document.querySelector('#output-link').innerHTML = "http://" + r.data.url
    }
    console.log(r.data.url)
}

shortenBtn.addEventListener('click', postRequest)

async function returnLong() {
    const r = await axios.get('https://e7ast1c-shrty.herokuapp.com/expand?hash=zgDN');
    const shortUrl = r.config.transitional.url
    if(window.location = shortUrl) {
        window.location.assign(r)
    }
}

function copyUrl() {
    const range = document.createRange();
    range.selectNode(document.getElementById('output-link'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

copyBtn.addEventListener('click', copyUrl)

function generateQR() {
    let img = document.querySelector('img')
    img.remove()
    downloadBtn.style.background = "#18FBA9"
    copyBtn.style.background = "#18FBA9"
    let inputLink = document.querySelector('#input-link').value
    if (inputLink) {
        let qrcode = new QRCode(document.getElementById("QR-new"),
            {
                text: inputLink,
                width: 110,
                height: 110,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
    } else {
        return false
    }
}

shortenBtn.addEventListener('click', generateQR)

downloadBtn.addEventListener('click', () => {
    let qrcode = document.querySelector('#QR-new img')
    let dlink = document.querySelector('#qrdl')
    let qr = qrcode.getAttribute('src');
    dlink.setAttribute('href', qr);
    dlink.setAttribute('download', 'QR');
    dlink.removeAttribute('hidden');
})