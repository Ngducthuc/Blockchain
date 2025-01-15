document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('nftForm1');
    const uploadBox = document.getElementById('uploadBox1');
    let hasFile = false;
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#3ea6ff';
    });

    uploadBox.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#3a3b3e';
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#3a3b3e';
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    document.querySelector('.upload-button1').addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/jpeg,image/png,image/gif,image/svg+xml,video/mp4';
        input.onchange = (e) => handleFiles(e.target.files);
        input.click();
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'video/mp4'];
            
            if (validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024) {
                hasFile = true;
                uploadBox.classList.remove('error');
                document.getElementById('fileError1').textContent = '';
                // Hiển thị tên file đã chọn
                document.querySelector('.upload-text1').textContent = `Đã chọn: ${file.name}`;
            } else {
                hasFile = false;
                uploadBox.classList.add('error');
                document.getElementById('fileError1').textContent = 'File không hợp lệ hoặc vượt quá dung lượng cho phép';
            }
        }
    }
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        const errors = document.querySelectorAll('.error-message1');
        errors.forEach(error => error.textContent = '');
        document.querySelectorAll('.input1, .textarea1').forEach(input => input.classList.remove('error'));
        if (!hasFile) {
            isValid = false;
            uploadBox.classList.add('error');
            document.getElementById('fileError1').textContent = 'Vui lòng chọn file';
        }
        const nameInput = document.getElementById('nftName1');
        if (!nameInput.value.trim()) {
            isValid = false;
            nameInput.classList.add('error');
            document.getElementById('nameError1').textContent = 'Vui lòng nhập tên NFT';
        }
        const quantityInput = document.getElementById('nftQuantity1');
        if (!quantityInput.value || quantityInput.value < 1) {
            isValid = false;
            quantityInput.classList.add('error');
            document.getElementById('quantityError1').textContent = 'Số lượng phải lớn hơn 0';
        }
        const linkInput = document.getElementById('nftLink1');
        if (linkInput.value && !isValidUrl(linkInput.value)) {
            isValid = false;
            linkInput.classList.add('error');
            document.getElementById('linkError1').textContent = 'URL không hợp lệ';
        }

        if (isValid) {
            document.getElementById('successModal1').classList.add('show');
            form.reset();
            hasFile = false;
            document.querySelector('.upload-text1').textContent = 'Kéo và thả tập tin phương tiện';
        }
    });
});

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function closeSuccessModal() {
    document.getElementById('successModal1').classList.remove('show');
}