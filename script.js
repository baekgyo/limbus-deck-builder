// -------------------------------------------------------------
// [0. Firebase 초기화 설정]
// -------------------------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyAs3HEBMCDVBL4wvap80xcsw6RxbzHBS9Y",
    authDomain: "limbus-deck-builder.firebaseapp.com",
    projectId: "limbus-deck-builder",
    storageBucket: "limbus-deck-builder.firebasestorage.app",
    messagingSenderId: "648694504200",
    appId: "1:648694504200:web:6a6611b8023bb8eb31eabd"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const keywordImageMap = {
    '화상': 'burn.png',
    '출혈': 'bleed.png',
    '진동': 'tremor.png',
    '파열': 'rupture.png',
    '침잠': 'sinking.png',
    '호흡': 'poise.png',
    '충전': 'charge.png'
};

let activeKeywordFilter = null; 
let activeCustomKeywordFilter = null; 

// -------------------------------------------------------------
// [1. 브라우저 뒤로가기 / 히스토리 연동 로직]
// -------------------------------------------------------------
function showSection(sectionId, pushHistory = true) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('hidden');
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
    }

    if (pushHistory) {
        history.pushState({ sectionId: sectionId }, '', `#${sectionId}`);
    }

    if (sectionId === 'random-screen') {
        renderGrid();
    } else if (sectionId === 'deck-share-screen') {
        renderCustomGrid();
        analyzeCustomDeck();
    } else if (sectionId === 'community-screen') {
        loadCommunityDecks();
    }
}

window.addEventListener('popstate', (event) => {
    if (event.state && event.state.sectionId) {
        showSection(event.state.sectionId, false);
    } else {
        showSection('home-screen', false);
    }
});

// -------------------------------------------------------------
// [2. 메인 변수 및 초기화]
// -------------------------------------------------------------
const bgm = document.getElementById('bgm');
const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');
let currentFilter = 'all'; 
let fixedEgos = {};

function playAudioOnInteraction() {
    if (bgm && bgm.paused) {
        bgm.play().catch(e => console.log("자동재생 차단 해제 대기 중: ", e));
    }
    window.removeEventListener('click', playAudioOnInteraction);
    window.removeEventListener('keydown', playAudioOnInteraction);
}

document.addEventListener('DOMContentLoaded', () => {
    const initialSection = location.hash ? location.hash.replace('#', '') : 'home-screen';
    history.replaceState({ sectionId: initialSection }, '', `#${initialSection}`);
    showSection(initialSection, false);

    window.addEventListener('click', playAudioOnInteraction);
    window.addEventListener('keydown', playAudioOnInteraction);

    if (volumeSlider && bgm) {
        volumeSlider.oninput = (e) => { bgm.volume = e.target.value; };
    }
    if (muteBtn && bgm) {
        muteBtn.onclick = () => {
            bgm.muted = !bgm.muted;
            if (!bgm.muted && bgm.paused) {
                bgm.play().catch(() => {});
            }
            muteBtn.innerText = bgm.muted ? "🔇 MUTE" : "🔊 ON";
        };
    }

    const filterAll = document.getElementById('filter-all');
    const filter3star = document.getElementById('filter-3star');

    if (filterAll) {
        filterAll.onclick = function() { 
            currentFilter = 'all'; 
            this.classList.add('active'); 
            if (filter3star) filter3star.classList.remove('active'); 
        };
    }
    if (filter3star) {
        filter3star.onclick = function() { 
            currentFilter = '3star'; 
            this.classList.add('active'); 
            if (filterAll) filterAll.classList.remove('active'); 
        };
    }

    const copyBtn = document.getElementById('copy-deck-btn');
    if (copyBtn) {
        copyBtn.onclick = function() {
            try {
                const deckCode = generateRawBitString();
                copyToClipboard(deckCode);
            } catch (e) {
                console.error("덱 코드 생성 오류:", e);
                alert("코드 생성 중 오류가 발생했습니다.\nHTML 파일에 pako 라이브러리가 포함되어 있는지 확인해주세요.");
            }
        };
    }

    initCustomDeckState();
    
    const customShareBtn = document.getElementById('custom-share-btn');
    if (customShareBtn) {
        customShareBtn.onclick = async function() {
            try {
                alert("저장중...");

                const selectedDifficulty = document.querySelector('input[name="deck-difficulty"]:checked')?.value || 'NORMAL';
                const title = document.getElementById('custom-deck-title').value.trim() || "제목 없음";
                const author = document.getElementById('custom-author').value.trim() || "익명";
                const description = document.getElementById('custom-desc').value.trim() || "설명이 없습니다.";

                const originalFixedEgos = window.fixedEgos;
                window.fixedEgos = {};
                Object.keys(customDeckState).forEach(sId => {
                    window.fixedEgos[sId] = customDeckState[sId].egos;
                });

                const deckCode = generateRawBitString();
                window.fixedEgos = originalFixedEgos;

                const deckIdentities = sinners.map(s => {
                    const state = customDeckState[s.id];
                    return state && state.identity ? state.identity : null;
                });

                const thumbnails = sinners.map(s => {
                    const state = customDeckState[s.id];
                    if (!state || !state.identity) return { name: '', imgUrl: '' };
                    return {
                        name: state.identity.name,
                        imgUrl: `images/${s.folder}/${s.folder}_${state.identity.code}.png`
                    };
                });

                const deckDoc = {
                    title: title,
                    author: author,
                    description: description,
                    tags: [selectedDifficulty],
                    deckCode: deckCode,
                    deckIdentities: deckIdentities,
                    thumbnails: thumbnails,
                    views: 0,
                    date: new Date().toISOString().slice(0, 10).replace(/-/g, '. ') + '.'
                };

                await db.collection("sharedDecks").add(deckDoc);
                alert("덱이 성공적으로 공유되었습니다!");
                copyToClipboard(deckCode);
                showSection('community-screen');

            } catch (e) {
                console.error("파이어베이스 저장 오류:", e);
                alert("덱 공유 중 오류가 발생했습니다. 에러 내용: " + e.message);
            }
        };
    }

    loadCommunityDecks();
});

function renderGrid() {
    const grid = document.getElementById('sinner-grid');
    if (!grid) return;
    grid.innerHTML = '';
    sinners.forEach((s) => {
        const card = document.createElement('div');
        card.className = 'sinner-card';
        card.id = `sinner-card-${s.id}`;
        card.style.cursor = 'default'; 
        card.innerHTML = `
            <div class="rank-stars" id="stars-${s.id}"></div>
            <div class="img-box" id="slot-${s.id}">
                <img src="images/${s.folder}/logo.png" class="logo-img">
            </div>
            <div class="sinner-label">${s.name}</div>
            <div class="card-keywords" id="keywords-${s.id}"></div>
        `;
        grid.appendChild(card);
    });
}

// -------------------------------------------------------------
// [3. 덱 키워드 및 성급 분석]
// -------------------------------------------------------------
function analyzeDeck(selectedIdentities) {
    const keywordCounts = {};
    let rank3Count = 0;
    let rank2Count = 0;
    let rank1Count = 0;

    selectedIdentities.forEach(item => {
        if (item.rank === 3) rank3Count++;
        else if (item.rank === 2) rank2Count++;
        else rank1Count++;

        if (item.keywords && Array.isArray(item.keywords)) {
            item.keywords.forEach(kw => {
                if (kw && kw.trim() !== '') {
                    keywordCounts[kw] = (keywordCounts[kw] || 0) + 1;
                }
            });
        }
    });

    const sortedKeywords = Object.entries(keywordCounts).sort((a, b) => b[1] - a[1]);
    const tagsContainer = document.getElementById('top-keywords');
    const summaryLabel = document.getElementById('rank-summary');
    const card = document.getElementById('deck-analysis-card');

    if (tagsContainer) {
        tagsContainer.innerHTML = '';
        if (sortedKeywords.length === 0) {
            tagsContainer.innerHTML = '<span class="tag">특이 시너지 없음</span>';
        } else {
            sortedKeywords.slice(0, 5).forEach(([kw, count]) => {
                const imgFile = keywordImageMap[kw];
                const iconHtml = imgFile ? `<img src="images/keywords/${imgFile}" class="tag-icon" alt="${kw}">` : '';
                
                const tagSpan = document.createElement('span');
                tagSpan.className = `tag tag-${kw}`;
                tagSpan.innerHTML = `${iconHtml}#${kw} <span class="count">(${count})</span>`;
                
                tagSpan.onclick = (e) => {
                    e.stopPropagation();
                    toggleKeywordFilter(kw, selectedIdentities);
                };

                tagsContainer.appendChild(tagSpan);
            });
        }
    }

    if (summaryLabel) {
        summaryLabel.innerText = `3성: ${rank3Count}개 / 2성: ${rank2Count}개` + (rank1Count > 0 ? ` / 1성: ${rank1Count}개` : '');
    }

    if (card) {
        card.classList.remove('hidden');
    }
}

function toggleKeywordFilter(kw, selectedIdentities) {
    const tags = document.querySelectorAll('#top-keywords .tag');

    if (activeKeywordFilter === kw) {
        activeKeywordFilter = null;
        tags.forEach(t => t.classList.remove('selected-filter'));
        sinners.forEach(s => {
            const card = document.getElementById(`sinner-card-${s.id}`);
            if (card) {
                card.classList.remove('highlighted', 'dimmed');
            }
        });
    } else {
        activeKeywordFilter = kw;
        tags.forEach(t => {
            if (t.classList.contains(`tag-${kw}`)) {
                t.classList.add('selected-filter');
            } else {
                t.classList.remove('selected-filter');
            }
        });

        selectedIdentities.forEach((item, idx) => {
            const sinnerId = sinners[idx].id;
            const card = document.getElementById(`sinner-card-${sinnerId}`);
            if (!card) return;

            const hasKeyword = item.keywords && item.keywords.includes(kw);

            if (hasKeyword) {
                card.classList.add('highlighted');
                card.classList.remove('dimmed');
            } else {
                card.classList.remove('highlighted');
                card.classList.add('dimmed');
            }
        });
    }
}

// -------------------------------------------------------------
// [4. 추출 로직 & 미니 키워드 태그 렌더링]
// -------------------------------------------------------------
const spinBtn = document.getElementById('spin-all-btn');
if (spinBtn) {
    spinBtn.onclick = function() {
        this.disabled = true;
        let finished = 0;
        let selectedList = [];
        activeKeywordFilter = null;

        sinners.forEach((s, i) => {
            const slot = document.getElementById(`slot-${s.id}`);
            const label = slot ? slot.nextElementSibling : null; 
            const starBox = document.getElementById(`stars-${s.id}`);
            const cardKeywordsBox = document.getElementById(`keywords-${s.id}`);
            const card = document.getElementById(`sinner-card-${s.id}`);

            if (card) {
                card.classList.remove('highlighted', 'dimmed');
            }
            if (cardKeywordsBox) {
                cardKeywordsBox.innerHTML = '';
            }
            
            const sinnerIdx = parseInt(s.id) - 1;
            const egoData = sinnerEgoList[sinnerIdx];
            
            fixedEgos[s.id] = egoData.map(gradeList => {
                if (gradeList && gradeList.length > 0) {
                    const randomIdx = Math.floor(Math.random() * gradeList.length);
                    return gradeList[randomIdx].name;
                }
                return "-";
            });

            let list = identities[i].filter(item => currentFilter === '3star' ? item.rank === 3 : true);
            
            let count = 0;
            const timer = setInterval(() => {
                const selected = list[Math.floor(Math.random() * list.length)];
                
                if (slot) slot.innerHTML = `<img src="images/${s.folder}/${s.folder}_${selected.code}.png">`;
                if (label) label.innerText = selected.name;
                if (starBox) starBox.innerText = '★'.repeat(selected.rank);
                
                if (++count > 15) {
                    clearInterval(timer);
                    finished++;
                    selectedList.push(selected);
                    
                    if (label) label.style.color = selected.rank === 3 ? "#ffc400" : "#fff";
                    
                    if (cardKeywordsBox && selected.keywords) {
                        cardKeywordsBox.innerHTML = '';
                        selected.keywords.forEach(kw => {
                            if (!kw) return;
                            const imgFile = keywordImageMap[kw];
                            const iconHtml = imgFile ? `<img src="images/keywords/${imgFile}" class="mini-tag-icon">` : '';
                            cardKeywordsBox.innerHTML += `
                                <span class="mini-tag tag-${kw}">${iconHtml}${kw}</span>
                            `;
                        });
                    }

                    if (card) {
                        card.style.cursor = 'pointer';
                        card.onclick = () => showFixedEgoDetails(s.id, s.name);
                    }

                    if (finished === sinners.length) {
                        this.disabled = false;
                        analyzeDeck(selectedList);

                        const copyBtn = document.getElementById('copy-deck-btn');
                        if (copyBtn) {
                            copyBtn.style.display = 'inline-block';
                            copyBtn.disabled = false;
                            copyBtn.style.pointerEvents = 'auto';
                        }
                    }
                }
            }, 80);
        });
    };
}

function showFixedEgoDetails(sinnerId, sinnerName) {
    const modal = document.getElementById('ego-modal');
    const content = document.getElementById('ego-content');
    const nameLabel = document.getElementById('ego-sinner-name');
    
    if (!modal || !content || !nameLabel) return;

    nameLabel.innerText = `${sinnerName} 장착 에고`;
    content.innerHTML = '';
    
    const egoSet = fixedEgos[sinnerId];
    const gradeSymbols = ['Z', 'T', 'H', 'W', 'A']; 
    const gradeNames = ['zayin', 'teth', 'he', 'waw', 'aleph'];

    if (egoSet) {
        egoSet.forEach((egoName, i) => {
            const egoDiv = document.createElement('div');
            const isEquipped = egoName && egoName !== '-';
            
            egoDiv.className = `ego-list-item grade-${gradeNames[i]}`;
            egoDiv.innerHTML = `
                <span class="ego-symbol">${gradeSymbols[i]}</span>
                <span class="ego-name" style="${!isEquipped ? 'color:#555' : 'color:#ffffff;'}">${egoName}</span>
            `;
            content.appendChild(egoDiv);
        });
    }
    
    modal.style.display = 'flex';
}

function closeEgoModal() {
    const modal = document.getElementById('ego-modal');
    if (modal) modal.style.display = 'none';
}

// -------------------------------------------------------------
// [5. 비트 연산 및 덱 코드 생성 함수]
// -------------------------------------------------------------
function setBits(bitArray, start, end, value) {
    let length = end - start + 1;
    let binaryValue = Number(value).toString(2).padStart(length, '0');
    
    if (binaryValue.length > length) {
        binaryValue = binaryValue.slice(-length);
    }

    for (let i = 0; i < length; i++) {
        bitArray[start + i] = binaryValue[i];
    }
}

function generateBitStringFromDeckData(deck) {
    let totalBits = new Array(560).fill('0');

    sinners.forEach((s, i) => {
        let startBit = i * 46; 
        let foundIdentity = null;

        if (deck && deck.deckIdentities && deck.deckIdentities[i]) {
            foundIdentity = deck.deckIdentities[i];
        } else if (identities && identities[i]) {
            foundIdentity = identities[i][0];
        }
        
        let idyNo = foundIdentity ? foundIdentity.no : 1;

        if (idyNo >= 16) {
            setBits(totalBits, startBit + 3, startBit + 7, idyNo);
        } else {
            setBits(totalBits, startBit + 4, startBit + 7, idyNo);
        }

        setBits(totalBits, startBit + 8, startBit + 11, i + 1);
        
        const egoData = typeof sinnerEgoList !== 'undefined' ? sinnerEgoList[i] : null;
        if (egoData && egoData[0] && egoData[0].length > 0) {
            setBits(totalBits, startBit + 15, startBit + 18, egoData[0][0].no || 1);
        }
    });

    const bitString = totalBits.join("");

    let bytes = new Uint8Array(bitString.length / 8);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(bitString.substr(i * 8, 8), 2);
    }

    let binStr1 = '';
    for (let i = 0; i < bytes.length; i++) {
        binStr1 += String.fromCharCode(bytes[i]);
    }
    let b64_encoded = btoa(binStr1);

    if (typeof pako === 'undefined') {
        throw new Error("pako 라이브러리가 로드되지 않았습니다.");
    }
    let compressor = pako.gzip(b64_encoded);

    let binStr2 = '';
    for (let i = 0; i < compressor.length; i++) {
        binStr2 += String.fromCharCode(compressor[i]);
    }
    let deck_code = btoa(binStr2);

    return deck_code;
}

function generateRawBitString() {
    let totalBits = new Array(560).fill('0');

    sinners.forEach((s, i) => {
        let startBit = i * 46; 

        let foundIdentity = null;

        const isCustomScreen = !document.getElementById('deck-share-screen').classList.contains('hidden');

        if (isCustomScreen && typeof customDeckState !== 'undefined' && customDeckState[s.id] && customDeckState[s.id].identity) {
            foundIdentity = customDeckState[s.id].identity;
        } else {
            const label = document.getElementById(`slot-${s.id}`)?.nextElementSibling;
            const currentName = label ? label.innerText.trim() : ""; 
            foundIdentity = identities[i]?.find(idy => idy.name.trim() === currentName);
        }
        
        let idyNo = foundIdentity ? foundIdentity.no : 1;

        if (idyNo >= 16) {
            setBits(totalBits, startBit + 3, startBit + 7, idyNo);
        } else {
            setBits(totalBits, startBit + 4, startBit + 7, idyNo);
        }

        setBits(totalBits, startBit + 8, startBit + 11, i + 1);

        const egoSet = typeof fixedEgos !== 'undefined' ? fixedEgos[s.id] : null;
        const egoData = typeof sinnerEgoList !== 'undefined' ? sinnerEgoList[i] : null;

        if (egoSet && egoData) {
            const getEgoNo = (gradeIdx, egoName) => {
                if (!egoName || egoName === "-") return 0;
                const found = egoData[gradeIdx]?.find(e => e.name.trim() === egoName.trim());
                return found ? found.no : 0;
            };

            setBits(totalBits, startBit + 15, startBit + 18, getEgoNo(0, egoSet[0])); 
            setBits(totalBits, startBit + 22, startBit + 25, getEgoNo(1, egoSet[1])); 
            setBits(totalBits, startBit + 29, startBit + 32, getEgoNo(2, egoSet[2])); 
            setBits(totalBits, startBit + 36, startBit + 39, getEgoNo(3, egoSet[3])); 
        }
    });

    const bitString = totalBits.join("");

    let bytes = new Uint8Array(bitString.length / 8);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(bitString.substr(i * 8, 8), 2);
    }

    let binStr1 = '';
    for (let i = 0; i < bytes.length; i++) {
        binStr1 += String.fromCharCode(bytes[i]);
    }
    let b64_encoded = btoa(binStr1);

    if (typeof pako === 'undefined') {
        throw new Error("pako 라이브러리가 로드되지 않았습니다.");
    }
    let compressor = pako.gzip(b64_encoded);

    let binStr2 = '';
    for (let i = 0; i < compressor.length; i++) {
        binStr2 += String.fromCharCode(compressor[i]);
    }
    let deck_code = btoa(binStr2);

    return deck_code;
}

// -------------------------------------------------------------
// [6. 클립보드 복사 함수]
// -------------------------------------------------------------
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert("덱 코드가 클립보드에 복사되었습니다!\n\n" + text);
        }).catch(() => {
            fallbackCopyText(text);
        });
    } else {
        fallbackCopyText(text);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert("덱 코드가 클립보드에 복사되었습니다!\n\n" + text);
    } catch (err) {
        alert("복사 실패: 수동으로 복사해주세요.\n" + text);
    }
    document.body.removeChild(textArea);
}

// -------------------------------------------------------------
// [7. 덱 커스텀 및 공유 시스템 로직]
// -------------------------------------------------------------
let customDeckState = {};
let activeCustomSinnerId = null;
let customActiveTab = 'identity';

function initCustomDeckState() {
    if (typeof sinners === 'undefined' || typeof identities === 'undefined' || typeof sinnerEgoList === 'undefined') return;

    sinners.forEach((s, i) => {
        const defaultIdentity = identities[i][0];
        const egoData = sinnerEgoList[i];
        const defaultZayin = (egoData && egoData[0] && egoData[0].length > 0) ? egoData[0][0].name : "-";
        const defaultEgos = [defaultZayin, "-", "-", "-", "-"];

        customDeckState[s.id] = {
            identity: defaultIdentity,
            egos: defaultEgos
        };
    });
}

function renderCustomGrid() {
    const grid = document.getElementById('custom-sinner-grid');
    if (!grid) return;
    grid.innerHTML = '';

    sinners.forEach((s, i) => {
        const state = customDeckState[s.id];
        if (!state) return;
        const currentIdy = state.identity;

        const card = document.createElement('div');
        card.className = 'sinner-card';
        card.id = `custom-card-${s.id}`;
        card.style.cursor = 'pointer';

        let keywordsHtml = '';
        if (currentIdy.keywords) {
            currentIdy.keywords.forEach(kw => {
                if (!kw) return;
                const imgFile = keywordImageMap[kw];
                const iconHtml = imgFile ? `<img src="images/keywords/${imgFile}" class="mini-tag-icon">` : '';
                keywordsHtml += `<span class="mini-tag tag-${kw}">${iconHtml}${kw}</span>`;
            });
        }

        card.innerHTML = `
            <div class="rank-stars">${'★'.repeat(currentIdy.rank)}</div>
            <div class="img-box">
                <img src="images/${s.folder}/${s.folder}_${currentIdy.code}.png">
            </div>
            <div class="sinner-label" style="color: ${currentIdy.rank === 3 ? '#ffc400' : '#fff'}">${currentIdy.name}</div>
            <div class="card-keywords">${keywordsHtml}</div>
        `;

        card.onclick = () => openCustomModal(s.id, s.name);
        grid.appendChild(card);
    });
}

function openCustomModal(sinnerId, sinnerName) {
    activeCustomSinnerId = sinnerId;
    customActiveTab = 'identity';
    
    document.getElementById('select-modal-title').innerText = `${sinnerName} - 인격 및 E.G.O 커스텀`;
    document.getElementById('tab-identity').classList.add('active');
    document.getElementById('tab-ego').classList.remove('active');

    renderCustomModalBody();
    document.getElementById('custom-select-modal').style.display = 'flex';
}

function closeCustomModal() {
    document.getElementById('custom-select-modal').style.display = 'none';
}

function switchCustomTab(tab) {
    customActiveTab = tab;
    if (tab === 'identity') {
        document.getElementById('tab-identity').classList.add('active');
        document.getElementById('tab-ego').classList.remove('active');
    } else {
        document.getElementById('tab-identity').classList.remove('active');
        document.getElementById('tab-ego').classList.add('active');
    }
    renderCustomModalBody();
}

function renderCustomModalBody() {
    const body = document.getElementById('select-modal-body');
    if (!body) return;
    body.innerHTML = '';

    const sinnerObj = sinners.find(s => s.id === activeCustomSinnerId);
    const sinnerIdx = parseInt(activeCustomSinnerId) - 1;

    if (customActiveTab === 'identity') {
        const idyList = identities[sinnerIdx];
        idyList.forEach(idy => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'select-item-card';
            itemDiv.innerHTML = `
                <div class="select-item-thumb">
                    <img src="images/${sinnerObj.folder}/${sinnerObj.folder}_${idy.code}.png">
                </div>
                <div class="select-item-info">
                    <span class="select-item-name" style="color:${idy.rank === 3 ? '#ffc400' : '#fff'}">${idy.name}</span>
                    <span class="select-item-details">${'★'.repeat(idy.rank)} | 키워드: ${idy.keywords ? idy.keywords.join(', ') : '없음'}</span>
                </div>
            `;
            itemDiv.onclick = () => {
                customDeckState[activeCustomSinnerId].identity = idy;
                renderCustomGrid();
                analyzeCustomDeck();
                closeCustomModal();
            };
            body.appendChild(itemDiv);
        });
    } else {
        const egoData = sinnerEgoList[sinnerIdx];
        const gradeNamesZ = ['ZAYIN', 'TETH', 'HE', 'WAW', 'ALEPH'];
        const currentEgos = customDeckState[activeCustomSinnerId].egos;
        
        egoData.forEach((gradeList, gradeIdx) => {
            const gradeTitle = document.createElement('div');
            gradeTitle.style.cssText = "font-weight:bold; color:#ffc400; margin: 10px 0 5px 0; font-size:13px;";
            gradeTitle.innerText = `[ ${gradeNamesZ[gradeIdx]} 등급 ]`;
            body.appendChild(gradeTitle);

            if (gradeIdx !== 0) {
                const isNoneSelected = currentEgos[gradeIdx] === "-";
                const noneDiv = document.createElement('div');
                noneDiv.className = 'select-item-card';
                if (isNoneSelected) {
                    noneDiv.style.borderColor = '#ff3333';
                    noneDiv.style.backgroundColor = '#2a1a1a';
                }
                noneDiv.innerHTML = `<div class="select-item-info"><span class="select-item-name" style="color:${isNoneSelected ? '#ff3333' : '#777'}">장착 해제 (-)</span></div>`;
                noneDiv.onclick = () => {
                    customDeckState[activeCustomSinnerId].egos[gradeIdx] = "-";
                    renderCustomModalBody();
                };
                body.appendChild(noneDiv);
            }

            if (gradeList && gradeList.length > 0) {
                gradeList.forEach((ego) => {
                    if (gradeIdx === 0 && (currentEgos[gradeIdx] === "-" || !currentEgos[gradeIdx])) {
                        currentEgos[gradeIdx] = gradeList[0].name;
                    }

                    const isSelected = currentEgos[gradeIdx] === ego.name;
                    const egoDiv = document.createElement('div');
                    egoDiv.className = 'select-item-card';
                    
                    if (isSelected) {
                        egoDiv.style.borderColor = '#ff3333';
                        egoDiv.style.backgroundColor = '#2a1a1a';
                    }

                    egoDiv.innerHTML = `
                        <div class="select-item-info">
                            <span class="select-item-name" style="color: ${isSelected ? '#ff6666' : '#fff'}">${ego.name}</span>
                        </div>
                    `;
                    egoDiv.onclick = () => {
                        customDeckState[activeCustomSinnerId].egos[gradeIdx] = ego.name;
                        renderCustomModalBody();
                    };
                    body.appendChild(egoDiv);
                });
            }
        });
    }
}

function analyzeCustomDeck() {
    const keywordCounts = {};
    let rank3Count = 0;
    let rank2Count = 0;
    let rank1Count = 0;

    Object.values(customDeckState).forEach(state => {
        if (!state || !state.identity) return;
        const item = state.identity;
        if (item.rank === 3) rank3Count++;
        else if (item.rank === 2) rank2Count++;
        else rank1Count++;

        if (item.keywords && Array.isArray(item.keywords)) {
            item.keywords.forEach(kw => {
                if (kw && kw.trim() !== '') {
                    keywordCounts[kw] = (keywordCounts[kw] || 0) + 1;
                }
            });
        }
    });

    const sortedKeywords = Object.entries(keywordCounts).sort((a, b) => b[1] - a[1]);
    const tagsContainer = document.getElementById('custom-top-keywords');
    const summaryLabel = document.getElementById('custom-rank-summary');

    if (tagsContainer) {
        tagsContainer.innerHTML = '';
        if (sortedKeywords.length === 0) {
            tagsContainer.innerHTML = '<span class="tag">특이 시너지 없음</span>';
        } else {
            sortedKeywords.slice(0, 5).forEach(([kw, count]) => {
                const imgFile = keywordImageMap[kw];
                const iconHtml = imgFile ? `<img src="images/keywords/${imgFile}" class="tag-icon" alt="${kw}">` : '';
                const tagSpan = document.createElement('span');
                tagSpan.className = `tag tag-${kw}`;
                tagSpan.innerHTML = `${iconHtml}#${kw} <span class="count">(${count})</span>`;
                
                tagSpan.onclick = (e) => {
                    e.stopPropagation();
                    toggleCustomKeywordFilter(kw);
                };

                tagsContainer.appendChild(tagSpan);
            });
        }
    }

    if (summaryLabel) {
        summaryLabel.innerText = `3성: ${rank3Count}개 / 2성: ${rank2Count}개` + (rank1Count > 0 ? ` / 1성: ${rank1Count}개` : '');
    }
}

function toggleCustomKeywordFilter(kw) {
    const tags = document.querySelectorAll('#custom-top-keywords .tag');

    if (activeCustomKeywordFilter === kw) {
        activeCustomKeywordFilter = null;
        tags.forEach(t => t.classList.remove('selected-filter'));
        sinners.forEach(s => {
            const card = document.getElementById(`custom-card-${s.id}`);
            if (card) {
                card.classList.remove('highlighted', 'dimmed');
            }
        });
    } else {
        activeCustomKeywordFilter = kw;
        tags.forEach(t => {
            if (t.classList.contains(`tag-${kw}`)) {
                t.classList.add('selected-filter');
            } else {
                t.classList.remove('selected-filter');
            }
        });

        sinners.forEach((s) => {
            const card = document.getElementById(`custom-card-${s.id}`);
            if (!card) return;

            const state = customDeckState[s.id];
            const hasKeyword = state && state.identity && state.identity.keywords && state.identity.keywords.includes(kw);

            if (hasKeyword) {
                card.classList.add('highlighted');
                card.classList.remove('dimmed');
            } else {
                card.classList.remove('highlighted');
                card.classList.add('dimmed');
            }
        });
    }
}

// -------------------------------------------------------------
// -------------------------------------------------------------
// [8. 공유된 덱 보기(커뮤니티) - 페이지네이션 & 조회수 증가 적용 버전]
// -------------------------------------------------------------
let currentCommunityPage = 1;
const decksPerPage = 5; // 한 페이지에 5개씩 표시
let cachedCommunityDecks = []; 

function loadCommunityDecks() {
    const listContainer = document.getElementById('community-deck-list');
    const statusIndicator = document.getElementById('community-status');
    if (!listContainer) return;

    listContainer.innerHTML = '<div style="text-align: center; color: #71717a; padding: 20px;">공유 된 덱을 불러오는 중...</div>';

    db.collection("sharedDecks").orderBy("date", "desc").get()
        .then((querySnapshot) => {
            cachedCommunityDecks = [];
            querySnapshot.forEach((doc) => {
                cachedCommunityDecks.push({ id: doc.id, ...doc.data() });
            });

            currentCommunityPage = 1; 
            renderCommunityPage();
        })
        .catch((error) => {
            console.error("데이터 로드 실패:", error);
            if (statusIndicator) statusIndicator.textContent = "파이어베이스 연동 오류 (콘솔 확인 필요)";
            listContainer.innerHTML = '<div style="text-align: center; color: #ff3333; padding: 20px;">공유 덱을 불러오지 못했습니다.</div>';
        });
}

// 특정 덱의 조회수를 1 증가시키는 함수
async function incrementDeckView(deckId) {
    if (!deckId) return;
    try {
        const deckRef = db.collection("sharedDecks").doc(deckId);
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(deckRef);
            if (!doc.exists) return;
            const newViews = (doc.data().views || 0) + 1;
            transaction.update(deckRef, { views: newViews });
            
            // 캐시 데이터도 동기화
            const cached = cachedCommunityDecks.find(d => d.id === deckId);
            if (cached) cached.views = newViews;
        });
    } catch (e) {
        console.error("조회수 증가 실패:", e);
    }
}

function renderCommunityPage() {
    const listContainer = document.getElementById('community-deck-list');
    const statusIndicator = document.getElementById('community-status');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    if (!cachedCommunityDecks || cachedCommunityDecks.length === 0) {
        listContainer.innerHTML = '<div style="text-align: center; color: #71717a; padding: 20px;">등록된 공유 덱이 없습니다.</div>';
        if (statusIndicator) statusIndicator.textContent = "등록된 공유 덱 없음";
        return;
    }

    const totalDecks = cachedCommunityDecks.length;
    const totalPages = Math.ceil(totalDecks / decksPerPage);

    if (currentCommunityPage > totalPages) currentCommunityPage = totalPages;
    if (currentCommunityPage < 1) currentCommunityPage = 1;

    const startIndex = (currentCommunityPage - 1) * decksPerPage;
    const endIndex = startIndex + decksPerPage;
    const decksToDisplay = cachedCommunityDecks.slice(startIndex, endIndex);

    if (statusIndicator) {
        statusIndicator.textContent = `총 ${totalDecks}개의 공유 덱 중 ${startIndex + 1} ~ ${Math.min(endIndex, totalDecks)}번째 표시 (페이지 ${currentCommunityPage}/${totalPages})`;
    }

    decksToDisplay.forEach(deck => {
        const card = document.createElement('div');
        card.style.cssText = `
            display: flex; 
            background-color: #1a1d26; 
            border: 1px solid #2a2e3d; 
            border-radius: 6px; 
            overflow: hidden; 
            padding: 10px 14px; 
            gap: 12px; 
            align-items: center;
        `;

        const leftInfo = document.createElement('div');
        leftInfo.style.cssText = `flex: 0 0 160px; display: flex; flex-direction: column; gap: 3px;`;
        
        const tagsHtml = (deck.tags || []).map(tag => {
            const isHighlight = tag === 'EXTREME' || tag === 'HARD';
            return `<span style="background: ${isHighlight ? '#7f1d1d' : '#27272a'}; color: ${isHighlight ? '#fca5a5' : '#e4e4e7'}; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; display: inline-block;">${tag}</span>`;
        }).join('');

        leftInfo.innerHTML = `
            <div style="display: flex; align-items: center; gap: 4px; font-size: 0.75rem; color: #a1a1aa;"><span>👤</span> <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${deck.author || '익명'}</span></div>
            <div style="font-size: 0.95rem; font-weight: bold; color: #60a5fa; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${deck.title || ''}">${deck.title || '제목 없음'}</div>
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">${tagsHtml}</div>
            <div style="font-size: 0.65rem; color: #71717a; display: flex; gap: 6px; align-items: center; margin-top: 2px;" id="view-count-${deck.id}">
                <span>👁️ ${deck.views || 0}</span>
                <span>📅 ${deck.date || '2026. 08. 29.'}</span>
            </div>
        `;

        const middleDesc = document.createElement('div');
        middleDesc.style.cssText = `
            flex: 0 0 170px; 
            background: #111318; 
            border: 1px solid #1f232d; 
            padding: 8px 10px; 
            border-radius: 4px; 
            height: 122px; 
            overflow: hidden; 
            font-size: 0.75rem; 
            color: #d4d4d8; 
            cursor: pointer; 
            display: flex;
            flex-direction: column;
            justify-content: center;
        `;
        
        middleDesc.innerHTML = `
            <div style="font-size: 0.65rem; color: #71717a; margin-bottom: 4px;">설명 (클릭하여 보기)</div>
            <div style="white-space: pre-wrap; overflow: hidden; text-overflow: ellipsis; color: #a1a1aa; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical;">${deck.description || '설명이 없습니다.'}</div>
        `;

        middleDesc.onclick = () => {
            showDescriptionModal(deck.title, deck.description);
        };

        const rightThumbnails = document.createElement('div');
        rightThumbnails.style.cssText = `display: grid; grid-template-columns: repeat(6, 1fr); grid-template-rows: repeat(2, 1fr); gap: 6px; flex: 1; align-self: stretch;`;
        
        const thumbnails = deck.thumbnails || Array(12).fill('');
        for (let i = 0; i < 12; i++) {
            const thumbObj = thumbnails[i];
            const cell = document.createElement('div');
            cell.style.cssText = `background: #090a0f; border: 1px solid #27272a; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; position: relative; min-height: 58px;`;
            
            if (thumbObj && thumbObj.imgUrl) {
                cell.innerHTML = `
                    <span style="position: absolute; top: 2px; left: 2px; background: rgba(0,0,0,0.75); color: #fff; font-size: 0.6rem; padding: 1px 3px; border-radius: 2px; z-index: 2; line-height: 1;">${i + 1}</span>
                    <img src="${thumbObj.imgUrl}" style="width: 100%; height: 100%; object-fit: cover;" title="${thumbObj.name || ''}">
                `;
            } else {
                cell.innerHTML = `<span style="font-size: 0.7rem; color: #3f3f46;">${i + 1}</span>`;
            }
            rightThumbnails.appendChild(cell);
        }

        const rightAction = document.createElement('div');
        rightAction.style.cssText = `display: flex; align-items: center; flex: 0 0 90px; justify-content: flex-end; flex-shrink: 0;`;
        
        const copyBtn = document.createElement('button');
        copyBtn.style.cssText = `
            background-color: #2563eb; 
            color: #fff; 
            border: none; 
            padding: 12px 10px; 
            font-size: 0.75rem; 
            font-weight: bold; 
            border-radius: 4px; 
            cursor: pointer;
            white-space: nowrap;
            width: 100%;
        `;
        copyBtn.innerText = '코드 복사';
        
        copyBtn.onclick = async () => {
            try {
                let codeToCopy = "";
                if (deck.deckIdentities && deck.deckIdentities.length > 0) {
                    codeToCopy = generateBitStringFromDeckData(deck);
                } else if (deck.deckCode) {
                    codeToCopy = deck.deckCode;
                }
                
                if (codeToCopy) {
                    // 조회수 증가 실행
                    await incrementDeckView(deck.id);
                    deck.views = (deck.views || 0) + 1;
                    
                    // 화면 상의 조회수 즉시 갱신
                    const viewCountElem = document.getElementById(`view-count-${deck.id}`);
                    if (viewCountElem) {
                        viewCountElem.innerHTML = `<span>👁️ ${deck.views}</span><span>📅 ${deck.date || '2026. 08. 29.'}</span>`;
                    }

                    copyToClipboard(codeToCopy);
                } else {
                    alert("저장된 덱 코드가 없습니다.");
                }
            } catch (e) {
                console.error("커뮤니티 덱 복사 오류:", e);
                if (deck.deckCode) {
                    copyToClipboard(deck.deckCode);
                } else {
                    alert("코드 복사 중 오류가 발생했습니다.");
                }
            }
        };
        rightAction.appendChild(copyBtn);

        card.appendChild(leftInfo);
        card.appendChild(middleDesc);
        card.appendChild(rightThumbnails);
        card.appendChild(rightAction);
        listContainer.appendChild(card);
    });

    if (totalPages > 1) {
        const paginationContainer = document.createElement('div');
        paginationContainer.style.cssText = `
            display: flex; 
            justify-content: center; 
            align-items: center; 
            gap: 6px; 
            margin-top: 15px; 
            padding-bottom: 10px;
        `;

        const prevBtn = document.createElement('button');
        prevBtn.style.cssText = `background: #27272a; color: #fff; border: 1px solid #3f3f46; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;`;
        prevBtn.innerText = '◀ 이전';
        prevBtn.disabled = currentCommunityPage === 1;
        if (prevBtn.disabled) prevBtn.style.opacity = '0.4';
        prevBtn.onclick = () => {
            if (currentCommunityPage > 1) {
                currentCommunityPage--;
                renderCommunityPage();
                listContainer.scrollTop = 0;
            }
        };
        paginationContainer.appendChild(prevBtn);

        let startPage = Math.max(1, currentCommunityPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let p = startPage; p <= endPage; p++) {
            const pageBtn = document.createElement('button');
            const isCurrent = p === currentCommunityPage;
            pageBtn.style.cssText = `
                background: ${isCurrent ? '#2563eb' : '#27272a'}; 
                color: #fff; 
                border: 1px solid ${isCurrent ? '#3b82f6' : '#3f3f46'}; 
                padding: 6px 10px; 
                border-radius: 4px; 
                cursor: pointer; 
                font-size: 0.8rem;
                font-weight: ${isCurrent ? 'bold' : 'normal'};
            `;
            pageBtn.innerText = p;
            pageBtn.onclick = () => {
                currentCommunityPage = p;
                renderCommunityPage();
                listContainer.scrollTop = 0;
            };
            paginationContainer.appendChild(pageBtn);
        }

        const nextBtn = document.createElement('button');
        nextBtn.style.cssText = `background: #27272a; color: #fff; border: 1px solid #3f3f46; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;`;
        nextBtn.innerText = '다음 ▶';
        nextBtn.disabled = currentCommunityPage === totalPages;
        if (nextBtn.disabled) nextBtn.style.opacity = '0.4';
        nextBtn.onclick = () => {
            if (currentCommunityPage < totalPages) {
                currentCommunityPage++;
                renderCommunityPage();
                listContainer.scrollTop = 0;
            }
        };
        paginationContainer.appendChild(nextBtn);

        listContainer.appendChild(paginationContainer);
    }
}

function showDescriptionModal(title, description) {
    let modal = document.getElementById('desc-popup-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'desc-popup-modal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-color: rgba(0, 0, 0, 0.7); display: flex;
            justify-content: center; align-items: center; z-index: 2000;
        `;
        modal.innerHTML = `
            <div style="background-color: #1e1e1e; border: 1px solid #444; border-radius: 8px; width: 400px; max-width: 90%; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.8);">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 12px;">
                    <h3 id="popup-deck-title" style="font-size: 16px; color: #fff;">설명</h3>
                    <button id="popup-close-btn" style="background: none; border: none; color: #aaa; font-size: 18px; cursor: pointer;">✕</button>
                </div>
                <div id="popup-deck-desc" style="font-size: 13px; color: #ccc; line-height: 1.5; max-height: 250px; overflow-y: auto; white-space: pre-wrap;"></div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('#popup-close-btn').onclick = () => {
            modal.style.display = 'none';
        };
        modal.onclick = (e) => {
            if (e.target === modal) modal.style.display = 'none';
        };
    }

    modal.querySelector('#popup-deck-title').innerText = title;
    modal.querySelector('#popup-deck-desc').innerText = description;
    modal.style.display = 'flex';
}
