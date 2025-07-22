import React from 'react'
import { Start } from '../Start/Start';
import { Route, Routes } from 'react-router-dom'

export const Body = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Start />} />
    </Routes>
    </>
  )
}
