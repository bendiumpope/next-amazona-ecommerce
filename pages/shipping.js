import { useRouter } from 'next/router'
import React from 'react'

export default function Shipping() {
  let router = useRouter();

  router.push('/login');
  return (
    <div>shipping</div>
  )
}
