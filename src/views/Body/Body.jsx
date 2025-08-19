import React from 'react'
import { Start } from '../Start/Start';
import { Route, Routes } from 'react-router-dom'
import Main from '../Main/Main';
import { End } from '../End/End';

export const Body = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/game" element={<Main />} />
        <Route path="/end" element={<End />} />
    </Routes>
    </>
  )
}
