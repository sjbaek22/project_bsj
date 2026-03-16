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

// Enriched Blog Data (Expanded for AdSense quality)
const blogPosts = [
    {
        id: 1,
        title: "강아지상 vs 고양이상: 첫인상을 결정짓는 핵심 차이점 분석",
        date: "2026.03.15",
        summary: "사람의 첫인상을 좌우하는 동물상 외모! 가장 대표적인 두 유형인 강아지상과 고양이상의 특징과 매력을 심도 있게 분석해 봅니다.",
        content: `
            <p>우리는 처음 만난 사람을 보고 "강아지를 닮았다"거나 "고양이 같다"는 말을 자주 하곤 합니다. 이것은 단순한 비유를 넘어 그 사람의 전체적인 분위기와 타인에게 주는 심리적 영향력을 결정짓는 중요한 요소입니다. 이번 포스트에서는 관상학적 특징과 심리학적 관점에서 두 유형을 분석해 보겠습니다.</p>
            
            <h3>1. 다정함과 신뢰의 상징: 강아지상</h3>
            <p>강아지상의 가장 큰 특징은 눈의 앞머리가 둥글고 눈꼬리가 살짝 처진 '처진 눈' 형태입니다. 관상학적으로 이런 눈매는 상대방에게 경계심을 낮추고 신뢰감을 주는 효과가 있습니다. 또한, 얼굴형이 전체적으로 모나지 않고 둥글며 콧방울이 도톰하여 부드러운 인상을 완성합니다.</p>
            <p>심리학적으로 강아지상 외모를 가진 사람들은 협동심이 강하고 친화력이 좋아 보인다는 평가를 받는 경향이 있습니다. 이는 사회적 관계 형성에 매우 유리한 요소로 작용합니다.</p>
            
            <h3>2. 지성과 섹시함의 조화: 고양이상</h3>
            <p>반면 고양이상은 눈매가 길고 끝이 위로 향해 있는 '올라간 눈'이 특징입니다. 턱선이 날카롭고 콧날이 오똑하여 세련되고 도시적인 분위기를 풍깁니다. 이런 외모는 첫인상에서 다소 차갑거나 도도해 보일 수 있지만, 동시에 매우 지적이고 독립적인 아우라를 전달합니다.</p>
            <p>고양이상은 현대 패션과 뷰티 산업에서 가장 선호하는 유형이기도 합니다. 자기주장이 뚜렷해 보이고 세련된 이미지를 구축하기에 적합하기 때문입니다.</p>
            
            <h3>나의 동물상 활용법</h3>
            <p>단순히 어떤 상인지 아는 것을 넘어, 자신의 특징을 이해하면 스타일링에 큰 도움이 됩니다. 강아지상이라면 그 부드러움을 강조하여 신뢰감을 주는 코디를, 고양이상이라면 날카로운 매력을 살려 카리스마 있는 이미지를 연출할 수 있습니다. 결과 페이지에 제공되는 스타일링 팁을 참고해 보세요!</p>
        `
    },
    {
        id: 2,
        title: "인공지능(AI)은 어떻게 얼굴에서 동물상을 찾아낼까? 기술적 원리 가이드",
        date: "2026.03.14",
        summary: "컴퓨터가 사진 한 장으로 동물상을 구분하는 신기한 기술! Teachable Machine과 딥러닝 알고리즘의 작동 방식을 초보자도 알기 쉽게 설명합니다.",
        content: `
            <p>최근 유행하는 인공지능 기반 테스트들은 단순히 재미를 넘어 고도의 컴퓨터 비전 기술이 적용된 사례입니다. 본 사이트에서 사용하는 기술의 핵심인 <strong>Convolutional Neural Network (CNN)</strong>에 대해 알아보겠습니다.</p>
            
            <h3>1. 데이터 학습의 과정</h3>
            <p>AI가 '강아지상'과 '고양이상'을 구분하기 위해서는 먼저 수만 장의 레이블링된 사진 데이터가 필요합니다. 인공지능은 이 사진들을 픽셀 단위로 분석하면서 공통된 패턴을 찾아냅니다. 예를 들어, 강아지상 데이터셋에서는 눈매의 곡률이 완만한 패턴을, 고양이상에서는 눈꼬리의 픽셀이 위로 향하는 패턴을 학습합니다.</p>
            
            <h3>2. 특징 추출과 확률 계산</h3>
            <p>여러분이 사진을 업로드하면, 학습된 AI 모델은 여러분의 사진에서 특징점(Feature Points)을 추출합니다. 눈의 위치, 입꼬리의 각도, 얼굴의 윤곽선 등을 분석한 뒤, 미리 학습된 데이터와 얼마나 일치하는지를 확률로 계산합니다. 만약 강아지상 데이터와 90% 일치한다면 "당신은 강아지상입니다"라는 결과를 내놓는 것이죠.</p>
            
            <h3>3. Teachable Machine의 역할</h3>
            <p>구글의 Teachable Machine은 이러한 복잡한 딥러닝 모델링 과정을 웹 브라우저에서 쉽고 빠르게 처리할 수 있도록 도와주는 강력한 도구입니다. 이를 통해 전공자가 아니더라도 훌륭한 AI 서비스를 구축할 수 있는 시대가 열렸습니다.</p>
        `
    },
    {
        id: 3,
        title: "동물상별 완벽한 메이크업 & 코디 제안: 당신의 매력을 200% 살리는 법",
        date: "2026.03.13",
        summary: "자신의 동물상을 찾았다면 이제 그 장점을 극대화할 차례입니다. 강아지상과 고양이상을 위한 맞춤형 뷰티 솔루션을 제공합니다.",
        content: `
            <p>자신의 외모 특징을 알고 이를 보완하거나 강조하는 스타일링은 자존감을 높이고 타인에게 좋은 인상을 주는 최고의 방법입니다.</p>
            
            <h3>강아지상을 위한 부드러운 스타일링</h3>
            <ul>
                <li><strong>메이크업:</strong> 브라운 계열의 펜슬 아이라이너를 사용하여 눈꼬리를 본래 눈매보다 아주 살짝 아래로 그려주세요. 인상이 훨씬 부드럽고 선해 보입니다. 치크는 핑크나 코랄 컬러로 광대 중앙에 둥글게 터치하면 특유의 사랑스러움이 배가됩니다.</li>
                <li><strong>코디:</strong> 딱딱한 수트보다는 부드러운 소재의 니트나 셔츠가 잘 어울립니다. 파스텔 톤의 컬러는 강아지상의 따뜻한 분위기를 극대화해 줍니다.</li>
            </ul>
            
            <h3>고양이상을 위한 시크한 스타일링</h3>
            <ul>
                <li><strong>메이크업:</strong> 블랙 리퀴드 라이너로 눈꼬리를 시원하게 빼주는 캣아이 메이크업을 추천합니다. 입술은 명도가 높은 레드나 딥한 버건디 컬러로 포인트를 주면 고양이상 특유의 섹시하고 도도한 매력이 살아납니다.</li>
                <li><strong>코디:</strong> 어깨 라인이 강조된 블레이저나 가죽 소재의 아이템을 활용해 보세요. 블랙, 화이트 등 대비가 확실한 무채색 코디는 고양이상의 도시적인 인상을 더욱 돋보이게 합니다.</li>
            </ul>
            
            <p>중요한 것은 유행을 따르는 것이 아니라, AI 테스트 결과로 확인한 나의 고유한 특징을 사랑하고 이를 멋지게 표현하는 것입니다.</p>
        `
    }
];

// Legal & Info Content
const infoPages = {
    about: {
        title: "회사 소개 (About Us)",
        content: `
            <p>안녕하세요! <strong>동물상 테스트 & AI 분석 블로그</strong>에 오신 것을 환영합니다.</p>
            <p>저희는 최첨단 인공지능 기술을 대중들이 더 쉽고 재미있게 접할 수 있도록 돕는 것을 목표로 합니다. 구글의 Teachable Machine 기술을 활용하여 얼굴 이미지를 분석하고, 그에 맞는 유익한 라이프스타일 정보를 제공하고 있습니다.</p>
            <p>단순한 재미를 넘어, 기술이 주는 편리함과 즐거움을 동시에 전달하기 위해 노력하겠습니다. 문의 사항이 있으시면 언제든지 하단의 연락처를 통해 메시지를 보내주세요.</p>
        `
    },
    privacy: {
        title: "개인정보처리방침 (Privacy Policy)",
        content: `
            <p>본 사이트는 사용자의 개인정보를 소중히 여기며, 관련 법령을 준수합니다.</p>
            <h3>1. 이미지 데이터 처리</h3>
            <p>사용자가 동물상 테스트를 위해 업로드하는 이미지는 <strong>서버에 저장되지 않습니다.</strong> 모든 분석 과정은 사용자의 브라우저 내에서 자바스크립트를 통해 처리되거나, AI 모델 구동을 위해서만 일시적으로 사용된 후 즉시 휘발됩니다.</p>
            <h3>2. 쿠키(Cookie) 사용</h3>
            <p>저희는 사이트의 기본 설정(다크 모드 등)을 저장하기 위해 브라우저의 로컬 스토리지를 사용합니다. 또한, 구글 애드센스 등 제3자 광고 서비스가 맞춤형 광고를 제공하기 위해 쿠키를 사용할 수 있습니다.</p>
            <h3>3. 광고 및 분석 도구</h3>
            <p>구글과 같은 제3자 제공업체는 쿠키를 사용하여 사용자의 이전 방문 기록을 바탕으로 광고를 게재합니다. 사용자는 구글의 광고 설정에서 맞춤 광고를 해제할 수 있습니다.</p>
        `
    },
    terms: {
        title: "이용약관 (Terms of Service)",
        content: `
            <p>본 약관은 '동물상 테스트 & AI 분석 블로그' 서비스 이용과 관련한 권리와 의무를 규정합니다.</p>
            <h3>1. 서비스의 목적</h3>
            <p>본 사이트는 인공지능을 이용한 얼굴 분석 테스트 및 관련 정보 제공을 목적으로 합니다. 테스트 결과는 인공지능 모델의 학습 데이터에 기반한 추정치일 뿐, 과학적/의학적 사실을 보증하지 않습니다.</p>
            <h3>2. 이용자의 책임</h3>
            <p>이용자는 타인의 사진을 무단으로 도용하여 테스트를 수행해서는 안 되며, 서비스 이용 과정에서 발생하는 모든 행위에 대한 책임은 이용자 본인에게 있습니다.</p>
            <h3>3. 서비스 변경 및 중단</h3>
            <p>운영자는 사이트 점검이나 기술적 필요에 따라 서비스를 일시 중단하거나 내용을 변경할 수 있습니다.</p>
        `
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Sections
    const testSection = document.getElementById('test-section');
    const blogSection = document.getElementById('blog-section');
    const infoSection = document.getElementById('info-section');
    
    // Nav & Links
    const navTest = document.getElementById('nav-test');
    const navBlog = document.getElementById('nav-blog');
    const navAbout = document.getElementById('nav-about');
    const linkAbout = document.getElementById('link-about');
    const linkPrivacy = document.getElementById('link-privacy');
    const linkTerms = document.getElementById('link-terms');
    
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

    // Info Content Elements
    const infoContent = document.getElementById('info-content');
    const backHomeBtns = document.querySelectorAll('.back-home');

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
    function showSection(sectionId) {
        const sections = [testSection, blogSection, infoSection];
        sections.forEach(s => s.classList.add('hidden'));
        
        document.getElementById(`${sectionId}-section`).classList.remove('hidden');
        
        // Update Nav active state
        [navTest, navBlog, navAbout].forEach(n => n.classList.remove('active'));
        if (sectionId === 'test') navTest.classList.add('active');
        if (sectionId === 'blog') navBlog.classList.add('active');
        if (sectionId === 'info') navAbout.classList.add('active');

        window.scrollTo(0, 0);
    }

    navTest.addEventListener('click', (e) => { e.preventDefault(); showSection('test'); });
    navBlog.addEventListener('click', (e) => { e.preventDefault(); showSection('blog'); renderBlogList(); });
    navAbout.addEventListener('click', (e) => { e.preventDefault(); renderInfoPage('about'); });
    
    linkAbout.addEventListener('click', (e) => { e.preventDefault(); renderInfoPage('about'); });
    linkPrivacy.addEventListener('click', (e) => { e.preventDefault(); renderInfoPage('privacy'); });
    linkTerms.addEventListener('click', (e) => { e.preventDefault(); renderInfoPage('terms'); });

    backHomeBtns.forEach(btn => btn.addEventListener('click', () => showSection('test')));

    // Info Page Logic
    function renderInfoPage(type) {
        const page = infoPages[type];
        infoContent.innerHTML = `
            <h1 style="margin-top:0;">${page.title}</h1>
            <div class="legal-text">${page.content}</div>
        `;
        showSection('info');
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
                <span class="read-more">계속 읽기 →</span>
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
            <h1>${post.title}</h1>
            <div class="content">${post.content}</div>
        `;
        window.scrollTo(0, 0);
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
