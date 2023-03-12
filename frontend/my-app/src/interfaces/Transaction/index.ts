export interface Transaction{
    tran_id : number,
    delivery_date : Date,
    credit : number,
    payment_method : string,
    payment_status : string,
    credit_due_date : Date,
    transaction_date : Date,
    delivery_status : string,
    type : string,
    employee_emp_id : number,
    partner_par_id : number
}

export interface TransactionProps {
    details: {
      tran_id: number;
      delivery_date: Date;
      credit: number;
      payment_method: string;
      payment_status: string;
      credit_due_date: Date;
      transaction_date: Date;
      delivery_status: string;
      type: string;
      employee_emp_id: number;
      partner_par_id: number;
    }[],
    setIsRefreshAll : React.Dispatch<React.SetStateAction<boolean>>
}

export interface TransactionModalProps{
    isOpen : boolean,
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>,
    idNow : Transaction
}

export interface AddTransactionModalProps{
    isOpenAdd : boolean,
    setIsOpenAdd : React.Dispatch<React.SetStateAction<boolean>>,
    setIsRefresh : React.Dispatch<React.SetStateAction<boolean>>
}

export interface TransactionById{
    product_pro_id : number,
    transaction_tran_id : number,
    price : number,
    count : number,
    title : string,
    mfd : Date,
    brand : string,
    fname : string,
    lname : string,
    par_fname : string,
    par_lname : string
}

export interface SelectGroup{
    type : string,
    payment_method : string,
    payment_status : string,
    deliver_status : string,
    employee_emp_id : string,
    partner_par_id : string,
    transaction_date : Date,
    deliver_date : Date,
    credit_due_date : Date,
    credit : number
}

export interface AddTransaction{
    type : '',
    payment_method : '',
    payment_status : '',
    deliver_status : '',
    employee_emp_id : '',
    partner_par_id : '',
    transaction_date : Date,
    deliver_date : Date,
    credit_due_date : Date,
    credit : number,
    product : {
        product_pro_id : number,
        price : number,
        count : number
    }[]
}