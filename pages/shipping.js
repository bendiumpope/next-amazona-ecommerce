import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';

export default function Shipping() {
  let router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
  });

  return <div>shipping</div>;
}
