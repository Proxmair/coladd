'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  [key: string]: boolean
}

const initialState: ModalState = {}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state[action.payload] = true
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state[action.payload] = false
    },
    toggleModal: (state, action: PayloadAction<string>) => {
      state[action.payload] = !state[action.payload]
    },
    setModal: (state, action: PayloadAction<{ key: string; value: boolean }>) => {
      state[action.payload.key] = action.payload.value
    },
  },
})

export const { openModal, closeModal, toggleModal, setModal } = modalSlice.actions
export default modalSlice.reducer