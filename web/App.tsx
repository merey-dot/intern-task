import { type PriceResult } from '../src/types'
import products from '../data/products.json'
import  { useState, useEffect } from 'react'


function App() {
    const [productsResult, setProductsResult] = useState<PriceResult[]>([])

    useEffect(() => {
        async function reprice() {
            const response = await fetch('http://localhost:3000/reprice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(products)
            })

            const data: PriceResult[] = await response.json()
            setProductsResult(data)
        }

        reprice()
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Было</th>
                    <th>Стало</th>
                    <th>Причина</th>
                </tr>
            </thead>

            <tbody>
                {productsResult.map(p => (

                    <tr key={p.sku}>
                        <th scope="row">{p.sku}</th>
                        <td>{p.oldPrice}</td>
                        <td>{p.newPrice}</td>
                        <td>{p.reason}</td>
                    </tr>

                ))}
            </tbody>
        </table>
    )
}

export default App

