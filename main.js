import axios from "axios";
const input = document.querySelector('#input-link')
const shortenBtn = document.querySelector('.input-submit')
const copyBtn = document.querySelector('.copy-short')
const downloadBtn = document.querySelector('.copy-QR')
const tooltipCopied = document.querySelector('.copied')
const tooltipInvalid = document.querySelector('.invalid')

function validateUrl() {
    const inputString = input.value
    const urlPattern = new RegExp('(?:https?)');
    if (!!urlPattern.test(inputString) === true) {
        document.querySelector('.input-submit').classList.add('yellow')
    } else {
        shortenBtn.classList.add('red')
        copyBtn.removeEventListener
        downloadBtn.removeEventListener
    }
    if (inputString.length === 0) {
        shortenBtn.classList.remove('red')
        shortenBtn.classList.remove('yellow')
    }
}

input.addEventListener('input', validateUrl)

onMountUrlCheck()
async function onMountUrlCheck() {
    const re = /^[0-9A-Za-z\/]{4,100}$/gm
    if(window.location.pathname.indexOf('/') == 0 && window.location.pathname.length > 1 && window.location.pathname.match(re)) {
        await returnLong(window.location.pathname.replace("/",""))
    }
}

async function postRequest() {
    const r = await axios.post('https://e7ast1c-shrty.herokuapp.com/shorten', {
        "url": input.value
    })
    if (r && r.data && r.data.url) {
        document.querySelector('#output-link').innerHTML = window.location.origin + "/" + r.data.url
    }
    console.log(r.data.url)
}

shortenBtn.addEventListener('click', postRequest)

async function returnLong(hash) {
    const res = await axios.get(`https://e7ast1c-shrty.herokuapp.com/expand?hash=${hash}`);
    window.location.assign(res.data.url)
}

function copyUrl() {
    if (document.querySelector('#output-link').innerHTML != "") {
        const range = document.createRange();
        range.selectNode(document.getElementById('output-link'));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        tooltipCopied.classList.remove('hidden');
        setTimeout(() => tooltipCopied.classList.add('hidden'), 1000)
    }
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