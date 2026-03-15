const URL = 'https://teachablemachine.withgoogle.com/models/zXAsbSLt-/';

let model, maxPredictions;

// Sample Blog Data
const blogPosts = [
    {
        id: 1,
        title: "강아지상 vs 고양이상, 당신의 선택은?",
        date: "2026.03.15",
        summary: "사람의 인상을 결정짓는 동물상! 가장 대표적인 강아지상과 고양이상의 특징과 차이점을 알아봅니다.",
        content: `
            <p>사람의 얼굴을 동물에 비유하는 '동물상'은 관상학적으로나 재미로 보나 매우 흥미로운 주제입니다.</p>
            <h3>강아지상의 특징</h3>
            <p>강아지상은 대체로 눈매가 처져 있고, 둥글둥글한 얼굴형을 가진 경우가 많습니다. 보는 사람으로 하여금 보호본능을 자극하고 친근하며 부드러운 인상을 줍니다.</p>
            <h3>고양이상의 특징</h3>
            <p>반면 고양이상은 눈매가 위로 올라가 있고, 턱선이 날카로운 경우가 많습니다. 세련되고 도시적이며, 때로는 차가워 보이지만 치명적인 매력을 발산합니다.</p>
            <p>여러분은 어떤 동물을 더 닮으셨나요? 지금 바로 테스트해보세요!</p>
        `
    },
    {
        id: 2,
        title: "동물상 테스트의 과학적 원리",
        date: "2026.03.14",
        summary: "인공지능은 어떻게 사진만으로 동물상을 구분할까요? Teachable Machine과 딥러닝 기술에 대해 소개합니다.",
        content: `
            <p>이 웹사이트에서 사용하는 동물상 테스트는 Google의 <strong>Teachable Machine</strong> 기술을 기반으로 합니다.</p>
            <p>수천 장의 강아지상 얼굴 데이터와 고양이상 얼굴 데이터를 학습한 인공지능 모델이 사용자의 사진 속 특징점을 분석하여 확률을 계산합니다.</p>
            <p>눈의 각도, 코의 높이, 입술의 모양 등을 수치화하여 가장 유사한 클래스로 분류하는 것입니다.</p>
        `
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const navTest = document.getElementById('nav-test');
    const navBlog = document.getElementById('nav-blog');
    const testSection = document.getElementById('test-section');
    const blogSection = document.getElementById('blog-section');
    
    // Test Elements
    const uploadArea = document.getElementById('upload-area');
    const imageInput = document.getElementById('image-input');
    const imagePreview = document.getElementById('image-preview');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const loading = document.getElementById('loading');
    const reUploadBtn = document.getElementById('re-upload-btn');
    
    // Blog Elements
    const blogList = document.getElementById('blog-list');
    const blogPostContent = document.getElementById('blog-post-content');
    const backToListBtn = document.getElementById('back-to-list');
    const fullPostArea = blogPostContent.querySelector('.full-post');

    // Theme Logic
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

    // Navigation Logic
    navTest.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('test');
    });

    navBlog.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('blog');
        renderBlogList();
    });

    function showSection(section) {
        if (section === 'test') {
            testSection.classList.remove('hidden');
            blogSection.classList.add('hidden');
            navTest.classList.add('active');
            navBlog.classList.remove('active');
        } else {
            testSection.classList.add('hidden');
            blogSection.classList.remove('hidden');
            navTest.classList.remove('active');
            navBlog.classList.add('active');
        }
    }

    // Blog Rendering Logic
    function renderBlogList() {
        blogList.innerHTML = '';
        blogPostContent.classList.add('hidden');
        blogList.classList.remove('hidden');
        
        blogPosts.forEach(post => {
            const card = document.createElement('div');
            card.classList.add('blog-card');
            card.innerHTML = `
                <span class="date">${post.date}</span>
                <h2>${post.title}</h2>
                <p>${post.summary}</p>
            `;
            card.addEventListener('click', () => renderBlogPost(post));
            blogList.appendChild(card);
        });
    }

    function renderBlogPost(post) {
        blogList.classList.add('hidden');
        blogPostContent.classList.remove('hidden');
        fullPostArea.innerHTML = `
            <span class="date">${post.date}</span>
            <h2>${post.title}</h2>
            <div class="content">${post.content}</div>
        `;
    }

    backToListBtn.addEventListener('click', renderBlogList);

    // AI Model Logic
    async function initModel() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        try {
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
        } catch (e) {
            console.error("Model load failed", e);
        }
    }

    // Image Upload Logic
    uploadArea.addEventListener('click', () => imageInput.click());
    
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleImage(file);
    });

    async function handleImage(file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            imagePreview.src = e.target.result;
            uploadArea.classList.add('hidden');
            imagePreviewContainer.classList.remove('hidden');
            loading.classList.remove('hidden');
            resultContainer.classList.add('hidden');
            
            if (!model) await initModel();
            await predict();
            
            loading.classList.add('hidden');
            resultContainer.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }

    reUploadBtn.addEventListener('click', () => {
        imagePreviewContainer.classList.add('hidden');
        resultContainer.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        imageInput.value = '';
    });

    async function predict() {
        const prediction = await model.predict(imagePreview);
        const labelContainer = document.getElementById('label-container');
        labelContainer.innerHTML = '';
        
        const labelMapping = { 'Class 1': '강아지', 'Class 2': '고양이' };
        const mappedPredictions = prediction.map(p => ({
            className: labelMapping[p.className] || p.className,
            probability: p.probability
        }));

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

    initModel();
});
