import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../fireBase";

export const getBooks = createAsyncThunk(
   "product/getBooks",
   async () => {
      let array = []
      let querySnapshot = await getDocs(collection(db, "books"))
      querySnapshot.forEach(doc => {
         array.push({...doc.data(), "key": doc.id })
      })
      return array;
   }
)

export const getCategories = createAsyncThunk(
   "product/getCategories",
   async () => {
      let array = []
      let querySnapshot = await getDocs(collection(db, "category"))
      querySnapshot.forEach(doc => {
         array.push({...doc.data(), "key": doc.id })
      })
      
      return array;
   }
)

export const getAuthors = createAsyncThunk(
   "product/getAuthors",
   async () => {
      let array = []
      let querySnapshot = await getDocs(collection(db, "autor"))
      querySnapshot.forEach(doc => {
         array.push({...doc.data(), "key": doc.id })
      })
      
      return array;
   }
)

const initialState = { 
   books: {
      items: [],
      status: "idle"
   },
   book: null,
   authors: {
      items: [],
      status: "idle"
   },
   categories: {
      items: [],
      status: "idle"
   },
   selectedAuthor: null,
   selectedCategory: null,
   page: 1,
   filterBooks: [],
   sort: null,
} 

const productSlice = createSlice({ 
   name: 'product', 
   initialState, 
   reducers: { 
      setSelectedCategory: (state, action) => { 
         state.page = 1
         state.selectedCategory = action.payload
         state.selectedAuthor = null
      },
      setSelectedAuthor: (state, action) => { 
         state.page = 1
         state.selectedAuthor = action.payload
      },
      setOneBook: (state, action) => { 
         state.book = action.payload
      },
      setBooks: (state, action) => {
         if(action.payload.selectedAuthor && !action.payload.selectedCategory){
            state.filterBooks = state.books.items.filter(item => item.authors === action.payload.selectedAuthor)
         }
         if(!action.payload.selectedAuthor && action.payload.selectedCategory){
            state.filterBooks = state.books.items.filter(item => item.categories === action.payload.selectedCategory)
         }
         if(action.payload.selectedAuthor && action.payload.selectedCategory){
            state.filterBooks = state.books.items.filter(item => item.categories === action.payload.selectedCategory)
               .filter(item => item.authors === action.payload.selectedAuthor)
         }
         if(!action.payload.selectedAuthor && !action.payload.selectedCategory){
            state.filterBooks = state.books.items
         }
      },
      setSort: (state, action) => {
         state.sort = action.payload
         if(action.payload === "less"){
            state.books.items = state.books.items.sort((a, b) => a.price > b.price ? 1 : -1)
            state.filterBooks = state.filterBooks.sort((a, b) => a.price > b.price ? 1 : -1)
         }else if(action.payload === "more"){
            state.books.items = state.books.items.sort((a, b) => a.price < b.price ? 1 : -1)
            state.filterBooks = state.filterBooks.sort((a, b) => a.price < b.price ? 1 : -1)
         } else if (action.payload === "popularity"){
            state.books.items = state.books.items.sort((a, b) => a.name < b.name ? 1 : -1)
            state.filterBooks = state.filterBooks.sort((a, b) => a.name < b.name ? 1 : -1)
         }
         
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(getCategories.pending, state => {state.categories.status = 'loading'})
         .addCase(getAuthors.pending, state => {state.authors.status = 'loading'})
         .addCase(getBooks.pending, state => {state.books.status = 'loading'})

         .addCase(getCategories.fulfilled, (state, action) => {
               state.categories.status = 'idle';
               state.categories.items = action.payload
            })
         .addCase(getAuthors.fulfilled, (state, action) => {
               state.authors.status = 'idle';
               state.authors.items = action.payload
            })
         .addCase(getBooks.fulfilled, (state, action) => {
            state.books.status = 'idle';
            state.books.items = action.payload
         })

         .addCase(getCategories.rejected, state => {state.categories.status = 'error'})
         .addCase(getAuthors.rejected, state => {state.authors.status = 'error'})
         .addCase(getBooks.rejected, state => {state.books.status = 'error'})

         .addDefaultCase(() => {})
   }
}) 

export const {
   setSelectedCategory,
   setSelectedAuthor,
   setOneBook,
   setBooks,
   setSort
} = productSlice.actions 

export default productSlice.reducer