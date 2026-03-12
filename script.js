// --- Mock Data ---

const restaurants = [
  {
    id: 1,
    name: "정혜 담백 연어",
    location: "서울 성수동",
    priceRange: "15,000 ~ 25,000원",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
    badges: ["저포드맵", "저지방", "1인 단독"],
    menus: [
      { name: "연어 스테이크", price: "18,000원" },
      { name: "생연어 덮밥", price: "15,000원" },
      { name: "구운 연어 샐러드", price: "13,000원" }
    ],
    editorComment: "연어 스테이크 위에 치즈가 올라가니 지방에 민감하다면 빼달라고 요청하는 것을 추천드립니다. 또한 간장 소스가 자극적이지 않아 IBS 환자분들께 호평을 받고 있습니다."
  },
  {
    id: 2,
    name: "슬로우 죽공방",
    location: "서울 연남동",
    priceRange: "10,000 ~ 18,000원",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
    badges: ["저자극", "비발효", "청결도 우수"],
    menus: [
      { name: "삼계죽", price: "12,000원" },
      { name: "단호박죽", price: "10,000원" },
      { name: "소고기 야채죽", price: "11,000원" }
    ],
    editorComment: "이곳의 죽은 소금 사용을 최소화하여 매우 담백합니다. 내부 화장실이 매우 깨끗하게 관리되어 있어 걱정 없이 머무를 수 있습니다."
  },
  {
    id: 3,
    name: "모던 한식 소담",
    location: "경기 판교",
    priceRange: "20,000 ~ 35,000원",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800",
    badges: ["글루텐프리", "무첨가물", "내부 화장실"],
    menus: [
      { name: "한우 안심 구이", price: "35,000원" },
      { name: "보리굴비 정식", price: "24,000원" },
      { name: "계절 나물 비빔밥", price: "18,000원" }
    ],
    editorComment: "글루텐프리 친화적인 국산 식재료만 사용합니다. 남녀 화장실이 철저히 분리되어 있어 여성 고객분들께 인기가 많습니다."
  },
  {
    id: 4,
    name: "포레스트 카레",
    location: "서울 한남동",
    priceRange: "12,000 ~ 20,000원",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=800",
    badges: ["락토프리", "저지방", "남녀 분리"],
    menus: [
      { name: "코코넛 치킨 카레", price: "14,000원" },
      { name: "구운 채소 카레", price: "12,000원" },
      { name: "비건 새우 볼", price: "8,000원" }
    ],
    editorComment: "생크림이나 우유 대신 코코넛 밀크를 사용하여 락토프리입니다. 다만 향신료가 들어있으니 장이 매우 예민한 날에는 '순한맛'을 권장합니다."
  },
  {
    id: 5,
    name: "클린 볼 (Clean Bowl)",
    location: "서울 강남",
    priceRange: "13,000 ~ 19,000원",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    badges: ["저포드맵", "글루텐프리", "넉넉한 칸"],
    menus: [
      { name: "연어 아보카도 포케", price: "15,000원" },
      { name: "수비드 닭가슴살 샐러드", price: "13,000원" },
      { name: "단백질 쉐이크", price: "7,000원" }
    ],
    editorComment: "자신만의 커스텀 샐러드를 만들 수 있어 못 먹는 재료를 빼기 좋습니다. 화장실 칸이 5개 이상으로 매우 넉넉합니다."
  },
  {
    id: 6,
    name: "담아내다 스시",
    location: "인천 송도",
    priceRange: "30,000 ~ 50,000원",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800",
    badges: ["비발효", "무첨가물", "1인 단독"],
    menus: [
      { name: "오마카세 A", price: "35,000원" },
      { name: "프리미엄 초밥 세트", price: "45,000원" },
      { name: "냉모밀", price: "12,000원" }
    ],
    editorComment: "신선한 회 본연의 맛을 강조하며, 인위적인 시즈닝을 배제했습니다. 1인 화장실이 매장 내부에 있어 프라이빗하고 쾌적합니다."
  }
];

// --- Selectors ---

const gridContainer = document.getElementById('restaurant-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

const modalOverlay = document.getElementById('modal-overlay');
const scrapBtn = document.querySelector('.scrap-btn');

const mobileFilterToggle = document.getElementById('mobile-filter-toggle');
const mobileFilterOverlay = document.getElementById('mobile-filter-overlay');
const filterBackdrop = document.getElementById('filter-backdrop');
const closeMobileFilter = document.getElementById('close-mobile-filter');

const desktopApplyBtn = document.getElementById('apply-filter-desktop');
const mobileApplyBtn = document.getElementById('apply-filter-mobile');

// --- State ---
let bookmarkedIds = JSON.parse(localStorage.getItem('poopMichelinBookmarks')) || [];
let isScrapView = false;

const BOOKMARK_FALSE = 'assets/button_bookmark_False.png';
const BOOKMARK_TRUE = 'assets/button_bookmark_True.png';

// --- Functions ---

function renderGrid(data) {
  gridContainer.innerHTML = '';
  
  if (data.length === 0) {
    const emptyMsg = isScrapView ? "스크랩한 식당이 없습니다" : "검색 결과가 없습니다 😢";
    gridContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 100px 0; color: var(--text-muted);">
        <h3>${emptyMsg}</h3>
        ${!isScrapView ? '<p>다른 필터나 검색어를 사용해보세요.</p>' : ''}
      </div>
    `;
    return;
  }

  data.forEach((item, index) => {
    const isBookmarked = bookmarkedIds.includes(item.id);
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <div class="card-image-wrap">
        <img src="${item.image}" alt="${item.name}">
        <button class="card__bookmark-btn ${isBookmarked ? 'card__bookmark-btn--active' : ''}" data-id="${item.id}">
          <img src="${isBookmarked ? BOOKMARK_TRUE : BOOKMARK_FALSE}" class="bookmark-icon">
        </button>
      </div>
      <div class="card-content">
        <h3 class="card-title">${item.name}</h3>
        <div class="card-info">
          <div class="info-item">📍 ${item.location}</div>
          <div class="info-item">💰 ${item.priceRange}</div>
        </div>
        <div class="card-badges">
          ${item.badges.slice(0, 3).map(badge => `
            <span class="badge ${badge.includes('화장실') || badge.includes('분리') || badge.includes('청결') || badge.includes('단독') || badge.includes('칸') ? 'badge-gold' : 'badge-green'}">
               ${badge === '저포드맵' ? '🟢' : badge === '1인 단독' ? '🚪' : badge === '저지방' ? '🟡' : ''} ${badge}
            </span>
          `).join('')}
        </div>
      </div>
    `;
    
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card__bookmark-btn')) {
        e.stopPropagation();
        toggleBookmark(item.id);
      } else {
        openModal(item);
      }
    });
    gridContainer.appendChild(card);
  });
}

function toggleBookmark(id) {
  const isBookmarked = bookmarkedIds.includes(id);
  if (isBookmarked) {
    bookmarkedIds = bookmarkedIds.filter(bid => bid !== id);
  } else {
    bookmarkedIds.push(id);
  }
  localStorage.setItem('poopMichelinBookmarks', JSON.stringify(bookmarkedIds));
  
  const nowBookmarked = bookmarkedIds.includes(id);

  // Sync Cards
  const cardBtns = document.querySelectorAll(`.card__bookmark-btn[data-id="${id}"]`);
  cardBtns.forEach(btn => {
    btn.classList.toggle('card__bookmark-btn--active', nowBookmarked);
    const img = btn.querySelector('img');
    if (img) img.src = nowBookmarked ? BOOKMARK_TRUE : BOOKMARK_FALSE;
  });

  // Sync Modal
  const modalBtn = document.getElementById('modal-bookmark-btn');
  if (modalBtn && Number(modalBtn.dataset.id) === id) {
    modalBtn.classList.toggle('modal__bookmark-btn--active', nowBookmarked);
    const img = modalBtn.querySelector('img');
    if (img) img.src = nowBookmarked ? BOOKMARK_TRUE : BOOKMARK_FALSE;
  }

  // Section 10: If bookmark removed while in scrap view, remove card immediately.
  if (isScrapView && !nowBookmarked) {
    applyFilters(); // Re-apply filters to refresh the view (scrap view is a filter)
  }
}

function openModal(item) {
  document.getElementById('modal-image').src = item.image;
  document.getElementById('modal-name').textContent = item.name;
  document.getElementById('modal-loc').textContent = `📍 ${item.location}`;
  document.getElementById('modal-price').textContent = `💰 ${item.priceRange}`;
  document.getElementById('modal-comment').textContent = item.editorComment;
  
  const mapLink = document.getElementById('modal-map-link');
  mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + item.location)}`;
  
  const badgeWrap = document.getElementById('modal-badges');
  badgeWrap.innerHTML = item.badges.map(badge => `
    <span class="badge ${badge.includes('화장실') || badge.includes('분리') || badge.includes('청결') || badge.includes('단독') || badge.includes('칸') ? 'badge-gold' : 'badge-green'}">
      ${badge}
    </span>
  `).join('');
  
  const menuWrap = document.getElementById('modal-menu');
  menuWrap.innerHTML = item.menus.map(menu => `
    <li class="menu-item">
      <span>${menu.name}</span>
      <span style="font-weight:700;">${menu.price}</span>
    </li>
  `).join('');

  const modalBookmarkBtn = document.getElementById('modal-bookmark-btn');
  const isBookmarked = bookmarkedIds.includes(item.id);
  modalBookmarkBtn.dataset.id = item.id;
  modalBookmarkBtn.className = `modal__bookmark-btn ${isBookmarked ? 'modal__bookmark-btn--active' : ''}`;
  
  const modalBookmarkImg = modalBookmarkBtn.querySelector('img');
  if (modalBookmarkImg) {
    modalBookmarkImg.src = isBookmarked ? BOOKMARK_TRUE : BOOKMARK_FALSE;
    modalBookmarkImg.className = 'bookmark-icon';
  }
  
  // Remove old listener and add new one
  modalBookmarkBtn.onclick = (e) => {
    e.stopPropagation();
    toggleBookmark(item.id);
  };

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function getSelectedFilters(isMobile = false) {
  const prefix = isMobile ? 'm-' : '';
  const digestionCheckboxes = document.querySelectorAll(`input[name="${prefix}digestion"]:checked`);
  const toiletCheckboxes = document.querySelectorAll(`input[name="${prefix}toilet"]:checked`);
  
  return [
    ...Array.from(digestionCheckboxes).map(cb => cb.value),
    ...Array.from(toiletCheckboxes).map(cb => cb.value)
  ];
}

function applyFilters(isMobile = false) {
  const activeFilters = getSelectedFilters(isMobile);
  const keyword = searchInput.value.trim().toLowerCase();
  
  let filtered = restaurants.filter(item => {
    // Section 7: Scrap View filter
    const matchesScrap = isScrapView ? bookmarkedIds.includes(item.id) : true;

    // Search keyword check
    const matchesKeyword = item.name.toLowerCase().includes(keyword) || item.location.toLowerCase().includes(keyword);
    
    // Filters check (must have ALL selected badges)
    const matchesFilters = activeFilters.every(f => item.badges.includes(f));
    
    return matchesScrap && matchesKeyword && matchesFilters;
  });
  
  renderGrid(filtered);
  
  if (isMobile) {
    toggleMobileFilter(false);
  }
}

function toggleMobileFilter(show) {
  if (show) {
    mobileFilterOverlay.classList.add('active');
    filterBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    mobileFilterOverlay.classList.remove('active');
    filterBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// --- Event Listeners ---

searchBtn.addEventListener('click', () => applyFilters());
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') applyFilters();
});

desktopApplyBtn.addEventListener('click', () => applyFilters(false));
mobileApplyBtn.addEventListener('click', () => applyFilters(true));

scrapBtn.addEventListener('click', () => {
  isScrapView = !isScrapView;
  scrapBtn.classList.toggle('scrap-btn--active', isScrapView);
  applyFilters();
});

mobileFilterToggle.addEventListener('click', () => toggleMobileFilter(true));
closeMobileFilter.addEventListener('click', () => toggleMobileFilter(false));
filterBackdrop.addEventListener('click', () => toggleMobileFilter(false));

// Section 1: remove closeModalBtn listener
// closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// --- Init ---

window.addEventListener('scroll', () => {
    // Optional: add some effect on scroll if needed
});

renderGrid(restaurants);
