import React from "react";

const OrderItem = ({ products }) => {
  return (
    <div>
      {products.map((item, index) => {
        return (
          <div key={index} className="row align-items-center mb-3">
            <div className="col-9">
              <div className="product-name flex align-items-center">
                <img src={item.product.coverImage ?? null} alt="" />
                <div className="ml-3">
                  <p className="name">{item.product.name}</p>
                  <p className="size">Size: {item.product.size}</p>
                </div>
              </div>
            </div>
            <div className="col-1 text-right">x{item.quantity}</div>
            <div className="col-2 text-right">{item.price}</div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderItem;
