import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, selectAllBooks } from "../features/books/booksSlice";
import { DeleteFilled } from "@ant-design/icons";
import { ConfigProvider, Space, Table } from "antd";
import CartItem from "../components/CartItem";
import '../styles/cart.css';


const idBooks = ['6648c47052e96e6a0433ced6', '6648c47052e96e6a0433ced7', '6648c47052e96e6a0433ced8']

const Cart = () => {
    const dispatch = useDispatch();
    const books = useSelector(selectAllBooks);
    const cartBooks = books.filter((b) => idBooks.includes(b._id))

    useEffect(() => {
        dispatch(getBooks());
    }, []);

    const columns = [
        {
            title: "Item",
            dataIndex: "item",
            key: "item",
            width: "40%",
            render: (_, record) => <CartItem book={record} />,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            width: "20%",
        },
        {
            title: "Action",
            key: "action",
            width: "20%",
            render: (_, record) => (
                <Space size="middle">
                    <a>
                        <DeleteFilled style={{ color: "#86469C" , fontSize:'20px'}} />
                    </a>
                </Space>
            ),
        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg:'#5B067D',
                        headerColor:'white',
                    },
                },
            }}
        ><Table columns={columns} dataSource={cartBooks} rowKey="_id" style={{ margin: "auto", width: "90%" }} />
        </ConfigProvider>

    )

};

export default Cart;
