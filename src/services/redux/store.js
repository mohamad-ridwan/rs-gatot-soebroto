import { configureStore } from '@reduxjs/toolkit'
import navbar from './navbar'

export default configureStore({
    reducer: {
        navbar: navbar
    }
})