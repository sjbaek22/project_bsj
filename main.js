const URL = 'https://teachablemachine.withgoogle.com/models/zXAsbSLt-/';

let model, maxPredictions;

// Animal Face Descriptions
const animalDescriptions = {
    '강아지': {
        feature: "부드러운 눈매와 둥근 얼굴형, 보는 사람을 무장해제 시키는 선한 인상!",
        personality: "다정다감하고 사교적인 성격으로 누구에게나 사랑받는 스타일입니다. 보호본능을 자극하는 멍뭉미가 가장 큰 매력 포인트!",
        celebrities: "박보검, 송중기, 수지, 박보영 등"
    },
    '고양이': {
        feature: "시원하게 올라간 눈매와 날카로운 턱선, 세련되고 도시적인 분위기!",
        personality: "첫인상은 차가워 보일 수 있지만, 알면 알수록 빠져드는 치명적인 매력을 가졌습니다. 도도하면서도 섹시한 아우라가 특징!",
        celebrities: "강동원, 이준기, 블랙핑크 제니, 에스파 카리나 등"
    }
};

// Enriched Blog Data
const blogPosts = [
    {
        id: 1,
        title: "강아지상 vs 고양이상: 첫인상의 끝판왕은?",
        date: "2026.03.15",
        summary: "사람의 인상을 결정짓는 가장 큰 요소, 동물상! 강아지상과 고양이상의 매력을 심도 있게 분석해 봅니다.",
        content: `
            <p>우리는 처음 만난 사람을 보고 "강아지를 닮았다"거나 "고양이 같다"는 말을 자주 하곤 합니다. 이것은 단순한 비유를 넘어 그 사람의 전체적인 분위기를 결정짓는 중요한 요소입니다.</p>
            <h3>1. 다정한 매력의 강아지상</h3>
            <p>강아지상은 눈의 앞머리가 둥글고 꼬리가 살짝 처진 것이 특징입니다. 이런 외모는 상대방에게 신뢰감과 친근함을 줍니다. 연구에 따르면 강아지상 외모를 가진 사람들은 협동심이 강해 보인다는 평가를 받는다고 합니다.</p>
            <h3>2. 시크한 매력의 고양이상</h3>
            <p>고양이상은 눈매가 길고 끝이 위로 향해 있어 도도한 인상을 줍니다. 이런 외모는 지적이고 독립적인 이미지를 강조하며, 패션이나 뷰티 산업에서 가장 선호하는 모델 페이스이기도 합니다.</p>
            <p>여러분의 결과는 무엇인가요? 결과에 나온 특징들이 본인의 성격과도 비슷한지 비교해 보세요!</p>
        `
    },
    {
        id: 2,
        title: "인공지능이 내 얼굴을 읽는 법: 딥러닝의 마법",
        date: "2026.03.14",
        summary: "컴퓨터가 어떻게 사진 한 장으로 동물상을 구분할까요? Teachable Machine의 원리를 쉽게 설명해 드립니다.",
        content: `
            <p>이 사이트의 심장부에는 <strong>Convolutional Neural Network (CNN)</strong>라는 딥러닝 기술이 들어있습니다.</p>
            <p>인공지능은 수만 장의 사진을 보며 '강아지상'의 공통적인 픽셀 패턴(예: 눈매의 곡선, 콧날의 각도)을 학습합니다. 여러분이 사진을 업로드하면, AI는 그 패턴들을 여러분의 얼굴에서 찾아내어 확률로 계산하는 것이죠.</p>
            <p>구글의 Teachable Machine 덕분에 이제 누구나 이런 복잡한 기술을 쉽게 이용할 수 있게 되었습니다.</p>
        `
    },
    {
        id: 3,
        title: "동물상별 찰떡 메이크업 & 코디 팁",
        date: "2026.03.13",
        summary: "자신의 동물상을 알았다면 이제 활용할 차례! 장점을 극대화하는 스타일링 비법을 공개합니다.",
        content: `
            <h3>강아지상 Styling</h3>
            <p>부드러운 이미지를 살리기 위해 브라운 계열의 아이라이너를 사용하고, 눈꼬리를 살짝 내려 그려보세요. 파스텔 톤의 니트나 셔츠가 정말 잘 어울립니다.</p>
            <h3>고양이상 Styling</h3>
            <p>눈매를 강조하는 캣아이 메이크업이나 레드 립이 포인트입니다. 블랙이나 비비드한 컬러의 수트, 가죽 재킷 등 세련된 스타일을 완벽하게 소화할 수 있습니다.</p>
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
        const desc = animalDescriptions[topResult.className];

        resultMessage.innerHTML = `당신은 <strong>${topResult.className}상</strong>입니다!`;
        
        const descriptionHTML = `
            <div class="result-desc">
                <p>✨ <strong>특징:</strong> ${desc.feature}</p>
                <p>🧠 <strong>성격:</strong> ${desc.personality}</p>
                <p>🌟 <strong>대표 연예인:</strong> ${desc.celebrities}</p>
            </div>
        `;
        
        const labelWrapper = document.createElement('div');
        labelWrapper.innerHTML = descriptionHTML;
        labelContainer.appendChild(labelWrapper);

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
