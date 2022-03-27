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
