# PRACTICE PROJECT

## Patterns

### Layouts

React를 사용하면, 재사용 되는 컴포넌트를 분해하여 중복된든 코드를 줄이고 더 빠르게 개발할 수 있다.
앞서 만든, 커스텀 컴포넌트인 `_app.tsx`는 실제 프로젝트에서는 굉장히 많은 용도로 사용되기 때문에 코드를 간결하게 유지하는 것이 좋다.
그래서 `Layout` 컴포넌트를 만들어서 여러 페이지의 일종의 프레임을 만들어주자.

### Head

NextJS에서는 React Helmet과 같이 탭의 제목을 변경할 수 있는 컴포넌트를 제공한다.

## Redirect & Rewrite

서버로부터 이미지를 받아오는데, 아무런 조치를 취하지 않으면 요청 URL에 API key가 그대로 노출된다. 사용자가 API key를 악용할 수도 있기 때문에, Redirect나 Rewrite 방법을 사용하여 숨겨주는 작업이 필요하다.
`next.config.js` 파일에서 설정 가능하다.

### Redirect

어떠한 요청이 들어오면, 다른 URL로 라우팅 해주는 방식이다. Redirects은 source, destination 및 permanent 속성이 있는 객체를 포함하는 배열을 반환하는 비동기 함수이다. 각 속성에 대한 설명은 다음과 같다.

    1. source: 들어오는 request 경로 패턴 (request 경로)
    2. destination: 라우팅하려는 경로 (redirect할 경로)
    3. permanent: true인 경우 클라이언트와 search 엔진에 redirect를 영구적으로 cache하도록 지시하는 308 status code를 사용하고, false인 경우 일시적이고 cache되지 않은 307 status code를 사용한다.

### Rewrite

Rewrites를 사용하면 들어오는 요청 URL를 다른 destination 경로에 매핑할 수 있다.
Rewrites은 URL 프록시 역할 (중개기)을 하고 destination 경로를 마스킹하여 사용자가 사이트에서 리다이렉션을 하지 않은 것처럼 보이게 한다. 반대로 Redirects은 새 페이지로 다시 라우팅하고 URL 변경 사항을 표시한다.
