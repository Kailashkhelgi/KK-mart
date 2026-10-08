import { createSlice } from '@reduxjs/toolkit'
import { productDummyData } from '@/assets/assets'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: productDummyData,
    },
    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
        },
        addProduct: (state, action) => {
            state.list.unshift(action.payload)
        },
        deleteProduct: (state, action) => {
            state.list = state.list.filter(p => p.id !== action.payload)
        },
        toggleStock: (state, action) => {
            const prod = state.list.find(p => p.id === action.payload)
            if (prod) {
                prod.inStock = !prod.inStock
            }
        },
        clearProduct: (state) => {
            state.list = []
        }
    }
})

export const { setProduct, addProduct, deleteProduct, toggleStock, clearProduct } = productSlice.actions

export default productSlice.reducer