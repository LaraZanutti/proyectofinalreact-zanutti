import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import CartWidget from './CartWidget'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faFaceSmile, faPhone, faBars } from '@fortawesome/free-solid-svg-icons'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../db/firebase'

function NavBar() {

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        getCategorias()
    }, [])

    const getCategorias = async () => {
        const categorias = []
        try {
            const categoriasCollection = collection(db, "categorias")
            const q = await getDocs(categoriasCollection)

            q.docs.map((doc) => {
                categorias.push(doc.data())
            })
            setCategorias(categorias)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <header id="header" className="header flex justify-between py-2 px-2 bg-slate-800 text-white">
            <nav className='navbar flex justify-between text-base '>
                <NavLink to="/" ><h1 className="text-lg p-2">LariZtore</h1></NavLink>

                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn bg-red-400 text-white rounded-full p-2 ml-3 drawer-button capitalize text-lg font-normal">categories</label>
                    </div>
                    <div className="drawer-side z-[100]">
                        <label htmlFor="my-drawer" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content mt-20 text-base">
                            {/* Sidebar content here */}
                            {categorias.map((categoria, i) => {
                                return (
                                    <NavLink to={`/cat/${categoria.name}`} key={i}>
                                        <li className='btn hover:bg-red-400 rounded-full text-white'>{categoria.name}</li>
                                    </NavLink>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className='w-full justify-end mr-5 hidden md:flex'>
                    <NavLink to="/contact" className='hover:bg-red-400 rounded-full p-3'><FontAwesomeIcon icon={faPhone} className='text-lg mr-2' />Contact</NavLink>
                    <NavLink className='hover:bg-red-400 rounded-full p-3 ' to="/whoWereAre"><FontAwesomeIcon icon={faCircleInfo} className='text-lg mr-2' />Who we are</NavLink>
                </div>
                <CartWidget />
                <div className='flex justify-end text-xl md:hidden'>
                    <details className="dropdown dropdown-end">
                        <summary className="m-1 btn btn-ghost"> <FontAwesomeIcon icon={faBars} /></summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <NavLink to="/contact" className='hover:bg-red-400 rounded-full p-3'><FontAwesomeIcon icon={faPhone} className='text-lg mr-2' />Contact</NavLink>
                            <NavLink className='hover:bg-red-400 rounded-full p-3 ' to="/whoWereAre"><FontAwesomeIcon icon={faCircleInfo} className='text-lg mr-2' />Who we are</NavLink>
                        </ul>
                    </details>

                </div>
            </nav>
        </header>
    )
}

export default NavBar