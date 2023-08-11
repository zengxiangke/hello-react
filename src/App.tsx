import { Suspense, lazy } from 'react';
import { sleep } from './lib/js-utils';

// the 'Hello' async component
async function getHello() {
  await sleep(5);
  const Component = () => {
    return <div>the hello async component</div>;
  };
  return {
    default: Component,
  };
}

const Hello = lazy(getHello);

// the fallback component
function Fallback() {
  return <div>loading...</div>;
}

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <p>
        I am just in the `suspend`, you can not see me util the `hello` done
        loaded
      </p>
      <Hello />
    </Suspense>
  );
}
