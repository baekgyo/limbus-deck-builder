const sinners = [
    { id: "01", name: "이상", folder: "01_yi_sang" },
    { id: "02", name: "파우스트", folder: "02_faust" },
    { id: "03", name: "돈키호테", folder: "03_don" },
    { id: "04", name: "료슈", folder: "04_ryoshu" },
    { id: "05", name: "뫼르소", folder: "05_meursault" },
    { id: "06", name: "홍루", folder: "06_hong_lu" },
    { id: "07", name: "히스클리프", folder: "07_heath" },
    { id: "08", name: "이스마엘", folder: "08_ish" },
    { id: "09", name: "로쟈", folder: "09_rodion" },
    { id: "10", name: "싱클레어", folder: "10_sinclair" },
    { id: "11", name: "오티스", folder: "11_outis" },
    { id: "12", name: "그레고르", folder: "12_gregor" }
];

const identities = [
  [ // 0: 이상 (파일명 매칭 완료)
    { no: 1, name: 'LCB 수감자 이상', code: 'base', rank: 1, keywords: ['침잠'] },
    { no: 2, name: '남부 세븐 협회 6과 이상', code: 'seven', rank: 2, keywords: ['파열'] },
    { no: 3, name: '검계 살수 이상', code: 'blade', rank: 3, keywords: ['호흡'] },
    { no: 4, name: '개화 E.G.O:: 동백 이상', code: 'spicebush', rank: 3, keywords: ['침잠'] },
    { no: 5, name: '어금니 사무소 해결사 이상', code: 'molar', rank: 2, keywords: ['진동'] },
    { no: 6, name: 'W사 3등급 정리 요원 이상', code: 'w' , rank: 3, keywords: ['충전', '파열']},
    { no: 7, name: '피쿼드호 일등 항해사 이상', code: 'pequod', rank: 2, keywords: ['출혈', '호흡'] },
    { no: 8, name: '남부 디에치 협회 4과 이상', code: 'dieci', rank: 2, keywords: ['침잠'] },
    { no: 9, name: '약지 점묘파 스튜던트 이상', code: 'ring', rank: 3, keywords: ['출혈'] },
    { no: 10, name: '로보토미 E.G.O:: 엄숙한 애도 이상', code: 'solemn', rank: 3, keywords: ['침잠'] },
    { no: 11, name: 'LCE E.G.O:: 초롱 이상', code: 'lantern', rank: 2, keywords: ['파열'] },
    { no: 12, name: '남부 리우 협회 3과 이상', code: 'liu', rank: 3, keywords: ['화상'] },
    { no: 13, name: 'N사 E.G.O:: 흉탄 이상', code: 'ncorp', rank: 3, keywords: ['츌혈', '호흡'] },
    { no: 14, name: '흑수 - 오 필두 이상', code: 'kuro', rank: 3, keywords: ['파열', '진동'] },
    { no: 15, name: '거미집 검지 아비 이상', code: 'index', rank: 3, keywords: ['호흡', '침잠'] },
    { no: 16, name: 'LCE E.G.O::차원찢개 이상', code: 'ego', rank: 3, keywords: ['파열', '충전'] }

  ],
  [ // 1: 파우스트
    { no: 1, name: 'LCB 수감자 파우스트', code: 'base', rank: 1, keywords: [] },
    { no: 2, name: 'W사 2등급 정리 요원 파우스트', code: 'w', rank: 2, keywords: ['충전'] },
    { no: 3, name: '살아남은 로보토미 직원 파우스트', code: 'lc', rank: 2, keywords: ['호흡', '파열'] },
    { no: 4, name: '쥐는 자 파우스트', code: 'gripping', rank: 3, keywords: ['출혈'] },
    { no: 5, name: '남부 츠바이 협회 4과 파우스트', code: 'zwei', rank: 2, keywords: [] },
    { no: 6, name: '남부 세븐 협회 4과 파우스트', code: 'seven', rank: 3, keywords: ['파열'] },
    { no: 7, name: '로보토미 E.G.O:: 후회 파우스트', code: 'regret', rank: 3, keywords: ['진동'] },
    { no: 8, name: '검계 살수 파우스트', code: 'blade', rank: 3, keywords: ['출혈', '호흡'] },
    { no: 9, name: '워더링하이츠 버틀러 파우스트', code: 'butler', rank: 2, keywords: ['침잠'] },
    { no: 10, name: '멀티크랙 사무소 대표 파우스트', code: 'multicrack', rank: 3, keywords: ['충전'] },
    { no: 11, name: 'LCE E.G.O:: 홍염살 파우스트', code: 'ardor', rank: 3, keywords: ['화상'] },
    { no: 12, name: '흑수 - 묘 필두 파우스트', code: 'kuro', rank: 3, keywords: ['파열'] },
    { no: 13, name: '동부 시 협회 3과 파우스트', code: 'shi', rank: 3, keywords: ['출혈', '호흡'] },
    { no: 14, name: '검지 수행자 파우스트', code: 'index', rank: 3, keywords: ['호흡', '침잠'] },
    { no: 15, name: '거미집 약지 제자 파우스트', code: 'ring', rank: 3, keywords: ['출혈', '충전'] },
    { no: 16, name: '새벽 사무소 해결사 파우스트', code: 'philip', rank: 3, keywords: ['화상', '진동'] }
  ],
  [ // 2: 돈키호테
    { no: 1, name: 'LCB 수감자 돈키호테', code: 'base', rank: 1, keywords: ['출혈'] },
    { no: 2, name: 'W사 3등급 정리 요원 돈키호테', code: 'w', rank: 3, keywords: ['충전', '파열'] },
    { no: 3, name: '남부 시 협회 5과 부장 돈키호테', code: 'shi', rank: 2, keywords: ['호흡'] },
    { no: 4, name: 'N사 중간 망치 돈키호테', code: 'ncorp', rank: 2, keywords: ['진동', '출혈'] },
    { no: 5, name: '남부 섕크 협회 5과 부장 돈키호테', code: 'cinq_5', rank: 3, keywords: [] },
    { no: 6, name: '중지 작은 아우 돈키호테', code: 'middle', rank: 3, keywords: ['출혈'] },
    { no: 7, name: '로보토미 E.G.O:: 초롱 돈키호테', code: 'lantern', rank: 2, keywords: ['파열'] },
    { no: 8, name: '검계 살수 돈키호테', code: 'blade', rank: 2, keywords: ['호흡'] },
    { no: 9, name: 'T사 3등급 징수직 직원 돈키호테', code: 'tcorp', rank: 3, keywords: ['진동'] },
    { no: 10, name: '라만차랜드 실장 돈키호테', code: 'lamancha', rank: 3, keywords: ['출혈'] },
    { no: 11, name: '동부 섕크 협회 3과 돈키호테', code: 'cinq_3', rank: 3, keywords: ['화상', '호흡'] },
    { no: 12, name: '로보토미 E.G.O::사랑과 증오의 이름으로 돈키호테', code: 'queenie', rank: 3, keywords: ['충전', '파열', '침잠'] },
    { no: 13, name: '흑수 - 미 돈키호테', code: 'kuro', rank: 3, keywords: ['파열', '침잠'] },
    { no: 14, name: '검지 대행자 돈키호테', code: 'index', rank: 3, keywords: ['호흡', '침잠'] }
  ],
  [ // 3: 료슈
    { no: 1, name: 'LCB 수감자 료슈', code: 'base', rank: 1, keywords: ['호흡'] },
    { no: 2, name: '남부 세븐 협회 6과 료슈', code: 'seven', rank: 2, keywords: ['파열'] },
    { no: 3, name: '흑운회 와카슈 료슈', code: 'kurokumo', rank: 3, keywords: ['출혈'] },
    { no: 4, name: '료. 고. 파. 주방장 료슈', code: 'rb', rank: 3, keywords: ['출혈'] },
    { no: 5, name: 'W사 3등급 정리 요원 료슈', code: 'w', rank: 3, keywords: ['충전'] },
    { no: 6, name: 'LCCB 대리 료슈', code: 'lccb', rank: 2, keywords: ['호흡', '파열', '진동'] },
    { no: 7, name: '남부 리우 협회 4과 료슈', code: 'liu', rank: 2, keywords: ['화상'] },
    { no: 8, name: '에드가 가문 치프 버틀러 료슈', code: 'butler', rank: 3, keywords: ['호흡'] },
    { no: 9, name: '20구 유로지비 료슈', code: 'yurodivy', rank: 2, keywords: ['진동'] },
    { no: 10, name: '로보토미 E.G.O:: 적안・참회 료슈', code: 'fourth_match', rank: 3, keywords: ['출혈', '충전'] },
    { no: 11, name: '흑수 - 묘 료슈', code: 'kuro', rank: 3, keywords: ['파열'] },
    { no: 12, name: 'N사 E.G.O::경멸, 경외 료슈', code: 'ncorp', rank: 3, keywords: ['출혈', '진동'] },
    { no: 13, name: '홍원 방랑무사 료슈', code: 'hongyeon', rank: 3, keywords: ['호흡', '파열'] },
    { no: 14, name: '로보토미 E.G.O::잔향 · 외로움 료슈', code: 'reverberation', rank: 3, keywords: ['침잠', '진동'] },
    { no: 15, name: '거미집의 검 로슈', code: 'index', rank: 3, keywords: ['화상', '출혈', '호흡'] }
  ],
  [ // 4: 뫼르소
    { no: 1, name: 'LCB 수감자 뫼르소', code: 'base', rank: 1, keywords: ['진동'] },
    { no: 2, name: '남부 리우 협회 6과 뫼르소', code: 'liu', rank: 2, keywords: ['화상'] },
    { no: 3, name: 'W사 2등급 정리 요원 뫼르소', code: 'w' , rank: 3, keywords: ['충전', '파열']},
    { no: 4, name: 'N사 큰 망치 뫼르소', code: 'ncorp', rank: 3, keywords: ['출혈'] },
    { no: 5, name: '장미스패너 공방 해결사 뫼르소', code: 'rosespaner', rank: 2, keywords: ['충전', '진동'] },
    { no: 6, name: 'R사 제 4무리 코뿔소팀 뫼르소', code: 'rhino', rank: 3, keywords: ['출혈', '충전'] },
    { no: 7, name: '중지 작은 아우 뫼르소', code: 'middle', rank: 2, keywords: ['출혈'] },
    { no: 8, name: '검계 우두머리 뫼르소', code: 'blade', rank: 3, keywords: ['호흡'] },
    { no: 9, name: '데드레빗츠 보스 뫼르소', code: 'deadrabbits', rank: 2, keywords: ['파열'] },
    { no: 10, name: '남부 디에치 협회 4과 부장 뫼르소', code: 'dieci', rank: 3, keywords: ['침잠'] },
    { no: 11, name: '서부 섕크 협회 3과 뫼르소', code: 'cinq', rank: 3, keywords: ['호흡', '파열'] },
    { no: 12, name: '동부 엄지 카포 IIII 뫼르소', code: 'thumb', rank: 3, keywords: ['화상', '진동'] },
    { no: 13, name: '라만차랜드 왕자 뫼르소', code: 'lamancha', rank: 3, keywords: ['출혈', '파열'] },
    { no: 14, name: '로보토미 E.G.O::호넷【변조】 뫼르소', code: 'hornet', rank: 3, keywords: ['출혈', '화상'] },
    { no: 15, name: '약지 야수파 스튜던트 뫼르소', code: 'ring', rank: 3, keywords: ['출혈', '침잠'] }
  ],
  [ // 5: 홍루
    { no: 1, name: 'LCB 수감자 홍루', code: 'base', rank: 1, keywords: ['파열', '침잠'] },
    { no: 2, name: '흑운회 와카슈 홍루', code: 'kurokumo', rank: 2, keywords: ['출혈'] },
    { no: 3, name: '콩콩이파 두목 홍루', code: 'tincan', rank: 3, keywords: ['출혈'] },
    { no: 4, name: '남부 리우 협회 5과 홍루', code: 'liu', rank: 2, keywords: ['화상'] },
    { no: 5, name: 'K사 3등급 적출직 직원 홍루', code: 'kcorp', rank: 3, keywords: ['파열'] },
    { no: 6, name: 'W사 2등급 정리 요원 홍루', code: 'w', rank: 2, keywords: ['충전', '파열'] },
    { no: 7, name: '갈고리 사무소 해결사 홍루', code: 'hook', rank: 2, keywords: ['출혈'] },
    { no: 8, name: '남부 디에치 협회 4과 홍루', code: 'dieci', rank: 3, keywords: ['침잠'] },
    { no: 9, name: '20구 유로지비 홍루', code: 'yurodivy', rank: 3, keywords: ['진동'] },
    { no: 10, name: '송곳니 사냥 사무소 해결사 홍루', code: 'fang', rank: 2, keywords: ['파열'] },
    { no: 11, name: '마침표 사무소 대표 홍루', code: 'fullstop', rank: 3, keywords: ['호흡'] },
    { no: 12, name: 'R사 제 4무리 순록팀 홍루', code: 'reindeer', rank: 3, keywords: ['충전', '침잠'] },
    { no: 13, name: '홍원 군주 홍루', code: 'hongyeon', rank: 3, keywords: ['호흡', '파열'] },
    { no: 14, name: '거미집 약지 아비 홍루', code: 'ring', rank: 3, keywords: ['출혈', '충전'] },
    { no: 15, name: 'S사 추노꾼 홍루', code: 'scorp', rank: 3, keywords: ['출혈', '호흡'] },
    { no: 16, name: '동부 섕크 협회 3과 홍루', code: 'cinq_3', rank: 3, keywords: ['화상', '호흡'] }
  ],
  [ // 6: 히스클리프
    { no: 1, name: 'LCB 수감자 히스클리프', code: 'base', rank: 1, keywords: ['진동'] },
    { no: 2, name: '남부 시 협회 5과 히스클리프', code: 'shi', rank: 2, keywords: ['호흡'] },
    { no: 3, name: 'R사 제 4무리 토끼팀 히스클리프', code: 'rabbit', rank: 3, keywords: ['출혈', '충전', '파열'] },
    { no: 4, name: 'N사 작은 망치 히스클리프', code: 'ncorp', rank: 2, keywords: ['출혈'] },
    { no: 5, name: '로보토미 E.G.O:: 여우비 히스클리프', code: 'sunshower', rank: 3, keywords: ['파열', '침잠'] },
    { no: 6, name: '남부 세븐 협회 4과 히스클리프', code: 'seven', rank: 2, keywords: ['파열'] },
    { no: 7, name: '피쿼드호 작살잡이 히스클리프', code: 'pequod', rank: 3, keywords: ['출혈', '호흡'] },
    { no: 8, name: '남부 외우피 협회 3과 히스클리프', code: 'oafi', rank: 3, keywords: ['진동'] },
    { no: 9, name: '멀티크랙 사무소 해결사 히스클리프', code: 'multicrack', rank: 2, keywords: ['충전'] },
    { no: 10, name: '와일드헌트 히스클리프', code: 'wildhunt', rank: 3, keywords: ['침잠'] },
    { no: 11, name: '마침표 사무소 해결사 히스클리프', code: 'fullstop', rank: 3, keywords: ['호흡'] },
    { no: 12, name: '흑운회 와카슈 히스클리프', code: 'kurokumo', rank: 3, keywords: ['출혈'] },
    { no: 13, name: 'W사 4등급 정리 요원 - CCA 히스클리프', code: 'w', rank: 3, keywords: ['충전', '파열'] },
    { no: 14, name: '흑수 - 유 필두 히스클리프', code: 'kuro', rank: 3, keywords: ['화상', '파열'] },
    { no: 15, name: '중지 작은 형님 히스클리프', code: 'middle', rank: 3, keywords: ['출혈', '화상'] },
    { no: 16, name: '거미집 엄지 제자 히스클리프', code: 'thumb', rank: 3, keywords: ['화상', '진동'] }
  ],
  [ // 7: 이스마엘
    { no: 1, name: 'LCB 수감자 이스마엘', code: 'base', rank: 1, keywords: ['진동'] },
    { no: 2, name: 'R사 제 4무리 순록팀 이스마엘', code: 'reindeer', rank: 3, keywords: ['충전', '침잠'] },
    { no: 3, name: '남부 시 협회 5과 이스마엘', code: 'shi', rank: 2, keywords: ['호흡'] },
    { no: 4, name: 'LCCB 대리 이스마엘', code: 'lccb', rank: 2, keywords: ['파열', '진동'] },
    { no: 5, name: '로보토미 E.G.O:: 출렁임 이스마엘', code: 'sloshing', rank: 2, keywords: ['파열', '진동'] },
    { no: 6, name: '남부 리우 협회 4과 이스마엘', code: 'liu', rank: 3, keywords: ['화상'] },
    { no: 7, name: '어금니 보트 센터 해결사 이스마엘', code: 'molar', rank: 3, keywords: ['침잠', '진동'] },
    { no: 8, name: '피쿼드호 선장 이스마엘', code: 'captain', rank: 3, keywords: ['출혈', '화상', '호흡'] },
    { no: 9, name: '에드가 가문 버틀러 이스마엘', code: 'butler', rank: 2, keywords: ['호흡', '침잠'] },
    { no: 10, name: '서부 츠바이 협회 3과 이스마엘', code: 'zwei', rank: 3, keywords: ['진동'] },
    { no: 11, name: '흑운회 부조장 이스마엘', code: 'kurokumo', rank: 3, keywords: ['출혈'] },
    { no: 12, name: '가주 후보 이스마엘', code: 'heir', rank: 3, keywords: ['호흡', '파열'] },
    { no: 13, name: '정사무소 대표 이스마엘', code: 'office', rank: 3, keywords: ['침잠', '진동'] },
    { no: 14, name: '거미집 중지 제자 이스마엘', code: 'middle', rank: 3, keywords: ['화상', '출혈'] },
    { no: 15, name: 'LCD 현장추리팀 이스마엘', code: 'lcd', rank: 3, keywords: ['출혈', '호흡'] }
  ],
  
  [ // 8: 로쟈
    { no: 1, name: 'LCB 수감자 로쟈', code: 'base', rank: 1, keywords: ['출혈'] },
    { no: 2, name: '흑운회 와카슈 로쟈', code: 'kurokumo', rank: 3, keywords: ['출혈', '호흡'] },
    { no: 3, name: 'LCCB 대리 로쟈', code: 'lccb', rank: 2, keywords: [] },
    { no: 4, name: 'N사 중간 망치 로쟈', code: 'ncorp', rank: 2, keywords: ['출혈'] },
    { no: 5, name: '장미스패너 공방 대표 로쟈', code: 'rosespaner', rank: 3, keywords: ['충전', '진동'] },
    { no: 6, name: '남부 츠바이 협회 5과 로쟈', code: 'zwei', rank: 2, keywords: ['호흡'] },
    { no: 7, name: '남부 디에치 협회 4과 로쟈', code: 'dieci', rank: 3, keywords: ['침잠'] },
    { no: 8, name: '남부 리우 협회 4과 부장 로쟈', code: 'liu', rank: 3, keywords: ['화상'] },
    { no: 9, name: 'T사 2등급 징수직 직원 로쟈', code: 'tcorp', rank: 2, keywords: ['진동'] },
    { no: 10, name: '북부 제뱌찌 협회 3과 로쟈', code: 'devyat', rank: 3, keywords: ['파열'] },
    { no: 11, name: '라만차랜드 공주 로쟈', code: 'lamancha', rank: 3, keywords: ['출혈', '파열'] },
    { no: 12, name: '흑수 - 사 로쟈', code: 'kuro', rank: 3, keywords: ['파열', '호흡'] },
    { no: 13, name: '로보토미 E.G.O::눈물로 벼려낸 검 로쟈', code: 'efflorescence', rank: 3, keywords: ['침잠', '충전'] },
    { no: 14, name: 'R사 제 4무리 순록팀 로쟈', code: 'reindeer', rank: 3, keywords: ['침잠', '충전'] },
    { no: 15, name: '약지 야수파 도슨트 로쟈', code: 'ring', rank: 3, keywords: ['침잠', '출혈'] },
    { no: 16, name: '거미집 엄지 아비 로쟈', code: 'thumb', rank: 3, keywords: ['화상', '진동'] }
  ],
  [ // 9: 싱클레어
    { no: 1, name: 'LCB 수감자 싱클레어', code: 'base', rank: 1, keywords: ['파열'] },
    { no: 2, name: '검계 살수 싱클레어', code: 'blade', rank: 3, keywords: ['출혈', '호흡']  },
    { no: 3, name: '남부 츠바이 협회 6과 싱클레어', code: 'zwei_6', rank: 2, keywords: ['진동']  },
    { no: 4, name: '마리아치 보스 싱클레어', code: 'mariachi', rank: 2, keywords: ['호흡', '침잠']  },
    { no: 5, name: '쥐어들 자 싱클레어', code: 'ncorp', rank: 3, keywords: ['출혈', '화상']  },
    { no: 6, name: '로보토미 E.G.O:: 홍적 싱클레어', code: 'talisman', rank: 2, keywords: ['파열']  },
    { no: 7, name: '어금니 보트 센터 해결사 싱클레어', code: 'molar', rank: 2, keywords: ['진동']  },
    { no: 8, name: '남부 섕크 협회 4과 부장 싱클레어', code: 'cinq', rank: 3, keywords: ['호흡']  },
    { no: 9, name: '새벽 사무소 해결사 싱클레어', code: 'philip', rank: 3, keywords: ['화상']  },
    { no: 10, name: '서부 츠바이 협회 3과 싱클레어', code: 'zwei_3', rank: 2, keywords: ['진동']  },
    { no: 11, name: '북부 제뱌찌 협회 3과 싱클레어', code: 'devyat', rank: 3, keywords: ['파열']  },
    { no: 12, name: '중지 작은 아우 싱클레어', code: 'middle', rank: 3, keywords: ['출혈'] },
    { no: 13, name: '동부 엄지 솔다토 II 싱클레어', code: 'thumb', rank: 3, keywords: ['화상', '진동'] },
    { no: 14, name: '흑수 - 유 싱클레어', code: 'kuro', rank: 3, keywords: ['화상', '파열'] },
    { no: 15, name: '거미집 소지 제자 싱클레어', code: 'finger', rank: 3, keywords: ['출혈', '호흡'] }
  ],
  [ // 10: 오티스
    { no: 1, name: 'LCB 수감자 오티스', code: 'base', rank: 1, keywords: ['파열'] },
    { no: 2, name: '검계 살수 오티스', code: 'blade', rank: 2, keywords: ['호흡'] },
    { no: 3, name: 'G사 부장 오티스', code: 'gcorp', rank: 2, keywords: ['침잠'] },
    { no: 4, name: '남부 세븐 협회 6과 부장 오티스', code: 'seven', rank: 3, keywords: ['파열'] },
    { no: 5, name: '어금니 사무소 해결사 오티스', code: 'molar', rank: 3, keywords: ['진동'] },
    { no: 6, name: '남부 섕크 협회 4과 오티스', code: 'cinq', rank: 2, keywords: ['호흡'] },
    { no: 7, name: '로보토미 E.G.O:: 마탄 오티스', code: 'magicbullet', rank: 3, keywords: ['화상'] },
    { no: 8, name: '워더링하이츠 치프 버틀러 오티스', code: 'butler', rank: 3, keywords: ['침잠'] },
    { no: 9, name: '약지 점묘파 스튜던트 오티스', code: 'ring', rank: 2, keywords: ['출혈'] },
    { no: 10, name: 'W사 3등급 정리 요원 팀장 오티스', code: 'w', rank: 3, keywords: ['충전', '파열'] },
    { no: 11, name: '라만차랜드 이발사 오티스', code: 'barber', rank: 3, keywords: ['출혈'] },
    { no: 12, name: '흑수 - 묘 오티스', code: 'kuro', rank: 3, keywords: ['파열'] },
    { no: 13, name: 'T사 3등급 강력징수직 직원 오티스', code: 'tcorp', rank: 3, keywords: ['진동'] },
    { no: 14, name: 'LCA 우제트 선봉 3팀 팀장 오티스', code: 'udjat', rank: 3, keywords: ['침잠', '진동'] },
    { no: 15, name: '거미집 중지 아비 오티스', code: 'middle', rank: 3, keywords: ['화상', '출혈'] }
  ],
  [ // 11: 그레고르
    { no: 1, name: 'LCB 수감자 그레고르', code: 'base', rank: 1, keywords: ['파열'] },
    { no: 2, name: '남부 리우 협회 6과 그레고르', code: 'liu', rank: 2, keywords: ['화상'] },
    { no: 3, name: 'G사 일등대리 그레고르', code: 'gcorp', rank: 3, keywords: ['파열'] },
    { no: 4, name: '료. 고. 파. 조수 그레고르', code: 'rb', rank: 2, keywords: ['출혈'] },
    { no: 5, name: '장미스패너 공방 해결사 그레고르', code: 'rosespaner', rank: 2, keywords: ['충전', '파열', '진동'] },
    { no: 6, name: '남부 츠바이 협회 4과 그레고르', code: 'zwei', rank: 3, keywords: [] },
    { no: 7, name: '쌍갈고리 해적단 부선장 그레고르', code: 'hook', rank: 3, keywords: ['출혈', '호흡'] },
    { no: 8, name: '흑운회 부조장 그레고르', code: 'kurokumo', rank: 2, keywords: ['출혈'] },
    { no: 9, name: '에드가 가문 승계자 그레고르', code: 'heir', rank: 3, keywords: ['침잠'] },
    { no: 10, name: '라만차랜드 신부 그레고르', code: 'lamancha', rank: 3, keywords: ['출혈', '파열'] },
    { no: 11, name: '불주먹 사무소 생존자 그레고르', code: 'firefist', rank: 3, keywords: ['화상'] },
    { no: 12, name: '흑수 - 사 그레고르', code: 'kuro', rank: 3, keywords: ['호흡', '파열'] },
    { no: 13, name: '밤의 송곳 카피타노 그레고르', code: 'stiletto', rank: 3, keywords: ['출혈', '진동'] },
    { no: 14, name: '로보토미 E.G.O::램프 그레고르', code: 'lamp', rank: 3, keywords: ['침잠', '화상'] },
    { no: 15, name: 'LCE E.G.O::AEDD 그레고르', code: 'aedd', rank: 3, keywords: ['충전', '파열'] },
    { no: 16, name: '새벽 사무소 대표 그레고르', code: 'philip', rank: 3, keywords: ['화상', '진동'] }
  ]
];

const sinnerEgoList = [
  [ // 이상
    [ // ZAYIN
      { no: 1, name: '오감도' },
      { no: 6, name: '지난 날' }
    ],
    [ // TETH
      { no: 2, name: '4번째 성냥불' },
      { no: 3, name: '소망석' }
    ],
    [ // HE
      { no: 4, name: '차원찢개' },
      { no: 7, name: '흉탄' },
      { no: 9, name: '엄숙한 애도 이상' }
    ],
    [ // WAW
      { no: 5, name: '여우비' },
      { no: 8, name: '삼천대세계 [三千大世界]' }
    ],
    [ // ALEPH
    ]
  ],
  [ // 파우스트
    [ // ZAYIN
      { no: 1, name: '표상 방출기' }
    ],
    [ // TETH
      { no: 3, name: '저주못' },
      { no: 5, name: '9장 2절' },
      { no: 7, name: '올가미' }
    ],
    [ // HE
      { no: 2, name: '물주머니' },
      { no: 4, name: '전봇대' },
      { no: 8, name: '흉통' },
      { no: 9, name: '명령 : 용해' },
      { no: 10, name: '홍염살' }
    ],
    [ // WAW
      { no: 6, name: '영속' }
    ],
    [ // ALEPH
    ]
  ],
  [ // 돈키호테
    [ // ZAYIN
      { no: 1, name: '라 샹그레 데 산쵸' },
      { no: 10, name: '난 가위를 낼게, 너는?' }
    ],
    [ // TETH
      { no: 4, name: '평생 스튜' },
      { no: 5, name: '소망석' },
      { no: 6, name: '전기울음' }
    ],
    [ // HE
      { no: 2, name: '물주머니' },
      { no: 3, name: '전봇대' },
      { no: 8, name: '홍적' }
    ],
    [ // WAW
      { no: 7, name: '갈망 - 미르칼라' },
      { no: 9, name: '사랑과 증오의 이름으로' }
    ],
    [ // ALEPH
    ]
  ],
  [ // 료슈
    [ // ZAYIN
      { no: 1, name: '삼라염상' },
      { no: 5, name: '소다' }
    ],
    [ // TETH
      { no: 3, name: '적안' },
      { no: 6, name: '맹목' }
    ],
    [ // HE
      { no: 2, name: '4번째 성냥불' },
      { no: 4, name: '적안(開)' },
      { no: 8, name: '흉통' }
    ],
    [ // WAW
      { no: 7, name: '경멸, 경외' },
      { no: 9, name: '삼천대세계 [三千大世界]' }
    ],
    [ // ALEPH
    ]
  ],
  [ // 뫼르소
    [ // ZAYIN
      { no: 1, name: '타인의 사슬' }
    ],
    [ // TETH
      { no: 2, name: '나사빠진 일격' },
      { no: 5, name: '후회' },
      { no: 6, name: '전기울음' }
    ],
    [ // HE
      { no: 3, name: '집행' },
      { no: 4, name: '카포테' },
      { no: 9, name: '착영휘도' }
    ],
    [ // WAW
      { no: 7, name: '갈망 - 미르칼라' },
      { no: 8, name: '분쇄될 과거' }
    ],
    [ // ALEPH
    ]
  ],
  [ // 홍루
    [ // ZAYIN
      { no: 1, name: '허환경' }
    ],
    [ // TETH
      { no: 2, name: '분홍욕망' },
      { no: 4, name: '소다' },
      { no: 6, name: '낮은울음' },
      { no: 7, name: '올가미' }
    ],
    [ // HE
      { no: 3, name: '차원찢개' },
      { no: 5, name: '들끓는 부식' },
      { no: 9, name: '영작오 [宁作吾]' }
    ],
    [ // WAW
      { no: 8, name: '오혈읍루 [汚血泣淚]' }
    ],
    [ // ALEPH
    ]
  ],
  [ // 히스클리프
    [ // ZAYIN
      { no: 1, name: '시체자루' },
      { no: 5, name: '홀리데이' }
    ],
    [ // TETH
      { no: 3, name: 'AEDD' },
      { no: 7, name: '흉탄' },
      { no: 9, name: '입주 신고' }
    ],
    [ // HE
      { no: 2, name: '전봇대' },
      { no: 4, name: '공즉시색' },
      { no: 8, name: '쏠린 관성' }
    ],
    [ // WAW
      { no: 6, name: '구속' }
    ],
    [ // ALEPH
    ]
  ],
  [ // 이스마엘
    [ // ZAYIN
      { no: 1, name: '작살박이' },
      { no: 9, name: '즉저살' }
    ],
    [ // TETH
      { no: 2, name: '분홍욕망' },
      { no: 4, name: '카포테' },
      { no: 7, name: '지난 날' }
    ],
    [ // HE
      { no: 3, name: '홍염살' },
      { no: 6, name: '날갯짓' },
      { no: 8, name: '크리스마스 악몽' },
      { no: 9, name: '파도의 만가' }
    ],
    [ // WAW
      { no: 5, name: '맹목' }
    ],
    [ // ALEPH
    ]
  ],
  [ // 로쟈
    [ // ZAYIN
      { no: 1, name: '던져지는 것' },
      { no: 9, name: '노을 속으로' }
    ],
    [ // TETH
      { no: 3, name: '얼음다리' },
      { no: 4, name: '들끓는 부식' }
    ],
    [ // HE
      { no: 2, name: '4번째 성냥불' },
      { no: 5, name: '집행' },
      { no: 7, name: '저주못' }
    ],
    [ // WAW
      { no: 6, name: '핏빛욕망' },
      { no: 8, name: '지정 재판' }
    ],
    [ // ALEPH
    ]
  ],
  [ // 싱클레어
    [ // ZAYIN
      { no: 1, name: '지식나무의 가지' },
      { no: 6, name: '낮은울음' }
    ],
    [ // TETH
      { no: 2, name: '다가올날' },
      { no: 3, name: '평생 스튜' },
      { no: 7, name: '저주못' }
    ],
    [ // HE
      { no: 4, name: '초롱' },
      { no: 5, name: '9장 2절' },
      { no: 9, name: '하모니' }
    ],
    [ // WAW
      { no: 8, name: '오혈읍루 [汚血泣淚]' }
    ],
    [ // ALEPH
    ]
  ],
  [ // 오티스
    [ // ZAYIN
      { no: 1, name: '토 파토스 마토스' },
      { no: 9, name: '난 가위를 낼게, 너는?' }
    ],
    [ // TETH
      { no: 3, name: '공즉시색' },
      { no: 4, name: '여우비' }
    ],
    [ // HE
      { no: 2, name: '검은줄기' },
      { no: 5, name: '홀리데이' },
      { no: 7, name: '차원찢개' },
      { no: 8, name: '마탄' }
    ],
    [ // WAW
      { no: 6, name: '구속' }
    ],
    [ // ALEPH
    ]
  ],
  [ // 그레고르
    [ // ZAYIN
      { no: 1, name: '어느날 갑자기' },
      { no: 2, name: '눈속임' }
    ],
    [ // TETH
      { no: 3, name: '초롱' },
      { no: 6, name: '지난 날' }
    ],
    [ // HE
      { no: 4, name: 'AEDD' },
      { no: 7, name: '엄숙한 애도' },
      { no: 8, name: '크리스마스 악몽' }
    ],
    [ // WAW
      { no: 5, name: '가시 화원' },
      { no: 9, name: '눈부시지 않은 영광' }
    ],
    [ // ALEPH
    ]
  ]
];
