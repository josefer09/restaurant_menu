import { useMemo } from "react";
import { OrderItem } from "../interfaces"
import { formatCurrency } from "../helpers";
import { OrderActions } from "../reducers/order-reducer";


interface OrderTotalsProps {
    order: OrderItem[];
    tip: number;
    dispatch: React.Dispatch<OrderActions>;
}

export default function OrderTotal({order, tip, dispatch} : OrderTotalsProps) {

    const subTotalAmount = useMemo( () => order.reduce((total, item) => total + ( item.quantity * item.price), 0), [order]) // el reduce usa dos parametros, el primero es el callback y el segundo es el valor inicial, que seria 0, mientras que el callback solo se encarga de ejecutar el metodo para la suma del subtotal, use memo hace que unicamente se renderize o ejecute el codigo cuando cambien la dependencia
    const tipAmount = useMemo(() => subTotalAmount * tip ,[tip, order]);

    const totalAmount = useMemo(() =>  tipAmount + subTotalAmount, [tip, order]);
  return (
    <>
    <div className=" space-y-3">
        <h2 className="font-black text-2xl">Total & Tips</h2>
        <p>SubTotal: {''}
            <span className=" font-bold">{formatCurrency(subTotalAmount)}</span>
        </p>

        <p>Tip: {''}
            <span className=" font-bold">{formatCurrency(tipAmount)}</span>
        </p>

        <p>Total: {''}
            <span className=" font-bold">{formatCurrency(totalAmount)}</span>
        </p>
    </div>
    <button className=" w-full bg-black p-3 uppercase  text-white font-bold mt-10 disabled:opacity-10" disabled={totalAmount === 0} onClick={() => dispatch({type: 'place-order'})}>Save Order</button>
    </>
  )
}
