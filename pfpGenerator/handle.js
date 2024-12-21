const uploadInput = document.getElementById('upload');
const canvasSquare = document.getElementById('canvas-Square');
const canvasRounded = document.getElementById('canvas-rounded');
const canvasSlack = document.getElementById('canvas-slack');
const ctxSquare = canvasSquare.getContext('2d');
const ctxRounded = canvasRounded.getContext('2d');
const ctxSlack = canvasSlack.getContext('2d');
const downloadSquare = document.getElementById('download-Square');
const downloadRounded = document.getElementById('download-rounded');
const downloadSlack = document.getElementById('download-slack');

uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                const size = Math.min(img.width, img.height);
                
                // Slack
                canvasSlack.width = 256;
                canvasSlack.height = 256;
                ctxSlack.clearRect(0, 0, canvasSlack.width, canvasSlack.height);
                ctxSlack.fillStyle = '#ffbce4';
                ctxSlack.fillRect(0, 0, canvasSlack.width, canvasSlack.height);
                ctxSlack.save();
                ctxSlack.beginPath();
                ctxSlack.moveTo(64, 0);
                ctxSlack.quadraticCurveTo(0, 0, 0, 64);
                ctxSlack.lineTo(0, 192);
                ctxSlack.quadraticCurveTo(0, 256, 64, 256);
                ctxSlack.lineTo(192, 256);
                ctxSlack.quadraticCurveTo(256, 256, 256, 192);
                ctxSlack.lineTo(256, 64);
                ctxSlack.quadraticCurveTo(256, 0, 192, 0);
                ctxSlack.closePath();
                ctxSlack.clip();
                ctxSlack.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 10, 10, 236, 236);
                ctxSlack.lineWidth = 10;
                ctxSlack.strokeStyle = '#ffbce4';
                ctxSlack.stroke();
                ctxSlack.restore();

                // Square
                canvasSquare.width = 256;
                canvasSquare.height = 256;
                ctxSquare.clearRect(0, 0, canvasSquare.width, canvasSquare.height);
                ctxSquare.lineWidth = 10;
                ctxSquare.fillStyle = '#ffbce4';
                ctxSquare.fillRect(0, 0, canvasSquare.width, canvasSquare.height);
                ctxSquare.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 10, 10, 236, 236);

                // Rounded
                canvasRounded.width = 256;
                canvasRounded.height = 256;
                ctxRounded.clearRect(0, 0, canvasRounded.width, canvasRounded.height);
                ctxRounded.save();
                ctxRounded.beginPath();
                ctxRounded.arc(128, 128, 128, 0, Math.PI * 2);
                ctxRounded.closePath();
                ctxRounded.clip();
                ctxRounded.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, 256, 256);
                ctxRounded.restore();

                // Border rounded
                ctxRounded.lineWidth = 10;
                ctxRounded.strokeStyle = '#ffbce4';
                ctxRounded.beginPath();
                ctxRounded.arc(128, 128, 123, 0, Math.PI * 2);
                ctxRounded.closePath();
                ctxRounded.stroke();

                // Watermark
                const watermark = new Image();
                watermark.src = './assets/watermark.svg';
                watermark.onload = () => {
                    const watermarkWidth = 100;
                    const watermarkHeight = (watermark.height / watermark.width) * watermarkWidth;

                    // Slack
                    ctxSlack.drawImage(watermark, (canvasSlack.width - watermarkWidth) / 2, canvasSlack.height - watermarkHeight - 15, watermarkWidth, watermarkHeight);
                    // Square
                    ctxSquare.drawImage(watermark, (canvasSquare.width - watermarkWidth) / 2, canvasSquare.height - watermarkHeight - 15, watermarkWidth, watermarkHeight);
                    // Rounded 
                    ctxRounded.drawImage(watermark, (canvasRounded.width - watermarkWidth) / 2, canvasRounded.height - watermarkHeight - 15, watermarkWidth, watermarkHeight);
                };

                downloadSquare.classList.remove('hidden');
                downloadRounded.classList.remove('hidden');
                downloadSlack.classList.remove('hidden');
            };
        };

        reader.readAsDataURL(file);
    }
});


downloadSlack.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'highseas-slack.png';
    link.href = canvasSlack.toDataURL('image/png');
    link.click();
});

downloadSquare.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'highseas-square.png';
    link.href = canvasSquare.toDataURL('image/png');
    link.click();
});

downloadRounded.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'highseas-rounded.png';
    link.href = canvasRounded.toDataURL('image/png');
    link.click();
});