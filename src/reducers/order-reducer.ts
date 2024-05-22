import { MenuItem, OrderItem } from "../interfaces";

// Crear el type de las acciones
export type OrderActions = 
    { type: 'add-item', payload: { item: MenuItem}} |
    { type: 'remove-item', payload: { id: MenuItem['id']}} |
    { type: 'place-order',} |
    { type: 'add-tip', payload: { value: number }}



export type OrderState = {
    order: OrderItem[],
    tip: number,
}

export const initialState: OrderState = {
    order: [],
    tip: 0,
}

export const orderReducer = (
    state: OrderState = initialState,
    action: OrderActions,
) => {

    if(action.type === 'add-item') {

        const itemExist = state.order.find((orderItem) => orderItem.id === action.payload.item.id); //
        let updateOrder: OrderItem[] = [];
    if (itemExist) {
        //* Creamos un nuevo arreglo con map, toma una copia de lo que haya en nuestra orden pero en la propiedad de cantidad, toma lo que ya tenemos de cantidad y le incrementa en 1
        updateOrder = state.order.map( orderItem => orderItem.id === action.payload.item.id
            ? {...orderItem, quantity: orderItem.quantity + 1}
            : orderItem
        ) // Devuelve un nuevo arreglo
    } else {
      const newItem: OrderItem = { ...action.payload.item, quantity: 1 }; // Tomar una copia del objeto y anadirle una nueva propiedad
      updateOrder = [...state.order, newItem]// [...order] // Toma una copia de lo que haya registrado en el arreglo
    }

        return {
            ...state, // Copia del states
            order: updateOrder,
        }
    }

    if(action.type === 'remove-item') {
        const updateOrder = state.order.filter( currentItem => currentItem.id !== action.payload.id); // Me traigo un nuevo arreglo de todos menos el id actual
    //setOrder(updateOrder);
        return {
            ...state,
            order: updateOrder,
        }
    }

    if(action.type === 'place-order') {
        

        return {
            ...state,
            order: [],
            tip: 0,
        }
    }

    if(action.type === 'add-tip') {
        const tip = action.payload.value;
        return {
            ...state,
            tip,
        }
    }


    return state;

}