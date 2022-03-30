# FRAME WORK OVERVIEW

## Library vs Framework

어플리케이션의 Flow를 누가 쥐고 있는가 </br>
프레임워크 : 전체적인 흐름을 스스로 쥐고 있다. 사용자는 이 안에서 필요한 코드를 넣는다. </br>
가져다 쓰는 것이 아닌 그 곳에 들어가서 사용하는 관점. </br>
라이브러리 : 사용자가 흐름을 만들며, 가져다 쓰는 방식. </br>

프레임워크 > 라이브러리 </br>
프레임워크는 우리의 코드를 호출한다. </br>
우리의 코드는 라이브러리를 호출한다. </br>

## Pages

### index 파일

/index라는 페이지는 존재하지 않는다.
해당 파일의 경우, 홈으로 연결된다.

### JSX

React를 import하지 않아도 JSX를 사용할 수 있다. 하지만, React 메서드를 사용하기 위해서는 import 해야한다.

## Static Pre Rendering

### SSR (Server Side Rendering)

React는 CSR(Client Side Rendering)을 한다. 즉, 브라우저가 UI를 구성하는 모든 일들을 수행한다. React 앱의 HTML 소스코드는 루트 div 요소 하나밖에 없다. 이외는 모두 JS 코드로, JS 파일을 받기 전까지 사용자는 빈 화면을 보고만 있어야하는 불편함을 겪어야 한다. NextJS는 SSR을 하기 때문에, 실제 요소가 HTML에 담긴다.

### Hydration

JS와 React가 로딩되지 않은 상태이더라도, NextJS는 React의 초기 상태(state)를 바탕으로 HTML 파일을 만들어 컨텐츠를 볼 수 있게 해준다. 그 후 React가 로딩이 되었을 때, 존재하는 요소와 연결되어 일반적인 React 앱처럼 작동하게 한다.

### SEO (검색 최적화)

SSR은 HTML 문서가 작성된 상태로 서버로부터 받기 때문에, 컨텐츠를 검색하는데 CSR보다 훨씬 유리하다.

## Routing

NextJS에서 네비게이션을 위해 anchor 태그를 사용하면 안된다. 앱이 새로고침 되기 때문에 속도가 굉장히 느리다. </br>
NextJS는 페이지를 이동할 때 사용하는 Link 컴포넌트를 제공한다. Link 컴포넌트에 이동할 route를 명시해준다. 컴포넌트 자체가 a태그를 렌더링하지만 className이나 스타일을 주기 위해선 a태그를 사용해야한다.

```js
<Link href="/">
  <a className="home">Home</a>
</Link>
```

</br>
추가로, useRouter hook를 사용하여 location에 대한 정보를 불러올 수 있다.

## CSS Modules

`.modules.css` 패턴으로 CSS 파일 생성한 후, 해당 파일을 자바스크립트 객체로 `import`한다.

```js
import styles from "./NavBar.module.css";
```

CSS 모듈 패턴을 사용하기 때문에,
classname을 문자가 아닌 자바스크립트 객체에서 프로퍼티 형식으로 적어준다.

```js
<a style={styles.nav} className="home">
  Home
</a>
```

그러면 NextJS는 빌드 시, className을 무작위의 문자로 변경해주기 때문에 클래스명이 충돌을 방지한다.

### 조건부 스타일 적용하기

useRouter hook과 CSS 모듈을 사용하여 조건부로 스타일을 적용해보자.

```js
<a className={router.pathname === "/about" && styles.active}>About</a>
```

이런식으로 location에 따라 클래스명을 변경하여 다른 스타일을 줄 수 있다.

### 또 다른 스타일 추가하기

위의 조건부 클래스명과 함께 또 다른 일반적인 클래스명을 추가해보자.
백틱을 사용하여 두 개의 클래스명을 적어주면 된다.

```js
<a
  className={`${styles.link} ${router.pathname === "/about" && styles.active}`}
>
  About
</a>
```

또 다른 방법으로, 두 클래스명을 배열에 할당한 후 `join` 메소드를 사용하여 문자열로 변환시키는 방법이 있다.

```js
<a
  className={[styles.link, router.pathname === "/" && styles.active].join(" ")}
>
  Home
</a>
```

## Styles JSX

컴포넌트 내에서 style HTML 태그를 사용하여 스타일링이 가능하다. [공식 문서](https://nextjs.org/docs/basic-features/built-in-css-support#css-in-js)에 따르면, 이 방식을 `styled-jsx`라고 하는데 개별 컴포넌트에 대한 스타일링을 제공한다.

```js
<style jsx>{`
  nav {
    background-color: tomato;
  }
  ...
`}</style>
```

CSS가 개별 컴포넌트에 적용되기 때문에, 클래스명이 다른 컴포넌트와 중복되어도 무방하다. 이 방법은 편리하지만, 서버 사이드 렌더링을 지원하지 않는다.

템플릿 리터럴로 스트링을 삽입하는 방식이기 때문에, 조건부 스타일링과 prop 사용이 직관적이다.

```js
<Link href="/about">
        <a className={router.pathname === "/about" && "active"}>About</a>
      </Link>
      <style jsx>{`
      ...
        a {
          text-decoration: none;
        }
        .active {
          color: yellow;
          background-color: ${props.color};
        }
      `}</style>
```

## Custom App

NextJS의 App 컴포넌트는 모든 컴포넌트의 기본 템플릿이라고 할 수 있다. 파일명은 꼭 `_app.js`로 만들어야 한다.

다음과 같이, App 컴포넌트로 모든 컴포넌트의 글로벌 스타일링과 컴포넌트 렌더링을 제어할 수 있다.

```js
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <style jsx global>{`
        a {
          background-color: white;
        }
      `}</style>
    </>
  );
```

여기에서 `<Component {...pageProps} />`는 라우터로 렌더링 된 페이지의 컴포넌트를 나타낸다. Component 전후로, 다른 컴포넌트나 style 태그를 사용하여 모든 페이지의 제어가 가능하다.

글로벌 CSS 간 충돌을 막기 위해서, `.modules.css` 형태의 CSS 파일을 제외한 나머지 CSS 파일들은 `_app.js`에서만 사용해야한다.
