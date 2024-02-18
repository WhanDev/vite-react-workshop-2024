/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Product = () => {
  const [name, setName] = useState('')
  const [qty, setQty] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const user_id = localStorage.getItem('user_id')

  const handleCreateProduct = async (e) => {
    e.preventDefault()
    try {
      const api = 'https://workshop-react-api.vercel.app/product'
      const res = await axios.post(api, { name, qty, price, image, user_id })
      console.log(res)
      getProducts(user_id)
    } catch (error) {
      console.log(error)
    }
  }

  const [products, setProducts] = useState([])

  const getProducts = async (user_id) => {
    try {
      const api = 'https://workshop-react-api.vercel.app/product?user_id=' + user_id
      // const api = 'https://workshop-react-api.vercel.app/product?user_id=${user_id}'
      const res = await axios.get(api)
      setProducts(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      const api = 'https://workshop-react-api.vercel.app/product/' + id
      const res = await axios.delete(api)
      console.log(res)
      getProducts(user_id)
    } catch (error) {
      console.log(error)
    }
  }

  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const handleEditProduct = (id) => {
    setEditMode(true);
    setEditProductId(id);

    const productToEdit = products.find((product) => product.id === editProductId);
    if (productToEdit) {
      setName(productToEdit.name);
      setQty(productToEdit.qty);
      setPrice(productToEdit.price);
      setImage(productToEdit.image);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    try {
      const api = 'https://workshop-react-api.vercel.app/product/' + editProductId
      const res = await axios.put(api, { name, qty, price, image, id: editProductId })
      console.log(res)
      getProducts(user_id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = async (e) => {
    setEditMode(false);
    setName('');
    setQty('');
    setPrice('');
    setImage('');
  }

  useEffect(() => {
    getProducts(user_id)
  }, [user_id])

  return (
    <div className='bg-gray-100 h-screen'>

      <div className='p-10 '>
        <form className='bg-white shadow-xl rounded-lg p-5'>

          <label className='text-1x'>Pname</label>
          <input className='border border-gray-500 rounded-lg m-2 p-1' type="text" value={name || ''}
            name="name" placeholder="ชื่อสินค้า" onChange={(e) => setName(e.target.value)} />

          <label className='text-1x'>Qty</label>
          <input className='border border-gray-500 rounded-lg m-2 p-2' value={qty || ''}
            type="number" name="qty" placeholder="จํานวน" onChange={(e) => setQty(e.target.value)} />

          <label className='text-1x'>Price</label>
          <input className='border border-gray-500 rounded-lg m-2 p-2' value={price || ''}
            type="number" name="price" placeholder="ราคา" onChange={(e) => setPrice(e.target.value)} />

          <label className='text-1x'>Image</label>
          <input className='border border-gray-500 rounded-lg m-2 p-2' value={image || ''}
            type="text" name="image" placeholder="รูปภาพ" onChange={(e) => setImage(e.target.value)} />

          {editMode ?
            <button className='text-white bg-blue-500 rounded-lg m-2 p-2 px-5' onClick={handleUpdateProduct} >Save</button> :
            <button className='text-white bg-green-500 rounded-lg m-2 p-2 px-5' onClick={handleCreateProduct} >Create</button>}


          <button className='text-white bg-red-500 rounded-lg m-2 p-2 px-5' type='button' onClick={handleCancel}>Cancel</button>
        </form>

        <hr className='my-5 borde border-gray-300' />

        <div className="relative overflow-x-auto shadow-xl rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-white uppercase bg-blue-700 text-center">
              <tr>
                <th scope="col" className="px-6 py-3">
                  List
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price (THB)
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>

              {products.length === 0 ? (
                <tr className="bg-white border-b  hover:bg-gray-50 text-center">
                  <td className="px-6 py-4" colSpan={6}>
                    <p className="text-1xl">ไม่มีข้อมูล</p>
                  </td>
                </tr>
              ) : (
                <>
                  {products.map((product, index) => (
                    <React.Fragment key={index}>
                      <tr className="bg-white border-b  hover:bg-gray-50 text-center">
                        <td className="px-6 py-4">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          {product.name}
                        </td>
                        <td className="px-6 py-4">
                          {product.qty}
                        </td>
                        <td className="px-6 py-4">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 flex items-center justify-center">
                          <img src={product.image} className='h-20 rounded-lg' />
                        </td>

                        <td className="px-6 py-4">
                          <button className='text-white bg-orange-500 rounded-lg m-1 p-2 px-5'
                            type='button' onClick={() => handleEditProduct(product.id)}>Edit</button>
                          <button className='text-white bg-red-500 rounded-lg m-1 p-2 px-5'
                            type='button' onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Product