import { Button } from '@mui/material'
import React from 'react'
import { logOut } from '../utilities/helperFunctions'

export default function CustomButton({ ButtonName, onclickfunction }) {
  return (
    <>
      <Button
        variant="outlined"
        onClick={onclickfunction}
      >
        {ButtonName}
      </Button>
    </>
  )
}
