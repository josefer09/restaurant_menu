import { useReducer } from "react";
import MenuItem from "./components/MenuItem";
import OrderContents from "./components/OrderContents";
import OrderTotal from "./components/OrderTotal";
import TipPercentageForm from "./components/TipPercentageForm";
import { menuItems } from "./data/db";
import { initialState, orderReducer } from "./reducers/order-reducer";

function App() {

  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <>
      <header className=" bg-indigo-400 py-5">
        <h1 className=" text-center text-4xl font-black text-white">
          Tips & Order Calculator
        </h1>
      </header>

      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className=" font-black text-4xl">Menu</h2>
          <div className="mt-10 space-y-3">
            {menuItems.map((item) => (
              <MenuItem
                key={item.id} // Siempre que itero requiero un key unico
                item={item} // Le paso el item como prom
                dispatch={dispatch}
              />
            ))}
          </div>
        </div>

        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {state.order.length > 0 ? (
            <>
              <OrderContents order={state.order} dispatch={dispatch} />
              <TipPercentageForm dispatch={dispatch} tip={state.tip} />
              <OrderTotal order={state.order} tip={state.tip} dispatch={dispatch} />
            </>
          ) : (
            <p className=" text-center">Order is  empty</p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
