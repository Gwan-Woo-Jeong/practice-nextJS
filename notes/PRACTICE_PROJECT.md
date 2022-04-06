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
