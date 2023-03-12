export interface InventoryData{
    pro_id : number,
    title : string,
    mfd : Date,
    brand : string,
    type : string,
    total : number,
    current_price_per : number
}

export interface InventoryProps {
    details: {
      pro_id: number,
      title: string,
      mfd: Date,
      brand: string,
      type: string,
      total: number,
      current_price_per : number
    }[],
    setIsRefreshAll : React.Dispatch<React.SetStateAction<boolean>>
}

export interface InventoryModalProps{
  isOpen : boolean,
  inventoryDetail : InventoryData,
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
  setIsRefresh : React.Dispatch<React.SetStateAction<boolean>>
}

export interface SelectGroup{
  title : string,
  brand : string,
  mfd : Date,
  type : string,
  total : number,
  current_price_per : number
}