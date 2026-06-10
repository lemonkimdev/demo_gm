# ANN [AI+NFT+NFC] Passport Demo

Next.js App Router 기반의 모바일 우선 NFC 데모 웹앱입니다. NFC 스티커에 저장된 URL로 접속하면 안경 구매 후속 경험, NFT Claim 데모, 3개월 뒤 AI 추천 흐름을 시연할 수 있습니다.

## 설치 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000/nfc/gm-001`을 엽니다.

## 환경 변수

`.env.local` 예시:

```bash
OPENAI_API_KEY=sk-proj-your-key
OPENAI_TEXT_MODEL=gpt-5.5
OPENAI_IMAGE_MODEL=gpt-image-2
```

`OPENAI_API_KEY`는 서버 라우트에서만 사용합니다. 브라우저에 노출되는 `NEXT_PUBLIC_` 환경 변수는 사용하지 않습니다.

## 주요 경로

- `/nfc/gm-001`: Eyewear NFC Demo
- `/nfc/gm-002`: Beauty AI Concierge Demo
- `/nfc/gm-003`
- `/setup`
- `/api/recommend`
- `/api/generate-tryon`

## Vercel 배포 방법

1. GitHub 저장소를 Vercel에 연결합니다.
2. Project Settings > Environment Variables에 `OPENAI_API_KEY`를 추가합니다.
3. 필요한 경우 `OPENAI_TEXT_MODEL`, `OPENAI_IMAGE_MODEL`도 추가합니다.
4. 배포 후 `/nfc/gm-001` 경로를 NFC Tools에 기록합니다.

## NFC Tools URL 예시

```text
http://localhost:3000/nfc/gm-001
http://localhost:3000/nfc/gm-002
https://your-vercel-app.vercel.app/nfc/gm-001
https://your-vercel-app.vercel.app/nfc/gm-002
https://your-vercel-app.vercel.app/nfc/gm-003
```

NFC Tools 앱에서 `Write > Add Record > URL`을 선택한 뒤 위 URL 중 하나를 입력하고 NTAG215 스티커에 Write합니다.

## Beauty AI Concierge Demo

`/nfc/gm-002`는 NFC 스티커가 붙은 뷰티 제품을 태그했을 때 열리는 mock 기반 면접 데모입니다. 실제 카메라 촬영, 실제 결제, 실제 토큰 발행은 구현하지 않았고, 화장대 분석과 구매이력 추천은 안정적인 시연을 위해 정적 데모 데이터로 표시합니다.

구매이력 데이터는 mock이며, 추천 카드에는 실제 제품명 예시를 사용합니다. 제품 사진은 실제 TAMBURINS 로고나 상표 이미지를 쓰지 않고, 면접 데모용으로 생성한 로고 없는 제품 컷을 사용합니다. 실제 결제 링크도 연결하지 않습니다.

향후 확장 구조:

```text
실제 카메라 업로드
-> OpenAI Vision API 분석
-> 구매이력/재고/소진 주기 결합
-> 결제 API 연동
-> 정기구독 결제
-> 멤버십 토큰/NFT 발급
```

## 이미지 placeholder

추천 상품은 `lib/demo-data.ts`의 로컬 배열로 관리합니다. `/public/demo-products/`에 이미지가 없으면 UI가 CSS gradient placeholder를 보여줍니다.

## NFT 민팅 확장 구조

현재 구현은 실제 NFT 민팅을 하지 않고 데모 모달만 표시합니다. 실서비스 확장 흐름은 다음 구조를 권장합니다.

```text
NFC 접속
-> 제품 ID 확인
-> 지갑 연결
-> NFT Claim 버튼
-> 스마트컨트랙트 mint
-> NFT 보증서 발급
-> 제품 여권 페이지에 tokenId 표시
```

코드에서는 NFT 로직을 클라이언트 버튼에 직접 붙이기보다 서버 검증, 지갑 연결 상태, 제품 소유권 확인, 스마트컨트랙트 트랜잭션 상태를 분리하는 방식이 좋습니다.

## 실제 결제 확장 구조

현재 결제 버튼은 `https://example.com/checkout?product={id}`로 이동합니다. 실제 결제를 붙일 때는 다음 흐름으로 확장합니다.

```text
추천 상품 선택
-> 서버에서 checkout session 생성
-> 결제 provider로 리다이렉트
-> webhook으로 결제 성공 검증
-> 제품 여권에 구매 이력 반영
```

결제 금액과 상품 ID는 브라우저 입력을 신뢰하지 말고 서버의 상품 데이터 기준으로 검증해야 합니다.
