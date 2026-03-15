const URL = 'https://teachablemachine.withgoogle.com/models/zXAsbSLt-/';

let model, labelContainer, maxPredictions;

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const uploadArea = document.getElementById('upload-area');
    const imageInput = document.getElementById('image-input');
    const imagePreview = document.getElementById('image-preview');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const loading = document.getElementById('loading');
    const reUploadBtn = document.getElementById('re-upload-btn');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    // Initialize TM Model
    async function initModel() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        
        try {
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
            console.log("Model Loaded");
        } catch (e) {
            console.error("Failed to load model", e);
        }
    }

    // Handle Upload
    uploadArea.addEventListener('click', () => imageInput.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--accent-color)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImage(file);
        }
    });

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleImage(file);
    });

    reUploadBtn.addEventListener('click', () => {
        imagePreviewContainer.classList.add('hidden');
        resultContainer.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        imageInput.value = '';
    });

    async function handleImage(file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            imagePreview.src = e.target.result;
            uploadArea.classList.add('hidden');
            imagePreviewContainer.classList.remove('hidden');
            
            // Start Prediction
            loading.classList.remove('hidden');
            resultContainer.classList.add('hidden');
            
            if (!model) await initModel();
            
            await predict();
            loading.classList.add('hidden');
            resultContainer.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }

    async function predict() {
        const prediction = await model.predict(imagePreview);
        const labelContainer = document.getElementById('label-container');
        labelContainer.innerHTML = '';
        
        // Map labels: Class 1 -> 강아지, Class 2 -> 고양이
        const labelMapping = {
            'Class 1': '강아지',
            'Class 2': '고양이'
        };

        // Apply mapping to predictions
        const mappedPredictions = prediction.map(p => ({
            className: labelMapping[p.className] || p.className,
            probability: p.probability
        }));

        // Sort by probability
        mappedPredictions.sort((a, b) => b.probability - a.probability);

        const topResult = mappedPredictions[0];
        resultMessage.textContent = `당신은 ${topResult.className}상입니다!`;

        mappedPredictions.forEach(p => {
            const percentage = (p.probability * 100).toFixed(0);
            const resultBar = document.createElement('div');
            resultBar.classList.add('result-bar-container');
            resultBar.innerHTML = `
                <div class="label-text">
                    <span>${p.className}</span>
                    <span>${percentage}%</span>
                </div>
                <div class="progress-bg">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            `;
            labelContainer.appendChild(resultBar);
        });
    }

    // Pre-load model
    initModel();
});
