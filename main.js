const uploadFile = document.querySelector('.upload-file');
const removeImgBtn = document.querySelector('.remove-btn');
const uploadImgBox = document.querySelector('.upload-img');
const controlBox = document.querySelector('.controls');
const link = document.querySelector('.btn-download-img a');
const widthInput = document.querySelector('.change-width-size input');
const heightInput = document.querySelector('.change-height-size input');
let checkBoxRation = document.querySelector('#ratio');
let checkBoxQuality = document.querySelector('#quality');
const downloadBtn = document.querySelector('.btn-download-img');
let percentImg = 1;

function AddActiveUI() {
    uploadImgBox.classList.add('active');
    controlBox.classList.add('active');
    removeImgBtn.classList.add('active');
}

function RemoveActiveUI() {
    uploadImgBox.classList.remove('active');
    controlBox.classList.remove('active');
    removeImgBtn.classList.remove('active');
}

function encodeImageFileAsURL(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        const image = document.createElement('img');
        image.src = reader.result;
        image.onclick = (e) => {
            e.stopPropagation();
        }
        image.setAttribute('draggable', false);
        image.classList.add('current-img');
        uploadImgBox.appendChild(image);

        image.onload = () => {
            widthInput.value = image.naturalWidth;
            heightInput.value = image.naturalHeight;
            percentImg = image.naturalWidth/image.naturalHeight;
        }
        
        AddActiveUI()
    }

    reader.onerror = function() {
        alert('Image error');
    }
}

uploadImgBox.addEventListener('click', (e) => {
    uploadFile.click();
});

uploadFile.addEventListener('change', function(e) {
    encodeImageFileAsURL(e.target.files[0])
})

widthInput.addEventListener('keyup', function(e) {
    const height = checkBoxRation.checked ? widthInput.value/percentImg : heightInput.value;
    heightInput.value = Math.floor(height);
})

heightInput.addEventListener('keyup', function(e) {
    const width = checkBoxRation.checked ? heightInput.value*percentImg : widthInput.value;
    widthInput.value = Math.floor(width);
})

removeImgBtn.addEventListener('click', function() {
    document.querySelector('.current-img').remove();

    const dt = new DataTransfer();
    uploadFile.files = dt.files;

    widthInput.value = '';
    heightInput.value = '';
    checkBoxRation.checked = true;
    checkBoxQuality.checked = false;
    RemoveActiveUI()
})

downloadBtn.addEventListener('click', function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const a = document.createElement('a');

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    const imgQuality = checkBoxQuality.checked ? 0.7 : 1;

    ctx.drawImage(document.querySelector('.current-img'), 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL('image/jpeg', imgQuality);
    a.download = new Date().getTime();
    a.click();
})
