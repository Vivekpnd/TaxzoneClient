'use client'

import { useState } from 'react'
import TopBar from './TopBar'
import MainHeader from './MainHeader'
import NavBar from './NavBar'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* NOT sticky */}
      <TopBar />

      {/* STICKY GLOBAL */}
      <MainHeader onMenuClick={() => setMenuOpen(true)} />

      {/* NOT sticky */}
    </>
  )
}
