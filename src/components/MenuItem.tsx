import { MenuItem as MenuItemInterface,} from '../interfaces';
import { OrderActions } from '../reducers/order-reducer';

// Interface para promp
interface MenuItemProps {
  item: MenuItemInterface,
  dispatch: React.Dispatch<OrderActions>,
}

export default function MenuItem({item, dispatch}: MenuItemProps) {
  return (
    <>
    <button className=' border-2 border-indigo-400 hover:bg-indigo-200 w-full p-3 flex justify-between'
    onClick={() => dispatch({type: 'add-item', payload: {item}})}
    >
    <p>{item.name}</p>
    <p className='font-black'>${item.price}</p>
    </button>
    
    </>
  )
}
