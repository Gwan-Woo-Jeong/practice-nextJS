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

## Server Side Rendering

### getServerSideProps function

`getServerSideProps`는 서버 측에서 HTML 렌더링을 해주는 함수다. 해당 함수를 `exports` 하면 함수에서 리턴한 데이터를 사용하여 페이지를 pre-render한다. 함수는 서버 측에서만 실행되며, 브라우저에서 실행하지 않는다.

```js
export async function getServerSideProps {
    const { result } = await ...;
    return { props : { result }};
}
```

여기에서 리턴한 데이터를 컴포넌트의 `props`로 전달받아 사용 가능하다.

## Dynamic Routes

NextJS에서 굉장히 직관적인 방법으로 Dynamic Route를 구현할 수 있다.

### Routes

라우트는 폴더 구조를 따른다. `pages` 폴더의 하위 폴더를 만들어서 라우트를 중첩해서 만들 수 있다. 예를 들어, `/movies`라는 라우트를 만드려면, `/page/movies` 폴더를 만든 후에 폴더 내부에 JS파일을 만들면 된다.

### Passing Queries

페이지에 파라미터를 넘겨주기 위해선 특정 파일명 규칙을 따르면 된다. `[params].js`과 같이, 대괄호 안에 넘겨줄 매개변수의 이름을 넘어주면 해당 객체로 전달할 수 있다. 파일 내에서, `useRouter` hook으로 파라미터를 받아올 수 있다.

```js
const router = useRouter();
const { id } = router.query;
```

만약, 매개변수를 넘겨주지 않고 그냥 라우트를 만들고 싶다면 해당 폴더에 `index.js` 파일을 만들면 된다.

정리하자면 다음과 같다.

```
/movies/:id로 파라미터 넘겨주기
=> /movies/[id].js

/movies 라우트 만들기
=> /movies/index.js
```

## Movie Detail

이제 위의 내용을 바탕으로, 홈페이지에서 영화를 클릭했을 때 해당 영화에 대한 상세페이지로 이동 시켜보자.

### useRouter push

`Link` 컴포넌트를 사용하는 방법 이외에도, `useRouter` hook의 push를 사용하여 페이지 간 이동이 가능하다. 클릭이 아닌 유저가 폼을 제출했을 때 네비게이팅 하는 방법으로 적합하다.

```ts
const router = useRouter();
const onClick = (id: string) => {
  router.push(`/movies/${id}`);
};
```

### API rewrite

API 키를 숨기기 위해서, `next.config.js`파일에서 `rewrite` 비동기 함수를 사용하자. 앞서 설명한 것과 마찬가지로, `source`에는 요청 URL을 적어주고 `destination`에는 실제 서버의 API 주소를 적어준다. 여기서 중요한 점은 만약 파라미터를 사용한다면, `source`와 `destination`에 동일한 변수명을 사용해야한다.

```js
{
    source : "api/movies/:id",
    destination : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
}
```

### Masking URL

홈페이지에서 상세페이지로 이동하는데, 홈페이지에서 존재하는 데이터가 상세페이지에도 쓰일 수가 있다. 이 경우에 라우트로 넘겨주면, 동작이 더 빠르고 네트워크 비용을 줄일 수 있다. 하지만, URL에 매개변수가 모두 명시가 되기 때문에 보기 안좋을 수 있다. 이 때, 라우팅 함수의 `as` 옵션을 사용해주면 특정 파라미터를 숨기는 것이 가능하다.

다음과 같이 제목을 넘겨주면서 URL에는 제목이 표시되지 않게 할 수 있다.

```js
const onClick = (id, title) => {
  router.push(
    {
      pathname: `/movies/${id}`,
      query: {
        title,
      },
    },
    `/movies/${id}`
  );
};
```

`Link` 컴포넌트도 동일하게 사용할 수 있다.

```js
<Link
  href={{
    pathname: `/movies/${movie.id}`,
    query: {
      title: movie.original_title,
    },
  }}
  as={`/movies/${movie.id}`}
>
  <a>{movie.original_title}</a>
</Link>
```

## Catch All URL

Catch All URL를 사용하면 말 그대로 URL에 있는 모든 파라미터들을 가져올 수 있다.

현재는 홈페이지에서 상세페이지로 넘어갈 때, 파라미터로 데이터를 넘겨주고 URL에 타이틀 쿼리가 보이지 않도록 설정해주었다.

덕분에, 서버로부터 굳이 불필요한 요청을 하지 않아도 되는 장점이 있었고, 마스킹 덕분에 URL도 깔끔하게 보였다.

하지만, 아쉬운 점은 홈페이지를 통해서 상세페이지로 넘어가야만 상세페이지에서 데이터를 받아 올바르게 페이지를 렌더링할 수 있다

Catch All을 사용하여, URL로 타이틀을 넘겨주어 URL 자체로 상세페이지에 접속 가능하도록 만들어보자.

### spread syntax

spread syntax `(...)`을 사용하면 여러 파라미터를 배열로서 받아올 수 있다. 기존에 `[id].js` 형태로 id를 받아왔다면, `[...params].js`를 사용하여 여러 매개변수를 배열로 받아오자. URL의 슬래쉬 `(/)`마다 각 배열의 요소로 매개 변수로 불러오는 것을 확인할 수 있다.

### query 대신 route 사용하기

타이틀을 URL에 삽입할 것이기 때문에, query를 사용하고 또 마스킹을 해줄 필요가 없어졌다. route에 그대로 타이틀을 그대로 push 해주자.

```ts
const onClick = (id: number, title: string) => {
  router.push(`/movies/${title}/${id}`);
};
```

`Link` 컴포넌트에도 마찬가지로 똑같은 작업을 해주자.

```ts
<Link href={`/movies/${movie.original_title}/${movie.id}`}>
  <a>{movie.original_title}</a>
</Link>
```

이제 상세페이지 컴포넌트에서, `useRouter` hook으로 `params`에 접근하여 데이터를 사용할 수 있다.

```js
const router = useRouter();
const [title, id] = router.query.params || []; // URL로 접근 했을 때, params는 배열이 아니기 때문에 에러를 발생시킨다. 따라서, params에 값이 없을 때는 빈 배열로 설정해주자.
```

### Server Side Rendering

컴포넌트 내에서 파라미터를 전달하고 라우팅을 하는 작업은 클라이언트 사이드 렌더링으로 작업이 이루어진다. HTML의 소스코드를 살펴보면, 상세페이지의 내용이 비어있는 것을 확인할 수 있다. 이런 경우, 검색 엔진이 해당 내용을 찾을 수 없기 때문에 SEO (검색 최적화)에 좋지 않다. 마찬가지로, `getServerSideProps`로 SSR을 구현할 수 있다.

```js
// [...parms].tsx

export function getServerSideProps({ params: { params } }) {
  return {
    props: { params },
  };
}
```

`getServerSideProps`에서 `params` 객체 안에 `params`에 접근할 수 있다. 그대로 `params`를 리턴해주어 컴포넌트의 `props`로 사용할 수 있도록 해주자.

```ts
// [...params].tsx

export default function Detail({ params }) {
  const [title, id] = params || [];
  ...
}
```

이전에 사용한 SSR과 차이를 보자면, 이전에는 서버사이드에서 외부 서버의 API를 호출한 다음 그 데이터를 넘겨주었다.

```js
export async function getServerSideProps {
    const { result } = await ...;
    return { props : { result }};
}
```

이번에는 외부 서버에 요청을 하지 않고, 서버 사이드에서 URL의 파라미터만 넘겨주어 검색 최적화만 해주었다. 이로 인한 장점은 이미 받아온 데이터를 내부에서 계속 사용하기 때문에, 외부 서버의 네트워크 속도에 영향을 덜 받는다는 점 그리고 검색 최적화에 더 도움이 된다고 할 수 있겠다.

## 404 Page

pages 폴더에 `404.js` 파일을 만들면, 해당 컴포넌트가 404 에러를 위한 페이지로 렌더링된다.
